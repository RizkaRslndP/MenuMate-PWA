import { getElement } from "../../utils";
import Page from "./restaurant-page";

class DetailPage extends Page {
  constructor() {
    super({
      basePageElement:
        '<section id="/main-content" class="container"></section>',
      contentElement: "restaurant-details",
    });
  }

  get isHasHeroElement() {
    return false;
  }

  _showContent() {
    this.contentElement.details = this._data;
  }

  set favButtonHandler(favButtonHandler) {
    this._favButtonHandler = favButtonHandler;
    this._createFavButtonHandler();
  }

  _createFavButtonHandler() {
    const favButton = getElement("#fav-button");
    favButton.addEventListener("click", this._favButtonHandler);
  }

  favButtonState(isFavorited) {
    const detailElement = getElement("restaurant-details");
    detailElement.favButtonState = isFavorited;
  }

  set formSubmitHandler(formSubmitHandler) {
    this._formSubmitHandler = formSubmitHandler;
    this._createFavButtonHandler();
  }

  _createFormSubmithandler() {
    const reviewForm = getElement('#review-form');
    reviewForm.addEventListener('submit', this._formSubmitHandler);
  }
}

customElements.define("detail-page", DetailPage);
