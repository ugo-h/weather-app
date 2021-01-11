import UI from './UI';
import { createElement } from './domHelper';

export default class WeatherUI extends UI {
    constructor(id) {
        super(id);
    }

    render() {
        this.container.innerHTML = '';
        const mainWeatherSection = createElement(
            'section', { className: 'main-weather' },
            createElement('div', { className: 'current-weather', id: 'current-weather' }),
            createElement('div', { className: 'map', id: 'map' })
        );
        const forecastWeather = createElement('div', { className: 'forecast', id: 'forecast-weather' });

        this.container.append(mainWeatherSection);
        this.container.append(forecastWeather);
    }
}
