/* eslint-disable class-methods-use-this */
import { createElement } from '../../UI/domHelper';
import UIComponent from '../../UI/UIComponent';
import './LoadingPlaceholder.css';

export default class LoadingPlaceholder extends UIComponent {
    createElement() {
        return createElement('div', { className: 'loader' }, 'loading...');
    }
}
