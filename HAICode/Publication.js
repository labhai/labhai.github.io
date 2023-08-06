let pageContentCount = 10

let pagination = 0
let publicationData = []

/**
 * publication.json 파일을 불러오고 publication을 생성하는 함수
 * moreButtonAction 호출
 * @param containerId 해당 결과를 저장할 container(Tag)의 ID
 */
function loadPublicationsJson(containerId) {
    readJson("../Data/publication.json", (json) => {
        publicationData = json['data']
        moreButtonAction(null, containerId)
    })
}

/**
 * more 버튼을 눌렀을 때에 페이지에 보여주는 데이터를 추가하는 함수
 * @param button 해당 함수를 호출한 버튼
 * @param containerId 해당 결과를 저장할 container(Tag)의 ID
 */
function moreButtonAction(button, containerId) {
    let components = ""
    console.log(pagination * pageContentCount, Math.min(publicationData.length, (pagination + 1) * pageContentCount))
    publicationData
        .slice(pagination * pageContentCount,
            Math.min(publicationData.length, (pagination + 1) * pageContentCount))
        .forEach((data) => {
            components += titleAndSubtitleWithDescription(data[0], data[1], data[2], data[3], false)
        })
    let container = document.getElementById(containerId)
    container.innerHTML += components
    if (publicationData.length < (pagination + 1) * pageContentCount){
        button.disabled = true
    }
    pagination += 1
}