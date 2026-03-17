let newsData = []
let newsDataKey = []
const NEWS_DEFAULT_VISIBLE_YEARS = 2

/**
 * 문자열을 숫자로 변환한 뒤 비교하는 함수
 * @param a 첫 번째 문자열
 * @param b 두 번째 문자열
 * @return a가 크면 -1, 같으면 0, b가 크면 1
 */
function convertStringToIntAndCompare(a, b) {
    let x = parseInt(a)
    let y = parseInt(b)
    if (x > y) return -1
    if (x === y) return 0
    if (x < y) return 1
}

/**
 * newsJson 파일을 불러오고 news를 생성하는 함수
 * createNewsComponents 호출
 * @param containerId news를 저장할 container(Tag)의 ID
 */
function loadNewsJson(containerId) {
    readJson("../Data/news.json", (json) => {
        newsData = json['data']
        newsDataKey = Object
            .keys(newsData)
            .sort(convertStringToIntAndCompare)
        createNewsComponents(containerId)
    })
}

/**
 * news를 생성하는 함수
 * @param containerId news를 저장할 container(Tag)의 ID
 */
function createNewsComponents(containerId) {
    let defaultVisibleYears = new Set(getDefaultVisibleNewsYears(newsDataKey))
    let recentContent = ''
    let archivedContent = ''

    newsDataKey.forEach((year) => {
        let yearGroup = createNewsYearGroup(year)

        if (defaultVisibleYears.has(year)) {
            recentContent += yearGroup
            return
        }

        archivedContent += yearGroup
    })

    let archiveId = `${containerId}-archive`
    let content = `
    <div class="newsCurrentYears">
        ${recentContent}
    </div>
    `

    if (archivedContent) {
        content += `
        <div id="${archiveId}" class="newsArchive" hidden>
            ${archivedContent}
        </div>
        <div class="newsArchiveActions">
            <button type="button" class="newsArchiveToggle" aria-controls="${archiveId}" aria-expanded="false">More News</button>
        </div>
        `
    }

    let components = `
    <div class="newsSection">
        ${customTitleWithContent("NEWS", content, "font-size: 2rem", false)}
    </div>
    `
    let container = document.getElementById(containerId)
    container.innerHTML = components
    initializeNewsArchiveToggle(container)
}

function getDefaultVisibleNewsYears(yearKeys) {
    let currentYear = new Date().getFullYear()
    let defaultYears = yearKeys.filter((year) => year === String(currentYear) || year === String(currentYear - 1))

    if (defaultYears.length > 0) {
        return defaultYears
    }

    return yearKeys.slice(0, NEWS_DEFAULT_VISIBLE_YEARS)
}

function createNewsYearGroup(year) {
    let listContents = ''
    Object
        .keys(newsData[year])
        .sort(convertStringToIntAndCompare)
        .forEach((month) => {
            let newsList = newsData[year][month]
            listContents += listWithDate(`${year}. ${month}`, newsList, false)
        })

    return `
        <section class="newsYearGroup">
            ${customTitleWithContent(year, listContents, "font-size: 1.5rem; text-align: left", false)}
        </section>
    `
}

function initializeNewsArchiveToggle(container) {
    let archive = container.querySelector(".newsArchive")
    let toggleButton = container.querySelector(".newsArchiveToggle")

    if (!archive || !toggleButton) {
        return
    }

    const setArchiveExpanded = (isExpanded) => {
        archive.hidden = !isExpanded
        toggleButton.textContent = isExpanded ? "Show Less" : "More News"
        toggleButton.setAttribute("aria-expanded", String(isExpanded))
    }

    setArchiveExpanded(false)

    toggleButton.addEventListener("click", () => {
        let isExpanded = toggleButton.getAttribute("aria-expanded") === "true"
        setArchiveExpanded(!isExpanded)
    })
}

