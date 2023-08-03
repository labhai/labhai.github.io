let pageContentCount = 10

let pagination = 0
let publicationData = []

function loadPublicationsJson(jsonFilePath, containerId) {
    readJson("../Publication/result.json", (json) => {
        publicationData = json['data']
        moreButtonAction(NaN, containerId)
    })
}


function moreButtonAction(button, containerId) {
    let components = ""
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