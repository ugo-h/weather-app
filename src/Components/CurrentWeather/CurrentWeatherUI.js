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
            createElement('div', { className: 'weather__columns columns' },
                createElement('div', { className: 'columns__column weather__column' },
                    createElement('p', { className: 'weather__location' }, state.location),
                    createElement('div', { className: 'weather__temperature' }, state.temp[state.units] + 'º' + state.units),
                    createElement('div', { className: 'group' },
                        createElement('img', { className: 'weather__icon', src: state.icon }),
                        createElement('p', { className: 'weather__summary' }, state.summary))),
                createElement('div', { className: 'columns__column weather__column' },
                    createElement('p', { className: 'weather__date' }, dayjs().locale(state.language.toLowerCase()).format('dddd, D MMMM')),
                    this.clock.createElement(state.timezone),
                    createElement('div', { className: 'weather__info' }, `${strings.feelslike}: ${state.feelslike[state.units]}º${state.units}`),
                    createElement('div', { className: 'weather__info' }, `${strings.humidity}: ${state.humidity}%`),
                    createElement('div', { className: 'weather__info' }, `${strings.wind}: ${state.wind.vel} ${strings.windUnits} (${state.wind.dir})`))));
        this.container.append(element);
    }
}
