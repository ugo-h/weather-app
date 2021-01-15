import SearchForm from './SearchForm';
import GeocodingAPI from '../../API/GeocodingAPI/GeocodingAPI';
import Modal from '../Modal/Modal';
import UIComponent from '../../UI/UIComponent';
import { createElement } from '../../UI/domHelper';
import languageConfig from '../../config/languages';

export default class Search extends UIComponent {
    constructor(props) {
        super(props);
        this.api = new GeocodingAPI();
        this.errorMsg = '';
    }

    onSubmit(ev) {
        ev.preventDefault();
        const { language } = this.props;
        const strings = languageConfig[language].strings;
        const input = ev.target.querySelector('input');
        if (input.value.trim().length < 3) {
            this.errorMsg = strings.searchError;
            this.update();
            setTimeout(this.removeError.bind(this), 2000);
            return;
        }
        new Modal(
            this.api.getLocationListFromStr(input.value, { language }),
            (data) => this.props.processResult(data)
        ).mount({ language });
        input.value = '';
    }

    update() {
        const container = document.getElementById('search');
        const element = this.createElement().render();
        container.innerHTML = element.innerHTML;
    }

    removeError() {
        this.errorMsg = '';
        this.update();
    }

    createElement() {
        const { language } = this.props;
        const hiddenClassName = this.props.isMenuOpen ? ' hidden-mobile' : '';
        return createElement(SearchForm, {
            removeError: this.removeError.bind(this),
            errorMsg: this.errorMsg,
            language,
            submitHandler: this.onSubmit.bind(this),
            className: hiddenClassName
        });
    }
}
