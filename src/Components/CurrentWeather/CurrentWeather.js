import CurrentWeatherUI from './CurrentWeatherUI';
import WeatherAPI from '../../API/WeatherAPI/WeatherAPI';

export default class CurrentWeather {
    constructor(id) {
        this.ui = new CurrentWeatherUI(id);
        this.api = new WeatherAPI();
        this.state = {
            lat: null
        };
        this.isRequestNeeded = true;
    }

    async update(state) {
        let data;
        if (state.lat !== this.state.lat) this.isRequestNeeded = true;
        if (this.isRequestNeeded) {
            data = await this.api.getCurrentWeather(state.lat, state.language.toLowerCase());
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
