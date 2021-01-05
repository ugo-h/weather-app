import GelocationIpinfo from './Geolocation/Geolocation';
import ControlBlock from './ControlBlock/Controlblock';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import WeatherUI from './UI/WeatherUI';

function getLanguage(data) {
    const language = data.country === 'RU' ? 'RU' : 'EN';
    return language;
}

function getUnits(data) {
    const units = data.country === 'US' ? 'f' : 'c';
    return units;
}

function geolocationFacade(data) {
    const location = `${data.city}, ${data.country}`;
    const lat = data.loc;
    return {
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
        this.state.language = getLanguage(data);
        this.state.units = getUnits(data);
        this.controlBlock.updateState(this.state.geolocation);
        this.currentWeather.update({
            language: this.state.language,
            units: this.state.units,
            ...this.state.geolocation
        });
    }
}

const app = new WeatherApp();
app.init();
