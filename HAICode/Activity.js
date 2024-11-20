let teachingData = []
let teachingDataKey = []

/**
 * undefined인지 확인하는 함수
 * @param str 검사할 문자열
 * @return {boolean} undefined인 경우 true, 아니면 false
 */
function isUndefined(str) {
    return typeof str == "undefined" || str == null || str === "";
}

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

let subTitles = {"1": "1st Semester", "2": "2nd Semester", "3": "Summer Session", "4": "Winter Session"}

/**
 * teaching.json 파일을 불러오고 teachingComponents를 생성하는 함수
 * createTeachingComponents 호출
 * @param containerId 해당 결과를 저장할 container(Tag)의 ID
 */
function loadTeachingJson(containerId) {
    readJson("../Data/teaching.json", (json) => {
        teachingData = json['data']
        teachingDataKey = Object
            .keys(teachingData)
            .sort(convertStringToIntAndCompare)
        createTeachingComponents(containerId)
    })
}

/**
 * 형식에 맞추어 데이터를 저장해주는 함수
 * @param containerId 해당 결과를 저장할 container(Tag)의 ID
 */
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
