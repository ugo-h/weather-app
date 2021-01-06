import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { fetchGetJson } from '../../lib/lib';
import { weatherApiKey } from '../../config';

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
            vel: current.wind_kph,
            dir: current.wind_dir
        }

    };
}

function getFormattedForecast({ forecastday }, lang = 'en') {
    return forecastday.map(day => {
        return {
            date: dayjs(day.date).locale(lang).format('DD MMMM YYYY'),
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
        this.url = 'http://api.weatherapi.com/v1';
        this.apiKey = weatherApiKey;
    }

    async getCurrentWeather(location, lang) {
        const data = await fetchGetJson(`${this.url}/current.json`, {
            q: location,
            key: this.apiKey,
            lang
        });
        return getFormattedCurrentWeather(data);
    }

    async getThreeDaysWeather(location, lang) {
        const data = await fetchGetJson(`${this.url}/forecast.json`, {
            q: location,
            key: this.apiKey,
            lang: lang.toLowerCase(),
            days: 3
        });
        return { forecast: getFormattedForecast(data.forecast, lang.toLowerCase()) };
    }
}
