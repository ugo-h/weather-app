import { mapsApiKey } from '../../config/config';
import mapboxgl from 'mapbox-gl';

export default class MapsAPI {
    constructor(containerId) {
        this.apiKey = mapsApiKey;
        this.id = containerId;
        mapboxgl.accessToken = this.apiKey;
        this.map = new mapboxgl.Map({
            container: this.id, // container id
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [0, 0], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
        this.isLoaded = false;
    }

    update(state) {
        if (this.isLoaded) {
            this.map.setLayoutProperty('country-label', 'text-field', [
                'get',
                'name_' + state.language
            ]);
        }
        const normalizedCoordinates = state.lat.split(',').reverse();
        this.map.jumpTo({ center: normalizedCoordinates });
        this.isLoaded = true;
    }
}
