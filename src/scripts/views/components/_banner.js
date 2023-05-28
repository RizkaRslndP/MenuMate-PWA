/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import heroImage from '../../../public/images/hero/hero-image_4.jpg';
import heroImageWebp from '../../../public/images/hero/hero-image_4.jpg';

const heroImageSizes = [
  { path: `${heroImage}?sizes[]=425`, width: 425 },
  { path: `${heroImage}?sizes[]=768`, width: 768 },
  { path: `${heroImage}?sizes[]=1024`, width: 1024 },
  { path: `${heroImage}?sizes[]=1350`, width: 1350 },
];

const heroImageWebpSizes = [
  { path: `${heroImageWebp}?sizes[]=425`, width: 425 },
  { path: `${heroImageWebp}?sizes[]=768`, width: 768 },
  { path: `${heroImageWebp}?sizes[]=1024`, width: 1024 },
  { path: `${heroImageWebp}?sizes[]=1350`, width: 1350 },
];

class BannerElement extends HTMLElement {
  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <picture>
        ${this._createSourceElement(heroImageSizes, 'jpeg')}
        ${this._createSourceElement(heroImageWebpSizes, 'webp')}
        <img
          src="${heroImageSizes[0].path}"
          width="${heroImageSizes[0].width}"
          height="auto"
          loading="lazy"
          alt="Banner Image"
        />
      </picture>
      <div class='banner-text'>
        <h1>Menu Mate</h1>
        <p id='typing-text'>Fine Taste, In the City</p>
      </div>
    `;

    const element = this.querySelector("#typing-text");

    if (element !== null) {
      const originalText = element.innerHTML;
      element.innerHTML = "";
      this._typeText(originalText, 0);
    }
  }

  _createSourceElement(sizes, type) {
    let elements = '';
    sizes.forEach(({ path, width }, index) => {
      const mediaQuery = index < sizes.length - 1
        ? `(max-width: ${width}px)`
        : `(min-width: ${sizes[index - 1].width}px)`;
      const sourceTag = `<source media="${mediaQuery}" srcset="${path}" type="image/${type}">`;

      elements += sourceTag;
    });
    return elements;
  }

  _typeText(text, i) {
    const element = this.querySelector("#typing-text");
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(() => {
        this._typeText(text, i);
      }, Math.random() * 200);
    }
  }
}

customElements.define('banner-element', BannerElement);
