import Component from './UIComponent';
import Node from './util/Node';

/* eslint-disable no-param-reassign */
export function createElement(type, props, ...children) {
    let node;
    if (type.prototype instanceof Component) {
        let ElementConstructor = type;
        props.children = children;
        node = new ElementConstructor(props).createElement();
        return node;
    }
    node = new Node(type, props, children);
    return node;
}

export function render(element, id) {
    const container = document.getElementById(id);
    container.innerHTML = '';
    if (element instanceof Array) {
        element.forEach(el => container.append(el instanceof Node ? el.render() : el));
        return;
    }
    container.append(element instanceof Node ? element.render() : element);
}
