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
        filter.getWorkingArray().forEach((item) => {
            displayArea.appendChild(entry(item));
        });

        if(!displayArea.hasChildNodes()){
            displayArea.appendChild(makeComplexElement("div", ["no-entries"], 
                "There are no tasks which meet your selection."));
        }

        return [sort.addSortBar(true), displayArea, addInputForm()];
    };

    const addInputForm = () => {
        if(filter.getParameter("Status") == "Complete") {
            return "";
        }

        const form = makeComplexElement("div", ["input-layout"]);
        form.addEventListener("keydown", (event) => {
            if(event.code === "Enter") {
                submitNewTask();
                event.preventDefault();
            }
        });

        const title = makeComplexElement("input", [], "",
            { "type": "text", "placeholder": "New task", "maxlength": 200 });


        const category = makeComplexElement("input", [], "",
            { "type": "text", "placeholder": "Category", "maxlength": 30 });


        const dateDue = makeComplexElement("input", [], "",
            { "type": "date", "min": format(new Date(), "yyyy-MM-dd") });

        const submit = makeComplexElement("button", ["lowlight"], "Add", { "type": "button" });
        submit.addEventListener("click", () => { submitNewTask() });
    
        form.append(title, category, dateDue, submit);
    
        const submitNewTask = () => {
            if(/[0-9a-zA-Z]/.test(title.value)) {
                const newTask = task(title.value, category.value, dateDue.value);
                storage.add(newTask);
                mainpage.loadContent();
            }
        }   

        /*The logic below autofills the input form if the user has 
        filtered by category or due date.*/
        const selectedCategory = filter.getParameter("Category");
        if(selectedCategory != "All categories" && selectedCategory != "No category") {
            category.textContent = selectedCategory;
        }

        const selectedDue = filter.getParameter("Date");
        if(selectedDue != "No due date" && selectedDue != "All dates") {
            dateDue.value = format(task().due.fromRelative(selectedDue), "yyyy-MM-dd");
        }

        return form;
    }

    return { load };
})();

export { display };