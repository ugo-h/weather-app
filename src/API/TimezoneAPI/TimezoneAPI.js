import { timezoneApiKey } from '../../config/config';
import { fetchGetJson } from '../../lib/lib';

export default class TimezoneAPI {
    constructor() {
        this.url = 'https://api.timezonedb.com/v2.1/get-time-zone';
        this.key = timezoneApiKey;
    }

    async getTimezoneFromCoordinates(coordinates) {
        const data = await fetchGetJson(this.url, {
            format: 'json',
            by: 'position',
            lat: coordinates.lat,
            lng: coordinates.lng,
            key: this.key
        });
        return data.zoneName;
    }
}
