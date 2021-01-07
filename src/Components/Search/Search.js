import SearchUI from './SearchUI';
import GeocodingAPI from '../../API/GeocodingAPI/GeocodingAPI';
import Modal from '../Modal/Modal';

export default class Search {
    constructor(id, processResult) {
        this.ui = new SearchUI(id);
        this.api = new GeocodingAPI();
        this.ui.connectSubmitEvent(this.onSubmit.bind(this));
        this.processResult = processResult;
    }

    update() {
        this.ui.render();
    }

    onSubmit(ev) {
        ev.preventDefault();
        const input = ev.target.querySelector('input');
        if (input.value.trim().length < 4) return;
        new Modal(this.api.getCoordinatesFromStr(input.value), (data) => this.processResult(data)).mount();
        input.value = '';
    }
}
