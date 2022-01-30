import { addDays, differenceInCalendarDays, format } from "date-fns";
import { task } from "./task.js"

const makeSample = () => {
    let sampleArray = [];
    const rawArray = [
        { "title": "Ring Edgar about the consultancy contract.", "category": "Work", 
            "details": "Tried ringing yesterday but no reply. Sent email asking him to contact me.",
            "due": 2, "completed": null },
        { "title": "Get tickets for the symphony's Smetana concert", "category": "Fun",
            "details": "I'm only really familiar with Die Moldau, but I'm sure his other work is good.",
            "due": 6, "completed": null },
    ];

    rawArray.forEach((entry) => {
        const newTask = task(entry.title, entry.category)
        const additionalProperties = {
            "Details": entry.details,
            "Date": format(addDays(new Date(), entry.due), "yyyy-MM-dd")
        }
        newTask.update(additionalProperties);
        newTask.completed = entry.completed;
        
                //completed will need to be a date object if not null
        sampleArray.push(newTask);
    });


/*The goal here is to create a sample of tasks to load if the user has no localstorage file.
There will be 15 tasks in total. Enough to fill the app but not too many that it will be impossibly
time-consuming to create.

Make a single one to get everything right, then do the rest!

The fields to create are: title, details, category, date added, date completed, date due.
The first three are easy, but the other need to have care taken:
    - Date added must always be distinct from any other task. This might not be the case if a computer
        creates the task. Use setTimeout to delay each task being created.
    - Date due must be relative to when the tasks are generated. 
        Possible use different in days in date-dns.
    - Date completed must be relative to when the tasks are generated.

Breakdown of tasks:
    - Each will have a unique title.
    - Each will have a unique date added.
    - 10 will have details, 5 will not.
    - Four categories:
        - Work - 5 tasks
        - House - 2 tasks
        - Shopping - 3 tasks
        - Fun - 5 tasks
        - Two without categories
    - Due dates:
        - 1 with no due date
        - 1 overdue
        - 2 today
        - 2 tomorrow
        - 2 next seven days
        - 2 more than a week away.
    - Date completed
        - 10 active
        - 5 with complete dates
            - one each for the last five days
            - will need due dates too, just set to the day completed.
                - why?

Try to be witty!*/

    return sampleArray;
};

export { makeSample };