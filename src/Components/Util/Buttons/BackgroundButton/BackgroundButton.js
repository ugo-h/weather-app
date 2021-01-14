import Button from '../Button';
import languageConfig from '../../../../config/languages';

export default class BackgroundButton extends Button {
    constructor(props) {
        super(props);
        const strings = languageConfig[props.language].strings.buttons;
        this.iconUrl = 'https://www.svgrepo.com/show/214103/background.svg';
        this.content = strings.changeBackgroundBtn;
    }
}
