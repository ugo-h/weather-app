import { fetchGetJson } from '../../lib/lib';
import { geocodingApiKey } from '../../config/config';
/* eslint-disable object-curly-newline */
export default class GeocodingAPI {
    constructor() {
        this.url = 'https://api.opencagedata.com/geocode/v1/json';
        this.token = geocodingApiKey;
    }

    async getCoordinatesFromStr(str, options = {}) {
        const data = await fetchGetJson(this.url, {
            q: str,
            key: this.token,
            ...options
        });
        return data;
    }
}
