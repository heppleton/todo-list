import { entry } from "./entry.js";
import { makeComplexElement } from "./helper.js";
import { mainpage } from "./mainpage.js";
import { sort } from "./sort.js";
import { storage } from "./storage.js";

const search = (() => {
    const addSearchBox = () => {
        const searchBox = makeComplexElement("div", ["search-box"]);

        const searchInput = makeComplexElement("input", ["search-text"], "",
            { "type": "text", "placeholder": "Search", "maxlength": 50 });

        const searchButton = makeComplexElement("button", ["lowlight"], "Search", { "type": "button" });
        searchButton.addEventListener("click", () => { getResults(searchInput.textContent) }, { once: true });

        searchBox.addEventListener("keydown", (event) => {
            if(event.code === "Enter") {
                getResults(searchInput.value);
                event.preventDefault();
            }
        });
        searchBox.append(searchInput, searchButton);

        return searchBox;
    }

    const addClearSearchButton = () => {
        const searchInput = document.querySelector(".search-text");
        const clearButton = makeComplexElement("span", ["clear-search-button", "lowlight"], "\u2718");
        clearButton.addEventListener("click", () => {
            mainpage.loadContent();
        })
        searchInput.appendChild(clearButton);
        searchInput.setAttribute("contenteditable", "false");
    }

    const getResults = (searchQuery) => {
        const searchString = searchQuery.toLowerCase();
        let resultsArray = [];
        if(searchString != "") {
            resultsArray = storage.getMasterArray().filter(item => {
                return item.title.toLowerCase().includes(searchString) 
                    || item.details.toLowerCase().includes(searchString)
            });
        }
        displayResults(resultsArray);
        addClearSearchButton();
    }

    const displayResults = (resultsArray) => {
        const contentArea = document.querySelector(".content-area");
        const displayArea = document.querySelector(".display-area");
        displayArea.replaceChildren();

        resultsArray.forEach((result) => {
            displayArea.appendChild(entry(result));
        });

        if(!displayArea.hasChildNodes()){
            displayArea.appendChild(makeComplexElement("div", ["no-entries"], 
                "Your search returned no results."));
        }

        contentArea.replaceChildren(sort.addSortBar(false), displayArea);
    }

    return { addSearchBox };
})();

export { search };