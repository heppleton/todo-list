import { filter } from "./filter.js";

const entries = (() => {

    const load = () => {
        const displayArea = document.querySelector(".display-area");
        displayArea.replaceChildren();
        
        filter.getFilteredArray().forEach(entry => {
            const entryHolder = document.createElement("div");
            entryHolder.classList.add("entry-holder");

            addBasicLayout(entry, entryHolder);

            displayArea.appendChild(entryHolder);
        });

/*
    makeDraggable(taskHolder, currentTask);
    newTaskInput(displayArea);
}*/


    }

    const addBasicLayout = (entry, entryHolder) => {
        const basicLayout = document.createElement("div");
        basicLayout.classList.add("entry-basic-layout", "lowlight");

        const title = document.createElement("div");
        title.textContent = entry.title;

        const topic = document.createElement("div");
        topic.textContent = entry.topic;

        const dateDue = document.createElement("div");
        dateDue.textContent = ""//getRelativeDate(entry.getDueDate());//do this now!!!

        const buttonHolder = document.createElement("div");
        buttonHolder.classList.add("task-button-holder");

        basicLayout.append(title, topic, dateDue, buttonHolder);

        basicLayout.addEventListener("click", () => {
            addExpandedLayout(entry, entryHolder, basicLayout);
        });

        /*
        const completeButton = document.createElement("div");
        completeButton.classList.add("complete-button");
        completeButton.textContent = "\u2713";
        completeButton.addEventListener("click", () => {
            currentTask.markComplete();
            storage.save(currentTask);
        });

        taskButtonHolder.append(completeButton);
        
        
        if(currentTask.checkStatus("complete")) {
            taskLayout.classList.add("completed-task");
            taskDueDate.textContent =
                format(new Date(currentTask.dateCompleted), "dd MMMM yyyy");
            taskLayout.removeChild(taskButtonHolder);
        }
        
        if(taskDueDate.textContent == "overdue") {
            taskHolder.classList.add("overdue-task");
        }*/

        entryHolder.append(basicLayout);
    }

    const addExpandedLayout = (entry, entryHolder, basicLayout) => {
        
        //need to fix this, so messy and buggy
        const expandedEntry = document.querySelector(".entry-expanded-layout").parentElement;
        if(expandedEntry) {
            expandedEntry.removeChild(expandedEntry.lastElementChild);
            if(expandedEntry == entryHolder) {
                return;
            }
        }

        const expandedLayout = document.createElement("div");
        expandedLayout.classList.add("entry-expanded-layout");


        entryHolder.append(expandedLayout);
    /*
    const titleInput = document.createElement("span");
    titleInput.setAttribute("contenteditable", "true");
    titleInput.setAttribute("data-placeholder", "task title...");
    titleInput.textContent = selectedTask.title;
    titleInput.classList.add("title-input", "text-input");

    const areaInput = document.createElement("span");
    areaInput.setAttribute("contenteditable", "true");
    areaInput.setAttribute("data-placeholder", "topic...");
    areaInput.textContent = selectedTask.topic;
    areaInput.classList.add("text-input");

    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("type", "date");
    dueDateInput.setAttribute("value", selectedTask.getDueDate());
    dueDateInput.setAttribute("min", format(new Date(), "yyyy-MM-dd"));

    const descriptionInput = document.createElement("span");
    descriptionInput.setAttribute("contenteditable", "true");
    descriptionInput.setAttribute("data-placeholder", "description...");
    descriptionInput.textContent = selectedTask.description;
    descriptionInput.classList.add("description-input", "text-input");

    const changeSubmitButton = document.createElement("div");
    changeSubmitButton.classList.add("button", "lowlight");
    changeSubmitButton.textContent = "update";
    changeSubmitButton.addEventListener("click", () => {
        selectedTask.title = titleInput.textContent;
        selectedTask.description = descriptionInput.textContent;
        selectedTask.topic = areaInput.textContent;
        selectedTask.dateDue = dueDateInput.value;
        taskHolder.removeChild(expandedTask);
        storage.save(selectedTask);
    });

    expandedTask.append(titleInput, areaInput,
        dueDateInput, descriptionInput, changeSubmitButton);


}*/


    }

    return { load };
})();

export { entries };

