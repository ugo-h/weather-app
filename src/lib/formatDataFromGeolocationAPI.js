import Coordinates from './Coordinates/Coordinates';

function getLanguage(data) {
    const language = data.country.toLowerCase() === 'ru' ? 'ru' : 'en';
    return language;
}

function getUnits(data) {
    const units = data.country === 'US' ? 'f' : 'c';
    return units;
}

function getLocation(data) {
    const location = `${data.city}, ${data.country}`;
    const [lat, lng] = data.loc.split(',');
    const latLng = new Coordinates(lat, lng);
    return {
        location,
        latLng,
        timezone: data.timezone
    };
}

export function getFormattedGeolocationData(data) {
    const geolocation = getLocation(data);
    const language = getLanguage(data);
    const units = getUnits(data);
    return { ...geolocation, language, units };
}
