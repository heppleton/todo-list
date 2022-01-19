import { checkRelativeDate } from "./relative-date.js";
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
            return checkRelativeDate(parameters.date, entry.getDueDate()) &&
            entry.checkStatus(parameters.status) &&
            entry.checkCategory(parameters.category)
        });
        sortByDate();
    }

    const sortByDate = () => {
        filteredArray.sort((taskOne, taskTwo) =>  {
            return taskOne.getDueDate() > taskTwo.getDueDate();
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
        return filteredArray;
    }

    const getCategoryOptions = () => {
        const categoryOptions = [];
        let statusFilteredArray = storage.getMasterArray().filter(entry => {
            return entry.checkStatus(parameters.status)
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