export async function fetchGetJson(url, params) {
    const query = Object.entries(params).map(param => `${param[0]}=${param[1]}`).join('&');
    const res = await fetch(`${url}?${query}`, {
        method: 'GET',
        headers: { contentType: 'application/json' }
    });
    const data = await res.json();
    return data;
}
