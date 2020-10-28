import CONFIG from '../globals/config';
import idb from '../utils/idb';

const { STORE_NAME } = CONFIG;

class FavoriteRestaurant {
  _idbChecking() {
    if (!window.indexedDB)
      throw Error('indexedDb is not supported in your browser');
  }

  async getAll() {
    this._idbChecking();

    return (await idb).getAll(STORE_NAME);
  }

  async getByKey(key) {
    this._idbChecking();

    if (!key) throw Error('Please provide key');

    return (await idb).get(STORE_NAME, key);
  }

  async like(data) {
    this._idbChecking();

    if (!data) throw Error('Please provide data');

    const newData = data;
    newData.createdAt = new Date();
    newData.updatedAt = null;

    return (await idb).add(STORE_NAME, newData);
  }

  async unlike(key) {
    this._idbChecking();

    if (!key) throw Error('Please provide key');

    return (await idb).delete(STORE_NAME, key);
  }
}

export default FavoriteRestaurant;
