import { format } from "date-fns";

const task = (title, dateDue = "") => {
    let description = "";
    let topic = "no topic";

    const dateAdded = (new Date()).toString();
    let dateCompleted;

    const markComplete = function() {
        this.dateCompleted = (new Date()).toString();
    };

    const checkStatus = function(status) {
        if(status == "all") {
            return true;
        } else if (status == "complete" && this.dateCompleted) {
            return true;
        } else if (status == "active" && !this.dateCompleted) {
            return true;
        } else {
            return false;
        }
    };

    const checkTopic = function(topic) {
        if(topic == "all topics") {
            return true;
        } else if(topic == this.topic) {
            return true;
        } else {
            return false;
        }
    }

    const getDueDate = function() {
        return this.dateDue;
    }

    return { title, description, topic, dateAdded, dateCompleted, dateDue, 
        markComplete, getDueDate, checkStatus, checkTopic };
};

export { task };