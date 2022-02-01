import { addDays, differenceInCalendarDays, format } from "date-fns";

const task = (title, category, dueDate) => {  
    category = category || "No category";
    category = category.slice(0, 1).toUpperCase() + category.slice(1, 29);
    const added = Date.now();
    const id = added * Math.random();
    let details = "";

    function update(newProperties) {
        const updateMap = {
            "Category": (value) => { this.category = value || "No category" },
            "Date": (value) => { this.due.date = due.fromRelative(value) },
            "Details": (value) => { this.details = value.slice(0, 2999) },
            "Status": (value) => { 
                if(value == "Active") {
                    this.status.completed = null;
                    return;
                }
                if(this.status.completed == null) {
                    this.status.completed = new Date();
                }
            },
            "Title": (value) => { this.title = value }
        }

        for(var key in newProperties) {
            updateMap[key](newProperties[key]);
        }
    };

    const due = ((date) => {
        if(date) {
            date = new Date(date);
        }
    
        /*Creates a formatted due date string which can be used for sorting
        and by the date picker input.*/
        function getDueString() {
            if(this.date) {
                return format(this.date, "yyyy-MM-dd");
            }
            return "";
        }

        /*Checks whether the due date is covered by the supplied relative date text.*/
        function isRelative(relativeDate) {
            const today = new Date();
            const dateDifference = differenceInCalendarDays(this.date, today);

            const map = {
                "All dates": () => { return true },
                "No due date": () => { return this.date == null },
                "Overdue": () => { return dateDifference < 0 },
                "Today": () => { return dateDifference == 0 },
                "Tomorrow": () => { return dateDifference == 1 },
                "Next seven days": () => { return dateDifference >= 0 &&
                    dateDifference <= 6 },
            }

            return map[relativeDate]();
        }

        /*Creates relative date text based on the task's due date.*/
        function toRelative() {
            if(!this.date) {
                return "No due date";
            }

            const dateDifference = differenceInCalendarDays(
                this.date, new Date());
        
            if(dateDifference < 0) {
                return "Overdue";
            } else if (dateDifference == 0) {
                return "Today";
            } else if (dateDifference == 1) {
                return "Tomorrow";
            } else {
                return format(this.date, "d MMMM yyyy");
            }
        };

        /*Takes a date which is a relate date text, a date object, or nothing.
        It returns either nothing (no due date) or a date object.*/
        function fromRelative(chosenDate) {
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

        return { date, getDueString, isRelative, toRelative, fromRelative };
    })(dueDate);

    const status = (() => {
        let completed = null;

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
    
        const getCompletedString = function() {
            if(this.completed) {
                return format(this.completed, "yyyy-MM-dd");
            }
            return "";
        };

        const test = "";

        return { completed, isStatus, getCompletedString }
    })();

    function isCategory(category) {
        if(category == "All categories" || category == this.category) {
            return true;
        } else {
            return false;
        }
    };



    return { title, category, id, status, due, details,
        update, status, due, isCategory
    };
};

export { task };