/**
 * institutionJson 파일을 불러오고 기관 섹션을 생성하는 함수
 * @param containerId 기관 정보를 저장할 container(Tag)의 ID
 */
function loadInstitutionJson(containerId) {
    readJson("../Data/institutions.json", (json) => {
        createInstitutionComponents(containerId, json["data"])
    })
}

/**
 * 기관 섹션을 생성하는 함수
 * @param containerId 기관 정보를 저장할 container(Tag)의 ID
 * @param institutionSections 기관 데이터
 */
function createInstitutionComponents(containerId, institutionSections) {
    let sectionContents = institutionSections
        .map((section) => createInstitutionSection(section))
        .join("")

    let container = document.getElementById(containerId)
    container.innerHTML = sectionContents
}

/**
 * 기관 그룹을 생성하는 함수
 * @param section 기관 그룹 데이터
 * @return {string}
 */
function createInstitutionSection(section) {
    let items = section.items
        .map((item) => createInstitutionCard(item))
        .join("")

    return `
        <section class="institutionTopLevel institutionGroup" data-group="${section.id}">
            ${customTitleWithContent(section.title, `
            <div class="institutionGrid">
                ${items}
            </div>
            `, "font-size: 2rem; text-align: center", false)}
        </section>
    `
}

/**
 * 기관 카드를 생성하는 함수
 * @param item 기관 데이터
 * @return {string}
 */
function createInstitutionCard(item) {
    let logo = item.logoPath
        ? `<img class="institutionLogoImage" src="${item.logoPath}" alt="${item.name} logo" loading="lazy" decoding="async"/>`
        : `<div class="institutionWordmark" aria-label="${item.name} logo">${item.shortName || item.name}</div>`

    let cardContent = `
        <div class="institutionLogoBox">
            ${logo}
        </div>
        <p class="institutionTag">${item.category}</p>
        <h4 class="institutionName">${item.name}</h4>
    `

    if (item.website) {
        return `
            <a class="institutionCard is-link" href="${item.website}" target="_blank" rel="noopener noreferrer">
                ${cardContent}
            </a>
        `
    }

    return `
        <div class="institutionCard">
            ${cardContent}
        </div>
    `
}

/**
 * notice를 생성하는 함수
 * @param containerId notice를 저장할 container(Tag)의 ID
 */
function createNotice(containerId) {
    let content = `
<div>
    <p class="lowMarginBottom" style="text-align: center">Contact <a href="mailto:ijang@hufs.ac.kr"
                                          style="font-weight: bold">ijang@hufs.ac.kr</a>
                                          for inquiries about graduate programs and undergraduate internship<br/>
대학원 및 학부인턴연구원 지망생은 <a href="mailto:ijang@hufs.ac.kr"
                                           style="font-weight: bold">ijang@hufs.ac.kr</a>로 문의주세요</p>
    <p class="lowMarginBottom" style="text-align: center">Graduate students receive full tuition support and living expenses<br/>
                               대학원(석/박사) 연구원은 등록금 전액과 인건비를 지원받습니다</p>
    <a href="./recruit.html" style="border-bottom: none">
        <button style="margin-top: 2rem">Apply</button>
    </a>
</div>
    `
    let components = customTitleWithContent("NOTICE", content, "font-size: 2rem", false)
    let container = document.getElementById(containerId)
    container.innerHTML = components
}

/**
 * 메인페이지 이미지 슬라이드 데이터 읽어오는 함수
 */
