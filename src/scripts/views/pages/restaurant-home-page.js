/* eslint-disable quotes */
import Page from "./restaurant-page";

class HomePage extends Page {
  constructor() {
    super({
      basePageElement: `
        <banner-element></banner-element>
        <about-resto></about-resto>
        <h2 class='available'>Available Restaurant</h2>
        <section id='/main-content' class='container'></section>
      `,
      contentElement: "resto-list",
    });
  }

  get isHasHeroElement() {
    return true;
  }

  _showContent() {
    this.contentElement.restoList = this._data;
  }
}

customElements.define("home-page", HomePage);
