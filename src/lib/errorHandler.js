export function errorHandler(callback, fallback) {
    try {
        const data = callback();
        return { hasError: false, data };
    } catch (err) {
        fallback();
        return { hasError: true, data: null };
    }
}
