import { addDays } from "date-fns";
import { task } from "./task.js"

const makeSample = () => {
    let sampleArray = [];
    const rawArray = [
        { "title": "Ring Edgar about the consultancy contract", "category": "Work", 
            "details": "Tried ringing yesterday but no reply. Sent email asking him to contact me.",
            "due": -1, "completed": null },
        { "title": "Get tickets for the symphony's Smetana concert", "category": "Leisure",
            "details": "I'm only really familiar with Die Moldau, but I'm sure his other work is good.",
            "due": 6, "completed": null },
        { "title": "Clear out the garage", "category": "House",
            "details": "There is years of rubbish stacked up in there. It needs to go!",
            "due": null, "completed": null },
        { "title": "Buy Daisy a new hat", "category": "Shopping",
            "details": "The old one with the owls on it is worn out.",
            "due": 14, "completed": null },
        { "title": "Check out the new dog park.", "category": "Leisure",
            "details": "The address is 1475 Boxwood Avenue. Clement can take Mikki there if it's nice.",
            "due": -5, "completed": -6 },
        { "title": "Repaint Daisy's room", "category": "House",
            "details": "Daisy chose pink...",
            "due": -19, "completed": -10 },
        { "title": "Finish year-end report", "category": "Work",
            "details": "The report will need to go to finance first to check the numbers." + 
                " I should run it by Ellen in business intelligence at some point too. Her feedback is always fab.",
            "due": -1, "completed": -3 },
        { "title": "Get Steve to eat better", "category": "",
            "details": "Less red meat! Even if he just eats chicken instead that would be a start.",
            "due": 30, "completed": null },
        { "title": "Invent cold fusion", "category": "",
            "details": "Easy! Just give me thirty years...",
            "due": 10957, "completed": null },
        { "title": "Go to the supermarket...", "category": "Shopping",
            "details": `The usual stuff, plus:
                - extra milk
                - chicken (cook something nice for Steve?)
                - marzipan for Ellen's thank you cake
                - different food for Mikki (gone off her usual for some reason)
                - a towel for travelling`, 
            "due": 1, "completed": null },
        { "title": "Walk round Highfield Lane and back past St Helen's Well", "category": "Leisure",
            "details": "Leave Clement and Daisy with Steve. Take time for myself.",
            "due": "0", "completed": null },
        { "title": "Speak to manager about promotion", "category": "Work",
            "details": "He'll be more receptive once he's back from his holiday, so wait til then.",
            "due": 80, "completed": null },
        { "title": "Flexi: work from home day", "category": "Work", "details": "",
            "due": 3, "completed": null },
        { "title": "Get the boiler maintained", "category": "House", "details": "The gas man cometh.",
            "due": -1, "completed": -1},
        { "title": "Read article about the history of contraception", "category": "", 
            "details": "Emily says it's really funny??? I have the link in her email. We'll have to see how funny it is." +
                " She has a strange sense of humour.",
            "due": "0", "completed": "0"}
    ];

    const calculateDate = (date) => {
        if(!date) {
            return null;
        }
        return addDays(new Date(), date);
    }

    rawArray.forEach((entry) => {
        const newTask = task(entry.title, entry.category)
        const additionalProperties = {
            "Details": entry.details,
            "Date": calculateDate(entry.due),
        }
        newTask.update(additionalProperties);
        newTask.status.completed = calculateDate(entry.completed);
        sampleArray.push(newTask);
    });

    return sampleArray;
};

export { makeSample };