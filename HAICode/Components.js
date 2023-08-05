// function for Components
/**
 * json file을 불러오는 함수
 * - Use: Index.js, People.js
 * @param path 불러올 파일의 경로
 * @param callback json 파일을 불러온 뒤, 실행할 callback 함수
 * @return null
 */
function readJson(path, callback) {
    fetch(path)
        .then((response) => response.json())
        .then((json) => {
            callback(json)
        });
}

// Components

/**
 * 인자들을 header에 적용시켜 반환하는 함수
 * - Use: people.html, publication.html, research.html, teaching.html, recruit.html
 * @param title header의 title
 * @param write document write 여부
 * @return {*} 인자들이 적용된 header
 */
function header(title, write = true) {
    let components = `<header id="header">
        <a href="../index.html" class="logo">HAI LAB</a>
    </header>`
    return documentWrite(write, components)
}

/**
 * 인자들을 nav에 적용시켜 반환하는 함수
 * - Use: index.html, people.html, publication.html, research.html, teaching.html, recruit.html
 * - 0: home, 1: people, 2: publication, 3: research, 4: teaching, 5, recruit
 * @param idx 페이지 번호
 * @param write document write 여부
 * @return {*} 인자들이 적용된 nav
 */
function nav(idx, write = true) {
    let components = `
<nav id="nav">
    <ul class="links">
        <li class=${idx === 0 ? 'active' : ''}><a href="../index.html">Home</a></li>
        <li class=${idx === 1 ? 'active' : ''}><a href="../people.html">People</a></li>
        <li class=${idx === 2 ? 'active' : ''}><a href="../publication.html">Publication</a></li>
        <li class=${idx === 3 ? 'active' : ''}><a href="../research.html">Research</a></li> 
        <li class=${idx === 4 ? 'active' : ''}><a href="../teaching.html">Teaching</a></li>
        <li class=${idx === 5 ? 'active' : ''}><a href="../recruit.html">Recruit</a></li> 
    </ul>
    <ul class="icons">
        <li class="symbolLi">
            <a href="https://scholar.google.com/citations?user=1rBh9xkAAAAJ" class="icon brands symbol">
                <img class="symbolDefault symbolNormal" src="./images/GoogleScholarIcon/ic_gs.svg"  alt=""/>
                <img class="symbolDefault symbolMenu" src="./images/GoogleScholarIcon/ic_gs_menu.svg"  alt=""/>
                <img class="symbolHover" src="./images/GoogleScholarIcon/ic_gs_hover.svg" alt="">
            </a>
        </li>
        <li>
            <a href="https://github.com/labhai" class="icon brands fa-github">
            <span class="label">GitHub</span>
            </a>
        </li>
        <li class="symbolLi">
            <a href="https://soft.hufs.ac.kr" class="icon brands symbol">
                <img class="symbolDefault symbolNormal" src="./images/SWUnivIcon/ic_sw.svg"  alt=""/>
                <img class="symbolDefault symbolMenu" src="./images/SWUnivIcon/ic_sw_menu.svg"  alt=""/>
                <img class="symbolHover" src="./images/SWUnivIcon/ic_sw_hover.svg" alt="">
            </a>
        </li>
        <li class="symbolLi">
            <a href="https://www.hufs.ac.kr" class="icon brands symbol">
                <img class="symbolDefault symbolNormal" src="./images/HUFSIcon/ic_hufs.svg"  alt=""/>
                <img class="symbolDefault symbolMenu" src="./images/HUFSIcon/ic_hufs_menu.svg"  alt=""/>
                <img class="symbolHover" src="./images/HUFSIcon/ic_hufs_hover.svg" alt="">
            </a>
        </li>
    </ul>
</nav>`
    return documentWrite(write, components)
}

