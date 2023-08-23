const addFavicon = (favicon_path) => {
    // For regular browsers
    const link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = favicon_path;
    document.getElementsByTagName("head")[0].appendChild(link);

    // For iOS devices
    const apple_link = document.createElement("link");
    apple_link.rel = "apple-touch-icon";
    apple_link.href = favicon_path;
    document.getElementsByTagName("head")[0].appendChild(apple_link);
};

document.addEventListener("DOMContentLoaded", () => {
    addFavicon("./images/favicon/HAI_logo_nobg.png");
});
