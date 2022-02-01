import { mainpage } from "./mainpage.js";
import { task } from "./task.js";

/*This line is only here to allow for testing.
Commenting it out will save changes locally.
Running this code will reset to sample tasks after one cycle.*/
localStorage.clear();

/*
Change:
9: Have a "due" object inside "task". - Need separate branch for this, just in case.
    170: from relative is a mess, as update doesn't know where to send dates properly.
        - all methods relating to due date are a mess, needs to be done with the iife work.
    - might want an iife for status too?
    - need better closure on the variables too.

167: suggest category code?
    - try, but not enough time right now.
168: doesn't clear autofill for category and instead change to autofill for date.
169: tooltips
170: changes to using form inputs for text and buttons
172: get task by id could be in the task object?
*/