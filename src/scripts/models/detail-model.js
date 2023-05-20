import Swal from 'sweetalert2';
import viewModel from './view-model';
import UrlParser from '../routes/url-parser';
import { getElement } from '../utils';

class DetailModel extends viewModel {
  constructor({ view, model }) {
    super({ view, model });
    this.formSubmitHandler = this.onFormSubmit.bind(this);
    this.favButtonHandler = this.onFavButtonClick.bind(this);
  }

  async showContent() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { detail, favorite } = this._model;

    try {
      this.restaurantDetail = await detail.getRestaurantDetail(url.id);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Tidak dapat menemukan detail Restaurant.',
      });
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

  async onFavButtonClick(event) {
    event.stopPropagation();
    const {
      id, name, description, pictureId, city, rating,
    } = this.restaurantDetail;

    this.isFavoriteRestaurant
      ? await this.removeFromFav(id)
      : await this.addToFav({
          id, name, description, pictureId, city, rating,
        });

    this.isFavoriteRestaurant = !this.isFavoriteRestaurant;
    this.view.favButtonState(this.isFavoriteRestaurant);

    if (process.env.NODE_ENV === 'development') {
      getElement('restaurant-details').dispatchEvent(new Event('fav-btn:updated'));
    }
  }

  async onFormSubmit(event) {
    event.preventDefault();

    try {
      this.view.showLoadingInSubmitButton();

      const reviewForm = getElement('#review-form');
      const formData = new FormData(reviewForm);
      const reviewData = {
        id: this.restaurantDetail.id,
        name: formData.get('name'),
        review: formData.get('review'),
      };

      const response = await this._model.detail.addReview(reviewData);

      this._view.showNewReviews(response);
      reviewForm.reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    } finally {
      this._view.showLoadingInSubmitButton(false);
    }
  }

  async addToFav(restaurant) {
    await this.model.favorite.addRestaurant(restaurant);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Restaurant berhasil ditambahkan ke favorite',
    });
  }

  async removeFromFav(id) {
    await this.model.favorite.deleteRestaurant(id);
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Restaurant berhasil dihapus dari favorite',
    });
  }
}

export default DetailModel;
