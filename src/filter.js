import { checkRelativeDate } from "./relative-date.js";
import { storage } from "./storage.js";
import { task } from "./task.js";
import { taskspace } from "./mainpage.js";

const filter = (() => {
    let filteredArray = [];

    const parameters =
        { "date": "all dates",
        "status": "active",
        "topic": "all topics" }

    const newFilter = () => {
        filteredArray = storage.getMasterArray().filter(entry => {
            return checkRelativeDate(parameters.date, entry.getDueDate()) &&
            entry.checkStatus(parameters.status) &&
            entry.checkTopic(parameters.topic)
        });
        sortByDate();
    }

    const sortByDate = () => {
        filteredArray.sort((taskOne, taskTwo) =>  {
            return taskOne.getDueDate() > taskTwo.getDueDate();
        });
    }

    const updateMasterArray = function(updatedArray) {
        masterArray = updatedArray;
        newFilter();
    }

    const changeParameter = (parameter, newValue) => {
        parameters[parameter] = newValue;
        newFilter();
    }

    const getFilteredArray = () => {
        newFilter();
        return filteredArray;
    }

    const getTopicOptions = () => {
        const topicOptions = [];
        newFilter();
        filteredArray.forEach(entry => {
            if(!topicOptions.includes(entry.topic) && 
                entry.topic != "no topic") {
                topicOptions.push(entry.topic);
            }
        })
        topicOptions.sort((topicOne, topicTwo) => {
            return topicOne > topicTwo;
        })
        topicOptions.unshift("all topics");
        topicOptions.push("no topic");

        return topicOptions;
    }

    return { changeParameter, getFilteredArray, 
        getTopicOptions, newFilter, updateMasterArray }

})();

export { filter };