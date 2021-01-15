import { createElement } from '../../UI/domHelper';
import UIComponent from '../../UI/UIComponent';

export default class ModalUI extends UIComponent {
    createElement() {
        const { results, strings } = this.props;
        return (
            createElement('div', { className: 'modal card' },
                createElement('h2', { className: 'modal__title' }, strings.searchResults),
                results.length > 0
                    ? createElement('ul', { className: 'modal__content list--vertical' },
                        ...results.map(result => createElement('li', {
                            className: 'modal__option',
                            onClick: () => this.props.optionClickHandler(result)
                        }, result.formatted)))
                    : createElement('h3', { className: 'modal__message' }, strings.emptySearchResult))
        );
    }
}
