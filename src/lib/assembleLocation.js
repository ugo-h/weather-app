export function assembleLocation(components) {
    if (!components.town && !components.city && !components.state) {
        return components.county + ', ' + components.country;
    }
    return (components.city || components.town || components.state) + ', ' + components.country;
}
