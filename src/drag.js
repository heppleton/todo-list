import { storage } from "./storage.js";

const makeDraggable = (taskHolder, currentTask) => {
    const displayArea = taskHolder.parentElement;
    taskHolder.id = currentTask.dateAdded
    taskHolder.setAttribute("draggable", "true");

    taskHolder.addEventListener("dragstart", (event) => {
        event.target.classList.add("dragging");
        event.dataTransfer.setData("text", taskHolder.id);
    });

    taskHolder.addEventListener("dragend", (event) => {
        event.target.classList.remove("dragging");
        const acquiredValue = taskHolder.getAttribute("data-value");
        if(acquiredValue) {
            currentTask.topic = acquiredValue;
            storage.save(currentTask);
        }
    });
}

const makeDropTarget = (menuOption) => {
    menuOption.addEventListener("dragenter", (event) => {
        event.target.classList.add("drag-over");
    });

    menuOption.addEventListener("dragleave", (event) => {
        event.target.classList.remove("drag-over");
    });

    menuOption.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    menuOption.addEventListener("drop", (event) => {
        event.preventDefault();
        event.target.classList.remove("drag-over");
        const draggedTaskHolder = document.getElementById(event.dataTransfer.getData("text"));
        draggedTaskHolder.setAttribute("data-value",
            event.target.textContent)
    });
}


export { makeDraggable, makeDropTarget };