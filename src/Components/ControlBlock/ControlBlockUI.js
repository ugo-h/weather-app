/* eslint-disable class-methods-use-this */
import { createElement } from '../../UI/domHelper';
import './Controlblock.css';
import SliderMenuButton from '../Util/Buttons/SliderMenuButton/SliderMenuButton';
import SliderMenu from './SliderMenu/SliderMenu';
import Search from '../Search/Search';
import UIComponent from '../../UI/UIComponent';
import ButtonList from './ButtonList/ButtonList';

export default class ControlBlockUI extends UIComponent {
    createElement() {
        const { language, isMenuOpen } = this.props;
        const sliderBtnContent = isMenuOpen ? 'Search' : 'Menu';
        return createElement('header', { className: 'header control_pannel' },
            createElement('div', { className: 'list--horizontal control_pannel__list' }, ...createElement(ButtonList, this.props)),
            createElement(SliderMenuButton, {
                onClick: this.props.toggleSliderMenuHandler,
                language,
                className: 'slider-menu-btn',
                content: sliderBtnContent,
                isMenuOpen
            }),
            isMenuOpen ? createElement(SliderMenu, {
                buttons: createElement(ButtonList, this.props)
            }) : '',
            createElement(Search, {
                language,
                processResult: this.props.searchHandler,
                isMenuOpen
            }));
    }
}
