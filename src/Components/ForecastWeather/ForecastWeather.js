import WeatherAPI from '../../API/WeatherAPI/WeatherAPI';
import FutureWeatherUI from './ForecastWeatherUI';
import LoadingPlaceholder from '../LoadingPlaceholder/LoadingPlaceholder';
import languageConfig from '../../config/languages';

export default class FutureWeather {
    constructor(id) {
        this.api = new WeatherAPI();
        this.ui = new FutureWeatherUI(id);
        this.LoadingPlaceholder = new LoadingPlaceholder(id);
        this.state = {
            lat: null
        };
        this.isRequestNeeded = true;
    }

    async update(state) {
        let data;
        const strings = languageConfig[state.language].strings;
        const hasLocationChanged = state.lat !== this.state.lat;
        const hasLanguageChanged = state.language !== this.state.language;
        if (hasLocationChanged || hasLanguageChanged) this.isRequestNeeded = true;
        if (this.isRequestNeeded) {
            this.LoadingPlaceholder.render();
            try {
                data = await this.api.getThreeDaysWeather(state.lat, state.language);
                this.ui.removeError();
            } catch {
                this.ui.displayError({ msg: strings.apiUnavailableError, className: 'weather__error' });
                return;
            }
            this.state = { ...state, ...data };
            this.isRequestNeeded = false;
        } else {
            data = this.state;
        }
        data.units = state.units;
        data.location = state.location;
        this.ui.render(data);
    }
}
