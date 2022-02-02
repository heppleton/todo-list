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
    - do search first as layout is easier and can get the style right.
        - clear search button doesn't appear to appear.
    - consider using a form to generate data object.
175: from relative is a mess, as update doesn't know where to send dates properly.
176: overhaul all due date methods.
    - getDueString should be renamed!! very obvious now. - formatDate, like with status
    - storage gets due date directly. change!
177: could revive a task by doing object assign three times??
179: add some methods to prototype chains?
180: check search button can't be clicked twice.
    - if you press enter, then it can still be clicked.
*/