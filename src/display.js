import { entry } from "./entry.js";
import { filter } from "./filter.js";
import { format } from "date-fns";
import { makeComplexElement } from "./helper.js";
import { sort } from "./sort.js";
import { storage } from "./storage.js";
import { task } from "./task.js";
import { mainpage } from "./mainpage.js";

const display = (() => {
    const displayArea = makeComplexElement("div", ["display-area"]);

    const load = () => {
        displayArea.replaceChildren();

        filter.getFilteredArray().forEach((task) => {
            displayArea.appendChild(entry(task));
        });

        if(!displayArea.hasChildNodes()){
            displayArea.appendChild(makeComplexElement("div", ["no-entries"], 
                "There are no tasks which meet your selection."));
        }

        const contentArea = document.querySelector(".content-area");
        contentArea.replaceChildren();
        contentArea.append(addSortBar(), displayArea);
        if(filter.parameters["Status"] != "Complete") {
            contentArea.appendChild(addInputForm());
        }
    };

    const addSortBar = () => {
        const sortBar = makeComplexElement("div", ["sort-bar"]);

        const sortOptions = ["Title", "Category", 
            filter.parameters["Status"] == "Complete" ? "Complete" : "Due"];

        sortOptions.forEach(option => {
            const bar = makeComplexElement("div", ["lowlight"], option);
            bar.addEventListener("click", () => {
                sort.chooseProperty(option);
                load();
            })
            bar.append(makeComplexElement("span", ["sort-bar-arrow"],
                sort.isSorted(option) ? " \u25B2" : " \u25BC"));

            sortBar.appendChild(bar);
        })

        return sortBar;
    };

    const addInputForm = () => {
        const form = makeComplexElement("div", ["input-layout"]);
        form.addEventListener("keydown", (event) => {
            if(event.code === "Enter") {
                submitNewTask();
                event.preventDefault();
            }
        });

        const title = makeComplexElement("span", ["text-input"], "",
            { "contenteditable": "true", "data-placeholder": "New task" });

        const category = makeComplexElement("span", ["text-input"], "",
            { "contenteditable": "true", "data-placeholder": "Category" });

        const dateDue = makeComplexElement("input", [], "",
            { "type": "date", "min": format(new Date(), "yyyy-MM-dd") });

        const submit = makeComplexElement("div", ["button", "lowlight"], "Add");
        submit.addEventListener("click", () => { submitNewTask(form) });
    
        form.append(title, category, dateDue, submit);
    
        const submitNewTask = () => {
            if(/[0-9a-zA-Z]/.test(title.textContent)) {
                const newTask = task(title.textContent,
                    category.textContent,
                    dateDue.value);
                storage.add(newTask);
            }
        }   

        /*The logic below autofills the input form if the user has 
        filtered by category or due date.*/
        const selectedCategory = filter.parameters["Category"];
        if(selectedCategory != "All categories" && selectedCategory != "No category") {
            category.textContent = selectedCategory;
        }

        const selectedDue = filter.parameters["Date"];
        if(selectedDue != "No due date" && selectedDue != "All dates") {
            dateDue.value = task().fromRelative(selectedDue);
        }

        return form;
    }

    return { load };
})();

export { display };