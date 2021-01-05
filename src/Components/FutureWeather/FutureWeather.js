import WeatherAPI from '../../API/WeatherAPI/WeatherAPI';
import FutureWeatherUI from './FutureWeatherUI';

export default class FutureWeather {
    constructor(id) {
        this.api = new WeatherAPI();
        this.ui = new FutureWeatherUI(id);
    }

    async update(state) {
        const data = await this.api.getThreeDaysWeather(state.location, state.lang);
        this.ui.render(data);
    }
}
