import Button from '../Button';
import languageConfig from '../../../../config/languages';

export default class UnitsButton extends Button {
    constructor(props) {
        super(props);
        const urlFahrenheit = 'https://www.svgrepo.com/show/194517/temperature-fahrenheit.svg';
        const urlCelsium = 'https://www.svgrepo.com/show/194515/temperature.svg';
        const strings = languageConfig[this.props.language].strings.buttons;
        this.iconUrl = this.props.units === 'c' ? urlFahrenheit : urlCelsium;
        this.content = strings.changeUnitsBtn;
    }
}
