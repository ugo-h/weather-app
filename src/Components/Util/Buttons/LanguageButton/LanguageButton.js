import Button from '../Button';
import languageConfig from '../../../../config/languages';

export default class LanguageButton extends Button {
    constructor(props) {
        super(props);
        const strings = languageConfig[props.language].strings.buttons;
        this.iconUrl = 'https://www.svgrepo.com/show/309738/local-language.svg';
        this.content = strings.changeLanguageBtn;
    }
}
