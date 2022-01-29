import { format } from "date-fns";
import { filter } from "./filter.js";
import { makeComplexElement } from "./helper.js";
import { mainpage } from "./mainpage.js";
import { storage } from "./storage.js";
import { task } from "./task.js";

const entry = (currTask) => {
    let holder;

    const createHolder = (() => {
        holder = makeComplexElement("div", ["holder"], "", { "draggable": "true" });
        holder.id = currTask.added;
    })();

    const addEditingLayout = () => {
        try {
            //Check for and close existing editing entries.
            const editingEntry = document.querySelector(".editing-layout").parentElement;
            const editingTask = storage.getTaskByID(editingEntry.id);
            document.querySelector(".display-area").replaceChild(
                entry(editingTask), editingEntry);
        } catch {}
        
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
            { "type": "date", "value": format(currTask.due, "yyyy-MM-dd"), "data-key": "Date",
            "min": format(new Date(), "yyyy-MM-dd")});

        const update = makeComplexElement("div", ["button", "lowlight"], "Update", { "tabindex": 0 });
        update.addEventListener("click", () => {
            submitUpdate();
        });

        const details = makeComplexElement("div", ["text-input", "box-input"], currTask.details,
            { "contenteditable": "true", "data-placeholder": "Details", "data-key": "Details" });

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

        const editButton = makeComplexElement("div", ["edit-button"], "\u270E");
        editButton.addEventListener("click", addEditingLayout);

        const title = makeComplexElement("div", ["text-box"], currTask.title);
        const category = makeComplexElement("div", ["text-box"], currTask.category);
        const due = makeComplexElement("div", ["text-box"], currTask.toRelative());

        const buttonHolder = makeComplexElement("div", ["button-holder"]);
        const completeButton = makeComplexElement("div", ["complete-button"], "\u2714");
        completeButton.addEventListener("click", () => {
            currTask.update(currTask.isStatus("Active") ? { "Status": "Complete" }
            : { "Status" : "Active" });
            storage.update(currTask);
            mainpage.loadContent();
        });
        const deleteButton = makeComplexElement("div", ["delete-button"], "\u2718");
        deleteButton.addEventListener("click", () => {
            storage.remove(currTask);
            mainpage.loadContent();
        });
        buttonHolder.append(completeButton, deleteButton);

        const details = makeComplexElement("div", ["details-box", "text-box"], 
            currTask.details, { "data-placeholder": "No details." });
              
        layout.addEventListener("click", () => {
            try {
                //Check for and close existing expanded entries.
                const expandedEntry = 
                    document.querySelector(".details-box").parentElement;
                expandedEntry.removeChild(document.querySelector(".details-box"));
                if(expandedEntry == layout) {
                    return;
                }
            } catch {}

            layout.appendChild(details);
        });

        layout.append(editButton, title, category, due, buttonHolder);
        holder.append(layout);
        return { layout, due, editButton };
    })();    

    /*Apply additional styles to complete and overdue tasks.*/
    if(currTask.isStatus("Complete")) {
        holder.classList.add("completed-task");
        basicLayout.due.textContent = format(currTask.completed, "dd MMMM yyyy");
        basicLayout.editButton.removeEventListener("click", addEditingLayout);
        basicLayout.editButton.textContent = "";
    }

    if(currTask.isRelative("Overdue") && currTask.isStatus("Active")){
        holder.classList.add("overdue-task");
    }

    return holder;
}

export { entry };