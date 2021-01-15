export default class Coordinates {
    constructor(lat, lng) {
        this.lat = lat;
        this.lng = lng;
    }

    toString() {
        return `${this.lat},${this.lng}`;
    }
}
