/* eslint-disable import/prefer-default-export */
import FAV_BUTTON_PRESENTER from '../../src/scripts/utils/fav-button-presenter';
import restaurantFavIdb from '../../src/scripts/data/restaurant-fav-idb';

const CREATE_FAV_BUTTON_PRESENTER_RESTO_FACTORIES = async (restaurant) => {
  await FAV_BUTTON_PRESENTER.init({
    favButtonContainer: document.querySelector('#favButtonContainer'),
    favoriteResto: restaurantFavIdb,
    data: {
      restaurant,
    },
  });
};

export { CREATE_FAV_BUTTON_PRESENTER_RESTO_FACTORIES };
