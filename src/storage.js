import { filter } from "./filter.js";
import { mainpage } from "./mainpage.js";
import { makeSample } from "./sample.js";
import { task } from "./task.js";

const storage = (() => {
    let masterArray = [];

    const retrieve = () => {
        if(!localStorage.getItem("taskspaceJSON")) {
            masterArray = makeSample();
            return;
        }

        const taskspaceJSON = localStorage.getItem("taskspaceJSON");
        const retrievedArray = JSON.parse(taskspaceJSON);

        masterArray = retrievedArray.map((retrievedTask) => {
            const revivedTask = Object.assign(task(""), retrievedTask);
            if(retrievedTask.completed) {
                revivedTask.completed = new Date(retrievedTask.completed);
            }
            if(retrievedTask.due) {
                revivedTask.due = new Date(retrievedTask.due);
            }
            return revivedTask;
        });
    }

    const add = (newTask) => {
        masterArray.push(newTask);
        save();
    };

    const remove = (removedTask) => {
        const taskIndex = masterArray.findIndex((entry) =>
                entry.id == removedTask.id);
        masterArray.splice(taskIndex, 1);
        save();
    }

    const update = (updatedTask) => {
        const taskIndex = masterArray.findIndex((entry) =>
            entry.id == updatedTask.id);
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
            entry.id == ID);
        return masterArray[taskIndex];
    }

    return { add, remove, update, retrieve, getMasterArray, getTaskByID };

})();

export { storage };