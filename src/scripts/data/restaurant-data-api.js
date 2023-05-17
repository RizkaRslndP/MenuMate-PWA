import API_ENDPOINT from "../globals/api-endpoint";
import { getData } from "../utils";

class restaurantDataApi {
  static async getRestaurantList() {
    try {
      const jsonResponse = await getData(API_ENDPOINT.LIST);
      if (jsonResponse.restaurants) {
        return jsonResponse.restaurants;
      }
      throw new Error("Daftar Restaurant tidak ditemukan.");
    } catch (error) {
      console.error(error);
    }
  }

  static async getRestaurantDetail(id) {
    try {
      const jsonResponse = await getData(API_ENDPOINT.DETAIL(id));
      if (jsonResponse.restaurant) {
        return jsonResponse.restaurant;
      }
      throw new Error("Detail Restaurant tidak ditemukan.");
    } catch (error) {
      console.error(error);
    }
  }
}

export default restaurantDataApi;
