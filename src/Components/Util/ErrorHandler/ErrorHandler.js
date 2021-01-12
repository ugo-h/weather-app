export default class ErrorHandler {
    constructor(ui) {
        this.ui = ui;
    }

    async wrapRequest(request, errorParams) {
        try {
            const data = await request();
            this.ui.removeError();
            return { hasError: false, data };
        } catch (err) {
            this.ui.displayError(errorParams);
            return { hasError: true, data: null };
        }
    }
}
