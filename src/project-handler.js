import { project } from "./project.js";
import { taskInput } from "./task-input.js";

const BOARDCOLOURS = ["#81FF7A", "#7AC4FF", "#F77AFF", "#FFB57A"];

const createProject = (inputLocation) => {
    const currProject = project();

    const currentArea = inputLocation.parentNode;

    const board = document.createElement("div");
    board.classList.add("project-board");
    board.style.backgroundColor = BOARDCOLOURS[Math.floor(Math.random() * 4)];

    const boardTitle = document.createElement("div");
    boardTitle.textContent = currProject.name;
    boardTitle.classList.add("project-title", "highlight-area");
    boardTitle.addEventListener("click", () => {
        //This needs to have proper focus.
        //Also needs to send the name to the project object.
        boardTitle.textContent = "";
        boardTitle.setAttribute("contenteditable", "true");
        boardTitle.classList.remove("highlight-area");
        boardTitle.addEventListener("keydown", (e) => {
            if(e.code === "Enter") {
                boardTitle.setAttribute("contenteditable", "false");
            }
        });
    }, { once: true } );
    board.appendChild(boardTitle);

    const content = document.createElement("div");
    content.classList.add("project-content");
    taskInput(content);
    completedTasks(content);
    board.appendChild(content);

    currentArea.insertBefore(board, inputLocation);
};

const completedTasks = (board) => {
    const completedTaskToggle = document.createElement("div");
    completedTaskToggle.textContent = "Show completed tasks";
    completedTaskToggle.classList.add("highlight-area", "completed-task-toggle");

    const completedTasks = document.createElement("div");
    completedTasks.classList.add("completed-tasks");
    
    completedTaskToggle.addEventListener("click", () => {
        if(completedTasks.classList.contains("displayed")) {
            completedTasks.classList.remove("displayed");
            completedTaskToggle.textContent = "Show completed tasks";
        } else {
            completedTasks.classList.add("displayed");
            completedTaskToggle.textContent = "Hide completed tasks";
        }
    })
    
    board.append(completedTaskToggle, completedTasks);
}

export { createProject };