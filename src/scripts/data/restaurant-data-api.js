import API_ENDPOINT from '../globals/api-endpoint';
import { getData, postData } from '../utils';

class restaurantDataApi {
  static async getRestaurantList() {
    try {
      const jsonResponse = await getData(API_ENDPOINT.LIST);
      if (jsonResponse.restaurants) {
        return jsonResponse.restaurants;
      }
      throw new Error('Daftar Restaurant tidak ditemukan.');
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
      throw new Error('Detail Restaurant tidak ditemukan.');
    } catch (error) {
      console.error(error);
    }
  }

  static async addReview(data) {
    const response = await postData(API_ENDPOINT.ADD_REVIEW, data);
    if (response.customerReviews) {
      return response.customerReviews;
    }
    throw new Error('Gagal memuat data, coba kembali nanti.');
  }
}

export default restaurantDataApi;
