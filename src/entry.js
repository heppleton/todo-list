import { format } from "date-fns";
import { filter } from "./filter.js";
import { storage } from "./storage.js";
import { task } from "./task.js";

const entry = (currTask) => {
    let holder;

    const createHolder = (() => {
        holder = document.createElement("div");
        holder.classList.add("entry-holder");
        holder.setAttribute("draggable", "true");
        holder.id = currTask.added;
    })();

    const addExpandedLayout = () => {
        try {    
            const expandedEntry = 
                document.querySelector(".entry-expanded-layout").parentElement;
            expandedEntry.removeChild(expandedEntry.lastElementChild);
            if(expandedEntry == holder) {
                return;
            }
        } catch {}

        const expandedLayout = document.createElement("div");
        expandedLayout.classList.add("entry-expanded-layout");

        const expandedLayoutElements = [
            { "type": "span", "attributes": { "contenteditable": "true",
                "data-placeholder": "title...", "data-key": "title" }, 
                "text": currTask.title, "class": ["title-input", "text-input"] },
            { "type": "span", "attributes": { "contenteditable": "true",
                "data-placeholder": "category...", "data-key": "category" },
                "text": currTask.category, "class": ["category-input", "text-input"] },
            { "type": "input", "attributes": { "type": "date", "value": currTask.due,
                "min": format(new Date(), "yyyy-MM-dd"), "data-key": "date"},
                "class": ["date-picker"] },
            { "type": "div", "attributes": {}, "text": "update", 
                "class": ["button", "lowlight"] }
        ];

        expandedLayoutElements.forEach(element => {
            const layoutElement = document.createElement(element["type"]);
            for(var key in element["attributes"]) {
                layoutElement.setAttribute(key, element["attributes"][key]);
            }
            layoutElement.textContent = element["text"];
            layoutElement.classList.add(...element["class"]);

            expandedLayout.appendChild(layoutElement);

            if(element["class"].includes("button")) {
                layoutElement.addEventListener("click", () => {
                    const newProperties = {};
                    expandedLayout.childNodes.forEach((element) => {
                        if(element.getAttribute("data-key")) {
                            newProperties[element.getAttribute("data-key")] = 
                                element.textContent || element.value;
                        }
                    })
                    currTask.update(newProperties);
                });
            }
        });
        holder.appendChild(expandedLayout);
    };

    const basicLayout = (() => {
        const completeButton = document.createElement("div");
        completeButton.classList.add("complete-button");
        completeButton.textContent = "\u2714";
        completeButton.addEventListener("click", () => {
            currTask.update(currTask.isStatus("active") ? { "status": "complete" }
            : { "status" : "active" });
        });

        const layout = document.createElement("div");
        layout.classList.add("entry-basic-layout", "lowlight");

        const title = document.createElement("div");
        title.textContent = currTask.title;

        const category = document.createElement("div");
        category.textContent = currTask.category;

        const due = document.createElement("div");
        due.textContent = currTask.toRelative();

        const deleteButton = document.createElement("div");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "\u2718";
        deleteButton.addEventListener("click", () => {
            storage.remove(currTask);
        });

        layout.addEventListener("click", addExpandedLayout);

        layout.append(completeButton, title, category, due, deleteButton);

        holder.append(layout);

        return { layout, due };
    })();    

    if(currTask.isStatus("complete")) {
        holder.classList.add("completed-task");
        basicLayout.layout.removeEventListener("click", addExpandedLayout);
        basicLayout.due.textContent = format(new Date(currTask.due), "dd MMMM yyyy");
    }

    if(currTask.isRelative("overdue") && currTask.isStatus("active")){
        holder.classList.add("overdue");
    }

    return holder;
}

export { entry };

