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
        <a href="../index.html" class="logo">${title}</a>
    </header>`
    if (write) {
        document.write(components)
    } else {
        return components
    }

}

function nav(idx, write = true) {
    let components = `<nav id="nav">
        <ul class="links">
            <li class=${idx === 0 ? 'active' : ''}><a href="../index.html">Home</a></li>
            <li class=${idx === 1 ? 'active' : ''}><a href="../people.html">People</a></li>
            <li class=${idx === 2 ? 'active' : ''}><a href="../publication.html">Publication</a></li>
            <li class=${idx === 3 ? 'active' : ''}><a href="../research.html">Research</a></li>
             <li class=${idx === 4 ? 'active' : ''}><a href="../teaching.html">Teaching</a></li>
        </ul>
        <ul class="icons">
            <li><a href="https://github.com/labhai" class="icon brands fa-github"><span
                class="label">GitHub</span></a>
            </li>
        </ul>
    </nav>`
    if (write) {
        document.write(components)
    } else {
        return components
    }
}

function headingWithSubtitle(title, subTitle, description, write = true) {
    let components = `<div>
        <h3>${title}</h3>
        <p>
        ${subTitle}<br>
        ${description}
        </p>
        </div>
<hr/>
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
            <li>&copy; HAI</li>
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

function createPublicationsWithJson(jsonFilePath, containerId) {
    jsonFilePath = jsonFilePath[1] !== '.' ? '.' + jsonFilePath : jsonFilePath
    readJson(jsonFilePath, (json) => {
        let components = ""
        json['data'].forEach((data) => {
            components += headingWithSubtitle(data[0], data[1], data[2], false)
        })
        let container = document.getElementById(containerId)
        container.innerHTML = components
    })
}