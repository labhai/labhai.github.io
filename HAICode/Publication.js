let pageContentCount = 10

let pagination = 0
let publicationData = []

function loadPublicationsJson(jsonFilePath, containerId) {
    jsonFilePath = jsonFilePath[1] !== '.' ? '.' + jsonFilePath : jsonFilePath
    readJson(jsonFilePath, (json) => {
        publicationData = json['data']
        moreButtonAction(NaN, containerId)
    })
}


function moreButtonAction(button, containerId) {
    let components = ""
    console.log(pagination * pageContentCount)
    console.log(Math.min(publicationData.length, (pagination + 1) * pageContentCount))
    publicationData
        .slice(pagination * pageContentCount,
            Math.min(publicationData.length, (pagination + 1) * pageContentCount))
        .forEach((data) => {
            components += headingWithSubtitle(data[0], data[1], data[2], data[3], false)
            console.log(data)
        })
    let container = document.getElementById(containerId)
    container.innerHTML += components
    if (publicationData.length < (pagination + 1) * pageContentCount){
        button.disabled = true
    }
    pagination += 1
}