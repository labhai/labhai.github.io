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

let subTitles = {"1": "1st Semester", "2": "2nd Semester", "3": "Summer Session", "4": "Winter Session"}

function loadTeachingJson(containerId) {
    readJson("../Data/teaching.json", (json) => {
        teachingData = json['data']
        teachingDataKey = Object
            .keys(teachingData)
            .sort(convertStringToIntAndCompare)
        createTeachingComponents(containerId)
    })
}

function createTeachingComponents(containerId) {
    let components = ''
    teachingDataKey.forEach((year) => {
        let content = ''
        Object
            .keys(subTitles)
            .sort(convertStringToIntAndCompare)
            .forEach((semesterNumber) => {
                let teachingList = teachingData[year][semesterNumber]
                if (!isUndefined(teachingList)) {
                    content += subtitleWithList(subTitles[semesterNumber], teachingList, false)
                }
            })
        components += titleWithContent(year, content, false)
    })
    let container = document.getElementById(containerId)
    container.innerHTML = components
}
