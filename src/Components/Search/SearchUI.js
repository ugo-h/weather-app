/* eslint-disable class-methods-use-this */
import { createElement } from '../../UI/domHelper';
import UI from '../../UI/UI';
export default class SearchUI extends UI {
    submitHandler() {}

    connectSubmitEvent(callback) {
        this.submitHandler = callback;
    }

    render() {
        const element = createElement('form', { className: 'search', onSubmit: this.submitHandler },
            createElement('label', { className: 'search__field' },
                'Enter location: ',
                createElement('input', { className: 'search__input' })),
            createElement('button', { className: 'search__btn', type: 'submit' }, 'Search'));
        this.container.append(element);
    }
}
