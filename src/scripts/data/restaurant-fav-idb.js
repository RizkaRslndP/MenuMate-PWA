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
    const transaction = db.transaction(OBJECT_STORE_NAME, 'readonly');
    const store = transaction.objectStore(OBJECT_STORE_NAME);
    return store.get(id);
  }

  static async getRestaurantList() {
    const db = await DB_PROMISE;
    return db.getAll(OBJECT_STORE_NAME);
  }

  static async addRestaurant(resto) {
    if (!Object.prototype.hasOwnProperty.call(resto, 'id')) {
      return;
    }
    const db = await DB_PROMISE;
    return db.put(OBJECT_STORE_NAME, resto);
  }

  static async deleteRestaurant(id) {
    const db = await DB_PROMISE;
    return db.delete(OBJECT_STORE_NAME, id);
  }
}

export default restaurantFavIdb;
