import WeatherAPI from '../../API/WeatherAPI/WeatherAPI';
import ForecastWeatherUI from './ForecastWeatherUI';
import LoadingPlaceholder from '../LoadingPlaceholder/LoadingPlaceholder';
import { createElement, render } from '../../UI/domHelper';
import ErrorHandler from '../Util/ErrorHandler/ErrorHandler';
import languageConfig from '../../config/languages';

export default class FutureWeather {
    constructor(id) {
        this.api = new WeatherAPI();
        this.id = id;
        this.state = {
            latLng: null,
            hasError: false,
            isLoading: true,
            language: 'en'
        };
        this.isRequestNeeded = true;
    }

    async update(state) {
        this.state.isLoading = true;
        this.render();
        let data = {};
        const hasLocationChanged = state.latLng !== this.state.latLng;
        const hasLanguageChanged = state.language !== this.state.language;
        if (hasLocationChanged || hasLanguageChanged) this.isRequestNeeded = true;
        if (this.isRequestNeeded) {
            data = await this.api.getThreeDaysWeather(state.latLng, state.language);
            if (data.error) {
                this.state.hasError = true;
            } else {
                this.state.hasError = false;
            }
            this.isRequestNeeded = false;
        }
        this.state = { ...this.state, ...state, ...data };
        this.state.units = state.units;
        this.state.location = state.location;
        this.state.isLoading = false;
        this.render();
    }

    render() {
        const strings = languageConfig[this.state.language].strings;
        render(
            this.state.isLoading
                ? createElement(LoadingPlaceholder, {})
                : createElement(ErrorHandler, {
                    hasError: this.state.hasError,
                    successElement: createElement(ForecastWeatherUI, { ...this.state }),
                    errorElement: createElement('div', { className: 'card' }, strings.apiUnavailableError)
                }),
            this.id
        );
    }
}
