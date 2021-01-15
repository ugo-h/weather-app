import { createElement } from '../../UI/domHelper';
import './ForecastWeather.css';
import UIComponent from '../../UI/UIComponent';

export default class FutureWeatherUI extends UIComponent {
    createElement() {
        const { units } = this.props;
        console.log('ForecastUI units: ' + units);
        return this.props.forecast.map(day => {
            return createElement('div', { className: 'forecast__day card' },
                createElement('div', { className: 'forecast__date card__text' }, day.date),
                createElement('div', { className: 'forecast__temperature card__text' }, day.temp[units] + 'º' + units),
                createElement('div', { className: 'group' },
                    createElement('img', { className: 'forecast__icon card__text', src: day.icon }),
                    createElement('div', { className: 'forecast__summary card__text' }, day.text)));
        });
    }
}
