import { mainpage } from "./mainpage.js";
import { task } from "./task.js";

/*
Change:
167: suggest category when typing?
    - try, but not enough time right now.
168: doesn't clear autofill for category and instead change to autofill for date.
169: tooltips
170: changes to using form inputs for text and buttons
    - easier to limit text input size
172: get task by id could be in the task object?
173: status is done but needs more work to enclose complete date
    - entry gets completed directly and formats it for completed tasks. could be done with get completed string??
    - sample pushes a value directly to completed, so maybe that could be changed?
    - storage also reference completed directly.
    - getCompletedstring might be useful to change name.
174: see if any other task variables can be enclosed.
175: from relative is a mess, as update doesn't know where to send dates properly.
176: overhaul all due date methods.
    - getDueString should be renamed!! very obvious now.
    - storage gets due date directly. change!
177: remove "this" as much as possible once the new nested objects are working.
*/