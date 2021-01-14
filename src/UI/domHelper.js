import Component from './UIComponent';

/* eslint-disable no-param-reassign */
export function createElement(type, props, ...children) {
    let element;
    if (type.prototype instanceof Component) {
        let ElementConstructor = type;
        props.children = children;
        element = new ElementConstructor(props).createElement();
        return element;
    }
    element = document.createElement(type);
    Object.keys(props).forEach(key => {
        if (key === 'onClick') {
            element.addEventListener('click', props[key]);
            return;
        } if (key === 'onSubmit') {
            element.addEventListener('submit', props[key]);
            return;
        }
        element[key] = props[key];
    });
    children.forEach(child => {
        element.append(child);
    });
    return element;
}

export function render(element, id) {
    const container = document.getElementById(id);
    container.innerHTML = '';
    if (element instanceof Array) {
        element.forEach(el => container.append(el));
        return;
    }
    container.append(element);
}
