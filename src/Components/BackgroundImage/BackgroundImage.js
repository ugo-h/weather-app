import ImagesAPI from '../../API/ImagesAPI/imagesAPI';

export default class BackgroundImage {
    constructor(id) {
        this.api = new ImagesAPI();
        this.container = document.getElementById(id);
        this.default = 'https://www.lukas-petereit.com/wp-content/uploads/2018/08/Sunset-at-Verdon-Canyon-Landscape-of-Provence-Photography-in-France.jpg';
    }

    async render() {
        let imgUrl;
        try {
            imgUrl = await this.api.getRandom();
        } catch (err) {
            imgUrl = this.default;
        }
        this.container.style.background = `center / cover no-repeat url(${imgUrl}) fixed`;
    }
}
