import UI from '../../UI/UI';
import { createElement } from '../../UI/domHelper';
import Clock from '../Clock/Clock';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import languages from '../../config/languages';

export default class CurrentWeatherUI extends UI {
    constructor(id) {
        super(id);
        this.clock = new Clock();
    }

    render(state) {
        this.container.innerHTML = '';
        const strings = languages[state.language].strings;
        const element = createElement('div', { className: 'weather card' },
            createElement('p', { className: 'weather__date' }, dayjs().locale(state.language.toLowerCase()).format('D MMMM (dddd)')),
            this.clock.createElement(),
            createElement('p', { className: 'weather__location' }, state.location),
            createElement('img', { className: 'weather__icon', src: state.icon }),
            createElement('div', { className: 'weather__temperature' }, state.temp[state.units] + 'º' + state.units),
            createElement('p', { className: 'weather__summary' }, state.summary),
            createElement('div', { className: 'weather__feelslike' }, `${strings.feelslike}: ${state.feelslike[state.units]}º${state.units}`),
            createElement('div', { className: 'weather__humidity' }, `${strings.humidity}: ${state.humidity}`),
            createElement('div', { className: 'weather__wind' }, `${strings.wind}: ${state.wind.vel} ${strings.windUnits} (${state.wind.dir})`));
        this.container.append(element);
    }
}
