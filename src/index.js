import GeolocationAPI from './API/Geolocation/Geolocation';
import ControlBlock from './Components/ControlBlock/Controlblock';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import FutureWeather from './Components/FutureWeather/FutureWeather';
import Search from './Components/Search/Search';
import WeatherUI from './UI/WeatherUI';

function getLanguage(data) {
    const language = data.country === 'RU' ? 'RU' : 'EN';
    return language;
}

function getUnits(data) {
    const units = data.country === 'US' ? 'f' : 'c';
    return units;
}

function getLocation(data) {
    const location = `${data.city}, ${data.country}`;
    const lat = data.loc;
    return {
        location,
        lat
    };
}

function getFormattedData(data) {
    const geolocation = getLocation(data);
    const language = getLanguage(data);
    const units = getUnits(data);
    return { ...geolocation, language, units };
}

class WeatherApp {
    constructor() {
        this.state = {
            units: null,
            location: null,
            lat: null,
            language: null
        };
        this.controlBlock = new ControlBlock('control', { language: this.state.language, location: this.state.location });
        this.geolocation = new GeolocationAPI();
        this.ui = new WeatherUI('container');
        this.ui.render();
        this.currentWeather = new CurrentWeather('current-weather');
        this.futureWeather = new FutureWeather('forecast-weather');
    }

    changeUnits(ev) {
        const btnElement = ev.target;
        btnElement.innerText = this.state.units;
        this.state.units = this.state.units === 'c' ? 'f' : 'c';
        this.currentWeather.update({ ...this.state });
        this.futureWeather.update({ ...this.state });
        this.saveState();
    }

    saveState() {
        localStorage.setItem('preferences', JSON.stringify(this.state));
    }

    async loadState() {
        let data = localStorage.getItem('preferences');
        if (!data) {
            data = await this.geolocation.getLocation();
            this.state = getFormattedData(data);
            localStorage.setItem('preferences', JSON.stringify(this.state));
        } else {
            this.state = JSON.parse(data);
        }
    }

    processSearchResult(result) {
        this.state.lat = `${result.bounds.northeast.lat},${result.bounds.northeast.lng}`;
        this.state.location = result.formatted;
        this.currentWeather.update({ ...this.state });
        this.futureWeather.update({ ...this.state });
    }

    async init() {
        this.loadState();
        this.controlBlock.onChangeUnits(this.changeUnits.bind(this));
        this.controlBlock.update({ ...this.state });
        this.search = new Search('search', this.processSearchResult.bind(this));
        this.search.update();
        this.currentWeather.update({ ...this.state });
        this.futureWeather.update({ ...this.state });
    }
}

const app = new WeatherApp();
app.init();
