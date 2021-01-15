import { createElement, render } from '../../UI/domHelper';
import languages from '../../config/languages';
import LoadingPlaceholder from '../LoadingPlaceholder/LoadingPlaceholder';
import './Modal.css';
import ModalUI from './ModalUI';

export default class SearchResultsModal {
    constructor(promise, onAccept, onDecline) {
        this.promise = promise;
        this.onAccept = onAccept;
        this.onDecline = onDecline;
        this.backdropClickHandler = this.backdropClickHandler.bind(this);
        this.isLoading = true;
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
        backdrop.style.display = 'block';
        backdrop.addEventListener('click', this.backdropClickHandler);
        render(
            createElement(LoadingPlaceholder, {}),
            'modal'
        );
        this.promise.then((results) => {
            render(
                createElement(ModalUI, {
                    results,
                    strings,
                    optionClickHandler: this.optionClickHandler.bind(this)
                }),
                'modal'
            );
        }).catch(() => {
            render(
                createElement('h2', { className: 'modal__title' }, strings.apiUnavailableError),
                'modal'
            );
        });
    }
}
