import CurrentWeatherUI from './CurrentWeatherUI';
import WeatherAPI from '../../API/WeatherAPI/WeatherAPI';
import GeocodingAPI from '../../API/GeocodingAPI/GeocodingAPI';

export default class CurrentWeather {
    constructor(id) {
        this.ui = new CurrentWeatherUI(id);
        this.api = new WeatherAPI();
        this.geocoding = new GeocodingAPI();
        this.state = {
            lat: null
        };
        this.isRequestNeeded = true;
    }

    async update(state) {
        let data;
        const hasLocationChanged = state.lat !== this.state.lat;
        const hasLanguagehanged = state.language !== this.state.language;
        if (hasLanguagehanged || hasLocationChanged) {
            const rawLocation = await this.geocoding.getCoordinatesFromStr(
                state.lat,
                { language: state.language.toLowerCase() }
            );
            const locationComponents = rawLocation.results[0].components;
            const location = (locationComponents.city || locationComponents.state) + ', ' + locationComponents.country;
            // eslint-disable-next-line no-param-reassign
            state.location = location;
            this.isRequestNeeded = true;
        }
        if (this.isRequestNeeded) {
            data = await this.api.getCurrentWeather(state.lat, state.language.toLowerCase());
            this.state = { ...state, ...data };
            this.isRequestNeeded = false;
        } else {
            data = this.state;
        }
        data.units = state.units;
        data.location = state.location;
        data.language = state.language;
        this.ui.render(data);
    }
}
