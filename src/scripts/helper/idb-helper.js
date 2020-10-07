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

  async upsert(data = null, key = 'id') {
    let result = null;
    if (!window.indexedDB) return result;
    if (data) {
      const store = await dbPromise();

      const existingData = await store.get(CONFIG.STORE_NAME, data[key]);
      if (existingData) {
        existingData.updatedAt = new Date();
        await store.put(CONFIG.STORE_NAME, existingData);
      } else {
        const newData = data;
        newData.createdAt = new Date();
        newData.updatedAt = null;
        await store.add(CONFIG.STORE_NAME, newData);
      }
      result = data;
      await store.done;
    }
    return result;
  },

  async getAll() {
    let result = [];
    if (!window.indexedDB) return result;

    const store = await dbPromise();
    result = await store.getAll(CONFIG.STORE_NAME);
    return result;
  },

  async getByKey(key) {
    let result = null;
    if (!window.indexedDB) return result;
    if (!key) throw Error('Please provide key');

    const store = await dbPromise();
    result = await store.get(CONFIG.STORE_NAME, key);
    return result;
  },

  async deleteByKey(key) {
    if (!window.indexedDB)
      throw Error('Your browser is not supporting indexed db');

    if (!key) throw Error('Please provide key');

    const store = await dbPromise();
    return store.delete(CONFIG.STORE_NAME, key);
  }
};

export default idb;
