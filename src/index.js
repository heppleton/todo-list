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
44. call side-menu and display seperately??????
    - No, as both need filterParameters?
    - does display need topic list and filterparameters???
    ++these can be done through objects, so have separate modules and
        call those objects!!!
47. have a "no tasks" holder if filters retrieve no tasks.
50: add counts to due dates and topics???
51: how to handle displayed dates for completed tasks????
    - and what about task expansion???
52: add scroll to side-menu?
53: why does the topic input on expanded not stay one size?
54: put expanded elements on a grid.
55: no resize of task holders when scroolbar appears?
56: completed and active tasks should be same height
57: The date module should be built into the task object?
    Yes!!!!
59: all topics sort by category??
60: rename topic to category!
61: make drag and drop work for dates and status.
62: drop targets should all highlight on drag start.
63: remove new task input from taskspace;
64: the main filter function can just be done with && between the
    three filter options in a single filter function.
    - can make topic list be done elsewhere??
65: taskspace can load automatically, then call for sidemenu load and
    content load, which just pulls from filter, which pulls form storage????
    - yes this is the correct way of thinking about it!!!!
66: fix the side menu code which highlights the currently selected option.
67: clean up the expanded layout logic which closes other expanded layout?
*/