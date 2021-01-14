import SearchForm from './SearchForm';
import GeocodingAPI from '../../API/GeocodingAPI/GeocodingAPI';
import Modal from '../Modal/Modal';
import UIComponent from '../../UI/UIComponent';
import { createElement } from '../../UI/domHelper';

export default class Search extends UIComponent {
    constructor(props) {
        super(props);
        this.api = new GeocodingAPI();
    }

    onSubmit(ev) {
        ev.preventDefault();
        const { language } = this.props;
        const input = ev.target.querySelector('input');
        new Modal(
            this.api.getLocationListFromStr(input.value, { language }),
            (data) => this.props.processResult(data)
        ).mount({ language });
        input.value = '';
    }

    createElement() {
        const { language } = this.props;
        const hiddenClassName = this.props.isMenuOpen ? ' hidden-mobile' : '';
        return createElement(SearchForm, {
            language,
            submitHandler: this.onSubmit.bind(this),
            className: hiddenClassName
        });
    }
}
