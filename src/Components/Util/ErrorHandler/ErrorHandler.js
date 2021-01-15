import UIComponent from '../../../UI/UIComponent';

export default class ErrorHandler extends UIComponent {
    createElement() {
        return (
            this.props.hasError
                ? this.props.errorElement
                : this.props.successElement
        );
    }
}
