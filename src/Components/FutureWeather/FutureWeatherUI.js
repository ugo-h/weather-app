import UI from '../../UI/UI';
import { createElement } from '../../UI/domHelper';

export default class FutureWeatherUI extends UI {
    constructor(id) {
        super(id);
    }

    render(state) {
        this.container.innerHTML = '';
        state.forecast.forEach(day => {
            this.container.append(
                createElement('div', { className: 'foecast__day card' },
                    createElement('div', { className: 'forecast__date' }, day.date),
                    createElement('div', { className: 'forecast__temperature' }, day.temp[state.units] + state.units),
                    createElement('div', { className: 'forecast__summary' }, day.text),
                    createElement('img', { className: 'forecast__icon', src: day.icon }))
            );
        });
    }
}
