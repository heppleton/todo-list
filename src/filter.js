import { sort } from "./sort.js";
import { storage } from "./storage.js";
import { task } from "./task.js";
import { mainpage, taskspace } from "./mainpage.js";

const filter = (() => {
    let filteredArray = [];

    const parameters =
        { "date": "all dates",
        "status": "active",
        "category": "all categories" }

    const newFilter = () => {
        filteredArray = storage.getMasterArray().filter(entry => {
            return entry.isRelative(parameters.date) && 
            entry.isStatus(parameters.status) &&
            entry.isCategory(parameters.category)
        });
        filteredArray = sort.byDate(filteredArray);
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
        return filteredArray;
    }

    const getCategoryOptions = () => {
        const categoryOptions = [];
        let statusFilteredArray = storage.getMasterArray().filter(entry => {
            return entry.isStatus(parameters.status)
        });
        statusFilteredArray.forEach(entry => {
            if(!categoryOptions.includes(entry.category) && 
                entry.category != "no category") {
                categoryOptions.push(entry.category);
            }
        })
        categoryOptions.sort((categoryOne, categoryTwo) => {
            return categoryOne > categoryTwo;
        })
        categoryOptions.unshift("all categories");
        categoryOptions.push("no category");

        return categoryOptions;
    }

    return { parameters, changeParameter, getFilteredArray, 
        getCategoryOptions, newFilter, updateMasterArray }

})();

export { filter };