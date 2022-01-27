import { sort } from "./sort.js";
import { storage } from "./storage.js";
import { task } from "./task.js";
import { mainpage } from "./mainpage.js";

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
        filteredArray = sort.byChoice(filteredArray);
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

    const getFilteredArray = () => {
        return filteredArray;
    }

    return { parameters, newFilter, changeParameter, sortArray, 
        getCategoryOptions, getFilteredArray }

})();

export { filter };