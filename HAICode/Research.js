let projects = [];

/**
 * undefined인지 확인하는 함수
 * @param str 검사할 문자열
 * @return {boolean} undefined인 경우 true, 아니면 false
 */
function isUndefined(str) {
    return typeof str == "undefined" || str == null || str === "";
}

/**
 * research.json 파일을 불러오고 researchComponents를 생성하는 함수
 * createResearchComponents 호출
 * @param containerId 해당 결과를 저장할 container(Tag)의 ID
 */
function loadPeopleJson(containerId) {
    readJson("../Data/research.json", (json) => {
        peopleData = json["data"];
        createResearchComponents(containerId);
    });
}

/**
 * 형식에 맞추어 데이터를 저장해주는 함수
 * @param containerId 해당 결과를 저장할 container(Tag)의 ID
 */
function createResearchComponents(containerId) {
    let components = "";
    let isLeftImage = true;
    let contents = "";
    Object.keys(peopleData).forEach((person) => {
        contents = "";
        peopleData[person].forEach((profile) => {
            let name = profile["name"];
            let degree = profile["degree"];
            let major = profile["major"];
            let affiliation = "";
            let keyword = profile["keyword"];
            let imagePath = profile["imagePath"];
            let email = profile["email"];
            let link = profile["link"];
            let office = "";
            let laboratory = "";
            let cv = "";
            // Professor
            if (person === "Professor") {
                affiliation = profile["affiliation"];
                office = profile["office"];
                laboratory = profile["laboratory"];
                cv = profile["cv"];
            }
            contents += profileWithImage(
                name,
                affiliation,
                degree,
                major,
                keyword,
                email,
                imagePath,
                link,
                office,
                laboratory,
                cv,
                isLeftImage,
                false
            );
            isLeftImage = !isLeftImage;
        });
        components += customTitleWithContent(
            person,
            contents,
            "padding-top: 4rem; border-bottom: solid 2px #e2e2e2",
            false
        );
    });

    if (!isUndefined(peopleData["haiIntroduction"])) {
        components += titleAndDescriptionWithImage(
            peopleData["title"],
            peopleData["haiIntroduction"],
            peopleData["groupImagePath"],
            false
        );
    }

    let container = document.getElementById(containerId);
    container.innerHTML = components;
}
