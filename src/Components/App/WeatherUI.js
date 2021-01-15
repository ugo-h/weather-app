/* eslint-disable class-methods-use-this */
import { createElement } from '../../UI/domHelper';
import UIComponent from '../../UI/UIComponent';

export default class WeatherUI extends UIComponent {
    createElement() {
        return [
            createElement(
                'section', { className: 'main-weather' },
                createElement('div', { className: 'current-weather', id: 'current-weather' }),
                createElement('div', { className: 'map', id: 'map' })
            ),
            createElement('div', { className: 'forecast', id: 'forecast-weather' })
        ];
    }
}
