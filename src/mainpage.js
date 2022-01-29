import { display } from "./display.js";
import { drag } from "./drag.js";
import { entry } from "./entry.js";
import { filter } from "./filter.js";
import { makeComplexElement } from "./helper.js";
import { search } from "./search.js";
import { sidemenu } from "./sidemenu.js";
import { sort } from "./sort.js";
import { storage } from "./storage.js";

const mainpage = (() => {
    const accents = ["#000080", "#800000", "#008000"];
    let accentIndex = 0; 

    const header = makeComplexElement("div", ["header"]);
    const headerTitle = makeComplexElement("div", ["header-title"], "Deed");
    headerTitle.addEventListener("click", () => { reset() });
    const accentButton = makeComplexElement("span", ["header-accent"], ".");
    accentButton.addEventListener("click", () => {
        document.documentElement.style.setProperty("--accent-color", accents[accentIndex]);
        accentIndex++;
        if(accentIndex == accents.length) {
            accentIndex = 0;
        }
    })
    headerTitle.appendChild(accentButton);
    
    const middle = makeComplexElement("div", ["middle-area"]); 
    const menuArea = document.createElement("div");
    const contentArea = makeComplexElement("div", ["content-area"]);
    middle.append(menuArea, contentArea, makeComplexElement("div", ["right-spacing"]));

    const footer = makeComplexElement("div", ["footer"], 
        "\u00A9 2022 Heppleton Industries");
   
    const page = document.querySelector("body");
    page.append(header, middle, footer);

    const loadContent = () => {
        header.replaceChildren(headerTitle, search.addSearchBox());
        menuArea.replaceChildren(sidemenu.load());
        contentArea.replaceChildren(...display.load());
    };

    const reset = () => {
        const defaultParameters =
            { "Date": "All dates",
            "Status": "Active",
            "Category": "All categories" };
        for(let parameter in defaultParameters) {
            filter.changeParameter(parameter, defaultParameters[parameter]);
        }
        if(!sort.isSorted("Due")) {
            sort.chooseProperty("Due");
        }
        loadContent();
    }

    storage.retrieve();
    loadContent();

    return { loadContent };
})();

export { mainpage };