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
const ACTIVITY_CAROUSEL_JSON_PATH = "../Data/activity.json";
const CAROUSEL_INTERVAL_MS = 5600;
const CAROUSEL_THEME_IDS = {
  people: "slides_people",
  etc: "slides_etc",
  conferences: "slides_conferences",
  lab: "slides_lab",
};

const readCarouselJson = (jsonPath) => {
  return fetch(jsonPath).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load JSON data: ${jsonPath}`);
    }

    return response.json();
  });
};

const runWhenDomReady = (callback) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }

  callback();
};

const loadCarouselJson = (jsonPath, activityJsonPath = ACTIVITY_CAROUSEL_JSON_PATH) => {
  Promise.all([
    readCarouselJson(jsonPath),
    readCarouselJson(activityJsonPath).catch((error) => {
      console.warn("Activity carousel images are unavailable.", error);
      return { data: [] };
    }),
  ])
    .then(([carouselJson, activityJson]) => {
      const carouselData = createActivityCarouselData(
        carouselJson["data"],
        activityJson["data"]
      );
      runWhenDomReady(() => populateColumns(carouselData));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const normalizeCarouselPath = (path) => {
  const value = String(path || "").trim();
  if (!value || /^(https?:)?\/\//i.test(value) || value.startsWith("data:")) {
    return value;
  }

  return value.replace(/^\.?\//, "");
};

const normalizeCarouselText = (value) => {
  const text = String(value || "");
  return typeof text.normalize === "function" ? text.normalize("NFC") : text;
};

const normalizeCarouselKey = (path) => {
  return normalizeCarouselText(normalizeCarouselPath(path)).toLowerCase();
};

const hasAnyTerm = (source, terms) => {
  return terms.some((term) => source.includes(term));
};

const getCarouselThemeId = (theme) => {
  if (!theme && theme !== 0) {
    return null;
  }

  const value = String(theme).trim();
  const normalizedValue = value.toLowerCase();

  if (CAROUSEL_THEME_IDS[normalizedValue]) {
    return CAROUSEL_THEME_IDS[normalizedValue];
  }

  return Object
    .values(CAROUSEL_THEME_IDS)
    .includes(value)
    ? value
    : null;
};

const getActivityCarouselOverride = (activity) => {
  return getCarouselThemeId(activity.homeCarousel || activity.carouselTheme || activity.carousel);
};

const getActivityImages = (activity) => {
  const imageCandidates = [
    activity.image,
    ...(Array.isArray(activity.images) ? activity.images : []),
  ];
  const seenImages = new Set();

  return imageCandidates
    .map(normalizeCarouselPath)
    .filter((imagePath) => {
      if (!imagePath) {
        return false;
      }

      const imageKey = normalizeCarouselKey(imagePath);
      if (seenImages.has(imageKey)) {
        return false;
      }

      seenImages.add(imageKey);
      return true;
    });
};

const getActivityImageCarouselId = (activity, imagePath) => {
  const overrideCarouselId = getActivityCarouselOverride(activity);
  if (overrideCarouselId) {
    return overrideCarouselId;
  }

  const activitySource = normalizeCarouselText([
    activity.id,
    activity.title,
    imagePath,
  ].join(" ")).toLowerCase();
  const fullSource = normalizeCarouselText([
    activity.id,
    activity.title,
    activity.description,
    imagePath,
  ].join(" ")).toLowerCase();
  const imageSource = normalizeCarouselText(imagePath).toLowerCase();

  const labTerms = [
    "/lab/연구실/",
    "/lab/서버/",
    "lab/연구실/",
    "lab/서버/",
    "3d프린터",
    "server",
  ];
  const socialTerms = [
    "dinner",
    "meal",
    "cake",
    "teacher",
    "teachers_day",
    "everland",
    "bbq",
    "pizza",
    "yacht",
    "회식",
    "스승",
    "에버랜드",
    "바베큐",
    "피자",
    "요트",
  ];
  const conferenceTerms = [
    "kccv",
    "icmri",
    "iccv",
    "cikm",
    "neurips",
    "icpr",
    "conference",
    "congress",
    "poster",
    "oral",
    "presentation",
    "session",
    "학회",
    "컨퍼런스",
  ];
  const etcTerms = [
    "/lab/기타/",
    "lab/기타/",
    "competition",
    "challenge",
    "award",
    "prize",
    "상장",
    "수상",
    "우수",
    "대회",
    "챌린지",
    "그랜드챌린지",
  ];

  if (hasAnyTerm(imageSource, labTerms)) {
    return CAROUSEL_THEME_IDS.lab;
  }

  if (hasAnyTerm(imageSource, ["/lab/기타/", "lab/기타/"])) {
    return CAROUSEL_THEME_IDS.etc;
  }

  if (hasAnyTerm(imageSource, socialTerms) || hasAnyTerm(activitySource, socialTerms)) {
    return CAROUSEL_THEME_IDS.people;
  }

  if (hasAnyTerm(fullSource, conferenceTerms)) {
    return CAROUSEL_THEME_IDS.conferences;
  }

  if (hasAnyTerm(fullSource, etcTerms)) {
    return CAROUSEL_THEME_IDS.etc;
  }

  return CAROUSEL_THEME_IDS.people;
};

const createActivityCarouselGroups = (activityData) => {
  const groupsByCarouselId = Object
    .values(CAROUSEL_THEME_IDS)
    .reduce((groups, carouselId) => {
      groups[carouselId] = [];
      return groups;
    }, {});

  if (!Array.isArray(activityData)) {
    return groupsByCarouselId;
  }

  activityData
    .filter((activity) => activity && activity.showOnHome !== false)
    .slice()
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .forEach((activity) => {
      const imagesByCarouselId = {};

      getActivityImages(activity).forEach((imagePath) => {
        const carouselId = getActivityImageCarouselId(activity, imagePath);
        imagesByCarouselId[carouselId] = imagesByCarouselId[carouselId] || [];
        imagesByCarouselId[carouselId].push(imagePath);
      });

      Object.keys(imagesByCarouselId).forEach((carouselId) => {
        groupsByCarouselId[carouselId].push({
          link: `activity.html?id=${encodeURIComponent(activity.id)}`,
          alt: activity.title || "LAB HAI activity",
          images: imagesByCarouselId[carouselId],
        });
      });
    });

  return groupsByCarouselId;
};

const mergeCarouselGroups = (activityGroups, fallbackGroups) => {
  const seenImages = new Set();
  const mergedGroups = [];
  const addGroup = (group) => {
    const uniqueImages = (Array.isArray(group.images) ? group.images : [])
      .map(normalizeCarouselPath)
      .filter((imagePath) => {
        if (!imagePath) {
          return false;
        }

        const imageKey = normalizeCarouselKey(imagePath);
        if (seenImages.has(imageKey)) {
          return false;
        }

        seenImages.add(imageKey);
        return true;
      });

    if (uniqueImages.length === 0) {
      return;
    }

    mergedGroups.push({
      link: group.link || "#",
      alt: group.alt || "LAB HAI activity",
      images: uniqueImages,
    });
  };

  activityGroups.forEach(addGroup);
  fallbackGroups.forEach(addGroup);

  return mergedGroups;
};

const createActivityCarouselData = (carouselData, activityData) => {
  const sourceCarouselData = carouselData || {};
  const activityGroupsByCarouselId = createActivityCarouselGroups(activityData);
  const mergeColumn = (column = []) => {
    return column
      .map((carousel) => {
        const activityGroups = activityGroupsByCarouselId[carousel.id] || [];
        const fallbackGroups = Array.isArray(carousel.groups) ? carousel.groups : [];

        return {
          ...carousel,
          groups: mergeCarouselGroups(activityGroups, fallbackGroups),
        };
      })
      .filter((carousel) => carousel.groups.length > 0);
  };

  return {
    left: mergeColumn(sourceCarouselData.left),
    right: mergeColumn(sourceCarouselData.right),
  };
};

/**
 * 좌우 컬럼에 슬라이드 데이터를 배치하는 함수
 */
const populateColumns = (carouselData) => {
  const leftColumn = document.getElementById("leftColumn");
  const rightColumn = document.getElementById("rightColumn");

  if (!leftColumn || !rightColumn || !carouselData) {
    return;
  }

  leftColumn.innerHTML = "";
  rightColumn.innerHTML = "";

  (carouselData.left || []).forEach((carousel) => {
    const carouselElement = document.createElement("div");
    carouselElement.innerHTML = createCarousel(carousel);
    if (carouselElement.firstElementChild) {
      leftColumn.appendChild(carouselElement.firstElementChild);
    }
  });

  (carouselData.right || []).forEach((carousel) => {
    const carouselElement = document.createElement("div");
    carouselElement.innerHTML = createCarousel(carousel);
    if (carouselElement.firstElementChild) {
      rightColumn.appendChild(carouselElement.firstElementChild);
    }
  });

  initializeDeferredCarouselImages();
};


/**
 * Carousel 생성 함수
 */
const carouselPlaceholderImage =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
const deferredCarouselQueue = [];
const nativeCarouselTimers = new WeakMap();
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

const queueCarouselImages = (carouselElement, imageLimit = 2) => {
  const imageElements = Array.from(
    carouselElement.querySelectorAll(".carousel-image[data-src]")
  );
  const limitedImageElements = Number.isFinite(imageLimit)
    ? imageElements.slice(0, imageLimit)
    : imageElements;

  limitedImageElements.forEach((imageElement) => queueCarouselImage(imageElement));
};

const getCarouselItems = (carouselElement) => {
  return Array.from(carouselElement.querySelectorAll(".carousel-item"));
};

const getActiveCarouselIndex = (carouselItems) => {
  const activeIndex = carouselItems.findIndex((item) => item.classList.contains("active"));
  return activeIndex >= 0 ? activeIndex : 0;
};

const showCarouselItem = (carouselElement, nextIndex) => {
  if (carouselElement.dataset.carouselSliding === "true") {
    return;
  }

  const carouselItems = getCarouselItems(carouselElement);
  if (carouselItems.length < 2) {
    return;
  }

  const currentIndex = getActiveCarouselIndex(carouselItems);
  const normalizedNextIndex = ((nextIndex % carouselItems.length) + carouselItems.length) % carouselItems.length;

  if (currentIndex === normalizedNextIndex) {
    return;
  }

  const nextItem = carouselItems[normalizedNextIndex];
  const activeItem = carouselItems[currentIndex];
  loadCarouselImage(nextItem.querySelector(".carousel-image"));
  carouselElement.dataset.carouselSliding = "true";
  nextItem.classList.add("carousel-item-next");

  // Force the browser to apply the starting translateX state before animating.
  nextItem.offsetHeight;

  activeItem.classList.add("carousel-item-left");
  nextItem.classList.add("carousel-item-left");

  let isSlideFinished = false;
  const finishSlide = () => {
    if (isSlideFinished) {
      return;
    }

    isSlideFinished = true;
    activeItem.classList.remove("active", "carousel-item-left");
    nextItem.classList.remove("carousel-item-next", "carousel-item-left");
    nextItem.classList.add("active");
    carouselElement.dataset.carouselSliding = "false";
    queueCarouselImages(carouselElement, 2);
  };

  const transitionDuration = 720;
  let fallbackTimerId = window.setTimeout(finishSlide, transitionDuration);
  nextItem.addEventListener("transitionend", (event) => {
    if (event.target !== nextItem) {
      return;
    }

    window.clearTimeout(fallbackTimerId);
    finishSlide();
  }, { once: true });
};

const showNextCarouselItem = (carouselElement) => {
  const carouselItems = getCarouselItems(carouselElement);
  if (carouselItems.length < 2) {
    return;
  }

  showCarouselItem(carouselElement, getActiveCarouselIndex(carouselItems) + 1);
};

const startNativeCarouselCycle = (carouselElement) => {
  if (nativeCarouselTimers.has(carouselElement)) {
    return;
  }

  const interval = Number(carouselElement.dataset.interval) || CAROUSEL_INTERVAL_MS;
  const timerId = window.setInterval(() => {
    if (!document.body.contains(carouselElement)) {
      window.clearInterval(timerId);
      nativeCarouselTimers.delete(carouselElement);
      return;
    }

    showNextCarouselItem(carouselElement);
  }, interval);

  nativeCarouselTimers.set(carouselElement, timerId);
};

const startCarouselCycle = (carouselElement) => {
  if (
    !carouselElement ||
    carouselElement.dataset.carouselStarted === "true"
  ) {
    return;
  }

  carouselElement.dataset.carouselStarted = "true";

  if (window.jQuery && window.jQuery.fn && window.jQuery.fn.carousel) {
    window
      .jQuery(carouselElement)
      .carousel({
        interval: Number(carouselElement.dataset.interval) || CAROUSEL_INTERVAL_MS,
        pause: false,
      })
      .carousel("cycle");
    return;
  }

  startNativeCarouselCycle(carouselElement);
};

const initializeDeferredCarouselImages = () => {
  const carouselElements = Array.from(document.querySelectorAll(".hai-carousel"));

  if (carouselElements.length === 0) {
    return;
  }

  if (window.jQuery) {
    carouselElements.forEach((carouselElement) => {
      if (carouselElement.dataset.deferredBound === "true") {
        return;
      }

      carouselElement.dataset.deferredBound = "true";
      window.jQuery(carouselElement).on("slide.bs.carousel", function (event) {
        const relatedTarget = event.relatedTarget;
        if (!relatedTarget) {
          return;
        }

        loadCarouselImage(relatedTarget.querySelector(".carousel-image"));
        queueCarouselImages(carouselElement, 2);
      });
    });
  }

  const activateCarousel = (carouselElement) => {
    if (!carouselElement || carouselElement.dataset.carouselActivated === "true") {
      return;
    }

    carouselElement.dataset.carouselActivated = "true";
    queueCarouselImages(carouselElement, 2);
    startCarouselCycle(carouselElement);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        activateCarousel(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "360px 0px" });

    carouselElements.forEach((carouselElement) => observer.observe(carouselElement));
    return;
  }

  const activateAllCarousels = () => {
    carouselElements.forEach(activateCarousel);
  };

  if (document.readyState === "complete") {
    activateAllCarousels();
  } else {
    window.addEventListener("load", activateAllCarousels, { once: true });
  }
};

const escapeCarouselAttribute = (value) => {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

const getCarouselImageObjects = (carousel) => {
  const seenImages = new Set();
  const imageObjects = [];

  carousel.groups.forEach((group) => {
    group.images.forEach((src) => {
      const normalizedSrc = normalizeCarouselPath(src);
      const imageKey = normalizeCarouselKey(normalizedSrc);

      if (!normalizedSrc || seenImages.has(imageKey)) {
        return;
      }

      seenImages.add(imageKey);
      imageObjects.push({
        src: normalizedSrc,
        link: group.link || "#",
        alt: group.alt || "LAB HAI activity",
      });
    });
  });

  return imageObjects;
};

const createCarousel = (carousel) => {
    const imageObjects = getCarouselImageObjects(carousel);

    if (imageObjects.length === 0) {
      return "";
    }
  
    const carouselInner = imageObjects
      .map((imageObj, index) => {
        const shapeClass = `carousel-item-shape-${(index % 4) + 1}`;
        const imageSrc = escapeCarouselAttribute(imageObj.src);
        const imageLink = escapeCarouselAttribute(imageObj.link);
        const imageAlt = escapeCarouselAttribute(imageObj.alt);

        return `
        <div class="carousel-item ${index === 0 ? "active" : ""} ${shapeClass}">
            <a class="carousel-card" href="${imageLink}">
                <span class="carousel-card-media">
                    <img
                        class="carousel-image"
                        src="${index === 0 ? imageSrc : carouselPlaceholderImage}"
                        ${index === 0 ? "" : `data-src="${imageSrc}"`}
                        alt="${imageAlt}"
                        loading="lazy"
                        decoding="async"
                        fetchpriority="low"
                    >
                </span>
            </a>
        </div>
      `;
      })
      .join("");
  
    return `
        <div id="${escapeCarouselAttribute(carousel.id)}" class="carousel slide hai-carousel" data-interval="${CAROUSEL_INTERVAL_MS}">
            <div class="carousel-inner">
                ${carouselInner}
            </div>
        </div>
    `;
  };


// JSON 데이터 로드
loadCarouselJson("../Data/index.json");
