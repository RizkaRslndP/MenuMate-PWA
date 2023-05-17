import { getElement } from '../../utils';
import logo from '../../../public/images/icons/logo.svg';

class navBar extends HTMLElement {
  constructor() {
    super();
    this._isMenuDisplayed = false;
    this._menuItemClickHandler = this._onMenuItemClick.bind(this);
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <div class='nav-container'>
        <div>
          <a href='/' class='nav-logo'>
            <img src='${logo}' alt='Logo' width='60px' height='60px'>
          </a>
        </div>
        <button id='nav-menu' aria-label='Draw Menu'>☰</button>
        <nav class='menu'>
          <ul class='menu_list'></ul>
        </nav>
      </div>
    `;
  }

  setMenu(menuList) {
    const menuListElement = this.querySelector('.menu_list');
    menuList.forEach(({ url, label }) => {
      const menuItemElement = `
        <li class='menu_item'>
          <a href='${url}'>${label}</a>
        </li>
      `;
      menuListElement.insertAdjacentHTML('beforeend', menuItemElement);
    });
    this._initNavBar();
  }

  _initNavBar() {
    this._bodyElement = document.querySelector('body');
    this._menuButton = this.querySelector('#nav-menu');
    this._menuItems = this.querySelectorAll('.menu_item');

    this._menuButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this._menuHandler();
    });
  }

  _menuHandler() {
    this._isMenuDisplayed = !this._isMenuDisplayed;
    this._toggleMenu();
    this._toggleBodyOverflow();
    this._isMenuDisplayed
      ? this._addMenuItemsListener()
      : this._removeMenuItemsListener();
  }

  _toggleMenu() {
    this._menuButton.textContent = this._isMenuDisplayed ? '⨉' : '☰';
    this.classList.toggle('menu_open');
  }

  _toggleBodyOverflow() {
    this._bodyElement.classList.toggle('hideoverflow');
  }

  _addMenuItemsListener() {
    this._menuItems.forEach((menuItem) => {
      menuItem.addEventListener('click', this._menuItemClickHandler);
    });
  }

  _removeMenuItemsListener() {
    this._menuItems.forEach((menuItem) => {
      menuItem.removeEventListener('click', this._menuItemClickHandler);
    });
  }

  _onMenuItemClick(event) {
    event.stopPropagation();
    this._hideMenu();
  }

  _hideMenu() {
    if (this._isMenuDisplayed) {
      this._menuHandler();
    }
  }

  changeActiveMenuItem(url) {
    const activeMenu = this.querySelector('.menu_item.active');
    const menuToActivate = this.querySelector(`[href='#${url}']`);

    activeMenu?.classList.remove('active');
    menuToActivate?.parentElement.classList.add('active');
    this._hideMenu();
  }
}
customElements.define('nav-bar', navBar);
