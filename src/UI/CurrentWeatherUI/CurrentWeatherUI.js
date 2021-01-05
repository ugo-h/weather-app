import { createElement } from '../domHelper';

export default class CurrentWeatherUI {
    constructor(id) {
        this.container = document.getElementById(id);
    }

    render(state) {
        this.container.innerHTML = '';
        const element = createElement('div', { className: 'weather' },
            createElement('img', { className: 'weather__icon', src: state.icon }),
            createElement('p', { className: 'weather__summary' }, state.summary),
            createElement('div', { className: 'weather__humidity' }, 'Влажность: ' + state.humidity + '%'),
            createElement('div', { className: 'weather__temperature' }, 'Температура: ' + state.temp_c),
            createElement('div', { className: 'weather__wind' }, `Ветер: ${state.wind.vel} km/h (${state.wind.dir})`));
        this.container.append(element);
    }
}
