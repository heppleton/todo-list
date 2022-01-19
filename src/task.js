import { differenceInCalendarDays, format } from "date-fns";

const task = (title, category = "no category", dateDue = "") => {
    let description = "";
    const dateAdded = (new Date()).toString();
    let dateCompleted;

    const markComplete = function() {
        this.dateCompleted = (new Date()).toString();
    };

    //Returns a boolean whether the task has a specific status.
    const checkStatus = function(status) {
        if(status == "all") {
            return true;
        } else if (status == "complete" && this.dateCompleted) {
            return true;
        } else if (status == "active" && !this.dateCompleted) {
            return true;
        } else {
            return false;
        }
    };

    //Returns a boolean whether a task is in the specified category.
    const checkCategory = function(category) {
        if(category == "all categories") {
            return true;
        } else if(category == this.category) {
            return true;
        } else {
            return false;
        }
    }

    const getDueDate = function() {
        return this.dateDue;
    }

    //Returns a date based on a relate text string.
    const getDateFromRelative = function() {

    }

    //Returns a string describing the task's due date relative to today.
    const getRelativeDate = function() {
        if(this.dateDue == "") {
            return "no due date";
        }

        const dateDueObject = new Date(this.dateDue);
        const dateDifference = differenceInCalendarDays(
            dateDueObject, new Date());
       
        if(dateDifference < 0) {
            return "overdue";
        } else if (dateDifference == 0) {
            return "today";
        } else if (dateDifference == 1) {
            return "tomorrow";
        } else {
            return format(dateDueObject, "dd MMMM yyyy");
        }
    }

    const updateTask = function(newProperties) {
        /*
        const updateCategory = function(newCategory) {
            if(newCategory == "all categories")
            console.log("hellocat");
            //1 category - just change if not "all";
        }

        const updateDateDue = function(newCategory) {
            console.log("hellodate");
            //3 date - check if "all", then get date from relative
        }

        const updateStatus = function(newCategory) {
            console.log("hellostatus");
            //2 status - add/remove completed date if not "all";
        }
        const functionMap = { "category": updateCategory,
            "date": updateDateDue,
            "status": updateStatus }

        for(var key in newProperties) {
            functionMap[key](newProperties[key]);
        }
        */
    }

    return { title, description, category, dateAdded, dateCompleted, dateDue, 
        markComplete, getDueDate, getRelativeDate,
        checkStatus, checkCategory, updateTask };
};

export { task };