/**
 * 인자들을 미리 작성해준 형식에 적용시켜 반환하는 함수
 * - Use: Publication.js
 * @param title 제목
 * @param subTitle 부제목
 * @param description 설명
 * @param link 제목에 적용될 링크
 * @param write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function titleAndSubtitleWithDescription(title, subTitle, description, link, write = true) {
    let components = `<div>
        <h3 style="margin-bottom: 4px"><a href=${link}>${title}</a></h3>
        <p style="line-height: 20px; margin-bottom: 18px">
        ${subTitle}<br>
        ${description}
        </p>
        </div>
<hr style="margin-top: 18px"/>
`
    return documentWrite(write, components)
}

/**
 * 미리 작성해준 형식에 적용시켜 반환하는 함수
 * - Use: Teaching.js
 * @param {title} title           제목
 * @param {content} content 내용 (tag가 지정될 수 있음)
 * @param {write} write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function titleWithContent(title, content, write = true) {
    let components = `
    <h2>${title}</h2>
        ${content}
    <hr/>
`
    return documentWrite(write, components)
}

/**
 * 미리 작성해준 형식에 title의 style을 지정하여 적용시켜 반환하는 함수
 * - Use: Index.js, People.js
 * @param title           제목
 * @param content title에 적용할 style
 * @param style           제목
 * @param write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function customTitleWithContent(title, content, style, write = true) {
    let components = `
    <h2 style="${style}">${title}</h2>
        ${content}
`
    return documentWrite(write, components)
}

/**
 * subTitle에 list를 미리 작성해준 형식에 적용시켜 반환하는 함수
 * - Use: Teaching.js
 * @param subTitle 부제목
 * @param list 데이터들의 목록
 * @param write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function subtitleWithList(subTitle, list, write = true) {
    let listsComponents = list.reduce((partialResult, value) => {
        return `${partialResult}
        <li>${value}</li>`
    }, '')

    let components = `
    <h3 style="margin-bottom: 0.2rem">${subTitle}</h3>
    <ul>
          ${listsComponents} 
    </ul>
`
    return documentWrite(write, components)
}

/**
 * 날짜와 데이터를 미리 작성해준 형식에 적용시켜 반환하는 함수
 * - Use: Index.js
 * @param dateString 날짜(문자열)
 * @param list 데이터들의 목록
 * @param write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function listWithDate(dateString, list, write = true) {
    let listsComponents = list.reduce((partialResult, value) => {
        return `${partialResult}
        <li style="text-align: left">${dateString}    ${value}</li>`
    }, '')

    let components = `
    <ul style="margin-bottom: 14px">
          ${listsComponents} 
    </ul>
`
    return documentWrite(write, components)
}

/**
 * footer을 반환하는 함수
 * - Use: index.html, people.html, publication.html, research.html, teaching.html
 * @param write document write 여부
 * @return {*} 미리 지정해 둔 footer 문자열
 */
function footer(write = true) {
    let components = `
<footer id="footer">
        <section id="applySection">

            <p class="lowMarginBottom">Contact <a href="mailto:ijang@hufs.ac.kr"
                                                      style="font-weight: bold">ijang@hufs.ac.kr</a>
                for inquiries
                about graduate program and undergraduate internship<br/>
                (대학원 지망생 및 학부인턴연구원에 관심 있는 학생은 <a href="mailto:ijang@hufs.ac.kr"
                                                 style="font-weight: bold">ijang@hufs.ac.kr</a>로
                문의주세요.)</p>
            <p class="lowMarginBottom">Masters and PhD students receive full tuition support and living expenses
                <br/>(석사과정, 박사과정, 석박통합과정 연구원은
                등록금 전액과
                생활비를 지원받습니다.)</p>
            <a class="horizontalCenter" href="./apply.html" style="border-bottom: none">
                <button>Apply</button>
            </a>
        </section>
        <section class="split contact">
            <section class="alt">
                <h3>Address</h3>
                <p>505, Engineering Building<br/>
                    81, Oedae-ro, Mohyeon-eup, Cheoin-gu, Yongin-si, Gyeonggi-do, Republic of Korea</p>
            </section>
            <section>
                <h3>Email</h3>
                <p><a href="mailto:ijang@hufs.ac.kr" style="border-bottom: none">ijang@hufs.ac.kr</a></p>
            </section>
            <section>
                <h3>Sites</h3>
                <ul class="icons alt">
                    <li><a href="https://scholar.google.com/citations?user=1rBh9xkAAAAJ"
                           class="icon brands symbol symbolSite">
                        <img class="symbolDefault symbolDefault" src="images/GoogleScholarIcon/ic_gs_site.svg"
                             alt=""/>
                        <img class="symbolHover" src="images/GoogleScholarIcon/ic_gs_hover.svg" alt="">
                    </a></li>

                    <li><a href="https://github.com/labhai" class="icon brands alt fa-github"><span
                        class="label">GitHub</span></a></li>

                    <li><a href="https://soft.hufs.ac.kr" class="icon brands symbol symbolSite">
                        <img class="symbolDefault symbolDefault" src="images/SWUnivIcon/ic_sw_site.svg" alt=""/>
                        <img class="symbolHover" src="images/SWUnivIcon/ic_sw_hover.svg" alt="">
                    </a></li>

                    <li><a href="https://www.hufs.ac.kr" class="icon brands symbol symbolSite">
                        <img class="symbolDefault symbolDefault" src="images/HUFSIcon/ic_hufs_site.svg" alt=""/>
                        <img class="symbolHover" src="images/HUFSIcon/ic_hufs_hover.svg" alt="">
                    </a></li>
                </ul>
            </section>
        </section>
    </footer>
    <footer id="footerImage" class="verticalBorder">
        <a href="https://soft.hufs.ac.kr" style="border-bottom: none; width: 100%; padding: 1rem">
            <img class="horizontalCenter" style="width: 20%" src="./images/sw-removebg.png" alt=""/>
        </a>
    </footer>`
    return documentWrite(write, components)
}

