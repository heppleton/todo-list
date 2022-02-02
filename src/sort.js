import { display } from "./display.js";
import { filter } from "./filter.js";
import { makeComplexElement } from "./helper.js";
import { mainpage } from "./mainpage.js";

const sort = (() => {
    let property = "Due";
    let x = 0;
    let y = 1;

    /*Creates the visual appearance of the sort bar and returns it for appending.*/
    const addSortBar = (allowSort) => {
        const sortBar = makeComplexElement("div", ["sort-bar"]);

        const sortOptions = ["Title", "Category", 
            filter.getParameter("Status") == "Complete" ? "Complete" : "Due"];

        sortOptions.forEach(option => {
            const bar = makeComplexElement("div", [], option);
            if(allowSort) {
                bar.addEventListener("click", () => {
                    chooseProperty(option);
                    mainpage.loadContent();
                })
                bar.append(makeComplexElement("span", ["sort-bar-arrow"],
                    isSorted(option) ? " \u25B2" : " \u25BC"));
            } else {
                sortBar.setAttribute("cursor", "default");
                if(bar.textContent == "Due" || bar.textContent == "Complete") {
                    bar.textContent = "Due/Complete";
                }
            }
            sortBar.appendChild(bar);
        })

        return sortBar;
    };

    /*An all-in-one function which allows any option to be sorted in either direction.*/
    const byChoice = (array) => {
        array.sort((taskA, taskB) =>  {
            const options = [
                { "Category": taskA.category, "Complete": taskA.status.formatDate("yyyy-MM-dd"),
                    "Due": taskA.due.getDueString(), "Title": taskA.title },
                { "Category": taskB.category, "Complete": taskB.status.formatDate("yyyy-MM-dd"), 
                    "Due": taskB.due.getDueString(), "Title": taskB.title }
            ]

            const selectionA = options[x][property];
            const selectionB = options[y][property];

            return selectionA.localeCompare(selectionB);
        });
        return array;
    }

    /*Changes both property to be sorted on and tracks whether currently sorted on
    that property in either direction.*/
    const chooseProperty = (newProperty) => {
        if(newProperty == property) {
            [x, y] = [y, x];
        } else {
            property = newProperty;
            [x, y] = [0, 1];
        }
    }

    /*Returns true if currently sorted *increasing* by a given property.*/
    const isSorted = (option) => {
        if(option == property && x == 0) {
            return true;
        }
        return false;
    }

    return { addSortBar, byChoice, chooseProperty, isSorted };
})();

export { sort };