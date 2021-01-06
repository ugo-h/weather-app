import dayjs from 'dayjs';
import { createElement } from '../../UI/domHelper';

export default class Clock {
    constructor() {
        this.element = null;
        this.timer = null;
    }

    createElement() {
        clearInterval(this.timer);
        this.element = createElement('div', { className: 'weather__clock' }, dayjs().format('HH:mm:ss'));
        this.timer = setInterval(this._update.bind(this), 1000);
        return this.element;
    }

    _update() {
        this.element.textContent = dayjs().format('HH:mm:ss');
    }
}
