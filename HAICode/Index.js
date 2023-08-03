let newsData = []
let newsDataKey = []

function isUndefined(str) {
    return typeof str == "undefined" || str == null || str === "";
}

function convertStringToIntAndCompare(a, b) {
    let x = parseInt(a)
    let y = parseInt(b)
    if (x > y) return -1
    if (x === y) return 0
    if (x < y) return 1
}

function loadNewsJson(containerId) {
    readJson("../Data/news.json", (json) => {
        newsData = json['data']
        newsDataKey = Object
            .keys(newsData)
            .sort(convertStringToIntAndCompare)
        createNewsComponents(containerId)
    })
}

function createNewsComponents(containerId) {
    let content = ''

    newsDataKey.forEach((year) => {
        let listContents = ''
        Object
            .keys(newsData[year])
            .sort(convertStringToIntAndCompare)
            .forEach((month) => {
                let newsList = newsData[year][month]
                listContents += listWithDate(`${year}. ${month}`, newsList, false)
            })
        content += customTitleWithContent(year, listContents,"font-size: 1.5rem; text-align: left", false)
    })
    let components = customTitleWithContent("NEWS", content,"font-size: 2rem",false)
    let container = document.getElementById(containerId)
    container.innerHTML = components
}
