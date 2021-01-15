import GeolocationAPI from './API/Geolocation/Geolocation';
import ControlBlock from './Components/ControlBlock/Controlblock';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import ForecastWeather from './Components/ForecastWeather/ForecastWeather';
import WeatherUI from './UI/WeatherUI';
import BackgroundImage from './Components/BackgroundImage/BackgroundImage';
import {
    getFormattedGeolocationData,
    assembleLocation,
    scrollToTop,
    loadScript
} from './lib/lib';
import MapsAPI from './API/MapsAPI/MapsAPI';
import { createElement, render } from './UI/domHelper';
import TimezoneAPI from './API/TimezoneAPI/TimezoneAPI';

class WeatherApp {
    constructor() {
        this.state = {
            units: null,
            location: null,
            lat: null,
            language: null
        };
        this.render();
        this.geolocation = new GeolocationAPI();
        this.timezone = new TimezoneAPI();
        this.currentWeather = new CurrentWeather('current-weather');
        this.forecastWeather = new ForecastWeather('forecast-weather');
        this.background = new BackgroundImage('container');
    }

    changeUnits() {
        this.state.units = this.state.units === 'c' ? 'f' : 'c';
        this.currentWeather.update({ ...this.state }, this.setState.bind(this));
        this.forecastWeather.update({ ...this.state });
        this.controlBlock.update({ ...this.state });
        this.saveState();
    }

    changeLang() {
        this.state.language = this.state.language === 'ru' ? 'en' : 'ru';
        this.currentWeather.update({ ...this.state }, this.setState.bind(this));
        this.forecastWeather.update({ ...this.state });
        this.controlBlock.update({ ...this.state });

        this.map.update({ ...this.state });
        this.saveState();
    }

    setState(object) {
        Object.keys(object).forEach(key => { this.state[key] = object[key]; });
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

    async processSearchResult(result) {
        this.state.timezone = await this.timezone.getTimezoneFromCoordinates({
            ...result.geometry
        });
        this.state.lat = `${result.geometry.lat},${result.geometry.lng}`;
        this.state.location = assembleLocation(result.components);
        this.currentWeather.update({ ...this.state }, this.setState.bind(this));
        this.forecastWeather.update({ ...this.state });
        this.map.update({ ...this.state });
        scrollToTop();
    }

    changeBackground() {
        this.background.apply();
    }

    async init() {
        await this.loadState();
        this.background.apply();
        this.controlBlock = new ControlBlock('control', {
            language: this.state.language,
            location: this.state.location
        },
        {
            onBackgroundChange: this.changeBackground.bind(this),
            onChangeLanguage: this.changeLang.bind(this),
            onChangeUnits: this.changeUnits.bind(this),
            onSearch: this.processSearchResult.bind(this)
        });

        this.controlBlock.update({ ...this.state });
        this.currentWeather.update({ ...this.state }, this.setState.bind(this));
        this.forecastWeather.update({ ...this.state });

        loadScript('https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.js', () => {
            this.map = new MapsAPI('map', this.state);
            this.map.update({ ...this.state });
        });
    }

    // eslint-disable-next-line class-methods-use-this
    render() {
        render(createElement(WeatherUI, {}), 'container');
    }
}

const app = new WeatherApp();
app.init();
