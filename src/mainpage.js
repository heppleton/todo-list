import { entries } from "./entries.js";
import { sidemenu } from "./sidemenu.js";

const mainpage = (() => {
    const page = document.querySelector("body");
  
    const header = document.createElement("div");
    header.classList.add("header");
    header.textContent = "deed.";
    
    const content = document.createElement("div");
    content.classList.add("content-area");
    
    const footer = document.createElement("div");
    footer.classList.add("footer");
    footer.textContent = "\u00A9 2022 Heppleton Industries";

    page.append(header, content, footer);

    const sideMenu = document.createElement("div");
    sideMenu.classList.add("side-menu");

    const displayArea = document.createElement("div");
    displayArea.classList.add("display-area");

    const rightSpacing = document.createElement("div");
    rightSpacing.classList.add("right-spacing");

    content.append(sideMenu, displayArea, rightSpacing);

    sidemenu.load();
    entries.load();
})();

export { mainpage };