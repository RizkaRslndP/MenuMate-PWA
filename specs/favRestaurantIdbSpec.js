/* eslint-disable no-undef */
import { itActsAsFavoriteRestoModel } from './contract/Restaurant-contract';
import restaurantFavIdb from '../src/scripts/data/restaurant-fav-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await restaurantFavIdb.getRestaurantList()).forEach(async (resto) => {
      await restaurantFavIdb.deleteRestaurant(resto.id);
    });
  });

  itActsAsFavoriteRestoModel(restaurantFavIdb);
});
