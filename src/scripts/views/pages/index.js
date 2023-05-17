import RestoListPresenter from '../../models/list-model';
import RestoDetailPresenter from '../../models/detail-model';
import RestoDataSource from '../../data/restaurant-data-api';
import FavoriteRestoIdb from '../../data/restaurant-fav-idb';
import { createElement } from '../../utils';

import './restaurant-home-page';
import './restaurant-detail-page';
import './restaurant-fav-detail';

function home() {
  const view = createElement('home-page');
  const model = RestoDataSource;
  const presenter = new RestoListPresenter({ view, model });
  return presenter;
}

function detail() {
  const view = createElement('detail-page');
  const model = {
    detail: RestoDataSource,
    favorite: FavoriteRestoIdb,
  };
  const presenter = new RestoDetailPresenter({ view, model });
  return presenter;
}

function favorite() {
  const view = createElement('favorite-page');
  const model = FavoriteRestoIdb;
  const presenter = new RestoListPresenter({ view, model });
  return presenter;
}

export { home, detail, favorite };
