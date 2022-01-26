import { format } from "date-fns";
import { filter } from "./filter.js";
import { storage } from "./storage.js";
import { task } from "./task.js";

const entry = (currTask) => {
    let holder;

    const createHolder = (() => {
        holder = document.createElement("div");
        holder.classList.add("holder");
        holder.setAttribute("draggable", "true");
        holder.id = currTask.added;
    })();

    const addEditingLayout = () => {
        /*This try/catch checks if another entry is already being edited.
        If one is found, it is closed before the new entry is opened for 
        editing. If they are the same entry, it only closes it for editing.*/
        try {
            const editingEntry = 
                document.querySelector(".editing-layout").parentElement;
            const editingTask = storage.getTaskByID(editingEntry.id);
            document.querySelector(".display-area").replaceChild(
                entry(editingTask), editingEntry);
        } catch {}

        const editingLayout = document.createElement("div");
        editingLayout.classList.add("editing-layout");

        const endEditButton = document.createElement("div");
        endEditButton.classList.add("end-edit-button");
        endEditButton.textContent = "\u21B6";
        endEditButton.addEventListener("click", addEditingLayout);
        editingLayout.appendChild(endEditButton);

        const editingLayoutElements = [
            { "type": "span", "attributes": { "contenteditable": "true",
                "data-placeholder": "Title", "data-key": "Title" }, 
                "text": currTask.title, "class": ["text-input"] },
            { "type": "span", "attributes": { "contenteditable": "true",
                "data-placeholder": "Category", "data-key": "Category" },
                "text": currTask.category, "class": ["text-input"] },
            { "type": "input", "attributes": { "type": "date", "value": currTask.due,
                "min": format(new Date(), "yyyy-MM-dd"), "data-key": "Date"},
                "class": [] },
            { "type": "div", "attributes": {}, "text": "Update", 
                "class": ["button", "lowlight"] }
        ];

        editingLayoutElements.forEach(element => {
            const layoutElement = document.createElement(element["type"]);
            for(var key in element["attributes"]) {
                layoutElement.setAttribute(key, element["attributes"][key]);
            }
            layoutElement.textContent = element["text"];
            layoutElement.classList.add(...element["class"]);
            editingLayout.appendChild(layoutElement);

            if(element["class"].includes("button")) {
                layoutElement.addEventListener("click", () => {
                    submitUpdate();
                });
            } else {
                layoutElement.addEventListener("keydown", (event) => {
                    if(event.code === "Enter") {
                        submitUpdate();
                        event.preventDefault();
                    }
                });
            }
        });
        const details = document.createElement("div");
        details.setAttribute("contenteditable", "true");
        details.setAttribute("data-placeholder", "Details");
        details.setAttribute("data-key", "Details");
        details.textContent = currTask.details;
        details.classList.add("text-input", "box-input");
        editingLayout.appendChild(details);

        const submitUpdate = () => {
            const newProperties = {};
            editingLayout.childNodes.forEach((element) => {
                if(element.getAttribute("data-key")) {
                    newProperties[element.getAttribute("data-key")] = 
                        element.textContent || element.value;
                }
            })
            currTask.update(newProperties);
        }

        holder.setAttribute("draggable", "false");
        holder.replaceChildren(editingLayout);
    };

    const basicLayout = (() => {
        const editButton = document.createElement("div");
        editButton.classList.add("edit-button");
        editButton.textContent = "\u270E";
        editButton.addEventListener("click", addEditingLayout);

        const layout = document.createElement("div");
        layout.classList.add("basic-layout", "lowlight");

        const title = document.createElement("div");
        title.textContent = currTask.title;
        title.classList.add("text-box");

        const category = document.createElement("div");
        category.textContent = currTask.category;
        category.classList.add("text-box");

        const due = document.createElement("div");
        due.textContent = currTask.toRelative();
        due.classList.add("text-box");

        const completeButton = document.createElement("div");
        completeButton.classList.add("complete-button");
        completeButton.textContent = "\u2714";
        completeButton.addEventListener("click", () => {
            currTask.update(currTask.isStatus("Active") ? { "Status": "Complete" }
            : { "Status" : "Active" });
        });

        const deleteButton = document.createElement("div");
        deleteButton.classList.add("delete-button");
        deleteButton.textContent = "\u2718";
        deleteButton.addEventListener("click", () => {
            storage.remove(currTask);
        });

        const description = document.createElement("div");
        description.classList.add("details-box", "text-box");
        description.setAttribute("data-placeholder", "No details.")
        description.textContent = currTask.details;
              
        layout.addEventListener("click", () => {
            try {
                const expandedEntry = 
                    document.querySelector(".details-box").parentElement;
                expandedEntry.removeChild(document.querySelector(".details-box"));
                if(expandedEntry == layout) {
                    return;
                }
            } catch {}

            layout.appendChild(description);
        });

        layout.append(editButton, title, category, due, completeButton, deleteButton);

        holder.append(layout);

        return { layout, due };
    })();    

    /*Apply additional styles to complete and overdue tasks.*/
    if(currTask.isStatus("Complete")) {
        holder.classList.add("completed-task");
        basicLayout.layout.removeEventListener("click", addEditingLayout);
        basicLayout.due.textContent = !currTask.due ? "No due date" : 
            format(new Date(currTask.due), "dd MMMM yyyy");
    }

    if(currTask.isRelative("Overdue") && currTask.isStatus("Active")){
        holder.classList.add("overdue-task");
    }

    return holder;
}

export { entry };

