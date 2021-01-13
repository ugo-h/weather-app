/* eslint-disable no-undef */
import UIComponent from '../UIComponent';
import { createElement } from '../domHelper';

test('createElement should return htmlDomElement', () => {
    expect(createElement('div', {}).innerHTML).toBe(document.createElement('DIV').innerHTML);
});

test('Should create component element when passed type is a constuctor function that inherits Component', () => {
    class DummyComponent extends UIComponent {
        createElement() {
            return createElement('p', { className: this.props.className });
        }
    }
    const dummyElement = document.createElement('DIV');
    dummyElement.className = 'dummy';
    expect(createElement(DummyComponent, { className: 'dummy' }).innerHTML).toBe(dummyElement.innerHTML);
});
