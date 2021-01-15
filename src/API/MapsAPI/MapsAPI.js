/* eslint-disable no-undef */
import { mapsApiKey } from '../../config/config';
import Coordinates from '../../lib/Coordinates/Coordinates';
import GeocodingAPI from '../GeocodingAPI/GeocodingAPI';
import { layerLabels } from './MapConfig';

export default class MapsAPI {
    constructor(containerId, latLng, dragEvent) {
        if (!(latLng instanceof Coordinates)) {
            throw new TypeError(`"latLng" must be of the type Coordinates, not "${typeof latLng}"`);
        }
        this.geocoding = new GeocodingAPI();
        this.labels = layerLabels;
        this.apiKey = mapsApiKey;
        this.dragEvent = dragEvent;
        this.id = containerId;
        this._initMap(latLng);
    }

    _initMap({ lat, lng }) {
        mapboxgl.accessToken = this.apiKey;
        this.map = new mapboxgl.Map({
            container: this.id, // container id
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [lng, lat], // starting position [lng, lat]
            zoom: 8
        });
        this.marker = new mapboxgl.Marker({
            draggable: true
        }).setLngLat([lng, lat]).addTo(this.map);
        this.marker.on('dragend', this._onDragEnd.bind(this));
        this.isStyleLoaded = false;
    }

    async _onDragEnd() {
        const geometry = this.marker.getLngLat();
        const location = await this.geocoding.getStringFromCoordinates(`${geometry.lat},${geometry.lng}`);
        this.dragEvent({ geometry, location });
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
        });
    }

    update(language, { lat, lng }) {
        this._updateLabelsAndHandleErrors(language);
        const lngLatArray = [lng, lat];
        this.map.jumpTo({ center: lngLatArray });
        this.marker.setLngLat(lngLatArray);
    }
}
