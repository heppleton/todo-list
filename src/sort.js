import { filter } from "./filter.js";

const sort = (() => {
    let property = "Due";
    let x = 0;
    let y = 1;

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
        filter.sortArray;
    }

    const isSorted = (option) => {
        if(option == property && x == 0) {
            return true;
        }
        return false;
    }

    return { byChoice, chooseProperty, isSorted };
})();

export { sort };