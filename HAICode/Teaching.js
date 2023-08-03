let teachingData = []
let teachingDataKey = []

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

let subTitles = {"1": "1st Semester", "2": "2st Semester", "3": "Summer Session", "4": "Winter Session"}

function loadTeachingJson(containerId, since = 2023) {
    readJson("../Teaching/teachingList.json", (json) => {
        teachingData = json['data']
        teachingDataKey = Object
            .keys(teachingData)
            .sort(convertStringToIntAndCompare)
        createComponents(containerId)
    })
}

function createComponents(containerId) {
    let components = ''
    teachingDataKey.forEach((titleKey) => {
        let content = ''
        Object
            .keys(subTitles)
            .sort(convertStringToIntAndCompare)
            .forEach((subTitleKey) => {
                let teachingList = teachingData[titleKey][subTitleKey]
                if (!isUndefined(teachingList)) {
                    content += subtitleWithList(subTitles[subTitleKey], teachingList, false)
                }
            })
        components += titleWithContent(titleKey, content, false)
    })
    let container = document.getElementById(containerId)
    container.innerHTML = components
}
