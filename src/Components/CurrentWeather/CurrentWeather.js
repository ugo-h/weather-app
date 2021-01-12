import CurrentWeatherUI from './CurrentWeatherUI';
import WeatherAPI from '../../API/WeatherAPI/WeatherAPI';
import GeocodingAPI from '../../API/GeocodingAPI/GeocodingAPI';
import LoadingPlaceholder from '../LoadingPlaceholder/LoadingPlaceholder';
import WeatherAPIsFacade from './WeatherAPIsFacade';

export default class CurrentWeather {
    constructor(id) {
        this.ui = new CurrentWeatherUI(id);
        this.LoadingPlaceholder = new LoadingPlaceholder(id);
        this.apiFacade = new WeatherAPIsFacade(
            // this facade wraps all api requests for this class
            new WeatherAPI(),
            new GeocodingAPI()
        );
        this.state = {
            lat: null
        };
        this.isRequestNeeded = true;
    }

    async _updateLocationAndLanguage(state, setState) {
        this.LoadingPlaceholder.render();
        const location = await this.apiFacade.parseLocationFromState(state);
        this.state = { ...this.state, ...state };
        this.state.location = location;
        // the function below updates location in the main state of the app,
        // in order for it to be updated in all parts of application when the change is required
        setState({ location });
    }

    async update(state, updateMainState) {
        const hasLocationChanged = state.lat !== this.state.lat;
        const hasLanguagehanged = state.language !== this.state.language;
        if (hasLanguagehanged || hasLocationChanged) {
            await this._updateLocationAndLanguage(state, updateMainState);
            this.isRequestNeeded = true;
        }
        let weather = {};
        if (this.isRequestNeeded) {
            // we send request only if it is neccessary. For example, when the only thing
            // we update is temperature units, we do not send the request
            weather = await this.apiFacade.getWeatherFromState(state);
            this.isRequestNeeded = false;
        }
        this.state = { ...this.state, ...weather };
        this.state.units = state.units;
        this.ui.render({ ...this.state });
    }
}
