from __future__ import annotations

from pathlib import Path
from urllib.parse import urlencode
import json
import time

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

        # Load configuration robustly (works regardless of current working directory)
        with open(script_dir / "configure.json", "r", encoding="utf-8") as f:
            self.configure = json.load(f)

        # Base URLs and selectors
        self.url = self.configure["url"]
        self.base_url = self.configure["base_url"]  # e.g., https://scholar.google.com/citations
        self.wait_tag = self.configure["wait_tag"]  # CSS selector; e.g., "#gsc_a_b"
        self.find_tag = self.configure["find_tag"]  # id; e.g., "gsc_a_b"
        self.child_tag = self.configure["child_tag"]  # e.g., "td"
        self.year_class = self.configure["year_class"]  # e.g., "gsc_a_y"

        # Output path relative to script directory for stability
        self.result_filename = str((script_dir / self.configure["result_filename"]).resolve())

        # Button / timing
        self.btn_max_cnt = int(self.configure["btn_max_cnt"])
        self.btn_wait_time = int(self.configure["btn_wait_time"])

    def run(self) -> None:
        options = [StringQueryKey.language, StringQueryKey.user, StringQueryKey.sort_by, StringQueryKey.start]
        url = self.create_url(options)
        self.crawl(url)

    def create_url(self, options: list[StringQueryKey]) -> str:
        query_dict = {opt.value: self.configure[opt.value] for opt in options}
        # Including view_op=list_works makes the publications list explicit and stable
        if "view_op" not in query_dict:
            query_dict.update({"view_op": "list_works"})
        return f"{self.base_url}?{urlencode(query_dict)}"

    def crawl(self, url: str) -> None:
        options = webdriver.ChromeOptions()
        options.add_argument("--headless")
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

            # Wait until the publications table is present
            WebDriverWait(driver, 20).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, self.wait_tag))
            )

            # Click the "Show more" button up to btn_max_cnt times
            for i in range(self.btn_max_cnt):
                try:
                    btn = driver.find_element(By.ID, "gsc_bpf_more")
                    if not btn.is_enabled():
                        print("[INFO] 더 이상 불러올 항목이 없습니다.")
                        break

                    # track current row count, click, then wait until it increases (or timeout)
                    rows_before = len(driver.find_elements(By.CSS_SELECTOR, "#gsc_a_b .gsc_a_tr"))
                    print(f"[INFO] 버튼 클릭 {i + 1}/{self.btn_max_cnt} (rows_before={rows_before})")
                    btn.click()

                    WebDriverWait(driver, self.btn_wait_time).until(
                        lambda d: len(d.find_elements(By.CSS_SELECTOR, "#gsc_a_b .gsc_a_tr")) > rows_before
                    )
                except Exception as e:
                    print(f"[WARNING] 버튼 클릭/로딩 대기 중 이슈 (계속 진행): {e}")
                    break

            # Parse the page
            html = driver.page_source
            soup = BeautifulSoup(html, "html5lib")
            tbody = soup.find(id=self.find_tag)

            data_dict = {"data": []}
            for row in tbody.find_all("tr", class_="gsc_a_tr"):
                try:
                    # Title + link
                    title_cell = row.find("td", class_="gsc_a_t")
                    title_link = title_cell.find("a")
                    title = title_link.get_text(strip=True) if title_link else title_cell.get_text(strip=True)
                    href = title_link["href"] if title_link and title_link.has_attr("href") else None
                    link = f"{self.url}{href}" if href else ""

                    # Authors & venue
                    authors = title_cell.find("div", class_="gsc_a_at").get_text(strip=True) if title_cell.find("div", class_="gsc_a_at") else ""
                    venue = title_cell.find("div", class_="gsc_a_h").get_text(strip=True) if title_cell.find("div", class_="gsc_a_h") else ""

                    # Year
                    year_cell = row.find("td", class_=self.year_class)
                    year = year_cell.get_text(strip=True) if year_cell else ""

                    # Build a consistent record
                    results = [title, authors, venue, link, year]
                    data_dict["data"].append({f"{idx}": (val or "") for idx, val in enumerate(results)})
                except Exception as e:
                    print(f"[WARNING] 데이터 파싱 실패 (해당 행 건너뜀): {e}")
                    continue

            # Write JSON
            with open(self.result_filename, "w", encoding="utf-8") as f:
                f.write(json.dumps(data_dict, ensure_ascii=False, indent=2))
            print(f"[INFO] 저장 완료: {self.result_filename}")

        except TimeoutException as te:
            print("[ERROR] 페이지 로딩 타임아웃 발생:", te)
            # Save screenshot next to script for artifact upload
            Path(__file__).with_name("timeout_error.png").write_bytes(driver.get_screenshot_as_png() if driver else b"")
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
