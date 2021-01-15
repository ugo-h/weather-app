import { createElement } from '../../UI/domHelper';
import UIComponent from '../../UI/UIComponent';
import languageConfig from '../../config/languages';
import './Search.css';

export default class SearchForm extends UIComponent {
    constructor(props) {
        super(props);
        this.strings = languageConfig[props.language].strings;
    }

    createElement() {
        return createElement('form', { id: 'search', className: 'search' + this.props.className, onSubmit: this.props.submitHandler },
            createElement('label', { className: 'search__field' },
                createElement('input', { className: 'search__input', placeholder: `${this.strings.enterLocation}` })),
            createElement('button', { className: 'search__btn', type: 'submit' }, this.strings.search),
            this.props.errorMsg ? createElement('span', { className: 'search__error card full-opacity', onClick: this.props.removeError }, this.props.errorMsg) : '');
    }
}
