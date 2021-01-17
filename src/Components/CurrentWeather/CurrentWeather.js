import CurrentWeatherUI from './CurrentWeatherUI';
import WeatherAPI from '../../API/WeatherAPI/WeatherAPI';
import GeocodingAPI from '../../API/GeocodingAPI/GeocodingAPI';
import LoadingPlaceholder from '../LoadingPlaceholder/LoadingPlaceholder';
import WeatherAPIsFacade from './WeatherAPIsFacade';
import languageConfig from '../../config/languages';
import { createElement, render } from '../../UI/domHelper';
import ErrorHandler from '../Util/ErrorHandler/ErrorHandler';

export default class CurrentWeather {
    constructor(id) {
        this.id = id;
        this.apiFacade = new WeatherAPIsFacade(
            // this facade wraps all api requests for this class
            new WeatherAPI(),
            new GeocodingAPI()
        );
        this.state = {
            latLng: {},
            language: 'en',
            hasError: false,
            isLoading: true
        };
        this.isRequestNeeded = true;
    }

    async _updateLocationAndLanguage(state, setState) {
        this.state.isLoading = true;
        const location = await this.apiFacade.parseLocationFromState(state);
        this.state = { ...this.state, ...state };
        this.state.location = location;
        // the function below updates location in the main state of the app,
        // in order for it to be updated in all parts of application when the change is required
        setState({ location });
    }

    async update(state, updateMainState) {
        this.state.isLoading = true;
        this.render();
        const hasLocationChanged = state.latLng.toString() !== this.state.latLng.toString();
        const hasLanguagehanged = state.language !== this.state.language;
        if (hasLanguagehanged || hasLocationChanged) {
            try {
                await this._updateLocationAndLanguage(state, updateMainState);
            } catch (err) {
                this.state.hasError = true;
            }
            this.isRequestNeeded = true;
        }
        let weather = {};
        if (this.isRequestNeeded) {
            // we send request only if it is neccessary. For example, when the only thing
            // we update is temperature units, we do not send the request
            this.state.isLoading = true;
            weather = await this.apiFacade.getWeatherFromState(state);
            if (weather.error) {
                this.state.hasError = true;
            } else {
                this.state.hasError = false;
            }
            this.isRequestNeeded = false;
        }
        this.state = { ...this.state, ...weather };
        this.state.units = state.units;
        this.state.language = state.language;
        this.state.timezone = state.timezone;
        this.state.isLoading = false;
        this.render();
    }

    render() {
        const strings = languageConfig[this.state.language].strings;
        render(
            this.state.isLoading
                ? createElement(LoadingPlaceholder, { isLoading: this.state.isLoading })
                : createElement(ErrorHandler, {
                    hasError: this.state.hasError,
                    successElement: createElement(CurrentWeatherUI, { ...this.state }),
                    errorElement: createElement('div', { className: 'card' }, strings.apiUnavailableError)
                }),
            this.id
        );
    }
}
