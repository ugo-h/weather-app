import ControlBlockUI from './ControlBlockUI';

export default class ControlBlock {
    constructor(id, state) {
        this.ui = new ControlBlockUI(id);
        this.state = state;
    }

    onChangeUnits(callback) {
        this.ui.connectUnitBtnHandler(callback);
    }

    update(newState) {
        this.state = newState;
        this.ui.render(this.state);
    }
}
