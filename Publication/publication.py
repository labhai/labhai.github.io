from __future__ import annotations

from pathlib import Path
from urllib.parse import urlencode
import json

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException, WebDriverException

from enum import Enum


class StrEnum(str, Enum):
    def _generate_next_value_(name, start, count, last_values):
        return name


class StringQueryKey(StrEnum):
    language = "hl"
    user = "user"
    sort_by = "sortby"
    start = "cstart"


class HAIPublication:
    def __init__(self) -> None:
        script_dir = Path(__file__).resolve().parent

        with open(script_dir / "configure.json", "r", encoding="utf-8") as f:
            self.configure = json.load(f)

        self.url = self.configure["url"]
        self.base_url = self.configure["base_url"]      
        self.wait_tag = self.configure["wait_tag"]      
        self.find_tag = self.configure["find_tag"]      
        self.child_tag = self.configure["child_tag"]    
        self.year_class = self.configure["year_class"]  

        self.result_filename = str((script_dir / self.configure["result_filename"]).resolve())

        self.btn_max_cnt = int(self.configure["btn_max_cnt"])
        self.btn_wait_time = int(self.configure["btn_wait_time"])

    def run(self) -> None:
        options = [StringQueryKey.language, StringQueryKey.user, StringQueryKey.sort_by, StringQueryKey.start]
        url = self.create_url(options)
        self.crawl(url)

    def create_url(self, options: list[StringQueryKey]) -> str:
        query_dict = {opt.value: self.configure[opt.value] for opt in options}
        query_dict.setdefault("view_op", "list_works")
        return f"{self.base_url}?{urlencode(query_dict)}"

    def crawl(self, url: str) -> None:
        options = webdriver.ChromeOptions()
        options.add_argument("--headless=new")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        options.add_argument("--window-size=1920,1080")
        options.add_argument("--disable-blink-features=AutomationControlled")

        driver = None
        try:
            driver = webdriver.Chrome(options=options)
            driver.get(url)
            print(f"[INFO] 접속 중: {url}")

            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, self.wait_tag))
            )

            for i in range(self.btn_max_cnt):
                try:
                    btn = driver.find_element(By.ID, "gsc_bpf_more")
                    if not btn.is_enabled():
                        print("[INFO] 더 이상 불러올 항목이 없습니다.")
                        break

                    rows_before = len(driver.find_elements(By.CSS_SELECTOR, "#gsc_a_b .gsc_a_tr"))
                    print(f"[INFO] 버튼 클릭 {i + 1}/{self.btn_max_cnt} (rows_before={rows_before})")
                    btn.click()

                    WebDriverWait(driver, self.btn_wait_time).until(
                        lambda d: len(d.find_elements(By.CSS_SELECTOR, "#gsc_a_b .gsc_a_tr")) > rows_before
                    )
                except Exception as e:
                    print(f"[WARNING] 버튼 클릭/로딩 대기 중 이슈 (계속 진행): {e}")
                    break

            html = driver.page_source
            soup = BeautifulSoup(html, "html5lib")
            tbody = soup.find(id=self.find_tag)

            data_dict = {"data": []}
            for row in tbody.select("tr.gsc_a_tr"):
                try:
                    title_cell = row.select_one("td.gsc_a_t")
                    if not title_cell:
                        continue

                    title_link = title_cell.select_one("a.gsc_a_at")
                    title = title_link.get_text(strip=True) if title_link else title_cell.get_text(strip=True)
                    href = title_link["href"] if title_link and title_link.has_attr("href") else None
                    link = f"{self.url}{href}" if href else ""

                    meta_divs = title_cell.select("div.gs_gray")
                    authors = meta_divs[0].get_text(strip=True) if len(meta_divs) > 0 else ""
                    venue   = meta_divs[1].get_text(strip=True) if len(meta_divs) > 1 else ""

                    year_cell = row.select_one(f"td.{self.year_class}") or row.find("td", class_=self.year_class)
                    year = year_cell.get_text(strip=True) if year_cell else ""

                    results = [title, authors, venue, link, year]
                    data_dict["data"].append({f"{idx}": (val or "") for idx, val in enumerate(results)})
                except Exception as e:
                    print(f"[WARNING] 데이터 파싱 실패 (해당 행 건너뜀): {e}")
                    continue

            with open(self.result_filename, "w", encoding="utf-8") as f:
                json.dump(data_dict, f, ensure_ascii=False, indent=2)
            print(f"[INFO] 저장 완료: {self.result_filename}")

        except TimeoutException as te:
            print("[ERROR] 페이지 로딩 타임아웃 발생:", te)
            try:
                Path(__file__).with_name("timeout_error.png").write_bytes(driver.get_screenshot_as_png() if driver else b"")
            except Exception:
                pass
            raise
        except WebDriverException as we:
            print("[ERROR] 드라이버 예외 발생:", we)
            raise
        finally:
            try:
                if driver:
                    driver.quit()
            except Exception:
                pass


if __name__ == "__main__":
    HAIPublication().run()
