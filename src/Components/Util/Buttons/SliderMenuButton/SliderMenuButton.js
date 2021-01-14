import Button from '../Button';
import languageConfig from '../../../../config/languages';

export default class SliderMenuButton extends Button {
    constructor(props) {
        super(props);
        const urlSearch = 'https://www.svgrepo.com/show/257428/search.svg';
        const utlSettings = 'https://www.svgrepo.com/show/56131/settings.svg';
        this.iconUrl = props.isMenuOpen ? urlSearch : utlSettings;
        const strings = languageConfig[this.props.language].strings.buttons;
        this.content = props.isMenuOpen ? strings.searchBtn : strings.settingsBtn;
    }
}
