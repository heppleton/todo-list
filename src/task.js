//This is an object and should not have DOM stuff in it.
//But it should have move logic and control over the handler?

const task = (name) => {
    let status = "active";

    const changeStatus = (newStatus) => {
        status = newStatus;
    }

    return { name, status, changeStatus };
}

export { task };