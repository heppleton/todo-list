import { mainpage } from "./mainpage.js";
import { task } from "./task.js";

/*
Change:
169: tooltips
175: from relative is a mess, as update doesn't know where to send dates properly.
176: overhaul all due date methods.
    - getDueString should be renamed!! very obvious now. - formatDate, like with status
    - storage gets due date directly. change!
178: when I edit a task, the details value is missing??
*/