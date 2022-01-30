import { entry } from "./entry.js"
import { storage } from "./storage.js"

/*Ensures that only one task is being dragged/edited/expanded at a time.
Returns "true" is expanded entry is clicked on again, to prevent it reopening after being closed.*/
const closeLayouts = (layout = "") => {
    try {
        const editingEntry = document.querySelector(".editing-layout").parentElement;
        const editingTask = storage.getTaskByID(editingEntry.id);
        document.querySelector(".display-area").replaceChild(entry(editingTask), editingEntry);
    } catch {}

    try {
        const expandedEntry = document.querySelector(".details-box").parentElement;
        expandedEntry.removeChild(document.querySelector(".details-box"));
        return expandedEntry == layout
    } catch {}
}

const makeComplexElement = (type, classes = [], text = "", attributes = {}) => {
    const newElement = document.createElement(type);

    newElement.classList.add(...classes);

    for(let key in attributes) {
        newElement.setAttribute(key, attributes[key]);
    }

    newElement.textContent = text;

    return newElement;
}

export { closeLayouts, makeComplexElement };

