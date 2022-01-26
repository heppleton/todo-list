import { addDays, differenceInCalendarDays, format } from "date-fns";
import { storage } from "./storage";

const task = (title, category, due = "") => {  
    category = category || "No category";
    category = category.slice(0, 1).toUpperCase() + category.slice(1, 29);
    const added = (new Date()).toString();
    let completed = "";
    let details = ""

    const update = function(newProperties) {
        const updateMap = {
            "Category": (value) => { this.category = value || "No category" },
            "Date": (value) => { this.due = fromRelative(value) },
            "Details": (value) => { this.details = value },
            "Status": (value) => { this.completed = toStatus(value) },
            "Title": (value) => { this.title = value }
        }

        for(var key in newProperties) {
            updateMap[key](newProperties[key]);
        }

        storage.save(this);
    };

    const toStatus = function(value) {
        if(value == "Active") {
            return "";
        }
        if(completed == "") {
            return (new Date()).toString();
        }
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


    const isRelative = function(relativeDate) {
        const today = new Date();
        const dateDifference = differenceInCalendarDays(new Date(this.due), today);

        const map = {
            "All dates": () => { return true },
            "No due date": () => { return this.due == "" },
            "Overdue": () => { return dateDifference < 0 },
            "Today": () => { return dateDifference == 0 },
            "Tomorrow": () => { return dateDifference == 1 },
            "Next seven days": () => { return dateDifference >= 0 &&
                dateDifference <= 6 },
        }

        return map[relativeDate]();
    }

    const toRelative = function() {
        if(this.due == "") {
            return "No due date";
        }

        const dateDueObject = new Date(this.due);
        const dateDifference = differenceInCalendarDays(
            dateDueObject, new Date());
    
        if(dateDifference < 0) {
            return "Overdue";
        } else if (dateDifference == 0) {
            return "Today";
        } else if (dateDifference == 1) {
            return "Tomorrow";
        } else {
            return format(dateDueObject, "dd MMMM yyyy");
        }
    };

    /*This takes either relative date text or formatted date string.
    It returns either nothing (no due date) or a formatted date string.*/
    const fromRelative = function(chosenDate) {
        if(chosenDate == "No due date") {
            return "";
        }

        const relativeDifferences = {
            "Overdue": -1,
            "Today": 0,
            "Tomorrow": 1,
            "Next seven days": 6
        };

        if(!(chosenDate in relativeDifferences)) {
            return chosenDate;
        }

        const newDateObject = addDays(new Date(),
            relativeDifferences[chosenDate]);

        return format(newDateObject, "yyyy-MM-dd");
    };

    return { title, category, added, completed, due, details,
        update, toStatus, isStatus, isCategory,
        isRelative, toRelative, fromRelative,     
    };
};

export { task };