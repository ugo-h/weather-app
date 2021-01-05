import UI from './UI';
import { createElement } from './domHelper';

export default class WeatherUI extends UI {
    constructor(id) {
        super(id);
    }

    render() {
        this.container.innerHTML = '';
        const currentWeather = createElement('div', { className: 'current-weather', id: 'current-weather' });
        this.container.append(currentWeather);
    }
}
