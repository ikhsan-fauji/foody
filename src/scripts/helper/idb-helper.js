import { openDB } from 'idb';
import CONFIG from '../globals/config';

const dbPromise = () => {
  return openDB(CONFIG.DB_NAME, CONFIG.DB_VERSION);
};

const idb = {
  initialize() {
    if (!window.indexedDB) return;
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

  async insert(data = null) {
    if (!window.indexedDB)
      throw Error('indexedDb is not supporting in your browser');

    const newData = data;
    newData.createdAt = new Date();
    newData.updatedAt = null;
    return dbPromise().add(CONFIG.STORE_NAME, newData);
  },

  async getAll() {
    if (!window.indexedDB)
      throw Error('indexedDb is not supporting in your browser');

    return dbPromise().getAll(CONFIG.STORE_NAME);
  },

  async getByKey(key) {
    if (!window.indexedDB)
      throw Error('indexedDb is not supporting in your browser');
    if (!key) throw Error('Please provide key');

    return dbPromise().get(CONFIG.STORE_NAME, key);
  },

  async deleteByKey(key) {
    if (!window.indexedDB)
      throw Error('indexedDb is not supporting in your browser');
    if (!key) throw Error('Please provide key');

    return dbPromise().delete(CONFIG.STORE_NAME, key);
  }
};

export default idb;
