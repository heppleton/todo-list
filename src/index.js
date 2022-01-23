import { mainpage } from "./mainpage.js";

//localStorage.clear();

/*
Neat ideas, but not going to be implemented:
1. Tooltips.
2. Categories can be renamed. 
3. Categories can be made permanent (so still show despite no active tasks).
4. Read again about getters and setters to check if they can be used in the task object.
5. Categories can be deleted.
6. Categories can be merged.
7. Categories can be assigned colours.

Changes:
32. style the date picker?? - no orange glow, and same height as text input
35. add priority flag?
    - or changing colour for different priorities?
50: add counts to due dates and topics???
52: add scroll to side-menu?
55: no resize of task holders when scrollbar appears?
68: rewrite task input to be somewhat better?
74: add selected due date and category based on filter, into the task input form.
79: make the "no entries" text a little bit more descriptive:
    "no overdue leasure tasks" or "no work tasks in the next seven days"
82: Bar at top of display allowing click for sorting choice???
86: might want to separate "sort" from "filter". - priority 2
    - do category
    - do title
88: change font measures to rem and em?
89: A separate "date" sub-object with "task". - priority 1
    - could this be done with an iife?
    - Yes!!!!!!!!!!
92: categories could have colour boxes??
94: categories are case sensitive
95: complete tick is italic when complete: stop it! don't like!
96: remove ability to edit completed tasks
97: do I really need expanded tasks? just click and turn the whole lot editable????
    -"expanded layout" becomes "edit layout?"
    - yes! it will actually cause less work overall!
    - and the new task input will share the same layout!!!!!!!
98: tick and check shouldn't be red on overdue, and check should be permanently green on completed.
99: check that text in holder is aligned centrally to the height of the buttons?
100: remove cursore and lowlight styles from completed tasks.]
101: Should categories just remain the same, based on the whole array?
    - that way, once created, categories would be permanent.
102: no input form when showing only complete tasks.
103: maximum length for titles (100?) and categories (20?)

Problems with other browsers:
2. Scrollbars appear st the bottom of input boxes.
*/