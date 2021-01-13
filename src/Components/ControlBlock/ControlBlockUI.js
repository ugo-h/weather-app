/* eslint-disable class-methods-use-this */
import UI from '../../UI/UI';
import { createElement } from '../../UI/domHelper';
import LanguageButton from '../Util/Buttons/LanguageButton/LanguageButton';
import BackgroundButton from '../Util/Buttons/BackgroundButton/BackgroundButton';
import UnitsButton from '../Util/Buttons/UnitsButton/UnitsButton';
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
        const { language, units } = state;
        this.container = document.getElementById(this.id);
        this.container.innerHTML = '';
        const element = createElement('header', { className: 'header control_pannel' },
            createElement('div', { className: 'list--horizontal control_pannel__list' },
                createElement(UnitsButton, { onClick: this._unitBtnHandler, units }),
                createElement(LanguageButton, { onClick: this._langBtnHandler, language }),
                createElement(BackgroundButton, { onClick: this._backgroundHandler, language }),
                createElement('div', { className: 'search-container', id: 'search' })));
        this.container.append(element);
    }
}
