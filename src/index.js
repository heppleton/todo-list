import { mainpage } from "./mainpage.js";

//localStorage.clear();

/*
Neat ideas, but unlikely to be implemented:
1. Tooltips. - Can be done using psuedo element ::after.
4. Read again about getters and setters to check if they can be used in the task object.
9: Look for one last time about having a "due" object inside "task". - Need separate branch for this, just in case.

Changes:
139: when details box accepts an enter, it doesn create an actuall carriage return?
    - fix this with the general mess of css over that element!!!
145: use form elements for input???
150: stop it from ending editing when enter in the details edit box
159: fix bolding problem on selected filter choices in sidemenu.
163: really need some better css classes: such as icon-button and text-button
164: search returns and displays completed and active results together!
165: clear search button needs more work!!!
167: clean up the additional complete and overdue logic for entry
    - integrate better into the main method
*/