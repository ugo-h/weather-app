import Button from '../Button';
import languageConfig from '../../../../config/languages';

export default class LanguageButton extends Button {
    constructor(props) {
        super(props);
        const strings = languageConfig[props.language].strings.buttons;
        this.iconUrl = '';
        this.content = strings.changeLanguageBtn;
    }
}
