import { format } from "date-fns";
import { filter } from "./filter.js";
import { closeLayouts, makeComplexElement } from "./helper.js";
import { mainpage } from "./mainpage.js";
import { storage } from "./storage.js";
import { task } from "./task.js";

const entry = (currTask) => {
    let holder;

    const createHolder = (() => {
        holder = makeComplexElement("div", ["holder"], "", { "draggable": "true" });
        holder.id = currTask.id;
    })();

    const addEditingLayout = () => {
        closeLayouts();
        
        const editingLayout = makeComplexElement("div", ["editing-layout"]);
        editingLayout.addEventListener("keydown", (event) => {
            if(event.code === "Enter") {
                submitUpdate();
                event.preventDefault();
            }
        });

        const endEditButton = makeComplexElement("div", ["end-edit-button"], "\u21BA");
        endEditButton.addEventListener("click", addEditingLayout);

        const title = makeComplexElement("span", ["text-input"], currTask.title,
            { "contenteditable": "true", "data-placeholder": "Title", "data-key": "Title"});

        const category = makeComplexElement("span", ["text-input"], currTask.category,
            { "contenteditable": "true", "data-placeholder": "Category", "data-key": "Category"});

        const date = makeComplexElement("input", [], "",
            { "type": "date", "value": currTask.getDueString(), "data-key": "Date",
            "min": format(new Date(), "yyyy-MM-dd")});
        const update = makeComplexElement("div", ["text-button", "lowlight"], "Update", { "tabindex": 0 });
        update.addEventListener("click", () => {
            submitUpdate();
        });
        const details = makeComplexElement("div", ["text-input", "details"], currTask.details,
            { "contenteditable": "true", "data-placeholder": "Details", "data-key": "Details" });

        details.addEventListener("keydown", (event) => {
            if(event.code === "Enter") {
                event.stopPropagation();
            }
        });

        editingLayout.append(endEditButton, title, category, date, update, details);

        const submitUpdate = () => {
            const newProperties = {};
            editingLayout.childNodes.forEach((element) => {
                if(element.getAttribute("data-key")) {
                    newProperties[element.getAttribute("data-key")] = 
                        element.textContent || element.value;
                }
            })
            currTask.update(newProperties);
            storage.update(currTask);
            mainpage.loadContent();
        }

        holder.setAttribute("draggable", "false");
        holder.replaceChildren(editingLayout);
    };

    const basicLayout = (() => {
        const layout = makeComplexElement("div", ["basic-layout", "lowlight"]);

        const editButton = makeComplexElement("div", ["edit-button", "icon-button"], "\u270E");
        editButton.addEventListener("click", (event) => { 
            event.stopPropagation();
            addEditingLayout();
        });

        const title = makeComplexElement("div", ["text-box"], currTask.title);
        const category = makeComplexElement("div", ["text-box"], currTask.category);

        const due = makeComplexElement("div", ["text-box"], currTask.toRelative());
        if(currTask.isRelative("Overdue") && currTask.status.isStatus("Active")){
            holder.classList.add("overdue-task");
        }

        const buttonHolder = makeComplexElement("div", ["button-holder"]);
        const completeButton = makeComplexElement("div", ["complete-button", "icon-button"], "\u2714");
        completeButton.addEventListener("click", () => {
            currTask.update(currTask.status.isStatus("Active") ? { "Status": "Complete" }
            : { "Status" : "Active" });
            storage.update(currTask);
            mainpage.loadContent();
        });
        const deleteButton = makeComplexElement("div", ["delete-button", "icon-button"], "\u2718");
        deleteButton.addEventListener("click", () => {
            storage.remove(currTask);
            if(!filter.getCategoryCounts()[currTask.category] && 
                filter.getParameter("Category") == currTask.category) {
                    filter.changeParameter("Category", "All categories");
            }
            mainpage.loadContent();
        });
        buttonHolder.append(completeButton, deleteButton);

        const details = makeComplexElement("div", ["text-box", "details"], 
            currTask.details, { "data-placeholder": "No details." });              
        layout.addEventListener("click", () => {
            if(!closeLayouts(layout)) {
                layout.appendChild(details);
            }
        });

        /*A few changes to the entry holder is the task is complete.*/
        if(currTask.isStatus("Complete")) {
            holder.classList.add("completed-task");
            due.textContent = format(currTask.status.completed, "d MMMM yyyy");
            editButton.removeEventListener("click", addEditingLayout);
            editButton.textContent = "";
        }

        layout.append(editButton, title, category, due, buttonHolder);
        holder.append(layout);
    })();    

    return holder;
}

export { entry };