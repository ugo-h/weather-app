import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { createElement } from '../../UI/domHelper';

dayjs.extend(utc);
dayjs.extend(timezone);

export default class Clock {
    constructor() {
        this.element = null;
        this.timer = null;
    }

    createElement(zone) {
        clearInterval(this.timer);
        this.element = createElement('div', { className: 'weather__clock clock' }, dayjs().tz(zone).format('HH:mm:ss'));
        this.timer = setInterval(this._update.bind(this), 1000);
        return this.element;
    }

    _update() {
        this.element.textContent = dayjs().format('HH:mm:ss');
    }
}
