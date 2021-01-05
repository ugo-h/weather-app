export default class UI {
    constructor(id) {
        this.container = document.getElementById(id);
    }

    render() {
        return this.container;
    }
}
