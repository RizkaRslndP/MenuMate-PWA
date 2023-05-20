import accountIcon from "../../../public/images/icons/user-picture.svg";
import { createElement, getElement } from "../../utils";

class RestoReview extends HTMLElement {
  constructor() {
    super();
    this._loadMoreButtonHandler = this._onLoadMoreButtonClick.bind(this);
  }

  set reviews(review) {
    this._reviews = review;
    this._render();
  }

  _render() {
    this.innerHTML = `
        <h2>Customer Review</h2>
      `;
    this._reviewList = createElement("ul");
    this.appendChild(this._reviewList);

    this._renderReviewContent();
    this._renderReviewForm();
  }

  _renderReviewContent() {
    this._reviewList.innerHTML = "";

    if (this._reviews.length > 4) {
      const firstThreeReviews = this._reviews.slice(0, 3);
      const lastReview = this._reviews.slice(-1);

      this._renderReviews(firstThreeReviews);
      this._createLoadMoreButton();
      this._renderReviews(lastReview);
    } else {
      this._renderReviews(this._reviews);
    }
  }

  _renderReviews(reviews) {
    reviews.forEach((review) => {
      const reviewItem = this._renderReviewItem(review);
      this._reviewList.insertAdjacentHTML("beforeend", reviewItem);
    });
  }

  _renderReviewItem({ name, review, date }) {
    return /* html */ `
        <li class="review_item">
          <img
            src="${accountIcon}"
            alt="Account Picture ${name}"
            width="45"
            height="45"
            class="reviewer_photo"
            >
          <div class="review_content">
            <p class="review_name">${name}</p>
            <p class="review_date">${date}</p>
            <p>${review}</p>
          </div>
        </li>
      `;
  }

  _createLoadMoreButton() {
    const loadMoreButton = /* html */ `
        <li><button id="load-more">Tampilkan review lainnya...</button></li>
      `;
    this._reviewList.insertAdjacentHTML("beforeend", loadMoreButton);
    this._loadMoreButton = getElement("#load-more");
    this._loadMoreButton.addEventListener("click", this._loadMoreButtonHandler);
  }

  _onLoadMoreButtonClick() {
    const allLastReview = this._reviews.slice(3, this._reviews.length);
    const lastItem = this._reviewList.children[4];
    this._reviewList.removeChild(lastItem);
    this._renderReviews(allLastReview);
    this._loadMoreButton.remove();
  }

  _renderReviewForm() {
    this.insertAdjacentHTML(
      "beforeend",
      `
        <section class="review_item">
          <img
            src="${accountIcon}"
            alt="Foto dari akun Anda"
            width="48"
            height="48"
            class="reviewer_photo">
          <form id="review-form" autocomplete="off">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Masukkan nama Kamu..."
              >
            <textarea
              name="review"
              id="review"
              placeholder="Masukkan review Kamu..."
              required></textarea>
            <button type="submit" aria-label="Submit review">
              <span class="btn__loading"></span>
              <span class="text_btn">Submit</span>
            </button>
          </form>
        </section>
      `
    );
  }

  /**
   * @param {Object} review review data object.
   */
  reRenderReviewElement(review) {
    this._reviews = review;
    this._renderReviewContent();
  }
}

customElements.define("resto-review", RestoReview);
