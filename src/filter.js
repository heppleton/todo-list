import { sort } from "./sort.js";
import { storage } from "./storage.js";
import { task } from "./task.js";
import { mainpage } from "./mainpage.js";

const filter = (() => {
    let workingArray = [];

    const parameters =
        { "Date": "All dates",
        "Status": "Active",
        "Category": "All categories" }

    const newFilter = () => {
        workingArray = storage.getMasterArray().filter(entry => {
            return entry.isRelative(parameters.Date) && 
            entry.isStatus(parameters.Status) &&
            entry.isCategory(parameters.Category)
        });
        sortArray();
    }

    const addSearchResults = (resultsArray) => {
        workingArray = resultsArray;
        sortArray();
    }

    const changeParameter = (parameter, newValue) => {
        parameters[parameter] = newValue;
        if(newValue == "Active" && !sort.isSorted("Due")) {
            sort.chooseProperty("Due");
        }
        if(newValue == "Complete") {
            parameters["Date"] = "All dates";
            if(!sort.isSorted("Complete")) {
                sort.chooseProperty("Complete");
    
            }
        }
        newFilter();
    }

    const sortArray = () => {
        workingArray = sort.byChoice(workingArray);
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

    const getWorkingArray = () => {
        return workingArray;
    }

    return { parameters, newFilter, changeParameter, sortArray, 
        getCategoryOptions, getWorkingArray, addSearchResults }

})();

export { filter };