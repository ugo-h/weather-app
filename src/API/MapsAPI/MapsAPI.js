import { mapsApiKey } from '../../config/config';
import mapboxgl from 'mapbox-gl';

export default class MapsAPI {
    constructor(containerId, defaultLang) {
        this.labels = [
            'country-label',
            'state-label',
            'settlement-label',
            'settlement-subdivision-label',
            'airport-label',
            'poi-label',
            'water-point-label',
            'water-line-label',
            'natural-point-label',
            'natural-line-label',
            'waterway-label',
            'road-label'
        ];
        this.apiKey = mapsApiKey;
        this.id = containerId;
        mapboxgl.accessToken = this.apiKey;
        this.map = new mapboxgl.Map({
            container: this.id, // container id
            style: 'mapbox://styles/mapbox/light-v10', // style URL
            center: [0, 0], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
        this.map.once('load', () => this._updateLabels.bind(this, defaultLang));
        this.isLoaded = false;
    }

    _updateLabels(language) {
        this.labels.forEach(label => {
            this.map.setLayoutProperty(label, 'text-field', [
                'get',
                'name_' + language
            ]);
        });
        this.isLoaded = true;
    }

    update(state) {
        this._updateLabels(state.language);
        const normalizedCoordinates = state.lat.split(',').reverse();
        this.map.jumpTo({ center: normalizedCoordinates });
    }
}
