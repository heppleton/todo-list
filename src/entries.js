import { format } from "date-fns";
import { filter } from "./filter.js";

const entries = (() => {

    const load = () => {

        const displayArea = document.querySelector(".display-area");
        displayArea.replaceChildren();
        
        filter.getFilteredArray().forEach(entry => {
            const entryHolder = document.createElement("div");
            entryHolder.classList.add("entry-holder");

            addBasicLayout(entry, entryHolder);
            makeDraggable(entry, entryHolder);

            displayArea.appendChild(entryHolder);
        });

        if(!displayArea.hasChildNodes()){
            const noEntries = document.createElement("div");
            noEntries.classList.add("no-entries");
            noEntries.textContent = "no tasks";
            displayArea.appendChild(noEntries);
        }
    }


    const addBasicLayout = (entry, entryHolder) => {
        const basicLayout = document.createElement("div");
        basicLayout.classList.add("entry-basic-layout", "lowlight");

        const title = document.createElement("div");
        title.textContent = entry.title;

        const category = document.createElement("div");
        category.textContent = entry.category;

        const dateDue = document.createElement("div");
        dateDue.textContent = entry.getRelativeDate();

        const buttonHolder = document.createElement("div");
        buttonHolder.classList.add("task-button-holder");

        basicLayout.append(title, category, dateDue, buttonHolder);

        basicLayout.addEventListener("click", () => {
            addExpandedLayout(entry, entryHolder);
        });

        /*
        const completeButton = document.createElement("div");
        completeButton.classList.add("complete-button");
        completeButton.textContent = "\u2713";
        completeButton.addEventListener("click", () => {
            currentTask.markComplete();
            storage.save(currentTask);
        });

        taskButtonHolder.append(completeButton);
        
        
        if(currentTask.checkStatus("complete")) {
            taskLayout.classList.add("completed-task");
            taskDueDate.textContent =
                format(new Date(currentTask.dateCompleted), "dd MMMM yyyy");
            taskLayout.removeChild(taskButtonHolder);
        }
        
        if(taskDueDate.textContent == "overdue") {
            taskHolder.classList.add("overdue-task");
        }*/

        entryHolder.append(basicLayout);
    }

    const addExpandedLayout = (entry, entryHolder) => {
        try {    
            const expandedEntry = 
                document.querySelector(".entry-expanded-layout").parentElement;
            expandedEntry.removeChild(expandedEntry.lastElementChild);
            if(expandedEntry == entryHolder) {
                return;
            }
        } catch {}

        const expandedLayout = document.createElement("div");
        expandedLayout.classList.add("entry-expanded-layout");

        const expandedLayoutElements = [
            { "type": "span", "attributes": { "contenteditable": "true",
                "data-placeholder": "title..." }, "text": entry.title, 
                "style": ["title-input", "text-input"] },
            { "type": "span", "attributes": { "contenteditable": "true",
                "data-placeholder": "category..."}, "text": entry.category, 
                "style": ["category-input", "text-input"] },
            { "type": "input", "attributes": { "type": "date", 
                "value": entry.getDueDate(), "min": format(new Date(), "yyyy-MM-dd")},
                "style": ["date-picker"] },
            { "type": "span", "attributes": { "contenteditable": "true", 
                "data-placeholder": "description..."}, "text": entry.description, 
                "style": ["description-input", "text-input"] },
            { "type": "div", "attributes": {}, "text": "update", 
                "style": ["button", "lowlight"] }
        ];

        expandedLayoutElements.forEach(element => {
            const layoutElement = document.createElement(element["type"]);
            for(var key in element["attributes"]) {
                layoutElement.setAttribute(key, element["attributes"][key]);
            }
            layoutElement.textContent = element["text"];
            layoutElement.classList.add(...element["style"]);

            expandedLayout.appendChild(layoutElement);

            if(element["style"].includes("button")) {
                layoutElement.addEventListener("click", () => {
                    //need code here to collect layout values;
                });
            }
        });

        entryHolder.appendChild(expandedLayout);
    }

    const makeDraggable = (entry, entryHolder) => {
        entryHolder.id = entry.dateAdded;
        entryHolder.setAttribute("draggable", "true");

        entryHolder.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", entryHolder.id);
        });

        entryHolder.addEventListener("dragend", (event) => {
            if(entryHolder.getAttribute("data-value")) {
                entry.updateTask({ [entryHolder.getAttribute("data-key")]:
                    entryHolder.getAttribute("data-value") });                   
            }
        });
    }
    return { load };
})();

export { entries };

