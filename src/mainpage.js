import { display } from "./display.js";
import { drag } from "./drag.js";
import { entry } from "./entry.js";
import { makeComplexElement } from "./helper.js";
import { sidemenu } from "./sidemenu.js";

const mainpage = (() => {
    const header = makeComplexElement("div", ["header"], "Deed");
    header.appendChild(makeComplexElement("span", ["header-accent"], "."));
    
    const middle = makeComplexElement("div", ["middle-area"]); 
    middle.append(makeComplexElement("div", ["side-menu"]),
        makeComplexElement("div", ["content-area"]),
        makeComplexElement("div", ["right-spacing"]));

    const footer = makeComplexElement("div", ["footer"], 
        "\u00A9 2022 Heppleton Industries");
   
    const page = document.querySelector("body");
    page.append(header, middle, footer);

    const loadContent = () => {
        sidemenu.load();
        display.load();
    };

    loadContent();

    return { loadContent };
})();

export { mainpage };