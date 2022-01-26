import { entry } from "./entry.js";
import { filter } from "./filter.js";
import { format } from "date-fns";
import { makeComplexElement } from "./helper.js";
import { sort } from "./sort.js";
import { storage } from "./storage.js";
import { task } from "./task.js";

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

        if(filter.parameters["Status"] != "Complete") {
            addInputForm();
        }

        const contentArea = document.querySelector(".content-area");
        contentArea.replaceChildren();
        contentArea.append(addSortBar(), displayArea);
    };

    const addSortBar = () => {
        const sortBar = makeComplexElement("div", ["sort-bar"]);

        const sortOptions = ["Title", "Category", "Due"];

        if(filter.parameters["Status"] == "Complete") {
            sortOptions[2] = "Complete";
        }

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

//add makeComplexElement below this point

        const title = document.createElement("span");//here
        title.setAttribute("contenteditable", "true");
        title.setAttribute("data-placeholder", "New task");
        title.classList.add("text-input");

        const category = document.createElement("span");//here
        category.setAttribute("contenteditable", "true");
        category.setAttribute("data-placeholder", "Category");
        category.classList.add("text-input");

        const dateDue = document.createElement("input");//here
        dateDue.setAttribute("type", "date");
        dateDue.setAttribute("min", format(new Date(), "yyyy-MM-dd"));

        const submit = document.createElement("div");//here
        submit.classList.add("button", "lowlight");
        submit.textContent = "Add";
        submit.addEventListener("click", () => { submitNewTask(form) });
    
        form.append(title, category, dateDue, submit);
    
        const submitNewTask = () => {
            if(/[0-9a-zA-Z]/.test(title.textContent)) {
                const newTask = task(title.textContent,
                    category.textContent,
                    dateDue.value);
                storage.save(newTask);
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

        displayArea.appendChild(form);
    }

    return { load };
})();

export { display };