import { mainpage } from "./mainpage.js";

localStorage.clear();

/*
Neat ideas, but unlikely to be implemented:
1. Tooltips. - Can be done using psuedo element ::after.
4. Read again about getters and setters to check if they can be used in the task object.
9: Look for one last time about having a "due" object inside "task". - Need separate branch for this, just in case.
    170: from relative is a mess, as update doesn't know where to send dates properly.
        - all methods relating to due date are a mess, needs to be done with the iife work.

Changes:
139: when details box accepts an enter, it doesn create an actuall carriage return?
145: use form elements for input???
163: really need some better css classes: such as icon-button and text-button
164: search returns and displays completed and active results together!
    - only search in the active/complete?
165: clear search button needs more work!!!
168: Try to improve closure of object variables.
    - task - multiple
    - filter parameters
*/