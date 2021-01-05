import { fetchGetJson } from '../../lib/lib';
import { geolocationApiKey } from '../../config';
/* eslint-disable object-curly-newline */
export default class GeolocationIpinfo {
    constructor() {
        this.url = 'https://ipinfo.io';
        this.token = geolocationApiKey;
    }

    async getLocation() {
        const data = await fetchGetJson(this.url, { token: this.token });
        const filtered = (({ city, country, loc, timezone }) => (
            { city, country, loc, timezone }
        ))(data);
        return filtered;
    }
}
