import { sort } from "./sort.js";
import { storage } from "./storage.js";
import { task } from "./task.js";
import { mainpage, taskspace } from "./mainpage.js";

const filter = (() => {
    let filteredArray = [];

    const parameters =
        { "Date": "All dates",
        "Status": "Active",
        "Category": "All categories" }

    const newFilter = () => {
        filteredArray = storage.getMasterArray().filter(entry => {
            return entry.isRelative(parameters.Date) && 
            entry.isStatus(parameters.Status) &&
            entry.isCategory(parameters.Category)
        });
    }

    const updateMasterArray = function(updatedArray) {
        masterArray = updatedArray;
        newFilter();
    }

    const changeParameter = (parameter, newValue) => {
        parameters[parameter] = newValue;
        mainpage.loadContent();
    }

    const getFilteredArray = () => {
        newFilter();
        return sort.byChoice(filteredArray);
    }

    const getCategoryOptions = () => {
        const categoryOptions = [];
        storage.getMasterArray().forEach(entry => {
            if(!categoryOptions.includes(entry.category) && 
                entry.category != "No category") {
                categoryOptions.push(entry.category);
            }
        })
        categoryOptions.sort((categoryOne, categoryTwo) => {
            return categoryOne.localeCompare(categoryTwo);
        })
        categoryOptions.unshift("All categories");
        categoryOptions.push("No category");

        return categoryOptions;
    }

    return { parameters, changeParameter, getFilteredArray, 
        getCategoryOptions, newFilter, updateMasterArray }

})();

export { filter };