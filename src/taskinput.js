import { task } from "./task.js";
import { storage } from "./storage.js";
import { format } from "date-fns";
import { filter } from "./filter.js";

const taskinput = (() => {
    const add = () => {
        const displayArea = document.querySelector(".display-area");

        const form = document.createElement("div");
        form.classList.add("task-input-form");
        
        const title = document.createElement("span");
        title.setAttribute("contenteditable", "true");
        title.setAttribute("data-placeholder", "new task...");
        title.classList.add("title-input", "text-input");
        title.addEventListener("keydown", (e) => {
            if(e.code === "Enter") {
                submitNewTask(form);
                e.preventDefault();
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





    return { add };
})();

export { taskinput };