import { openDB } from 'idb';

// configuration
const DB_NAME = 'idb_foody';
const DB_VERSION = 1;
const STORE_NAME = 'favorite_restaurant';

const _openDb = () => {
  return openDB(DB_NAME, DB_VERSION);
};

const idb = {
  initialize() {
    if (!window.indexedDB) return;
    openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
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
      const store = (await _openDb())
        .transaction(STORE_NAME, 'readwrite')
        .objectStore(STORE_NAME);

      const existingData = await store.get(data[key]);
      if (existingData) {
        existingData.updatedAt = new Date();
        await store.put(existingData);
      } else {
        const newData = data;
        newData.createdAt = new Date();
        newData.updatedAt = null;
        await store.add(newData);
      }
      result = data;
      await store.done;
    }
    return result;
  },

  async getAll() {
    let result = [];
    if (!window.indexedDB) return result;

    const store = (await _openDb())
      .transaction(STORE_NAME, 'readonly')
      .objectStore(STORE_NAME);

    result = await store.getAll();
    return result;
  },

  async getByKey(key) {
    let result = null;
    if (!window.indexedDB) return result;
    if (!key) throw Error('Please provide key');

    const store = (await _openDb())
      .transaction(STORE_NAME, 'readonly')
      .objectStore(STORE_NAME);

    result = await store.get(key);
    return result;
  },

  async deleteByKey(key) {
    if (!window.indexedDB)
      throw Error('Your browser is not supporting indexed db');

    if (!key) throw Error('Please provide key');

    const store = (await _openDb())
      .transaction(STORE_NAME, 'readwrite')
      .objectStore(STORE_NAME);

    return store.delete(key);
  }
};

export default idb;
