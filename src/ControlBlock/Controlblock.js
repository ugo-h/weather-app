import ControlBlockUI from '../UI/ControlBlockUI/ControlBlockUI';

export default class ControlBlock {
    constructor(id, state) {
        this.ui = new ControlBlockUI(id);
        this.state = state;
        this.ui.render(this.state);
    }

    updateState(newState) {
        this.state = newState;
        this.ui.render(this.state);
    }
}
