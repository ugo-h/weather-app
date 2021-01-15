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
        this.id = 'clock';
    }

    createElement(zone) {
        clearInterval(Clock.interval);
        const node = createElement('div', { className: 'weather__clock clock', id: 'clock' }, dayjs().tz(zone).format('HH:mm:ss'));
        Clock.interval = setInterval(this._update.bind(this), 1000);
        return node;
    }

    _update() {
        const element = document.getElementById(this.id);
        element.textContent = dayjs().format('HH:mm:ss');
    }
}
