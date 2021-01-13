import Button from '../Button';

export default class UnitsButton extends Button {
    constructor(props) {
        super(props);
        this.iconUrl = '';
        this.content = props.units === 'c' ? 'f' : 'c';
    }
}
