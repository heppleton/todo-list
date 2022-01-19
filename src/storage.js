import { filter } from "./filter.js";
import { mainpage } from "./mainpage.js";
import { task } from "./task.js";

const storage = (() => {
    let masterArray = [];

    const retrieve = () => {
        if(!localStorage.getItem("taskspaceJSON")) {
            return;
        }

        const taskspaceJSON = localStorage.getItem("taskspaceJSON");
        const retrievedArray = JSON.parse(taskspaceJSON);

        masterArray = retrievedArray.map((retrievedTask) => {
            return Object.assign(task("", ""), retrievedTask);
        });
    }

    const save = (updatedTask) => {
        if(masterArray.some((entry) => entry.dateAdded == updatedTask.dateAdded)) {
            const taskIndex = masterArray.findIndex((entry) =>
                entry.dateAdded == updatedTask.dateAdded);
            masterArray.splice(taskIndex, 1, updatedTask);
        } else {
            masterArray.push(updatedTask);
        }
        
        const latestTaskspaceJSON = JSON.stringify(masterArray);
        localStorage.setItem("taskspaceJSON", latestTaskspaceJSON);

        mainpage.loadContent();
    };

    const getMasterArray = () =>{
        return masterArray;
    }

    retrieve();

    return { save, getMasterArray };

})();

export { storage };