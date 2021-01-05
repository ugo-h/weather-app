import { fetchGetJson } from '../lib/lib';
import { weatherApiKey } from '../config';

function weatherDataFacade({ current }) {
    return {
        temp: {
            c: current.temp_c,
            f: current.temp_f
        },
        feelslike: {
            c: current.feelslike_c,
            f: current.feelslike_f
        },
        icon: current.condition.icon,
        summary: current.condition.text,
        humidity: current.humidity,
        wind: {
            vel: current.wind_kph,
            dir: current.wind_dir
        }

    };
}

export default class WeatherAPI {
    constructor() {
        this.url = 'http://api.weatherapi.com/v1';
        this.apiKey = weatherApiKey;
    }

    async getCurrentWeather(location, lang) {
        const data = await fetchGetJson(`${this.url}/current.json`, {
            q: location,
            key: this.apiKey,
            lang
        });
        return weatherDataFacade(data);
    }
}
