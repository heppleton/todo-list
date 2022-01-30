import { entry } from "./entry.js";
import { mainpage } from "./mainpage.js";
import { closeLayouts, makeComplexElement } from "./helper.js";
import { storage } from "./storage.js";

const drag = (() => {
    let draggedEntryID;

    window.addEventListener("dragstart", (event) => {
        /*Create an element to be shown when an item is dragged.*/
        const dragGhost = makeComplexElement("div", ["drag-ghost"], 
            event.target.firstChild.children[1].textContent);
        event.target.appendChild(dragGhost);
        event.dataTransfer.setDragImage(dragGhost, 10, 10);

        /*The setTimeout is needed due to a quirk of Chrome.*/
        setTimeout(() => {
            closeLayouts();

            /*Make dragged elements not displayed (apart from image set above).
            Potential drop targets are highlighted. Task ID captured for future use.*/
            event.target.classList.add("dragging");
            draggedEntryID = event.target.id;
            document.querySelectorAll(".drop-target").forEach(target => {
                target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            })
        }, 0);
    });

    /*Restores the visual appearance of the dragged element and drop targets,
    regardless of result of drag.*/
    window.addEventListener("dragend", (event) => {
        event.target.classList.remove("dragging");
        event.target.removeChild(document.querySelector(".drag-ghost"));
        document.querySelectorAll(".drop-target").forEach(target => {
            target.style.backgroundColor = "rgba(0, 0, 0, 0)";
        })
    });

    window.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    /*Two events below just provide more visual feedback when dragged element is over a drop target.*/
    window.addEventListener("dragenter", (event) => {
        if(event.target.classList.contains("drop-target")) {
            event.target.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        }
    });

    window.addEventListener("dragleave", (event) => {
        if(event.target.classList.contains("drop-target")) {
            event.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        }
    })

    /*Dragged element task ID is combined with data from the menu drop target to update task appropriately.*/
    window.addEventListener("drop", (event) => {
        event.preventDefault();
        if(event.target.classList.contains("drop-target")) {
            const draggedTask = storage.getTaskByID(draggedEntryID);
            draggedTask.update({ [event.target.getAttribute("data-key")]:
            event.target.getAttribute("data-value") });
            storage.update(draggedTask);
            mainpage.loadContent();
        }
    });
})();