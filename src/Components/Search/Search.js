import SearchUI from './SearchUI';
import GeocodingAPI from '../../API/GeocodingAPI/GeocodingAPI';
import Modal from '../Modal/Modal';

export default class Search {
    constructor(id, processResult, language = 'en') {
        this.ui = new SearchUI(id);
        this.api = new GeocodingAPI();
        this.language = language;
        this.ui.connectSubmitEvent(this.onSubmit.bind(this));
        this.processResult = processResult;
        this.rerenderRequired = true;
    }

    update(state) {
        this.language = state.language;
        this.ui.render(state);
    }

    onSubmit(ev) {
        ev.preventDefault();
        const input = ev.target.querySelector('input');
        if (input.value.trim().length < 4) return;
        new Modal(
            this.api.getCoordinatesFromStr(input.value, { language: this.language }),
            (data) => this.processResult(data)
        ).mount({ language: this.language });
        input.value = '';
    }
}
