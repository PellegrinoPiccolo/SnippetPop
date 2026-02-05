import { contextBridge } from 'electron'
import Store from 'electron-store';

const store = new Store();

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  getStoreValue: (key) => {
    return store.get(key);
  },
  setStoreValue: (key, value) => {
    store.set(key, value);
  }
  // we can also expose variables, not just functions
})