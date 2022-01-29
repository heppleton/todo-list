import { filter } from "./filter.js";
import { makeComplexElement } from "./helper.js";
import { mainpage } from "./mainpage.js";

const sidemenu = (() => {
    const load = () => {
        const subheadings = [
            { "type": "Status", "text": "Status", "options": ["Active", "Complete"] },
            { "type": "Category", "text": "Category", "options": filter.getCategoryOptions() },
            { "type": "Date", "text": "Due date", "options": ["All dates", "Overdue", 
                "Today", "Tomorrow", "Next seven days", "No due date"] },
        ];

        const sideMenu = makeComplexElement("div", ["side-menu"]);

        subheadings.forEach(subheading => {
            const subheadingTitle = makeComplexElement("span", ["side-menu-sublist"],
                subheading.text);            
            subheading.options.forEach(option => {
                const subMenuOption = makeComplexElement("span", [], option);
                subMenuOption.addEventListener("click", () => {
                    filter.changeParameter(subheading.type, option);
                    mainpage.loadContent();
                });
                makeDropTarget(subMenuOption, subheading.type, option);
                highlightSelections(subMenuOption, subheading.type, option);
                subheadingTitle.appendChild(subMenuOption);
            }) 
            sideMenu.appendChild(subheadingTitle);
        })

        if(filter.parameters["Status"] == "Complete") {
            sideMenu.removeChild(sideMenu.lastChild);
        }

        return sideMenu;
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