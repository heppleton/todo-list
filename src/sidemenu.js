import { filter } from "./filter.js";

const sidemenu = (() => {
    const load = () => {
        const dateOptions = ["all dates", "overdue", "today", "tomorrow",
        "next seven days", "no due date"];

        const categoryOptions = filter.getCategoryOptions();

        const statusOptions = ["active", "complete", "all"];

        const subheadings = [
            { "type": "date", "text": "tasks by due date", "options": dateOptions },
            { "type": "category", "text": "tasks by category", "options": categoryOptions },
            { "type": "status", "text": "tasks by status", "options": statusOptions }
        ];

        const menuArea = document.querySelector(".side-menu");
        menuArea.replaceChildren();

        subheadings.forEach(subheading => {
            const subheadingTitle = document.createElement("span");
            subheadingTitle.classList.add("side-menu-sublist");
            subheadingTitle.textContent = subheading.text;
            
            subheading.options.forEach(option => {
                const subMenuOption = document.createElement("span");
                subMenuOption.textContent = option;
                subMenuOption.addEventListener("click", () => {
                    filter.changeParameter(subheading.type, option);
                });
                makeDropTarget(subMenuOption, subheading.type, option);
                highlightSelections(subMenuOption, subheading.type, option);
                subheadingTitle.appendChild(subMenuOption);
            }) 
            menuArea.appendChild(subheadingTitle);
        })
    }

    const makeDropTarget = (menuOption, key, value) => {
        if(!["all", "all dates", "all categories"].includes(value)) {
            menuOption.classList.add("drop-target");
        }

        menuOption.addEventListener("drop", (event) => {
            event.preventDefault();
            event.target.classList.remove("drag-over");
            const draggedEntry = 
                document.getElementById(event.dataTransfer.getData("text"));
            draggedEntry.setAttribute("data-key", key);
            draggedEntry.setAttribute("data-value", value);
        });
    };

    const highlightSelections = (menuOption, key, value) => {
        if(filter.parameters[key] == value) {
            menuOption.classList.add("selected-option");
        }
    }
    
    return { load };

})();

export { sidemenu };
