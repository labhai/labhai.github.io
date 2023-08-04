let peopleData = []
let peopleDataKey = []
let peopleKeys = ["Professor", "Graduate researchers", "Undergraduate researchers"]

function isUndefined(str) {
    return typeof str == "undefined" || str == null || str === "";
}

function loadPeopleJson(containerId) {
    readJson("../Data/people.json", (json) => {
        peopleData = json['data']
        createPeopleComponents(containerId)
    })
}

function createPeopleComponents(containerId) {
    let components = ''
    let isLeftImage = true
    peopleKeys.forEach((title) => {
        let contents = ""
        peopleData[title].forEach((profile) => {
            let name = profile["name"]
            let major = profile["major"]
            let intro = profile["intro"]
            let imagePath = profile["imagePath"]
            contents += profileWithImage(name, major, intro, imagePath, isLeftImage, false)
            isLeftImage = !isLeftImage
        })
        components += customTitleWithContent(title, contents, "padding-top: 4rem; border-bottom: solid 2px #e2e2e2", false)
    })
    if (!isUndefined(peopleData["haiIntroduction"])) {
        components += titleAndDescriptionWithImage(peopleData["title"], peopleData["haiIntroduction"], peopleData["groupImagePath"], false)
    }
    let container = document.getElementById(containerId)
    container.innerHTML = components
}
