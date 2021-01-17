export function assembleLocation(components) {
    if (!components.town && !components.city && !components.state) {
        if (!components.county) return components.country;
        return components.county + ', ' + components.country;
    }
    return (components.city || components.town || components.state) + ', ' + components.country;
}
