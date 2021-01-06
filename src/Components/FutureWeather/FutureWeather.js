import WeatherAPI from '../../API/WeatherAPI/WeatherAPI';
import FutureWeatherUI from './FutureWeatherUI';

export default class FutureWeather {
    constructor(id) {
        this.api = new WeatherAPI();
        this.ui = new FutureWeatherUI(id);
        this.state = {};
        this.isRequestNeeded = true;
    }

    async update(state) {
        let data;
        if (this.isRequestNeeded) {
            data = await this.api.getThreeDaysWeather(state.location, state.language);
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
