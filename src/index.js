import { mainpage } from "./mainpage.js";

localStorage.clear();

/*
Neat ideas, but unlikely to be implemented:
1. Tooltips. - Can be done using psuedo element ::after.
4. Read again about getters and setters to check if they can be used in the task object.
9: Look for one last time about having a "due" object inside "task". - Need separate branch for this, just in case.

Changes:
139: when details box accepts an enter, it doesn create an actuall carriage return?
145: use form elements for input???
163: really need some better css classes: such as icon-button and text-button
164: search returns and displays completed and active results together!
    - only search in the active/complete?
165: clear search button needs more work!!!
    - give it a backgoround on hover, not a colour, use rem
168: Try to improve closure of object variables.
    - task - multiple
    - filter parameters
169: no due date tasks throw an error when being edited?
    - something to do with passing time to a function.
170: "no details" now shows instead of a data placeholder...don't really like that it has to be deleted.
171: why are there seven!!! calls to get master array?
    - mostly in category counts.
173: need to implement a better id system than the one I have.
    - tasks now have an id based on Date.now() times Math.random();
*/