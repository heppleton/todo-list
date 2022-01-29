import { display } from "./display.js";
import { filter } from "./filter.js";
import { makeComplexElement } from "./helper.js";
import { mainpage } from "./mainpage.js";

const sort = (() => {
    let property = "Due";
    let x = 0;
    let y = 1;

    const addSortBar = () => {
        const sortBar = makeComplexElement("div", ["sort-bar"]);

        const sortOptions = ["Title", "Category", 
            filter.parameters["Status"] == "Complete" ? "Complete" : "Due"];

        sortOptions.forEach(option => {
            const bar = makeComplexElement("div", [], option);
            bar.addEventListener("click", () => {
                chooseProperty(option);
                mainpage.loadContent();
            })
            bar.append(makeComplexElement("span", ["sort-bar-arrow"],
                isSorted(option) ? " \u25B2" : " \u25BC"));

            sortBar.appendChild(bar);
        })

        return sortBar;
    };

    const byChoice = (array) => {
        array.sort((taskA, taskB) =>  {
            const options = [
                { "Category": taskA.category, "Complete": taskA.completed, "Due": taskA.due, "Title": taskA.title },
                { "Category": taskB.category, "Complete": taskB.completed, "Due": taskB.due, "Title": taskB.title }
            ]

            const selectionA = options[x][property];
            const selectionB = options[y][property];

            return selectionA.localeCompare(selectionB);
        });
        return array;
    }

    const chooseProperty = (newProperty) => {
        if(newProperty == property) {
            [x, y] = [y, x];
        } else {
            property = newProperty;
            [x, y] = [0, 1];
        }
    }

    const isSorted = (option) => {
        if(option == property && x == 0) {
            return true;
        }
        return false;
    }

    return { addSortBar, byChoice, chooseProperty, isSorted };
})();

export { sort };