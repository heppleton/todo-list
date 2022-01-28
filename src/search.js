import { filter } from "./filter.js";
import { makeComplexElement } from "./helper.js";
import { mainpage } from "./mainpage.js";
import { storage } from "./storage.js";

const search = (() => {
    const addSearchBox = () => {
        const searchBox = makeComplexElement("div", ["search-box"]);

        const searchInput = makeComplexElement("div", ["text-input", "search-text"], "",
            { "contenteditable": "true", "data-placeholder": "Search"});
        searchInput.addEventListener("keydown", (event) => {
            if(event.code === "Enter") {
                event.preventDefault();
                getSearchResults(searchInput.textContent);
            }
        });

        const searchButton = makeComplexElement("div", ["button", "lowlight"], "Search");
        searchButton.addEventListener("click", () => { getSearchResults(searchInput.textContent) });

        searchBox.append(searchInput, searchButton);

        return searchBox;
    }

    const getSearchResults = (searchInput) => {
        const searchString = searchInput.toLowerCase();
        const resultsArray = [];
        storage.getMasterArray().forEach(entry => {
            if(entry.title.toLowerCase().includes(searchString) 
                || entry.details.toLowerCase().includes(searchString)) {
                resultsArray.push(entry);
            }
        });
        filter.addSearchResults(resultsArray);
        mainpage.loadContent();
    }


    return { addSearchBox };
})();

export { search };