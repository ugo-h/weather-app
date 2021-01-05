import UI from '../../UI/UI';
import { createElement } from '../../UI/domHelper';

export default class FutureWeatherUI extends UI {
    constructor(id) {
        super(id);
    }

    render(forecastArray) {
        this.container.innerHTML = '';
        forecastArray.forEach(day => {
            this.container.append(
                createElement('div', { className: 'foecast__day card' },
                    createElement('div', { className: 'forecast__temperature' }, new Date(day.date).toLocaleDateString()),
                    createElement('div', { className: 'forecast__temperature' }, day.temp.c + 'c'),
                    createElement('div', { className: 'forecast__summary' }, day.text),
                    createElement('img', { className: 'forecast__icon', src: day.icon }))
            );
        });
    }
}
