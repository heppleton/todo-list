const makeComplexElement = (type, classes = [], text = "", attributes = {}) => {
    const newElement = document.createElement(type);

    newElement.classList.add(...classes);

    for(let key in attributes) {
        newElement.setAttribute(key, attributes[key]);
    }

    newElement.textContent = text;

    return newElement;
}

export { makeComplexElement };