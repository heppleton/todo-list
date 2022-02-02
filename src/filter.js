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
        workingArray = storage.getMasterArray().filter(item => {
            return item.due.isRelative(parameters.Date) &&
            item.status.isStatus(parameters.Status) &&
            item.isCategory(parameters.Category)
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
        masterArrayCopy.forEach(item => {
            if(!categoryOptions.includes(item.category) && 
                item.category != "No category") {
                categoryOptions.push(item.category);
            }
        })
        categoryOptions.sort((categoryOne, categoryTwo) => {
            return categoryOne.localeCompare(categoryTwo);
        })
        categoryOptions.unshift("All categories");
        categoryOptions.push("No category");

        const categoryCounts = {};
        categoryOptions.forEach(option => { categoryCounts[option] = 0 });
        const statusFilteredArray = masterArrayCopy.filter(item => {
            return item.status.isStatus(parameters.Status)
        });
        statusFilteredArray.forEach(item => {
            categoryCounts[item.category] += 1;
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