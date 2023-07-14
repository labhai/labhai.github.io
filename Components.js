function header(title) {
    document.write(`<header id="header">
        <a href="index.html" class="logo">${title}</a>
    </header>`)
}

function nav(idx) {
    document.write(`<nav id="nav">
        <ul class="links">
            <li class=${idx !== 1 && idx !== 2 && idx !== 3 ? 'active' : ''}><a href="index.html">Home</a></li>
            <li class=${idx === 1 ? 'active' : ''}><a href="people.html">People</a></li>
            <li class=${idx === 2 ? 'active' : ''}><a href="publication.html">Publication</a></li>
            <li class=${idx === 3 ? 'active' : ''}><a href="research.html">Research</a></li>
        </ul>
        <ul class="icons">
            <li><a href="https://github.com/labhai" class="icon brands fa-github"><span
                class="label">GitHub</span></a>
            </li>
        </ul>
    </nav>`)
}

function headingWithSubtitle() {
    document.write(`<header>
        <h2>Heading with a Subtitle</h2>
        <p>Lorem ipsum dolor sit amet nullam id egestas urna aliquam</p>
    </header>
    <p>Nunc lacinia ante nunc ac lobortis. Interdum adipiscing gravida odio porttitor sem non mi integer non
        faucibus ornare mi ut ante amet placerat aliquet. Volutpat eu sed ante lacinia sapien lorem accumsan
        varius montes viverra nibh in adipiscing blandit tempus accumsan.</p>
`)
}


function copyright() {
    document.write(`<div id="copyright">
        <ul>
            <li>&copy; HAI</li>
            <li>HUFS: <a href="https://github.com/labhai">Lab HAI</a></li>
        </ul>
    </div>`)
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