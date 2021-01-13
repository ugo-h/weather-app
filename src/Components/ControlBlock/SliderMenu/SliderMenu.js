import { createElement } from '../../../UI/domHelper';
import UIComponent from '../../../UI/UIComponent';

export default class SliderMenu extends UIComponent {
    createElement() {
        return createElement('ul', { className: 'slider-menu hidden' },
            ...this.props.buttons.map(buttonElement => createElement(
                'li', { className: 'slider-menu__element' }, buttonElement
            )));
    }
}
