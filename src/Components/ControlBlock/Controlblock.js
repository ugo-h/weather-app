import { createElement } from '../../UI/domHelper';
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
        this.ui.render(this.state);
    }

    onChangeUnits(callback) {
        this.eventHandlers.onChangeUnits = callback;
    }

    onChangeLanguage(callback) {
        this.eventHandlers.onChangeLanguage = callback;
    }

    onBackgroundChange(callback) {
        this.eventHandlers.onBackgroundChange = callback;
    }

    onSearch(callback) {
        this.eventHandlers.onSearch = callback;
    }

    update(newState) {
        this.state = { ...this.state, ...newState };
        this.render(this.state);
    }

    render() {
        const container = document.getElementById(this.id);
        container.innerHTML = '';
        container.append(
            createElement(ControlBlockUI, {
                language: this.state.language,
                units: this.state.units,
                onSearch: this.eventHandlers.onSearch,
                onChangeLanguage: this.eventHandlers.onChangeLanguage,
                onBackgroundChange: this.eventHandlers.onBackgroundChange,
                toggleSliderMenuHandler: this.eventHandlers.toggleSliderMenuHandler
            })
        );
    }
}
