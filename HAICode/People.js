let peopleData = []
let peopleDataKey = []
let peopleKeys = ["Professor", "Researchers"]

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
            let affiliation = profile["affiliation"]
            let contact = profile["contact"]
            let imagePath = profile["imagePath"]
            let github = profile["github"]
            let etc = profile["etc"]
            contents += profileWithImage(name, affiliation, contact, github, etc,  imagePath, isLeftImage, false)
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
