import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DB_NAME, DB_VERSION, STORE_NAME } = CONFIG;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, {
        keyPath: 'id'
      }).createIndex('id', 'id', { unique: true });
    }
  }
});

export default dbPromise;
