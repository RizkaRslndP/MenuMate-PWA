import Swal from 'sweetalert2';
import viewModel from './view-model';
import UrlParser from '../routes/url-parser';
import { getElement } from '../utils';

class DetailModel extends viewModel {
  constructor({ view, model }) {
    super({ view, model });
    this.favButtonHandler = this.onFavButtonClick.bind(this);
  }

  async showContent() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { detail, favorite } = this._model;

    try {
      this.restaurantDetail = await detail.getRestaurantDetail(url.id);
    } catch (error) {
      this.view.showMessage('Detail Restaurant tidak ditemukan.');
      return;
    }

    const isFavorite = await favorite.getRestaurant(this.restaurantDetail.id);
    this.isFavoriteRestaurant = Boolean(isFavorite);
    this.displayContent(this.restaurantDetail);
  }

  displayContent(content) {
    super.displayContent(content);
    this.view.favButtonHandler = this.favButtonHandler;
    this.view.favButtonState(this.isFavoriteRestaurant);
  }

  /**
   * @param {Event} event
   */
  async onFavButtonClick(event) {
    event.stopPropagation();
    const { id, name, description, pictureId, city, rating } = this.restaurantDetail;

    this.isFavoriteRestaurant
      ? await this.removeFromFavorite(id)
      : await this.addToFavorite({
          id,
          name,
          description,
          pictureId,
          city,
          rating,
        });

    this.isFavoriteRestaurant = !this.isFavoriteRestaurant;
    this.view.favButtonState(this.isFavoriteRestaurant);

    if (process.env.NODE_ENV === 'development') {
      getElement('restaurant-details').dispatchEvent(
        new Event('fav-btn:updated'),
      );
    }
  }

  async addToFavorite(restaurant) {
    await this._model.favorite.addRestaurant(restaurant);
    Swal.fire({
      title: 'Success',
      text: 'Restaurant berhasil ditambahkan ke daftar favorite!',
      icon: 'success',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'popup-style',
        title: 'title-style',
        confirmButton: 'confirm-button',
      },
    });
  }

  async removeFromFavorite(id) {
    await this._model.favorite.deleteRestaurant(id);
    Swal.fire({
      title: 'Success',
      text: 'Restaurant berhasil dihapus dari daftar favorite!',
      icon: 'error',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'popup-style',
        title: 'title-style',
        confirmButton: 'confirm-button',
      },
    });
  }
}

export default DetailModel;
