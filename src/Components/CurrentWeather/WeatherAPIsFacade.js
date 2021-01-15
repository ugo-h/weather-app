export default class WeatherAPIsFacade {
    constructor(weather, geocoding) {
        this.weatherAPI = weather;
        this.geocodingAPI = geocoding;
    }

    async parseLocationFromState(state) {
        return this.geocodingAPI.getStringFromCoordinates(
            state.latLng,
            { language: state.language }
        );
    }

    async getWeatherFromState(state) {
        return this.weatherAPI.getCurrentWeather(state.latLng, state.language.toLowerCase());
    }
}
