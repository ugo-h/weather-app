import CurrentWeatherUI from '../UI/CurrentWeatherUI/CurrentWeatherUI';
import WeatherAPI from '../WeatherAPI/WeatherAPI';

export default class CurrentWeather {
    constructor(id) {
        this.ui = new CurrentWeatherUI(id);
        this.api = new WeatherAPI();
    }

    async update(state) {
        const data = await this.api.getCurrentWeather(state.lat, state.language.toLowerCase());
        data.units = state.units;
        data.location = state.location;
        this.ui.render(data);
    }
}
