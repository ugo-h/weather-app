import GeolocationAPI from '../../API/Geolocation/Geolocation';
import ControlBlock from '../ControlBlock/Controlblock';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import ForecastWeather from '../ForecastWeather/ForecastWeather';
import WeatherUI from './WeatherUI';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import {
    getFormattedGeolocationData,
    scrollToTop,
    loadScript
} from '../../lib/lib';
import MapsAPI from '../../API/MapsAPI/MapsAPI';
import { createElement, render } from '../../UI/domHelper';
import TimezoneAPI from '../../API/TimezoneAPI/TimezoneAPI';
import Coordinates from '../../lib/Coordinates/Coordinates';

document.cookie = 'Set-Cookie: promo_shown=1; SameSite=Lax';

export default class WeatherApp {
    constructor() {
        this.state = {
            units: null,
            location: null,
            latLng: {},
            language: null
        };
        this.render();
        this.geolocation = new GeolocationAPI();
        this.timezoneAPI = new TimezoneAPI();
        this.currentWeather = new CurrentWeather('current-weather');
        this.forecastWeather = new ForecastWeather('forecast-weather');
        this.background = new BackgroundImage('container');
    }

    changeUnits() {
        this.state.units = this.state.units === 'c' ? 'f' : 'c';
        this.update();
        this.saveState();
    }

    changeLang() {
        this.state.language = this.state.language === 'ru' ? 'en' : 'ru';
        this.update();
        this.map.update(this.state.language, this.state.latLng);
        this.saveState();
    }

    changeBackground() {
        this.background.apply();
    }

    async processSearchResult({ geometry, location }) {
        // processes a search result either from search or from map marker
        this.state.timezone = await this.timezoneAPI.getTimezoneFromCoordinates(geometry);
        this.state.latLng = new Coordinates(geometry.lat, geometry.lng);
        this.state.location = location;

        this.currentWeather.update({ ...this.state }, this.setState.bind(this));
        this.forecastWeather.update({ ...this.state });
        this.map.update(this.state.language, this.state.latLng);
        scrollToTop();
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

    update() {
        this.currentWeather.update({ ...this.state }, this.setState.bind(this));
        this.forecastWeather.update({ ...this.state });
        this.controlBlock.update({ ...this.state });
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

        this.update();

        loadScript('https://api.mapbox.com/mapbox-gl-js/v2.0.1/mapbox-gl.js', () => {
            this.map = new MapsAPI('map', this.state.latLng, this.processSearchResult.bind(this));
            this.map.update(this.state.language, this.state.latLng);
        });
    }

    // eslint-disable-next-line class-methods-use-this
    render() {
        render(createElement(WeatherUI, {}), 'container');
    }
}
