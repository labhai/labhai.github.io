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
    if (write) {
        document.write(components)
    } else {
        return components
    }

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
        <li class="symbolLi">
            <a href="https://www.hufs.ac.kr" class="icon brands symbol">
                <img class="symbolDefault symbolNormal" src="./images/HUFSIcon/ic_hufs.svg"  alt=""/>
                <img class="symbolDefault symbolMenu" src="./images/HUFSIcon/ic_hufs_menu.svg"  alt=""/>
                <img class="symbolHover" src="./images/HUFSIcon/ic_hufs_hover.svg" alt="">
            </a>
        </li>
        <li>
            <a href="https://github.com/labhai" class="icon brands fa-github">
            <span class="label">GitHub</span>
            </a>
        </li>
    </ul>
</nav>`
    if (write) {
        document.write(components)
    } else {
        return components
    }
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
    if (write) {
        document.write(components)
    } else {
        return components
    }
}

function titleWithContent(title, content, write = true) {
    let components = `
    <h2>${title}</h2>
        ${content}
    <hr/>
`
    if (write) {
        document.write(components)
    } else {
        return components
    }
}

function customTitleWithContent(title, content, style, write = true) {
    let components = `
    <h2 style="${style}">${title}</h2>
        ${content}
`
    if (write) {
        document.write(components)
    } else {
        return components
    }
}

function subTitleWithContent(subTitle, content, write = true) {
    let components = `
    <h3>${subTitle}</h3>
        ${content}
`
    if (write) {
        document.write(components)
    } else {
        return components
    }
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

    if (write) {
        document.write(components)
    } else {
        return components
    }
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

    if (write) {
        document.write(components)
    } else {
        return components
    }
}


function copyright(write = true) {
    let components = `<div id="copyright">
        <ul>
            <li>Copyright 2023. HAI Lab. All Rights Reserved.</li>
            <li>HUFS: <a href="https://github.com/labhai">Lab HAI</a></li>
        </ul>
    </div>`

    if (write) {
        document.write(components)
    } else {
        return components
    }
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