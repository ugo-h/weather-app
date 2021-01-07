/* eslint-disable no-param-reassign */
export function createElement(type, props, ...children) {
    const element = document.createElement(type);
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
