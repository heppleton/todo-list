import { entry } from "./entry.js";
import { filter } from "./filter.js";
import { format } from "date-fns";
import { storage } from "./storage.js";
import { task } from "./task.js";

const display = (() => {

    const load = () => {
        const displayArea = document.querySelector(".display-area");
        displayArea.replaceChildren();

        addSortBar();

        filter.getFilteredArray().forEach((task) => {
            displayArea.appendChild(entry(task));
        });

        if(!displayArea.hasChildNodes()){//Might need something more complex!
            const noEntries = document.createElement("div");
            noEntries.classList.add("no-entries");
            noEntries.textContent = "no tasks";
            displayArea.appendChild(noEntries);
        }

        addInputForm();
    };

    const addSortBar = () => {
        //Ad logic for a sort bar at top of display area.
    };

    const addInputForm = () => {
        const displayArea = document.querySelector(".display-area");

        const form = document.createElement("div");
        form.classList.add("task-input-form");
        
        const title = document.createElement("span");
        title.setAttribute("contenteditable", "true");
        title.setAttribute("data-placeholder", "new task...");
        title.classList.add("title-input", "text-input");
        title.addEventListener("keydown", (event) => {
            if(event.code === "Enter") {
                submitNewTask(form);
                event.preventDefault();
            }
        });

        const category = document.createElement("span");
        category.setAttribute("contenteditable", "true");
        category.setAttribute("data-placeholder", "category...");
        category.classList.add("category-input", "text-input");

        const dateDue = document.createElement("input");
        dateDue.setAttribute("type", "date");
        dateDue.setAttribute("min", format(new Date(), "yyyy-MM-dd"));

        const submit = document.createElement("div");
        submit.classList.add("button", "lowlight");
        submit.textContent = "add";
        submit.addEventListener("click", () => { submitNewTask(form) });
    
        form.append(title, category, dateDue, submit);
    
        const submitNewTask = () => {
            if(/[0-9a-zA-Z]/.test(title.textContent)) {
                const newTask = task(title.textContent,
                    category.textContent,
                    dateDue.value);
                storage.save(newTask);
            }
        }   

        displayArea.appendChild(form);
    }

    return { load };
})();

export { display };