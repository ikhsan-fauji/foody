import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DB_NAME, DB_VERSION, STORE_NAME } = CONFIG;

const _dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, {
        keyPath: 'id'
      }).createIndex('id', 'id', { unique: true });
    }
  }
});

const _idbChecking = () => {
  if (!window.indexedDB)
    throw Error('indexedDb is not supported in your browser');
};

const idb = {
  async insert(data) {
    _idbChecking();

    if (!data) throw Error('Please provide data');

    const newData = data;
    newData.createdAt = new Date();
    newData.updatedAt = null;

    return (await _dbPromise).add(STORE_NAME, newData);
  },

  async getAll() {
    _idbChecking();

    return (await _dbPromise).getAll(STORE_NAME);
  },

  async getByKey(key) {
    _idbChecking();

    if (!key) throw Error('Please provide key');

    return (await _dbPromise).get(STORE_NAME, key);
  },

  async deleteByKey(key) {
    _idbChecking();

    if (!key) throw Error('Please provide key');

    return (await _dbPromise).delete(STORE_NAME, key);
  }
};

export default idb;
