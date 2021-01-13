/* eslint-disable class-methods-use-this */
import UI from '../../UI/UI';
import { createElement } from '../../UI/domHelper';
import language from '../../config/languages';
import './Controlblock.css';

export default class ControlBlockUI extends UI {
    _unitBtnHandler() {}

    _langBtnHandler() {}

    _backgroundHandler() {}

    connectUnitBtnHandler(callback) {
        this._unitBtnHandler = callback;
    }

    connectLangBtnHandler(callback) {
        this._langBtnHandler = callback;
    }

    connectBackgroundHandler(callback) {
        this._backgroundHandler = callback;
    }

    render(state) {
        const strings = language[state.language].strings;
        this.container = document.getElementById(this.id);
        this.container.innerHTML = '';
        const element = createElement('header', {
            className: 'header control_pannel'
        }, createElement('div', {
            className: 'list--horizontal control_pannel__list'
        }, createElement('button', {
            className: 'control_pannel__btn',
            onClick: this._unitBtnHandler
        }, state.units === 'c' ? 'f' : 'c'),
        createElement('button', {
            className: 'control_pannel__btn',
            onClick: this._langBtnHandler
        }, strings.language),
        createElement('button', {
            className: 'control_pannel__btn',
            onClick: this._backgroundHandler
        }, strings.changeBackground),
        createElement('div', { className: 'search-container', id: 'search' })));
        this.container.append(element);
    }
}
