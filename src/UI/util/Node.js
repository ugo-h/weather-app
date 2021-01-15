export default class Node {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }

    render() {
        const element = document.createElement(this.type);
        Object.keys(this.props).forEach(key => {
            if (key === 'onClick') {
                element.addEventListener('click', this.props[key]);
                return;
            } if (key === 'onSubmit') {
                element.addEventListener('submit', this.props[key]);
                return;
            }
            element[key] = this.props[key];
        });
        this.children.forEach(child => {
            element.append(child instanceof Node ? child.render() : child);
        });
        return element;
    }
}
