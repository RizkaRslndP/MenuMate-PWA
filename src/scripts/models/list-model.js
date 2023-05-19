import Model from './view-model';

class ListModel extends Model {
  constructor(options) {
    super(options);
  }

  async showContent() {
    try {
      const allRestaurantList = await this._model.getRestaurantList();
      if (allRestaurantList.length > 0) {
        this.displayContent(allRestaurantList);
      } else {
        this.displayMessage('Favorite belum ditambahkan');
      }
    } catch (error) {
      this.displayMessage(error.message);
    }
  }
}

export default ListModel;
