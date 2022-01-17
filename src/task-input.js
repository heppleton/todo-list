import { task } from "./task.js";
import { storage } from "./storage.js";
import { format } from "date-fns";

const newTaskInput = (displayArea) => {
    const newTaskInputForm = document.createElement("div");
    newTaskInputForm.classList.add("task-input-form");

    const taskNameInput = document.createElement("span");
    taskNameInput.setAttribute("contenteditable", "true");
    taskNameInput.setAttribute("data-placeholder", "new task...");
    taskNameInput.classList.add("title-input", "text-input");
    taskNameInput.addEventListener("keydown", (e) => {
        if(e.code === "Enter") {
            submitNewTask();
            e.preventDefault();
        }
    });

    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("type", "date");
    dueDateInput.setAttribute("min", format(new Date(), "yyyy-MM-dd"));

    const taskSubmitButton = document.createElement("div");
    taskSubmitButton.classList.add("button", "lowlight");
    taskSubmitButton.textContent = "add";
    taskSubmitButton.addEventListener("click", () => { submitNewTask() });

    newTaskInputForm.append(taskNameInput, dueDateInput, taskSubmitButton);

    displayArea.appendChild(newTaskInputForm);
    
    const submitNewTask = () => {
        const taskName = taskNameInput.textContent;
        const dateDue = dueDateInput.value;
        if(/[0-9a-zA-Z]/.test(taskName)) {
            taskNameInput.textContent = "";
            const newTask = task(taskName, dateDue);
            storage.save(newTask);
        }
    }    
}

export { newTaskInput };