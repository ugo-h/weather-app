import ControlBlockUI from './ControlBlockUI';

export default class ControlBlock {
    constructor(id, state) {
        this.ui = new ControlBlockUI(id);
        this.state = { ...state };
        this.state.isMenuOpen = false;
        this.ui.connectMenuToggler(this.toggleSliderMenuHandler.bind(this));
    }

    toggleSliderMenuHandler() {
        this.state.isMenuOpen = !this.state.isMenuOpen;
        this.ui.render(this.state);
    }

    onChangeUnits(callback) {
        this.ui.connectUnitBtnHandler(callback);
    }

    onChangeLanguage(callback) {
        this.ui.connectLangBtnHandler(callback);
    }

    onBackgroundChange(callback) {
        this.ui.connectBackgroundHandler(callback);
    }

    update(newState) {
        this.state = { ...this.state, ...newState };
        this.ui.render(this.state);
    }
}
