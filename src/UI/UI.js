export default class UI {
    constructor(id) {
        this.id = id;
        this.container = document.getElementById(id);
    }

    render() {
        return this.container;
    }
}
