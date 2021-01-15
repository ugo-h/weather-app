import { fetchGetJson } from '../../lib/lib';

export default class TimezoneAPI {
    constructor() {
        this.url = 'http://api.geonames.org/timezoneJSON';
    }

    async getTimezoneFromCoordinates(coordinates) {
        const data = await fetchGetJson(this.url, {
            lat: coordinates.lat,
            lng: coordinates.lng,
            username: 'ugo_h'
        });
        return data.timezoneId;
    }
}
