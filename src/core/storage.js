const DB_NAME = 'fala-comigo';
const DB_VERSION = 1;
const KV = 'kv';
const EVENTS = 'events';

function requestAsPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error);
    transaction.onerror = () => reject(transaction.error);
  });
}

export class LocalRepository {
  constructor() {
    this.db = null;
  }

  async open() {
    if (!('indexedDB' in window)) return false;
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(KV)) db.createObjectStore(KV);
      if (!db.objectStoreNames.contains(EVENTS)) {
        const events = db.createObjectStore(EVENTS, { keyPath: 'id', autoIncrement: true });
        events.createIndex('createdAt', 'createdAt');
        events.createIndex('cardId', 'cardId');
      }
    };
    this.db = await requestAsPromise(request);
    return true;
  }

  async get(key, fallback = null) {
    if (!this.db) return fallback;
    const tx = this.db.transaction(KV, 'readonly');
    const value = await requestAsPromise(tx.objectStore(KV).get(key));
    return value ?? fallback;
  }

  async set(key, value) {
    if (!this.db) return;
    const tx = this.db.transaction(KV, 'readwrite');
    tx.objectStore(KV).put(value, key);
    await transactionDone(tx);
  }

  async addEvent(event) {
    if (!this.db) return;
    const tx = this.db.transaction(EVENTS, 'readwrite');
    tx.objectStore(EVENTS).add({ ...event, createdAt: event.createdAt || new Date().toISOString() });
    await transactionDone(tx);
  }

  async recentEvents(limit = 200) {
    if (!this.db) return [];
    const tx = this.db.transaction(EVENTS, 'readonly');
    const store = tx.objectStore(EVENTS);
    const request = store.openCursor(null, 'prev');
    return new Promise((resolve, reject) => {
      const rows = [];
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor || rows.length >= limit) return resolve(rows);
        rows.push(cursor.value);
        cursor.continue();
      };
      request.onerror = () => reject(request.error);
    });
  }

  async clearEvents() {
    if (!this.db) return;
    const tx = this.db.transaction(EVENTS, 'readwrite');
    tx.objectStore(EVENTS).clear();
    await transactionDone(tx);
  }
}

export const DEFAULT_SETTINGS = {
  childName: '',
  speechRate: 0.88,
  reducedStimulus: false,
  compactGrid: false,
  speakOnTap: true,
  showLabels: true
};
