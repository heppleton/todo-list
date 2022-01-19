import { drag } from "./drag.js";
import { mainpage } from "./mainpage.js";

//localStorage.clear();

/*
Changes:
9. Make the marks as complete tick look better when non-hover.
    Or not a tick at all, but a cross?
22. Get the object methods to work somehow?
    - try getters and setters
31. where should no due date tasks be sorted? first or last?
32. style date picker?? - no orange glow, and same height as text input
35. add priority flag?
    - or changing colour for different priorities?
37. make a lineinput and box input behave differently.
43. automatically add due date or topic to task when filtered??
50: add counts to due dates and topics???
51: how to handle displayed dates for completed tasks????
    - and what about task expansion???
52: add scroll to side-menu?
54: put expanded elements on a grid.
55: no resize of task holders when scroolbar appears?
56: completed and active tasks should be same height
57: The date module should be built into the task object?
    Yes!!!!
59: all topics sort by category??
61: make drag and drop work for dates and status.
    - imposible drop targets have been excluded from the "drop-target" class
    - the task method needs much less logic now.
68: rewrite task input to be somewhat better?
69: consider splitting display into a function with entry as an object?
72: tasks need method for "update paramater" which receives an object
74: add selected due date and category based on filter, into the task input form.
75: how to deal with "due date" of completed tasks?
76: make expanded task input work = PRIORITY!!!
    - what about using task input in expanded task???
77: drag could be put in a separate module, with only the bare minimum
    in the other modules???
    - attached events to document???
    - YES< BUT THIS NEEDS FINSIHING!
78: task input gives a value for category when empty which overrides default
    specified in the object.
*/