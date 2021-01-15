import { createElement } from '../../UI/domHelper';
import Clock from '../Clock/Clock';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import languages from '../../config/languages';
import './CurrentWeather.css';
import UIComponent from '../../UI/UIComponent';
import WeatherInfoList from './WeatherInfoList/WeatherInfoList';

export default class CurrentWeatherUI extends UIComponent {
    createElement() {
        if (this.props.hasError) return null;
        const { language, temp, units } = this.props;
        const strings = languages[language].strings;
        const items = {
            feelslike: `${strings.feelslike}: ${this.props.feelslike[units]}º${units}`,
            humidity: `${strings.humidity}: ${this.props.humidity}%`,
            wind: `${strings.wind}: ${this.props.wind.vel} ${strings.windUnits} (${this.props.wind.dir})`
        };
        return createElement('div', { className: 'weather card' },
            createElement('p', { className: 'weather__location card__text' }, this.props.location),
            createElement('div', { className: 'weather__temperature card__text' }, temp[units] + 'º' + units),
            createElement('div', { className: 'group weather__description' },
                createElement('img', { className: 'weather__icon', src: this.props.icon }),
                createElement('p', { className: 'weather__summary card__text' }, this.props.summary)),
            createElement('p', { className: 'weather__date card__text' }, dayjs().locale(language.toLowerCase()).format('dddd, D MMMM')),
            createElement(Clock, { timezone: this.props.timezone }),
            createElement(WeatherInfoList, { className: 'card__text', items }));
    }
}
