import Button from '../Button';

export default class UnitsButton extends Button {
    constructor(props) {
        super(props);
        this.iconUrl = 'https://www.svgrepo.com/show/65862/temperature.svg';
        this.content = props.units === 'c' ? 'f' : 'c';
    }
}
