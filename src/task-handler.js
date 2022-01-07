import { task } from "./task.js";

const createTask = (taskTitle, projectBoard, inputForm) => {
    const newTask = task(taskTitle);

    const taskHolder = document.createElement("div");
    taskHolder.classList.add("task-holder");

    const taskName = document.createElement("div");
    taskName.textContent = taskTitle;
    taskName.classList.add("task-name");

    const taskButtonHolder = document.createElement("div");
    taskButtonHolder.classList.add("task-button-holder");
    taskHolder.append(taskName, taskButtonHolder);

    const completeButton = document.createElement("div");
    completeButton.classList.add("complete-button");
    completeButton.textContent = "\u2713";
    completeButton.addEventListener("click", () => {
        taskCompleted(newTask, taskHolder, projectBoard);
    });

    taskButtonHolder.append(completeButton);


    projectBoard.insertBefore(taskHolder, inputForm);
}

const taskCompleted = (task, taskHolder, board) => {
    task.changeStatus("complete");
    board.removeChild(taskHolder);

    const completedTasks = board.querySelector(".completed-tasks");
    completedTasks.appendChild(taskHolder);

}


export { createTask };