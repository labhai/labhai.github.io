from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException, WebDriverException

from bs4 import BeautifulSoup
from urllib.parse import urlencode
from enum import Enum
import json
import time
import os


class StrEnum(str, Enum):
    def _generate_next_value_(name, start, count, last_values):
        return name

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name


class StringQueryKey(StrEnum):
    language = "hl"
    user = "user"
    sort_by = "sortby"
    start = "cstart"


class HAIPublication:
    def __init__(self):
        # GitHub Actions 기준
        with open('./Publication/configure.json', 'r') as configure_file:
            configure = json.load(configure_file)

        self.configure = configure
        self.url = self.configure['url']
        self.base_url = self.configure['base_url']
        self.wait_tag = self.configure['wait_tag']
        self.find_tag = self.configure['find_tag']
        self.child_tag = self.configure['child_tag']
        self.result_filename = self.configure['result_filename']
        self.btn_max_cnt = int(self.configure['btn_max_cnt'])
        self.btn_wait_time = int(self.configure['btn_wait_time'])
        self.year_class = self.configure['year_class']

    def run(self):
        options = [StringQueryKey.language, StringQueryKey.user, StringQueryKey.sort_by, StringQueryKey.start]
        url = self.create_url(options)
        self.crawl(url)

    def create_url(self, options: [StringQueryKey]):
        query_dict = {option.value: self.configure[option.value] for option in options}
        return f"{self.base_url}?{urlencode(query_dict)}"

    def crawl(self, url):
        options = webdriver.ChromeOptions()
        options.add_argument("--headless")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1920,1080")
        options.add_argument("--disable-blink-features=AutomationControlled")

        try:
            driver = webdriver.Chrome(options=options)
            driver.get(url)

            print(f"[INFO] 접속 중: {url}")
            WebDriverWait(driver, 30).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, self.wait_tag))
            )

            for i in range(self.btn_max_cnt):
                try:
                    button = driver.find_element(By.ID, 'gsc_bpf_more')
                    if button.is_enabled():
                        print(f"[INFO] 버튼 클릭 {i+1}/{self.btn_max_cnt}")
                        button.click()
                        WebDriverWait(driver, self.btn_wait_time).until(
                            EC.element_to_be_clickable((By.ID, '_'))
                        )
                    else:
                        break
                except Exception as e:
                    print(f"[WARNING] 버튼 로딩 실패 (계속 진행): {e}")
                    break

            html = driver.page_source
            soup = BeautifulSoup(html, "html5lib")
            tbody = soup.find(id=self.find_tag)

            data_dict = {'data': []}
            for child in tbody.children:
                try:
                    results = []
                    link = None
                    year = child.find(self.child_tag, {"class": self.year_class}).text
                    for ch in child.find(self.child_tag).children:
                        results.append(ch.text)
                        href = ch.attrs.get('href')
                        if href is not None:
                            link = self.url + href
                    results.append(link)
                    results.append(year)
                    data_dict['data'].append({
                        f"{idx}": result if result is not None else ""
                        for idx, result in enumerate(results)
                    })
                except Exception as e:
                    print(f"[WARNING] 데이터 파싱 실패 (건너뜀): {e}")
                    continue

            json_text = json.dumps(data_dict, indent=2)
            with open(self.result_filename, 'w', encoding='utf-8') as f:
                f.write(json_text)
            print(f"[INFO] 저장 완료: {self.result_filename}")

        except TimeoutException as te:
            print("[ERROR] 페이지 로딩 타임아웃 발생:", te)
            driver.save_screenshot("timeout_error.png")
            raise
        except WebDriverException as we:
            print("[ERROR] 드라이버 예외 발생:", we)
            raise
        finally:
            try:
                driver.quit()
            except:
                pass
