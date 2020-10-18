import { openDB } from 'idb';
import CONFIG from '../globals/config';

const _dbPromise = () => {
  return openDB(CONFIG.DB_NAME, CONFIG.DB_VERSION);
};

const _idbChecking = () => {
  if (!window.indexedDB)
    throw Error('indexedDb is not supported in your browser');
};

const idb = {
  initialize() {
    _idbChecking();

    openDB(CONFIG.DB_NAME, CONFIG.DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(CONFIG.STORE_NAME)) {
          db.createObjectStore(CONFIG.STORE_NAME, {
            keyPath: 'id'
          }).createIndex('id', 'id', { unique: true });
        }
      }
    });
  },

  async insert(data) {
    _idbChecking();

    if (!data) throw Error('Please provide data');

    const newData = data;
    newData.createdAt = new Date();
    newData.updatedAt = null;
    const store = await _dbPromise();
    return store.add(CONFIG.STORE_NAME, newData);
  },

  async getAll() {
    _idbChecking();

    const store = await _dbPromise();
    return store.getAll(CONFIG.STORE_NAME);
  },

  async getByKey(key) {
    _idbChecking();

    if (!key) throw Error('Please provide key');

    const store = await _dbPromise();
    return store.get(CONFIG.STORE_NAME, key);
  },

  async deleteByKey(key) {
    _idbChecking();

    if (!key) throw Error('Please provide key');

    const store = await _dbPromise();
    return store.delete(CONFIG.STORE_NAME, key);
  }
};

export default idb;
