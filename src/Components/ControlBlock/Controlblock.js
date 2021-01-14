import { createElement, render } from '../../UI/domHelper';
import ControlBlockUI from './ControlBlockUI';

export default class ControlBlock {
    constructor(id, state, eventHandlers) {
        this.id = id;
        this.state = { ...state };
        this.state.isMenuOpen = false;
        this.eventHandlers = eventHandlers;
    }

    toggleSliderMenuHandler() {
        this.state.isMenuOpen = !this.state.isMenuOpen;
        this.render();
    }

    update(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    render() {
        render(
            createElement(ControlBlockUI, {
                language: this.state.language,
                units: this.state.units,
                isMenuOpen: this.state.isMenuOpen,
                searchHandler: this.eventHandlers.onSearch,
                unitBtnHandler: this.eventHandlers.onChangeUnits,
                langBtnHandler: this.eventHandlers.onChangeLanguage,
                backgroundHandler: this.eventHandlers.onBackgroundChange,
                toggleSliderMenuHandler: this.toggleSliderMenuHandler.bind(this)
            }),
            this.id
        );
    }
}
