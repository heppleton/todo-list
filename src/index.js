import { mainpage } from "./mainpage.js";

//localStorage.clear();

/*
Neat ideas, but unlikely to be implemented:
1. Tooltips.
4. Read again about getters and setters to check if they can be used in the task object.
5. Read about rem and em measures to see if they should be used.
6: Learn about root in CSS and if I could use it for variable styling. Such as by clicking the dot.
7: Consider the possibility of a search bar.
8: Offer choices of categories when user types into category input.
9: Look for one last time about having a "due" object inside "task". - Need separate branch for this, just in case.

Changes:
113: what happens if you remove the last task of a category while you're still in it?
    - nothing bad! but maybe default to all categories??
    - would need to have category counts for this!
116: dates should always be objects.
    - do completed first as it will break fewer things.
134: reset due date/category filters when not "all".
    - only for active - completed no longer filter by date
135: end editing when another task expanded?
136: What does tab do in an input or editing layout? where does it go next??
138: put complete and delete buttons in a div, so they stack when squeezed???
    - easier to match layout with editing and input too!
139: when details box accepts an enter, it doesn create an actuall carriage return?
    - fix this with the general mess of css over that element!!!
142: dragged items need to be smaller.
    - leave them in place, faintly, with smaller item being dragged?
145: use form elements for input???
146: really do reconsider adding counts to the sidemenu
148: is updatemasterarray in filter used??
149: dropping a completed task on complete should not add new complete date!!!!
    - problem with the scope of the "toStatus" method in task
150: stop it from ending editing when enter in the details edit box
154: input form add button should not be green when pressed.
157: should you be allowed to edit complete tasks??
    - and due date doesn't match up with the complete date in the sort bar.
*/