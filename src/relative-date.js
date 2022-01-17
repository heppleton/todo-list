import { differenceInCalendarDays, format } from "date-fns";

const checkRelativeDate = (dateOption, dateString) => {
    const dateDue = new Date(dateString);
    const today = new Date();

    const dateDifference = differenceInCalendarDays(dateDue, today);

    const map = {
        "all dates": () => { return true },
        "no due date": () => { return dateString == "" },
        "overdue": () => { return dateDifference < 0 },
        "today": () => { return dateDifference == 0 },
        "tomorrow": () => { return dateDifference == 1 },
        "next seven days": () => { return dateDifference >= 0 &&
            dateDifference <= 6 },
    }
    return map[dateOption]();
}

const getRelativeDate = (dateString) => {
    if(dateString == "") {
        return "no due date";
    }

    const dateDue = new Date(dateString);
    const today = new Date();

    const dateDifference = differenceInCalendarDays(dateDue, today);
    
    if(dateDifference < 0) {
        return "overdue";
    } else if (dateDifference == 0) {
        return "today";
    } else if (dateDifference == 1) {
        return "tomorrow";
    } else {
        return format(dateDue, "dd MMMM yyyy");
    }
}

export { getRelativeDate, checkRelativeDate }