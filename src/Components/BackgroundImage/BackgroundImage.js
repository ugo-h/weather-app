import ImagesAPI from '../../API/ImagesAPI/imagesAPI';

export default class BackgroundImage {
    constructor(id) {
        this.api = new ImagesAPI();
        this.container = document.getElementById(id);
    }

    async render() {
        const imgUrl = await this.api.getRandom();
        this.container.style.background = `center / cover no-repeat url(${imgUrl})`;
    }
}
