import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;
const DB_PROMISE = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

class restaurantFavIdb {
  static async getRestaurant(id) {
    if (id === undefined) {
      return;
    }
    const db = await DB_PROMISE;
    return db.get(OBJECT_STORE_NAME, id);
  }

  static async getRestaurantList() {
    const db = await DB_PROMISE;
    return db.getAll(OBJECT_STORE_NAME);
  }

  static async addRestaurant(restaurant) {
    if (!Object.prototype.hasOwnProperty.call(restaurant, 'id')) {
      return;
    }
    const db = await DB_PROMISE;
    return db.put(OBJECT_STORE_NAME, restaurant);
  }

  static async deleteRestaurant(id) {
    const db = await DB_PROMISE;
    return db.delete(OBJECT_STORE_NAME, id);
  }
}

export default restaurantFavIdb;
