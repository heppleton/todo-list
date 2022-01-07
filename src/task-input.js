import { createTask } from "./task-handler.js";

const taskInput = (projectBoard) => {
    const inputForm = document.createElement("div");
    inputForm.classList.add("input-form");

    const taskName = document.createElement("div");
    taskName.textContent = "New task...";
    taskName.setAttribute("contenteditable", "true");
    taskName.classList.add("text-input");
    taskName.addEventListener("keydown", (e) => {
        if(e.code === "Enter") {
            taskSubmitted();
        }
    });
    inputForm.appendChild(taskName);

    const taskSubmit = document.createElement("div");
    taskSubmit.classList.add("submit-button");
    taskSubmit.textContent = "+";
    taskSubmit.addEventListener("click", () => { taskSubmitted() });
    inputForm.appendChild(taskSubmit);

    projectBoard.appendChild(inputForm);

    const taskSubmitted = () => {
        const taskTitle = taskName.textContent;
        if(taskTitle) {
            taskName.textContent = "New task...";
            createTask(taskTitle, projectBoard, inputForm);
        }
    }
}

export { taskInput };
