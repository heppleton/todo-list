import { filter } from "./filter.js";

const sidemenu = (() => {
    const load = () => {
        const dateOptions = ["All dates", "Overdue", "Today", "Tomorrow",
        "Next seven days", "No due date"];

        const categoryOptions = filter.getCategoryOptions();

        const statusOptions = ["Active", "Complete"];

        const subheadings = [
            { "type": "Status", "text": "Status", "options": statusOptions },
            { "type": "Category", "text": "Category", "options": categoryOptions },
            { "type": "Date", "text": "Due date", "options": dateOptions },
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

        if(filter.parameters["Status"] == "Complete") {
            menuArea.removeChild(menuArea.lastChild);
        }
    }

    const makeDropTarget = (menuOption, key, value) => {
        if(!["All", "All dates", "All categories"].includes(value)) {
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
