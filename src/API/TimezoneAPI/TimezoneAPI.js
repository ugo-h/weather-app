import { timezoneApiUsername } from '../../config/config';
import { fetchGetJson } from '../../lib/lib';

export default class TimezoneAPI {
    constructor() {
        this.url = 'http://api.geonames.org/timezoneJSON';
        this.username = timezoneApiUsername;
    }

    async getTimezoneFromCoordinates(coordinates) {
        const data = await fetchGetJson(this.url, {
            lat: coordinates.lat,
            lng: coordinates.lng,
            username: this.username
        });
        return data.timezoneId;
    }
}
