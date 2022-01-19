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

export { checkRelativeDate }