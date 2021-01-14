import { createElement } from '../../../UI/domHelper';
import UIComponent from '../../../UI/UIComponent';

export default class WeatherInfoList extends UIComponent {
    createElement() {
        const { feelslike, humidity, wind } = this.props.items;
        const className = this.props.className ? ` ${this.props.className}` : '';
        return createElement('ul', { className: 'weather-info list--vertical' + className },
            createElement('li', { className: 'weather-info__item' }, feelslike),
            createElement('li', { className: 'weather-info__item' }, humidity),
            createElement('li', { className: 'weather-info__item' }, wind));
    }
}
