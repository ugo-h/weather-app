export function assembleLocation(components) {
    return (components.city || components.town || components.state) + ', ' + components.country;
}
