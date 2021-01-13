import UIComponent from '../../../UI/UIComponent';

export default class Fragment extends UIComponent {
    createElement() {
        return this.props.children;
    }
}
