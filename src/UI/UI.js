import { createElement } from './domHelper';

export default class UI {
    constructor(id, eventHandlers = {}) {
        this.id = id;
        this.eventHandlers = eventHandlers;
        this.container = document.getElementById(id);
        this.error = null;
    }

    render() {
        return this.container;
    }

    displayError(props) {
        if (this.error) {
            this.removeError();
        }
        const className = ` ${props.className}` || '';
        this.error = createElement('div', { className: `error ${className}` }, props.msg);
        this.container.append(
            this.error
        );
    }

    removeError() {
        if (this.error) this.error.remove();
    }
}
