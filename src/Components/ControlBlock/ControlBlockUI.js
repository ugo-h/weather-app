/* eslint-disable class-methods-use-this */
import { createElement } from '../../UI/domHelper';
import LanguageButton from '../Util/Buttons/LanguageButton/LanguageButton';
import BackgroundButton from '../Util/Buttons/BackgroundButton/BackgroundButton';
import UnitsButton from '../Util/Buttons/UnitsButton/UnitsButton';
import './Controlblock.css';
import SliderMenuButton from '../Util/Buttons/SliderMenuButton/SliderMenuButton';
import SliderMenu from './SliderMenu/SliderMenu';
import SearchElement from '../Search/SearchElement';
import UIComponent from '../../UI/UIComponent';

export default class ControlBlockUI extends UIComponent {
    createElement() {
        const { language, units } = this.props;
        const buttonsArray = [
            createElement(UnitsButton, { onClick: this.props.unitBtnHandler, units }),
            createElement(LanguageButton, { onClick: this.props.langBtnHandler, language }),
            createElement(BackgroundButton, { onClick: this.props.backgroundHandler, language })
        ];
        return createElement('header', { className: 'header control_pannel' },
            createElement('div', { className: 'list--horizontal control_pannel__list' },
                ...buttonsArray),
            this.props.isMenuOpen ? createElement(SliderMenu, { buttons: buttonsArray }) : '',
            createElement(SliderMenuButton, { onClick: this.props._toggleSliderMenu, language, className: 'slider-menu-btn' }),
            createElement(SearchElement, { language, submitHandler: this.props.searchHandler }));
    }
}