/**
 * copyright를 반환하는 함수
 * - Use: index.html, people.html, publication.html, research.html, teaching.html, recruit.html
 * @param write document write 여부
 * @return {*} 미리 지정해 둔 copyright 문자열
 */
function copyright(write = true) {
    let components = `<div id="copyright">
        <ul>
            <li>Copyright 2023. HAI Lab. All Rights Reserved.</li>
            <li>HUFS: <a href="https://github.com/labhai">Lab HAI</a></li>
        </ul>
    </div>`
    return documentWrite(write, components)
}

/**
 * 제목, 설명 및 이미지를 미리 작성해준 형식에 적용시켜 반환하는 함수
 * @param title 제목
 * @param description 설명
 * @param imagePath 이미지 경로
 * @param write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function titleAndDescriptionWithImage(title, description, imagePath, write = true) {
    let components = `<header class="major" style="margin-top: 10rem">
    <h2 style="font-size: 2.5rem">${title}</h2>
    <div class="image main" style="margin: 0 0 2rem 0"><img class="horizontalCenter" style="margin: 0; width: 80%" src="${imagePath}" alt=""/></div>
    <p>${description}</p>
</header>`
    return documentWrite(write, components)
}

/**
 * 프로필 정보와 이미지를 미리 작성해준 형식에 적용시켜 반환하는 함수
 * - Use: People.js
 * @param name 이름
 * @param affiliation 소속
 * @param contact 연락처
 * @param github 깃허브
 * @param etc 기타 정보
 * @param profileImagePath 프로필 이미지 경로
 * @param isLeftImage 이미지가 왼쪽에 위치할지 여부
 * @param write document write 여부
 * @return {*} 인자들이 적용된 Tag 문자열
 */
function profileWithImage(name, affiliation, contact, github, etc, profileImagePath, isLeftImage = true, write = true) {
    let direction = isLeftImage ? "left" : "right"
    let githubLink = github !== "" ?
        `<a href=${github} style="margin-left: 4px" class="icon brands fa-github">
            <span class="label">GitHub</span>
        </a>` : ''
    let components = `
<div class="profileImageBox ${direction}">
    <div>
        <img class="profileImage" src="${profileImagePath}" alt=""/>
    </div>
    <div>
        <h3 class="profileName">${name} ${githubLink}</h3>
        <p class="profileAffiliation">${affiliation}</p>
        <p class="profileContact">${contact}</p>
        <p class="profileContact">${etc}</p>
    </div>
</div>`
    return documentWrite(write, components)
}

/**
 * document write의 여부를 받아 write 해주는 함수
 * - Use: Components.js
 * @param write document write 여부
 * @param components write 할 문자열
 * @return {*} 입력 받은 components
 */
function documentWrite(write, components) {
    if (write) {
        document.write(components)
    }
    return components
}

/**
 * 필요한 스크립트를 추가해주는 함수
 * - Use: index.html, people.html, publication.html, research.html, teaching.html, recruit.html
 */
function append_script() {
    document.write(`
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/jquery.scrollex.min.js"></script>
<script src="assets/js/jquery.scrolly.min.js"></script>
<script src="assets/js/browser.min.js"></script>
<script src="assets/js/breakpoints.min.js"></script>
<script src="assets/js/util.js"></script>
<script src="assets/js/main.js"></script>
    `)
}