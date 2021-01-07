import { createElement } from '../../UI/domHelper';

export default class SearchResultsModal {
    constructor(promise, onAccept, onDecline) {
        this.promise = promise;
        this.onAccept = onAccept;
        this.onDecline = onDecline;
        this.backdropClickHandler = this.backdropClickHandler.bind(this);
    }

    static unmount() {
        document.body.style.overflow = 'scroll';
        const backdrop = document.getElementById('backdrop');
        const modal = document.getElementById('modal');
        backdrop.style.display = 'none';
        backdrop.removeEventListener('click', this.backdropClickHandler);
        modal.innerHTML = '';
    }

    backdropClickHandler() {
        console.log('backdrop clicked');
        SearchResultsModal.unmount();
        if (this.onDecline) this.onDecline();
    }

    optionClickHandler(result) {
        SearchResultsModal.unmount();
        if (this.onAccept) this.onAccept(result);
    }

    mount() {
        document.body.style.overflow = 'hidden';
        const backdrop = document.getElementById('backdrop');
        const modal = document.getElementById('modal');
        backdrop.style.display = 'block';
        backdrop.addEventListener('click', this.backdropClickHandler);

        let element = createElement('div', { className: 'modal card' },
            createElement('h2', {}, 'Loading...'));
        modal.append(element);
        this.promise.then((data) => {
            modal.innerHTML = '';
            element = createElement('div', { className: 'modal card' },
                createElement('h2', { className: 'modal__title' }, 'Результаты'),
                createElement('ul', { className: 'modal__content list--vertical' },
                    ...data.results.map(result => createElement('li', { className: 'modal__option', onClick: () => this.optionClickHandler(result) }, result.formatted))));
            modal.append(element);
        });
    }
}
