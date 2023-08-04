// function for Components
function readJson(path, callback) {
    fetch(path)
        .then((response) => response.json())
        .then((json) => {
            callback(json)
        });
}

// Components
function header(title, write = true) {
    let components = `<header id="header">
        <a href="../index.html" class="logo">HAI LAB</a>
    </header>`
    return documentWrite(write, components)
}

function nav(idx, write = true) {
    let components = `
<nav id="nav">
    <ul class="links">
        <li class=${idx === 0 ? 'active' : ''}><a href="../index.html">Home</a></li>
        <li class=${idx === 1 ? 'active' : ''}><a href="../people.html">People</a></li>
        <li class=${idx === 2 ? 'active' : ''}><a href="../publication.html">Publication</a></li>
        <li class=${idx === 3 ? 'active' : ''}><a href="../research.html">Research</a></li>
        <li class=${idx === 4 ? 'active' : ''}><a href="../teaching.html">Teaching</a></li>
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

function titleWithContent(title, content, write = true) {
    let components = `
    <h2>${title}</h2>
        ${content}
    <hr/>
`
    return documentWrite(write, components)
}

function customTitleWithContent(title, content, style, write = true) {
    let components = `
    <h2 style="${style}">${title}</h2>
        ${content}
`
    return documentWrite(write, components)
}

function subTitleWithContent(subTitle, content, write = true) {
    let components = `
    <h3>${subTitle}</h3>
        ${content}
`
    return documentWrite(write, components)
}

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
            <a class="horizontalCenter" style="border-bottom: none">
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


function copyright(write = true) {
    let components = `<div id="copyright">
        <ul>
            <li>Copyright 2023. HAI Lab. All Rights Reserved.</li>
            <li>HUFS: <a href="https://github.com/labhai">Lab HAI</a></li>
        </ul>
    </div>`
    return documentWrite(write, components)
}


function titleAndDescriptionWithImage(title, description, imagePath, write = true) {
    let components = `<header class="major" style="margin-top: 10rem">
    <h2 style="font-size: 2.5rem">${title}</h2>
    <div class="image main" style="margin: 0 0 2rem 0"><img class="horizontalCenter" style="margin: 0; width: 80%" src="${imagePath}" alt=""/></div>
    <p>${description}</p>
</header>`
    return documentWrite(write, components)
}

function profileWithImage(name, major, intro, profileImagePath, isLeftImage = true, write = true) {
    let direction = isLeftImage ? "left" : "right"
    let components = `
<div class="profileImageBox ${direction}">
    <div>
        <img class="profileImage" src="${profileImagePath}" alt=""/>
    </div>
    <div>
        <h3 class="profileName">${name}</h3>
        <p class="profileMajor">${major}</p>
        <p class="profileIntro">${intro}</p>
    </div>
</div>`
    return documentWrite(write, components)
}

function documentWrite(write, components) {
    if (write) {
        document.write(components)
    }
    return components
}


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