const loadCarouselJson = (jsonPath) => {
  fetch(jsonPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load JSON data");
      }
      return response.json();
    })
    .then((data) => {
      const carouselData = data["data"];
      populateColumns(carouselData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

/**
 * 좌우 컬럼에 슬라이드 데이터를 배치하는 함수
 */
const populateColumns = (carouselData) => {
  const leftColumn = document.getElementById("leftColumn");
  const rightColumn = document.getElementById("rightColumn");

  carouselData.left.forEach((carousel) => {
    const carouselElement = document.createElement("div");
    carouselElement.innerHTML = createCarousel(carousel);
    leftColumn.appendChild(carouselElement); 
  });

  carouselData.right.forEach((carousel) => {
    const carouselElement = document.createElement("div");
    carouselElement.innerHTML = createCarousel(carousel);
    rightColumn.appendChild(carouselElement); 
  });

  initializeDeferredCarouselImages();
};


/**
 * Carousel 생성 함수
 */
const carouselPlaceholderImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
const deferredCarouselQueue = [];
let isDeferredCarouselQueueScheduled = false;

const loadCarouselImage = (imageElement) => {
  if (!imageElement || !imageElement.dataset.src) {
    return;
  }

  imageElement.src = imageElement.dataset.src;
  imageElement.removeAttribute("data-src");
  imageElement.removeAttribute("data-queued");
};

const drainDeferredCarouselQueue = (idleDeadline) => {
  isDeferredCarouselQueueScheduled = false;

  let processedImageCount = 0;
  while (deferredCarouselQueue.length > 0) {
    const hasIdleTime =
      !idleDeadline || idleDeadline.timeRemaining() > 5 || processedImageCount === 0;
    if (!hasIdleTime || (!idleDeadline && processedImageCount >= 2)) {
      break;
    }

    const nextImage = deferredCarouselQueue.shift();
    if (!nextImage || !nextImage.dataset.src) {
      continue;
    }

    loadCarouselImage(nextImage);
    processedImageCount += 1;
  }

  if (deferredCarouselQueue.length > 0) {
    scheduleDeferredCarouselQueue();
  }
};

const scheduleDeferredCarouselQueue = () => {
  if (isDeferredCarouselQueueScheduled || deferredCarouselQueue.length === 0) {
    return;
  }

  isDeferredCarouselQueueScheduled = true;

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(drainDeferredCarouselQueue, { timeout: 1200 });
    return;
  }

  window.setTimeout(() => {
    drainDeferredCarouselQueue();
  }, 150);
};

const queueCarouselImage = (imageElement) => {
  if (!imageElement || !imageElement.dataset.src || imageElement.dataset.queued === "true") {
    return;
  }

  imageElement.dataset.queued = "true";
  deferredCarouselQueue.push(imageElement);
  scheduleDeferredCarouselQueue();
};

const queueRemainingCarouselImages = () => {
  document
    .querySelectorAll(".carousel-image[data-src]")
    .forEach((imageElement) => queueCarouselImage(imageElement));
};

const initializeDeferredCarouselImages = () => {
  if (document.readyState === "complete") {
    queueRemainingCarouselImages();
  } else {
    window.addEventListener("load", queueRemainingCarouselImages, { once: true });
  }

  if (!window.jQuery) {
    return;
  }

  window.jQuery(".carousel").on("slide.bs.carousel", function (event) {
    const relatedTarget = event.relatedTarget;
    if (!relatedTarget) {
      return;
    }

    loadCarouselImage(relatedTarget.querySelector(".carousel-image"));
  });
};

const createCarousel = (carousel) => {
    const imageObjects = [];
    carousel.groups.forEach(group => {
      group.images.forEach(src => {
        imageObjects.push({ src: src, link: group.link });
      });
    });
  
    const carouselInner = imageObjects
      .map((imageObj, index) => `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
            <a href="${imageObj.link}">
                <img
                    class="carousel-image"
                    src="${index === 0 ? imageObj.src : carouselPlaceholderImage}"
                    ${index === 0 ? "" : `data-src="${imageObj.src}"`}
                    alt="Image"
                    loading="${index === 0 ? "eager" : "lazy"}"
                    decoding="async"
                >
            </a>
        </div>
      `)
      .join("");
  
    return `
        <div id="${carousel.id}" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                ${carouselInner}
            </div>
        </div>
    `;
  };


// JSON 데이터 로드
loadCarouselJson("../Data/index.json");
