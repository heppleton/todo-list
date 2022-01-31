import { sort } from "./sort.js";
import { storage } from "./storage.js";
import { task } from "./task.js";
import { mainpage } from "./mainpage.js";

const filter = (() => {
    let workingArray = [];

    const parameters =
        { "Date": "All dates",
        "Status": "Active",
        "Category": "All categories" };

    const newFilter = () => {
        workingArray = storage.getMasterArray().filter(entry => {
            return entry.isRelative(parameters.Date) &&
            entry.isStatus(parameters.Status) &&
            entry.isCategory(parameters.Category)
        });
    }

    const changeParameter = (parameter, newValue) => {
        const responseMap = {
            "Date": () => {
                parameters["Category"] = "All categories";
            },
            "Status": () => {
                if(newValue == "Active" && !sort.isSorted("Due")) {
                    sort.chooseProperty("Due");
                }
                if(newValue == "Complete") {
                    parameters["Date"] = "All dates";
                    if(!sort.isSorted("Complete")) {
                        sort.chooseProperty("Complete");    
                    }
                }
            },
            "Category": () => {
                parameters["Date"] = "All dates";
            }
        }
        parameters[parameter] = newValue;
        responseMap[parameter]();
    }

    const getParameter = (choice) => {
        return parameters[choice];
    }

    const getCategoryCounts = () => {
        const categoryOptions = [];
        const masterArrayCopy = storage.getMasterArray();
        masterArrayCopy.forEach(entry => {
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

        const categoryCounts = {};
        categoryOptions.forEach(option => { categoryCounts[option] = 0 });
            const statusFilteredArray = masterArrayCopy.filter(entry => {
            return entry.isStatus(parameters.Status)
        });
        statusFilteredArray.forEach(entry => {
            categoryCounts[entry.category] += 1;
        })
        categoryCounts["All categories"] = statusFilteredArray.length;

        return categoryCounts;
    }

    const getWorkingArray = () => {
        newFilter();
        workingArray = sort.byChoice(workingArray);
        return workingArray;
    }

    return { newFilter, changeParameter, getParameter,
        getCategoryCounts, getWorkingArray }

})();

export { filter };