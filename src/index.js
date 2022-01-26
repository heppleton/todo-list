import { mainpage } from "./mainpage.js";

//localStorage.clear();

/*
Neat ideas, but unlikely to be implemented:
1. Tooltips.
4. Read again about getters and setters to check if they can be used in the task object.
5. Read about rem and em measures to see if they should be used.

Changes:
113: what happens if you remove the last task of a category while you're still in it?
    - nothing bad! but maybe default to all categories??
116: dates should always be objects.
120: when typing category offer some choices??
121: make some final decisions on colours and styling. - outfit is a nice font.
    - maybe allow people to pick a colour palette?
126: what drag and drop should completed tasks have?
129: how do date filters deal with completed tasks??
    - if changing to completed, switch to all dates?
132: why not show date completed on completed tasks?
    - i forget why this is a problem.
134: reset due date/category filters when not "all".
135: end editing when another task expanded?
136: What does tab do in an input or editing layout? where does it go next??
137: style scrollbars?
138: put complete and delet buttons in a div, so they stack when squeezed???
    - easier to match layout with editing and input too!
139: when details box accepts an enter, it doesn create an actuall carriage return?
    - fix this with the general mess of css over that element!!!
140: ensure make complex element helper is used everywhere it can be:
    - display - part way through
    - entry
    - sidemenu
141: bigger and better button for adding a new task?
    - in the top left corner of the side menu?
    - when clicked load input form into it!
    - need a button to minimise too!
    - do a transition when it grows to incorporate the input form.
    - might also need it to overflow its container.
        - or change the overflow of its container while open?
142: dragged items need to be smaller.
143: remove the "all" option from status
    - display completed date
    - fix for completed date in sort also
145: use form elements for input???
*/