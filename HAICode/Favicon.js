const addFavicon = (faviconPath) => {
    var link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = faviconPath;
    document.getElementsByTagName("head")[0].appendChild(link);
};

document.addEventListener("DOMContentLoaded", () => {
    addFavicon("./images/favicon/HAI_logo_nobg.png");
});
