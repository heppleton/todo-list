import { entry } from "./entry.js";
import { storage } from "./storage.js";

const drag = (() => {
    let draggedEntryID;

    window.addEventListener("dragstart", (event) => {
        setTimeout(() => {
            try {
                const editingEntry = 
                    document.querySelector(".editing-layout").parentElement;
                const editingTask = storage.getTaskByID(editingEntry.id);
                document.querySelector(".display-area").replaceChild(
                    entry(editingTask), editingEntry);
            } catch {}

            event.target.classList.add("dragging");
            draggedEntryID = event.target.id;
            document.querySelectorAll(".drop-target").forEach(target => {
                target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            })
        }, 0);
    });

    window.addEventListener("dragend", (event) => {
        event.target.classList.remove("dragging");
        document.querySelectorAll(".drop-target").forEach(target => {
            target.style.backgroundColor = "rgba(0, 0, 0, 0)";
        })
    });

    window.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

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

    window.addEventListener("drop", (event) => {
        event.preventDefault();
        if(event.target.classList.contains("drop-target")) {
            event.target.classList.remove("drag-over");
            const draggedTask = storage.getTaskByID(draggedEntryID);
            draggedTask.update({ [event.target.getAttribute("data-key")]:
            event.target.getAttribute("data-value") });
        }
    });
})();