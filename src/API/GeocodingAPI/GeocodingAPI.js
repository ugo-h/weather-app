import { fetchGetJson, assembleLocation } from '../../lib/lib';
import { geocodingApiKey } from '../../config/config';
/* eslint-disable object-curly-newline */
export default class GeocodingAPI {
    constructor() {
        this.url = 'https://api.opencagedata.com/geocode/v1/json';
        this.token = geocodingApiKey;
    }

    async getLocationListFromStr(str, options = {}) {
        const data = await fetchGetJson(this.url, {
            q: str,
            key: this.token,
            ...options
        });
        return data.results;
    }

    async getStringFromCoordinates(coordinates, options) {
        const data = await fetchGetJson(this.url, {
            q: coordinates,
            key: this.token,
            ...options
        });
        const locationComponents = data.results[0].components;
        const location = assembleLocation(locationComponents);
        return location;
    }
}
