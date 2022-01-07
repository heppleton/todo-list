import { taskspace } from "./taskspace.js";

/*
Changes:
1. This needs to be redone completely!!!!
7. Give the new project and input buttons and order of 1 to put them at
    the end when in a grid? Why not just exist in different divs and find the
    sibling to attach them to?
8. Think about the structure and split between objects and DOM.
    - all actions will come off the div where the task is created
    thus it should be possible to hand the reference back and forth
    there. Code calls are just to change or retrieve data, so
    will come back to their callers.
9. Make the marks as complete tick look better when non-hover.
10a. Make fifth board appear in dock at the side.
    Behaviour:
    c) Boards appearing in the dock area should be title only.
        (Use a descendent dock > project display: none to achieve this.
            A new div will be needed to split the project title from the 
            content.)
    e) If a board is moved or deleted from the display area, the add
            board button should move back there too.
11. task input can be just spaces. is that a problem?
12. make tooltip module!!!
13. disable completed tasks. - grey them out.
14. cycle board colours, and have more of them.
             - Pastel blue, yellow, red, purple, and green
15. Task should be permanently highlighted, but with addition bar at the 
    side when hovered.
16. Single use event handler on project board title to allow it to be edited.
17. Make colour a property of the project object.
18. Remove the input + button for a new task?
19. Remove highlight text option from body of page.
20. Projects and tasks should have more functions inside them, maybe?
        Rather than being just respositories for data? But they shouldn't do
        direct DOM manipulation! Maybe only drive other modules?
21. Why isn't taskinput in the project handler module??
    Just history and no other reason.

Design:
1. Your ‘todos’ are going to be objects that you’ll want to dynamically create, 
    which means either using factories or constructors/classes to generate them.
2. Brainstorm what kind of properties your todo-items are going to have. At a 
    minimum they should have a title, description, dueDate and priority. You 
    might also want to include notes or even a checklist.
    a) title
    b) description
    c) dueDate
    d) priority
    e) createdDate
    f) type/topic - this goes into projects? or comes from it?
    g) progress
    h) dependency?
    i) notes
    j) checklist
3. Your todo list should have projects or separate lists of todos. When a user 
    first opens the app, there should be some sort of ‘default’ project to which 
    all of their todos are put. Users should be able to create new projects and 
    choose which project their todos go into.
4. You should separate your application logic (i.e. creating new todos, setting 
    todos as complete, changing todo priority etc.) from the DOM-related stuff, 
    so keep all of those things in separate modules.
    Modules:
    a) todos with details and functions
    b) projects with todos and functions
    c) module for the workboard? and moving things around?
    d) 
5. The look of the User Interface is up to you, but it should be able to do the 
    following:
    a) view all projects
    b) view all todos in each project (probably just the title and duedate.. 
        perhaps changing color for different priorities)
    c) expand a single todo to see/edit its details
    d) delete a todo
6. For inspiration, check out the following great todo apps. (look at screenshots, 
    watch their introduction videos etc.)
    a) Todoist
    b) Things
    c) any.do
7. Since you are probably already using webpack, adding external libraries from 
    npm is a cinch! You might want to consider using the following useful library 
    in your code:
    * date-fns gives you a bunch of handy functions for formatting and manipulating 
        dates and times.
8. We haven’t learned any techniques for actually storing our data anywhere, so 
    when the user refreshes the page, all of their todos will disappear! You 
    should add some persistence to this todo app using the Web Storage API.
    localStorage (docs here) allows you to save data on the user’s computer. 
    The downside here is that the data is ONLY accessible on the computer that it 
    was created on. Even so, it’s pretty handy! Set up a function that saves the 
    projects (and todos) to localStorage every time a new project (or todo) is 
    created, and another function that looks for that data in localStorage when 
    your app is first loaded. Additionally, here are a couple of quick tips to 
    help you not get tripped up:
        a) Make sure your app doesn’t crash if the data you may want retrieve 
        from localStorage isn’t there!
        b) localStorage uses JSON to send and store data, and when you retrieve 
        the data, it will also be in JSON format. You will learn more about this 
        language in a later lesson, but it doesn’t hurt to get your feet wet now. 
        Keep in mind you cannot store functions in JSON, so you’ll have to figure 
        out how to add methods back to your object properties once you fetch them. 
        Good luck!
*/
