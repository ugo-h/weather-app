import { createElement } from '../../UI/domHelper';
import Clock from '../Clock/Clock';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import languages from '../../config/languages';
import './CurrentWeather.css';
import UIComponent from '../../UI/UIComponent';

export default class CurrentWeatherUI extends UIComponent {
    createElement() {
        const { language, temp, units } = this.props;
        const strings = languages[language].strings;

        const feelslike = `${strings.feelslike}: ${this.props.feelslike[units]}º${units}`;
        const humidity = `${strings.humidity}: ${this.props.humidity}%`;
        const wind = `${strings.wind}: ${this.props.wind.vel} ${strings.windUnits} (${this.props.wind.dir})`;
        return createElement('div', { className: 'weather card' },
            createElement('div', { className: 'weather__columns columns' },
                createElement('div', { className: 'columns__column weather__column' },
                    createElement('p', { className: 'weather__location card__text' }, this.props.location),
                    createElement('div', { className: 'weather__temperature card__text' }, temp[units] + 'º' + units),
                    createElement('div', { className: 'group' },
                        createElement('img', { className: 'weather__icon', src: this.props.icon }),
                        createElement('p', { className: 'weather__summary card__text' }, this.props.summary))),
                createElement('div', { className: 'columns__column weather__column' },
                    createElement('p', { className: 'weather__date card__text' }, dayjs().locale(language.toLowerCase()).format('dddd, D MMMM')),
                    createElement(Clock, {}),
                    createElement('div', { className: 'weather__info card__text' }, feelslike),
                    createElement('div', { className: 'weather__info card__text' }, humidity),
                    createElement('div', { className: 'weather__info card__text' }, wind))));
    }
}
