import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { createElement } from '../../UI/domHelper';
import './Clock.css';
import UIComponent from '../../UI/UIComponent';

dayjs.extend(utc);
dayjs.extend(timezone);

export default class Clock extends UIComponent {
    constructor(props) {
        super(props);
        this.element = null;
        // this.timer = null;
    }

    createElement(zone) {
        clearInterval(Clock.interval);
        this.element = createElement('div', { className: 'weather__clock clock' }, dayjs().tz(zone).format('HH:mm:ss'));
        Clock.interval = setInterval(this._update.bind(this), 1000);
        return this.element;
    }

    _update() {
        this.element.textContent = dayjs().format('HH:mm:ss');
    }
}
