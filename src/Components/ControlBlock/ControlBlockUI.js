/* eslint-disable class-methods-use-this */
import UI from '../../UI/UI';
import { createElement } from '../../UI/domHelper';
import LanguageButton from '../Util/Buttons/LanguageButton/LanguageButton';
import BackgroundButton from '../Util/Buttons/BackgroundButton/BackgroundButton';
import UnitsButton from '../Util/Buttons/UnitsButton/UnitsButton';
import './Controlblock.css';
import SliderMenuButton from '../Util/Buttons/SliderMenuButton/SliderMenuButton';
import SliderMenu from './SliderMenu/SliderMenu';

export default class ControlBlockUI extends UI {
    _unitBtnHandler() {}

    _langBtnHandler() {}

    _backgroundHandler() {}

    _toggleSliderMenu() {}

    connectUnitBtnHandler(callback) {
        this._unitBtnHandler = callback;
    }

    connectLangBtnHandler(callback) {
        this._langBtnHandler = callback;
    }

    connectBackgroundHandler(callback) {
        this._backgroundHandler = callback;
    }

    connectMenuToggler(callback) {
        this._toggleSliderMenu = callback;
    }

    render(state) {
        const { language, units } = state;
        this.container = document.getElementById(this.id);
        this.container.innerHTML = '';
        const buttonsArray = [
            createElement(UnitsButton, { onClick: this._unitBtnHandler, units }),
            createElement(LanguageButton, { onClick: this._langBtnHandler, language }),
            createElement(BackgroundButton, { onClick: this._backgroundHandler, language })
        ];
        const element = createElement('header', { className: 'header control_pannel' },
            createElement('div', { className: 'list--horizontal control_pannel__list' },
                ...buttonsArray),
            state.isMenuOpen ? createElement(SliderMenu, { buttons: buttonsArray }) : '',
            createElement(SliderMenuButton, { onClick: this._toggleSliderMenu, language, className: 'slider-menu-btn' }),
            createElement('div', { className: 'search-container', id: 'search' }));
        this.container.append(element);
    }
}
