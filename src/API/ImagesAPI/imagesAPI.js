import { imagesAPIkey } from '../../config/config';
import { fetchGetJson } from '../../lib/lib';

export default class imagesAPI {
    constructor() {
        this.url = 'https://api.unsplash.com/photos/random';
        this.apiKey = imagesAPIkey;
    }

    async getRandom() {
        const data = await fetchGetJson(this.url, {
            client_id: this.apiKey,
            collections: '70572780',
            auto: 'format'
        });
        console.log(data)
        return data.urls.regular;
    }
}
