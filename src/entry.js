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
        
        const editingLayout = makeComplexElement("form", ["editing-layout"]);
        editingLayout.addEventListener("keydown", (event) => {
            if(event.code === "Enter") {
                submitUpdate();
                event.preventDefault();
            }
        });

        const endEditButton = makeComplexElement("div", ["end-edit-button"], "\u21BA");
        endEditButton.addEventListener("click", addEditingLayout);

        const title = makeComplexElement("input", [], "", { "value": currTask.title,
            "type": "text", "placeholder": "Title", "name": "Title", "maxlength": 200 });

        const category = makeComplexElement("input", [], "", { "value": currTask.category,
            "type": "text", "placeholder": "Category", "name": "Category", "maxlength": 30 });

        const date = makeComplexElement("input", [], "",
            { "type": "date", "value": currTask.due.getDueString(), "name": "Date",
            "min": format(new Date(), "yyyy-MM-dd")});
        const update = makeComplexElement("button", ["lowlight"], "Update", { "type": "button" });
        update.addEventListener("click", () => {
            submitUpdate();
        });
        const details = makeComplexElement("textarea", ["details"], currTask.details, 
            { "placeholder": "Details", "name": "Details", "maxlength": 1000 });
        details.addEventListener("keydown", (event) => {
            if(event.code === "Enter") {
                event.stopPropagation();
            }
        });

        editingLayout.append(endEditButton, title, category, date, update, details);

        const submitUpdate = () => {
            const editingData = new FormData(document.querySelector(".editing-layout"));
            currTask.update(Object.fromEntries(editingData));
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

        const due = makeComplexElement("div", ["text-box"], currTask.due.toRelative());
        if(currTask.due.isRelative("Overdue") && currTask.status.isStatus("Active")){
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
        if(currTask.status.isStatus("Complete")) {
            holder.classList.add("completed-task");
            due.textContent = currTask.status.formatDate("d MMMM yyyy");
            editButton.removeEventListener("click", addEditingLayout);
            editButton.textContent = "";
        }

        layout.append(editButton, title, category, due, buttonHolder);
        holder.append(layout);
    })();    

    return holder;
}

export { entry };