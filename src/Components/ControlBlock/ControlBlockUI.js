/* eslint-disable class-methods-use-this */
import UI from '../../UI/UI';
import { createElement } from '../../UI/domHelper';

export default class ControlBlockUI extends UI {
    _unitBtnHandler() {}

    connectUnitBtnHandler(callback) {
        this._unitBtnHandler = callback;
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
        createElement('div', { className: 'search-container', id: 'search' })));
        this.container.append(element);
    }
}
