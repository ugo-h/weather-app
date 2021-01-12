import { mapsApiKey } from '../../config/config';
import mapboxgl from 'mapbox-gl';

export default class MapsAPI {
    constructor(containerId, { lat }) {
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
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: lat.split(',').reverse(), // starting position [lng, lat]
            zoom: 8
        });
        this.isStyleLoaded = false;
    }

    _updateLabelsAndHandleErrors(language) {
        try {
            this._updateLabels(language);
        } catch (err) {
            this.map.on('load', this._updateLabels.bind(this, language));
        }
    }

    _updateLabels(language) {
        this.labels.forEach(label => {
            this.map.setLayoutProperty(label, 'text-field', [
                'get',
                'name_' + language
            ]);
            // this.map.setLayoutProperty(label, 'text-ignore-placement', true);
            // this.map.setLayoutProperty(label, 'text-allow-overlap', true);
        });
    }

    onLoad(callback) {
        this.map.on('load', callback);
    }

    update(state) {
        this._updateLabelsAndHandleErrors(state.language);
        const normalizedCoordinates = state.lat.split(',').reverse();
        this.map.jumpTo({ center: normalizedCoordinates });
    }
}
