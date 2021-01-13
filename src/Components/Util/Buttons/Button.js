import UIComponent from '../../../UI/UIComponent';
import { createElement } from '../../../UI/domHelper';

export default class Button extends UIComponent {
    constructor(props) {
        super(props);
        this.iconUrl = '';
        this.content = '';
        if (!this.props.onClick) throw new Error('onClick property is missing!');
    }

    createElement() {
        const className = ` ${this.props.className}` || '';
        return createElement('button', { className: 'control_pannel__btn' + className, onClick: this.props.onClick },
            createElement('img', { href: this.iconUrl, className: 'btn__icon' }),
            this.content);
    }
}
