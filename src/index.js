import { mainpage } from "./mainpage.js";

//localStorage.clear();

/*
Neat ideas, but unlikely to be implemented:
1. Tooltips. - Can be done using psuedo element ::after.
4. Read again about getters and setters to check if they can be used in the task object.
9: Look for one last time about having a "due" object inside "task". - Need separate branch for this, just in case.

Changes:
113: what happens if you remove the last task of a category while you're still in it?
    - nothing bad! but maybe default to all categories??
    - would need to have category counts for this!
135: end editing when another task expanded?
139: when details box accepts an enter, it doesn create an actuall carriage return?
    - fix this with the general mess of css over that element!!!
145: use form elements for input???
146: really do reconsider adding counts to the sidemenu
150: stop it from ending editing when enter in the details edit box
159: fix bolding problem on selected filter choices in sidemenu.
163: really need some better css classes: such as icon-button and text-button
164: search returns and displays completed and active results together!
165: clear search button needs more work!!!
167: clean up the additional complete and overdue logic for entry
    - integrate better into the main method
168: remove leading 0 from 1 digit dates.
169: clicking between active and completes should reset filter options??
170: Close expanded task when dragging.
*/