/* eslint-disable class-methods-use-this */
import { createElement } from '../../UI/domHelper';
import UI from '../../UI/UI';
import Search from './SearchElement';
import './Search.css';

export default class SearchUI extends UI {
    submitHandler() {}

    connectSubmitEvent(callback) {
        this.submitHandler = callback;
    }

    render(state) {
        const { language } = state;
        this.container = document.getElementById(this.id);
        this.container.innerHTML = '';
        const element = createElement(Search, { language, submitHandler: this.submitHandler });
        this.container.append(element);
    }
}
