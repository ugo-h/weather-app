import UI from '../../UI/UI';
import { createElement } from '../../UI/domHelper';
import Clock from '../Clock/Clock';

export default class CurrentWeatherUI extends UI {
    constructor(id) {
        super(id);
        this.clock = new Clock();
    }

    render(state) {
        this.container.innerHTML = '';
        const element = createElement('div', { className: 'weather card' },
            this.clock.createElement(),
            createElement('p', { className: 'weather__location' }, state.location),
            createElement('img', { className: 'weather__icon', src: state.icon }),
            createElement('div', { className: 'weather__temperature' }, state.temp[state.units] + 'º' + state.units),
            createElement('p', { className: 'weather__summary' }, state.summary),
            createElement('div', { className: 'weather__feelslike' }, 'Ощущается: ' + state.feelslike[state.units] + 'º' + state.units),
            createElement('div', { className: 'weather__humidity' }, 'Влажность: ' + state.humidity + '%'),
            createElement('div', { className: 'weather__wind' }, `Ветер: ${state.wind.vel} km/h (${state.wind.dir})`));
        this.container.append(element);
    }
}
