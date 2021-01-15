/* eslint-disable no-multi-assign */
export function loadScript(src, callback) {
    let isScriptReady = false;
    let scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = src;
    scriptElement.onload = scriptElement.onreadystatechange = function load() {
        if (!isScriptReady && (!this.readyState || this.readyState === 'complete')) {
            isScriptReady = true;
            callback();
        }
    };
    let tag = document.getElementsByTagName('script')[0];
    tag.parentNode.insertBefore(scriptElement, tag);
}
