import { filter } from "./filter.js";

const sidemenu = (() => {
    const load = () => {
        const dateOptions = ["all dates", "overdue", "today", "tomorrow",
        "next seven days", "no due date"];

        const categoryOptions = filter.getCategoryOptions();

        const statusOptions = ["active", "complete", "all"];

        const subheadings = [
            { "type": "status", "text": "Status", "options": statusOptions },
            { "type": "date", "text": "Due date", "options": dateOptions },
            { "type": "category", "text": "Category", "options": categoryOptions }
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
            menuOption.setAttribute("data-key", key);
            menuOption.setAttribute("data-value", value);
        }
    };

    const highlightSelections = (menuOption, key, value) => {
        if(filter.parameters[key] == value) {
            menuOption.classList.add("selected-option");
        }
    }
    
    return { load };

})();

export { sidemenu };
