import UI from '../UI';
import { createElement } from '../domHelper';

function createControlList(state) {
    return Object.keys(state).map(key => createElement('li', {}, `${key}: ${state[key]}`));
}

export default class ControlBlockUI extends UI {
    render(state) {
        this.container.innerHTML = '';
        const element = createElement('header', {
            className: 'weather__header control_pannel'
        }, createElement('ul', {
            className: 'list--horizontal control_pannel__list'
        }, ...createControlList(state)));
        this.container.append(element);
    }
}
