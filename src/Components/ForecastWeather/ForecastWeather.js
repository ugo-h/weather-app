import WeatherAPI from '../../API/WeatherAPI/WeatherAPI';
import ForecastWeatherUI from './ForecastWeatherUI';
import LoadingPlaceholder from '../LoadingPlaceholder/LoadingPlaceholder';
import { createElement, render } from '../../UI/domHelper';

export default class FutureWeather {
    constructor(id) {
        this.api = new WeatherAPI();
        this.id = id;
        this.LoadingPlaceholder = new LoadingPlaceholder(id);
        this.state = {
            lat: null
        };
        this.isRequestNeeded = true;
    }

    async update(state) {
        let data = {};
        const hasLocationChanged = state.lat !== this.state.lat;
        const hasLanguageChanged = state.language !== this.state.language;
        if (hasLocationChanged || hasLanguageChanged) this.isRequestNeeded = true;
        if (this.isRequestNeeded) {
            this.LoadingPlaceholder.render();
            try {
                data = await this.api.getThreeDaysWeather(state.lat, state.language);
            } catch {
                return;
            }
            this.isRequestNeeded = false;
        }
        this.state = { ...this.state, ...state, ...data };
        this.state.units = state.units;
        this.state.location = state.location;
        this.render();
    }

    render() {
        render(createElement(ForecastWeatherUI, { ...this.state }), this.id);
    }
}
