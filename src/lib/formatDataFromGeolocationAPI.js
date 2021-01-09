function getLanguage(data) {
    const language = data.country === 'RU' ? 'RU' : 'EN';
    return language;
}

function getUnits(data) {
    const units = data.country === 'US' ? 'f' : 'c';
    return units;
}

function getLocation(data) {
    const location = `${data.city}, ${data.country}`;
    const lat = data.loc;
    return {
        location,
        lat
    };
}

export function getFormattedGeolocationData(data) {
    const geolocation = getLocation(data);
    const language = getLanguage(data);
    const units = getUnits(data);
    return { ...geolocation, language, units };
}
