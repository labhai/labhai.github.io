from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from bs4 import BeautifulSoup
from urllib.parse import urlencode
from enum import Enum
import json


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
    count = "page_size"


class HAIPublication:
    def __init__(self):
        with open('./Publication/configure.json', 'r') as configure_file:
            configure = json.load(configure_file)
        self.configure = configure
        self.base_url = self.configure['url']
        self.wait_tag = self.configure['wait_tag']
        self.find_tag = self.configure['find_tag']
        self.child_tag = self.configure['child_tag']
        self.result_filename = self.configure['result_filename']

    def run(self):
        options = [StringQueryKey.language,
                   StringQueryKey.user,
                   StringQueryKey.sort_by,
                   StringQueryKey.start,
                   StringQueryKey.count]
        url = self.create_url(options)
        self.crawl(url)

    def create_url(self, options: [StringQueryKey]):
        query_dict = {option.value: self.configure[option.value] for option in options}
        return f"{self.base_url}?{urlencode(query_dict)}"

    def crawl(self, url):
        driver = webdriver.Chrome()
        driver.get(url)
        WebDriverWait(driver, 1000) \
            .until(EC.presence_of_element_located((By.CSS_SELECTOR, self.wait_tag)))
        html = driver.page_source
        soup = BeautifulSoup(html, "html5lib")
        tbody = soup.find(id=self.find_tag)

        data_dict = {'data': []}
        for child in tbody.children:
            results = [ch.text for ch in child.find(self.child_tag).children]
            data_dict['data'].append({f"{idx}": result for idx, result in enumerate(results)})
        json_text = json.dumps(data_dict)
        with open(self.result_filename, 'w') as f:
            f.write(json_text)



HAIPublication().run()
