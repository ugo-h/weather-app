import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { fetchGetJson } from '../../lib/lib';
import { weatherApiKey } from '../../config/config';
import Coordinates from '../../lib/Coordinates/Coordinates';

function getFormattedCurrentWeather({ current }) {
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
            vel: Math.round((current.wind_kph * 1000) / 3600),
            dir: current.wind_dir
        }

    };
}

function getFormattedForecast({ forecastday }, lang = 'en') {
    return forecastday.map(day => {
        return {
            date: dayjs(day.date).locale(lang).format('dddd, D MMMM'),
            temp: {
                c: day.day.avgtemp_c,
                f: day.day.avgtemp_f
            },
            text: day.day.condition.text,
            icon: day.day.condition.icon
        };
    });
}

export default class WeatherAPI {
    constructor() {
        this.url = 'https://api.weatherapi.com/v1';
        this.apiKey = weatherApiKey;
    }

    async getCurrentWeather(location, lang) {
        if (!(location instanceof Coordinates)) {
            throw new TypeError(`"location" must be of the type Coordinates, not "${typeof location}"`);
        }
        const data = await fetchGetJson(`${this.url}/current.json`, {
            q: location.toString(),
            key: this.apiKey,
            lang
        });
        if (data.error) return data;
        return getFormattedCurrentWeather(data);
    }

    async getThreeDaysWeather(location, lang) {
        if (!(location instanceof Coordinates)) {
            throw new TypeError(`"location" must be of the type Coordinates, not "${typeof location}"`);
        }
        const data = await fetchGetJson(`${this.url}/forecast.json`, {
            q: location.toString(),
            key: this.apiKey,
            lang: lang.toLowerCase(),
            days: 3
        });
        if (data.error) return data;
        return { forecast: getFormattedForecast(data.forecast, lang.toLowerCase()) };
    }
}
