
const sort = (() => {
    /*1. By due date
    2. by category
    3. by title*/

    const byDate = (array) => {
        array.sort((taskOne, taskTwo) =>  {
            return taskOne.due.localeCompare(taskTwo.due);
        });
        return array;
    }

    return { byDate, };

})();

export { sort };