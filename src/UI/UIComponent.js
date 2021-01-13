/* eslint-disable class-methods-use-this */

export default class UIComponent {
    constructor(props) {
        this.props = props;
    }

    createElement() {
        throw new Error('Error while creating UIComponent element. If this error ocured, you probably forgot to create a createElement method inside of your UIComponent');
    }
}
