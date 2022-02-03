import { entry } from "./entry.js"
import { storage } from "./storage.js"

/*Ensures that only one task is being dragged/edited/expanded at a time.
Returns "true" if expanded entry is clicked on again, to prevent it reopening after being closed.*/
const closeLayouts = (layout = "") => {
    try {
        const editingEntry = document.querySelector(".editing-layout").parentElement;
        const editingTask = storage.getTaskByID(editingEntry.id);
        document.querySelector(".display-area").replaceChild(entry(editingTask), editingEntry);
    } catch {}

    try {
        const expandedEntry = document.querySelector(".details").parentElement;
        expandedEntry.removeChild(document.querySelector(".details"));
        return expandedEntry == layout
    } catch {}
}

/*A simple code-reducing function for making common elements.*/
const makeComplexElement = (type, classes = [], text = "", attributes = {}) => {
    const newElement = document.createElement(type);

    newElement.classList.add(...classes);

    for(let key in attributes) {
        newElement.setAttribute(key, attributes[key]);
    }

    newElement.textContent = text;

    return newElement;
}

const makeToolTip = (element, text, position) => {
    if(element.querySelector(".tooltip-text")) {
        element.removeChild(element.querySelector(".tooltip-text"));
    }

    const positionMap = { "left": "right", "right": "left" };

    element.classList.add("tooltip");
    const toolTip = makeComplexElement("span", ["tooltip-text"], text);
    toolTip.style[positionMap[position]] = "100%";

    element.appendChild(toolTip);
}

export { closeLayouts, makeComplexElement, makeToolTip };

