export function loadingHoc(promise, component) {
    promise.then((res) => {
        return component(res);
    });
    return 'loading';
}
