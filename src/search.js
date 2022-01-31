import { entry } from "./entry.js";
import { makeComplexElement } from "./helper.js";
import { mainpage } from "./mainpage.js";
import { sort } from "./sort.js";
import { storage } from "./storage.js";

const search = (() => {
    const addSearchBox = () => {
        const searchBox = makeComplexElement("div", ["search-box"]);

        const searchInput = makeComplexElement("div", ["text-input", "search-text"], "",
            { "contenteditable": "true", "data-placeholder": "Search"});

        const searchButton = makeComplexElement("div", ["text-button", "lowlight"], "Search", { "tabindex": 0 });
        searchButton.addEventListener("click", () => { getResults(searchInput.textContent) });

        searchBox.addEventListener("keydown", (event) => {
            if(event.code === "Enter") {
                getResults(searchInput.textContent);
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

/*What do I want to happen?
        3. can't enter or click to call event
*/
    }

    const getResults = (searchQuery) => {
        const searchString = searchQuery.toLowerCase();
        const resultsArray = [];
        if(searchString != "") {
            storage.getMasterArray().forEach(entry => {
                if(entry.title.toLowerCase().includes(searchString) 
                    || entry.details.toLowerCase().includes(searchString)) {
                    resultsArray.push(entry);
                }
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