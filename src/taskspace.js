import { createProject } from "./project-handler.js";

const taskspace = (() => {
    const page = document.querySelector("body");
  
    const title = document.createElement("div");
    title.classList.add("main-title");
    title.textContent = "TaskSpace";
    
    const boardArea = document.createElement("div");
    boardArea.classList.add("board-area");
    
    page.append(title, boardArea);

    const boardDisplayArea = document.createElement("div");
    boardDisplayArea.classList.add("board-display-area");

    const boardDockArea = document.createElement("div");
    boardDockArea.classList.add("board-dock-area");

    boardArea.append(boardDisplayArea, boardDockArea);

    //Project board placement logic might need to go here?
    const addBoardButton = document.createElement("div");
    addBoardButton.classList.add("add-board-button");
    addBoardButton.textContent = "+";
    addBoardButton.addEventListener("click", () => {
        createProject(addBoardButton);
        if(boardDisplayArea.childNodes.length > 4) {
            boardDisplayArea.removeChild(addBoardButton);
            boardDockArea.appendChild(addBoardButton);
        }
    });
    boardDisplayArea.appendChild(addBoardButton);
})();

export { taskspace };