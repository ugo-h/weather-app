import { createElement } from '../../UI/domHelper';

export default class LoadingPlaceholder {
    constructor(id) {
        this.id = id;
    }

    render() {
        const container = document.getElementById(this.id);
        container.innerHTML = '';
        container.append(createElement('div', { className: 'loader' }, 'loading...'));
    }
}
