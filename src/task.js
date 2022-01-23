import { addDays, differenceInCalendarDays, format } from "date-fns";
import { storage } from "./storage";

const task = (title, categoryInput, due = "") => {
    let category = categoryInput || "no category";
    const added = (new Date()).toString();
    let completed = "";

    const update = function(newProperties) {
        const updateMap = {
            "category": (value) => { this.category = value || "no category" },
            "date": (value) => { this.due = fromRelative(value) },
            "status": (value) => { this.completed = toStatus(value) },
            "title": (value) => { this.title = value }
        }

        for(var key in newProperties) {
            updateMap[key](newProperties[key]);
        }

        storage.save(this);
    };

    const toStatus = function(value) {
        if(value == "active") {
            return "";
        }  
        if(completed == "") {
            return (new Date()).toString();
        }
    };

    const isStatus = function(status) {
        if(status == "all") {
            return true;
        } else if (status == "complete" && this.completed) {
            return true;
        } else if (status == "active" && !this.completed) {
            return true;
        } else {
            return false;
        }
    };

    const isCategory = function(category) {
        if(category == "all categories" || category == this.category) {
            return true;
        } else {
            return false;
        }
    };

    const isRelative = function(relativeDate) {
        const today = new Date();
        const dateDifference = differenceInCalendarDays(new Date(this.due), today);

        const map = {
            "all dates": () => { return true },
            "no due date": () => { return this.due == "" },
            "overdue": () => { return dateDifference < 0 },
            "today": () => { return dateDifference == 0 },
            "tomorrow": () => { return dateDifference == 1 },
            "next seven days": () => { return dateDifference >= 0 &&
                dateDifference <= 6 },
        }

        return map[relativeDate]();
    }

    const toRelative = function() {
        if(this.due == "") {
            return "no due date";
        }

        const dateDueObject = new Date(this.due);
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
    };

    /*This takes either relative date text or formatted date string.
    It returns either nothing (no due date) or a formatted date string.*/
    const fromRelative = function(chosenDate) {
        if(chosenDate == "no due date") {
            return "";
        }

        const relativeDifferences = {
            "overdue": -1,
            "today": 0,
            "tomorrow": 1,
            "next seven days": 6
        };

        if(!(chosenDate in relativeDifferences)) {
            return chosenDate;
        }

        const newDateObject = addDays(new Date(),
            relativeDifferences[chosenDate]);

        return format(newDateObject, "yyyy-MM-dd");
    };

    return { title, category, added, completed, due,
        update, toStatus, isStatus, isCategory,
        isRelative, toRelative, fromRelative
    };
};

export { task };