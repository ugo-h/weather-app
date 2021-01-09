import GeolocationAPI from './API/Geolocation/Geolocation';
import ControlBlock from './Components/ControlBlock/Controlblock';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import FutureWeather from './Components/FutureWeather/FutureWeather';
import Search from './Components/Search/Search';
import WeatherUI from './UI/WeatherUI';
import { getFormattedGeolocationData } from './lib/lib';

class WeatherApp {
    constructor() {
        this.state = {
            units: null,
            location: null,
            lat: null,
            language: null
        };
        this.ui = new WeatherUI('container');
        this.ui.render();

        this.controlBlock = new ControlBlock('control', { language: this.state.language, location: this.state.location });
        this.geolocation = new GeolocationAPI();
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
        const { language, units } = this.state;
        localStorage.setItem('preferences', JSON.stringify({ language, units }));
    }

    async loadState() {
        const data = await this.geolocation.getLocation();
        this.state = getFormattedGeolocationData(data);
        const preferences = localStorage.getItem('preferences');
        if (preferences) {
            const { language, units } = JSON.parse(preferences);
            this.state.language = language;
            this.state.units = units;
        }
    }

    processSearchResult(result) {
        this.state.lat = `${result.bounds.northeast.lat},${result.bounds.northeast.lng}`;
        this.state.location = result.formatted;
        this.currentWeather.update({ ...this.state });
        this.futureWeather.update({ ...this.state });
    }

    async init() {
        await this.loadState();
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
