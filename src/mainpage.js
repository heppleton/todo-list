import { display } from "./display.js";
import { drag } from "./drag.js";
import { entry } from "./entry.js";
import { makeComplexElement } from "./helper.js";
import { search } from "./search.js";
import { sidemenu } from "./sidemenu.js";
import { storage } from "./storage.js";

const mainpage = (() => {
    const accents = ["#000080", "#800000", "#008000"];
    let accentIndex = 0;

    const header = makeComplexElement("div", ["header"]);
    const headerTitle = makeComplexElement("div", ["header-title"], "Deed");
    const accentButton = makeComplexElement("span", ["header-accent"], ".");
    accentButton.addEventListener("click", () => {
        document.documentElement.style.setProperty("--accent-color", accents[accentIndex]);
        accentIndex++;
        if(accentIndex == accents.length) {
            accentIndex = 0;
        }
    })
    headerTitle.appendChild(accentButton);
    header.append(headerTitle, search.addSearchBox());
    
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

    storage.retrieve();
    loadContent();

    return { loadContent };
})();

export { mainpage };