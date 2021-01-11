/* eslint-disable class-methods-use-this */
import UI from '../../UI/UI';
import { createElement } from '../../UI/domHelper';

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
        this.container.innerHTML = '';
        const element = createElement('header', {
            className: 'weather__header control_pannel'
        }, createElement('div', {
            className: 'list--horizontal control_pannel__list'
        }, createElement('button', {
            className: 'control_pannel__btn',
            onClick: this._unitBtnHandler
        }, state.units === 'c' ? 'º f' : 'ºc'),
        createElement('button', {
            className: 'control_pannel__btn',
            onClick: this._langBtnHandler
        }, 'Language'),
        createElement('button', {
            className: 'control_pannel__btn',
            onClick: this._backgroundHandler
        }, 'Change background'),
        createElement('div', { className: 'search-container', id: 'search' })));
        this.container.append(element);
    }
}
