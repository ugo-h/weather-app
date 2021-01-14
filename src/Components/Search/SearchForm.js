import { createElement } from '../../UI/domHelper';
import UIComponent from '../../UI/UIComponent';
import languageConfig from '../../config/languages';

export default class SearchForm extends UIComponent {
    constructor(props) {
        super(props);
        this.strings = languageConfig[props.language].strings;
    }

    createElement() {
        return createElement('form', { className: 'search', onSubmit: this.props.submitHandler },
            createElement('label', { className: 'search__field' },
                createElement('input', { className: 'search__input', placeholder: `${this.strings.enterLocation}` })),
            createElement('button', { className: 'search__btn', type: 'submit' }, this.strings.search));
    }
}
