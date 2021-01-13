import { createElement } from '../../UI/domHelper';
import languages from '../../config/languages';
import LoadingPlaceholder from '../LoadingPlaceholder/LoadingPlaceholder';
import './Modal.css';

export default class SearchResultsModal {
    constructor(promise, onAccept, onDecline) {
        this.promise = promise;
        this.onAccept = onAccept;
        this.onDecline = onDecline;
        this.backdropClickHandler = this.backdropClickHandler.bind(this);
        this.loadingPlaceholder = new LoadingPlaceholder('modal');
    }

    static unmount() {
        document.body.style.overflow = 'auto';
        const backdrop = document.getElementById('backdrop');
        const modal = document.getElementById('modal');
        backdrop.style.display = 'none';
        backdrop.removeEventListener('click', this.backdropClickHandler);
        modal.innerHTML = '';
    }

    backdropClickHandler() {
        SearchResultsModal.unmount();
        if (this.onDecline) this.onDecline();
    }

    optionClickHandler(result) {
        SearchResultsModal.unmount();
        if (this.onAccept) this.onAccept(result);
    }

    mount(state) {
        const strings = languages[state.language].strings;
        document.body.style.overflow = 'hidden';
        const backdrop = document.getElementById('backdrop');
        const modal = document.getElementById('modal');
        backdrop.style.display = 'block';
        backdrop.addEventListener('click', this.backdropClickHandler);

        this.loadingPlaceholder.render();
        this.promise.then((results) => {
            modal.innerHTML = '';
            const element = createElement('div', { className: 'modal card' },
                createElement('h2', { className: 'modal__title' }, strings.searchResults),
                results.length > 0
                    ? createElement('ul', { className: 'modal__content list--vertical' },
                        ...results.map(result => createElement('li', {
                            className: 'modal__option',
                            onClick: () => this.optionClickHandler(result)
                        }, result.formatted)))
                    : createElement('h3', { className: 'modal__message' }, strings.emptySearchResult));
            modal.append(element);
        }).catch(() => {
            modal.append(createElement('h2', { className: 'modal__title' }, strings.apiUnavailableError));
        });
    }
}
