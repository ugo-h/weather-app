/* eslint-disable class-methods-use-this */
import { createElement } from '../../UI/domHelper';
import UI from '../../UI/UI';
import language from '../../config/languages';

export default class SearchUI extends UI {
    submitHandler() {}

    connectSubmitEvent(callback) {
        this.submitHandler = callback;
    }

    render(state) {
        this.container = document.getElementById(this.id);
        this.container.innerHTML = '';
        const strings = language[state.language].strings;
        const element = createElement('form', { className: 'search', onSubmit: this.submitHandler },
            createElement('label', { className: 'search__field' },
                `${strings.enterLocation}: `,
                createElement('input', { className: 'search__input' })),
            createElement('button', { className: 'search__btn', type: 'submit' }, strings.search));
        this.container.append(element);
    }
}
