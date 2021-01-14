import { createElement } from '../../../UI/domHelper';
import UIComponent from '../../../UI/UIComponent';
import Fragment from '../../Util/Fragment/Fragment';
import LanguageButton from '../..//Util/Buttons/LanguageButton/LanguageButton';
import BackgroundButton from '../../Util/Buttons/BackgroundButton/BackgroundButton';
import UnitsButton from '../../Util/Buttons/UnitsButton/UnitsButton';

export default class Buttons extends UIComponent {
    createElement() {
        const { language, units } = this.props;
        return createElement(Fragment, { },
            createElement(UnitsButton, { onClick: this.props.unitBtnHandler, units }),
            createElement(LanguageButton, { onClick: this.props.langBtnHandler, language }),
            createElement(BackgroundButton, { onClick: this.props.backgroundHandler, language }));
    }
}
