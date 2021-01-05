import GelocationIpinfo from './Geolocation/Geolocation';
import ControlBlock from './ControlBlock/Controlblock';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import WeatherUI from './UI/WeatherUI';

function geolocationFacade(data) {
    const language = data.country === 'RU' ? 'RU' : 'EN';
    const temperatureUnits = data.country === 'US' ? 'F' : 'C';
    const location = `${data.city}, ${data.country}`;
    const lat = data.loc;
    return {
        language,
        temperatureUnits,
        location,
        lat
    };
}

class WeatherApp {
    constructor() {
        this.state = {
            geolocation: null,
            weather: null,
            nextWeather: new Array(3).fill(null)
        };
        this.controlBlock = new ControlBlock('control', { language: this.state.language, location: this.state.location });
        this.geolocation = new GelocationIpinfo();
        this.ui = new WeatherUI('container');
        this.ui.render();
        this.currentWeather = new CurrentWeather('current-weather');
    }

    async init() {
        const data = await this.geolocation.getLocation();
        this.state.geolocation = geolocationFacade(data);
        this.controlBlock.updateState(this.state.geolocation);
        this.currentWeather.update(this.state.geolocation);
    }
}

const app = new WeatherApp();
app.init();
