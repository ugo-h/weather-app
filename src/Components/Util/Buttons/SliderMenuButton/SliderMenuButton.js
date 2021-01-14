import Button from '../Button';
// import languageConfig from '../../../../config/languages';

export default class SliderMenuButton extends Button {
    constructor(props) {
        super(props);
        this.iconUrl = '';
        this.content = props.content;
    }
}
