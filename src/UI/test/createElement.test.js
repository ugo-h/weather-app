/* eslint-disable no-undef */
import UIComponent from '../UIComponent';
import { createElement, render } from '../domHelper';

test('createElement should return htmlDomElement', () => {
    expect(createElement('div', {}).render().innerHTML).toBe(document.createElement('DIV').innerHTML);
});

test('Should create component element when passed type is a constuctor function that inherits Component', () => {
    class DummyComponent extends UIComponent {
        createElement() {
            return createElement('p', { className: this.props.className });
        }
    }
    const dummyElement = document.createElement('DIV');
    dummyElement.className = 'dummy';
    expect(createElement(DummyComponent, { className: 'dummy' }).render().innerHTML).toBe(dummyElement.innerHTML);
});

test('Should append created component to dom', () => {
    document.body.innerHTML = '<div id="target"></div>';
    render(createElement('p', {}), 'target');
    expect(document.body.innerHTML).toBe('<div id="target"><p></p></div>');
});
