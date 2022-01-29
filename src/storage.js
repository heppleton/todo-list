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

    const add = (newTask) => {
        masterArray.push(newTask);
        save();
    };

    const remove = (removedTask) => {
        const taskIndex = masterArray.findIndex((entry) =>
                entry.added == removedTask.added);
        masterArray.splice(taskIndex, 1);
        save();
    }

    const update = (updatedTask) => {
        const taskIndex = masterArray.findIndex((entry) =>
            entry.added == updatedTask.added);
        masterArray.splice(taskIndex, 1, updatedTask);
        save();
    };

    const save = () => {
        const latestTaskspaceJSON = JSON.stringify(masterArray);
        localStorage.setItem("taskspaceJSON", latestTaskspaceJSON);
    }

    const getMasterArray = () => {
        return masterArray;
    }

    const getTaskByID = (ID) => {
        const taskIndex = masterArray.findIndex((entry) =>
            entry.added == ID);
        return masterArray[taskIndex];
    }

    return { add, remove, update, retrieve, getMasterArray, getTaskByID };

})();

export { storage };