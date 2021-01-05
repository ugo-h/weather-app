/* eslint-disable class-methods-use-this */
import UI from '../UI';
import { createElement } from '../domHelper';

export default class ControlBlockUI extends UI {
    setUnitBtnHandler(callback) {
        this.unitBtnHandler = callback;
    }

    unitBtnHandler() {}

    render(state) {
        this.container.innerHTML = '';
        const element = createElement('header', {
            className: 'weather__header control_pannel'
        }, createElement('div', {
            className: 'list--horizontal control_pannel__list'
        }, createElement('button', { className: 'control_pannel__btn', onClick: this.unitBtnHandler }, state.units === 'c' ? 'º f' : 'ºc')));
        this.container.append(element);
    }
}
