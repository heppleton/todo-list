import { filter } from "./filter.js";

const sidemenu = (() => {
    const dateOptions = ["all dates", "overdue", "today", "tomorrow",
        "next seven days", "no due date"];

    const topicOptions = filter.getTopicOptions();

    const statusOptions = ["active", "complete", "all"];

    const subheadings = [
        { "type": "date", "text": "tasks by due date", "options": dateOptions },
        { "type": "topic", "text": "tasks by topic", "options": topicOptions },
        { "type": "status", "text": "tasks by status", "options": statusOptions }
    ];

    const load = () => {
        const menuArea = document.querySelector(".side-menu");
        menuArea.replaceChildren();

        subheadings.forEach(subheading => {
            const subheadingTitle = document.createElement("span");
            subheadingTitle.classList.add("side-menu-sublist");
            subheadingTitle.textContent = subheading.text;
            
            subheading.options.forEach(option => {
                const subMenuOption = document.createElement("span");
                subMenuOption.textContent = option;
                subheadingTitle.addEventListener("click", () => {
                    filter.changeParameter(subheading.type, option);
                });
                makeDropTarget(subMenuOption, subheading.type, option);
                subheadingTitle.appendChild(subMenuOption);
            }) 
            menuArea.appendChild(subheadingTitle);
        })
    }

    const makeDropTarget = (menuOption, key, value) => {
        menuOption.addEventListener("dragenter", (event) => {
            event.target.classList.add("drag-over");
        });

        menuOption.addEventListener("dragleave", (event) => {
            event.target.classList.remove("drag-over");
        });

        menuOption.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        menuOption.addEventListener("drop", (event) => {
            event.preventDefault();
            event.target.classList.remove("drag-over");
            const draggedEntry = 
                document.getElementById(event.dataTransfer.getData("text"));
            draggedEntry.setAttribute("data-key", key);
            draggedEntry.setAttribute("data-value", value);
        });
    };
    
    return { load };

})();

export { sidemenu };

/*
    for(let parameter in filterParameters) {
        const menuOptions = sideMenu.querySelectorAll("span");
        menuOptions.forEach(element => {
            if(element.textContent == filterParameters[parameter]) {
                element.classList.add("selected-option");
            }
        });
    }
}*/

