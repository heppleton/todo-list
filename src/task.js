import { addDays, differenceInCalendarDays, format } from "date-fns";
import { storage } from "./storage";

const task = (title, category, due) => {  
    category = category || "No category";
    category = category.slice(0, 1).toUpperCase() + category.slice(1, 29);
    const added = Date.now();
    const id = added * Math.random();
    let completed = null;
    let details = ""
    if(due) {
        due = new Date(due);
    }

    const update = function(newProperties) {
        const updateMap = {
            "Category": (value) => { this.category = value || "No category" },
            "Date": (value) => { this.due = fromRelative(value) },
            "Details": (value) => { this.details = value },
            "Status": (value) => { 
                if(value == "Active") {
                    this.completed = null;
                    return;
                }
                if(this.completed == null) {
                    this.completed = new Date();
                }
            },
            "Title": (value) => { this.title = value }
        }

        for(var key in newProperties) {
            updateMap[key](newProperties[key]);
        }
    };

    const getCompletedString = function() {
        if(this.completed) {
            return format(this.completed, "yyyy-MM-dd");
        }
        return "";
    }

    const isStatus = function(status) {
        if(status == "All") {
            return true;
        } else if (status == "Complete" && this.completed) {
            return true;
        } else if (status == "Active" && !this.completed) {
            return true;
        } else {
            return false;
        }
    };

    const isCategory = function(category) {
        if(category == "All categories" || category == this.category) {
            return true;
        } else {
            return false;
        }
    };

    /*Creates a formatted due date string which can be used for sorting
    and by the date picker input.*/
    const getDueString = function() {
        if(this.due) {
            return format(this.due, "yyyy-MM-dd");
        }
        return "";
    }

    /*Checks whether the due date is covered by the supplied relative date text.*/
    const isRelative = function(relativeDate) {
        const today = new Date();
        const dateDifference = differenceInCalendarDays(this.due, today);

        const map = {
            "All dates": () => { return true },
            "No due date": () => { return this.due == null },
            "Overdue": () => { return dateDifference < 0 },
            "Today": () => { return dateDifference == 0 },
            "Tomorrow": () => { return dateDifference == 1 },
            "Next seven days": () => { return dateDifference >= 0 &&
                dateDifference <= 6 },
        }

        return map[relativeDate]();
    }

    /*Creates relative date text based on the task's due date.*/
    const toRelative = function() {
        if(!this.due) {
            return "No due date";
        }

        const dateDifference = differenceInCalendarDays(
            this.due, new Date());
    
        if(dateDifference < 0) {
            return "Overdue";
        } else if (dateDifference == 0) {
            return "Today";
        } else if (dateDifference == 1) {
            return "Tomorrow";
        } else {
            return format(this.due, "d MMMM yyyy");
        }
    };

    /*Takes a date which is a relate date text, a date object, or nothing.
    It returns either nothing (no due date) or a date object.*/
    const fromRelative = function(chosenDate) {
        if(chosenDate == "No due date" || !chosenDate) {
            return null;
        }

        const relativeDifferences = {
            "Overdue": -1,
            "Today": 0,
            "Tomorrow": 1,
            "Next seven days": 6
        };

        if(!(chosenDate in relativeDifferences)) {
            return new Date(chosenDate);
        }

        const newDate = addDays(new Date(),
            relativeDifferences[chosenDate]);     

        return newDate;
    };

    return { title, category, id, completed, due, details,
        update, getCompletedString, isStatus, isCategory,
        getDueString, isRelative, toRelative, fromRelative,
    };
};

export { task };