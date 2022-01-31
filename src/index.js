import { mainpage } from "./mainpage.js";

/*This line is only here to allow for testing.
Commenting it out will save changes locally.
Running this code will reset to sample tasks after one cycle.*/
localStorage.clear();

/*
Need to branch before I do the following, as high risk of breaking code:
4. Read again about getters and setters to check if they can be used in the task object.
9: Look for one last time about having a "due" object inside "task". - Need separate branch for this, just in case.
    170: from relative is a mess, as update doesn't know where to send dates properly.
        - all methods relating to due date are a mess, needs to be done with the iife work.
    - might want an iife for status too?
    - need better closure on the variables too.

167: suggest category code?
    - try, but not enough time right now.
*/