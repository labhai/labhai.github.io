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
function loadResearchJson(containerId) {
    readJson("../Data/research.json", (json) => {
        projects = json["data"].projects;
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
    
    projects.forEach((project) => {
        let imagePath = project["imagePath"];
        let projectName = project["projectName"];
        let description = project["description"];
        let projectRepository = project["projectRepository"];
        let relatedPublications = project["relatedPublications"];
        contents += researchWithImage(
            imagePath,
            projectName,
            description,
            projectRepository,
            relatedPublications,
            isLeftImage,
            false
        );
        isLeftImage = !isLeftImage;
    });

    let container = document.getElementById(containerId);
    container.innerHTML = contents;
}
