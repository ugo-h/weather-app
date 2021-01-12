export function assembleLocation(components) {
    return (components.city || components.state) + ', ' + components.country;
}
