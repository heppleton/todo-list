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
            return Object.assign(task(""), retrievedTask);
        });
    }

    const remove = (removedTask) => {
        const taskIndex = masterArray.findIndex((entry) =>
                entry.added == removedTask.added);
            masterArray.splice(taskIndex, 1);

        const latestTaskspaceJSON = JSON.stringify(masterArray);
        localStorage.setItem("taskspaceJSON", latestTaskspaceJSON);

        mainpage.loadContent();
    }

    const save = (updatedTask) => {
        if(masterArray.some((entry) => entry.added == updatedTask.added)) {
            const taskIndex = masterArray.findIndex((entry) =>
                entry.added == updatedTask.added);
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

    const getTaskByID = (ID) => {
        const taskIndex = masterArray.findIndex((entry) =>
            entry.added == ID);
        return masterArray[taskIndex];
    }

    retrieve();

    return { remove, save, getMasterArray, getTaskByID };

})();

export { storage };