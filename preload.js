import { clear } from 'console';
import { contextBridge, ipcRenderer } from 'electron'
import Store from 'electron-store';

const customPath = ipcRenderer.sendSync('get-custom-path');

const store = new Store({
  cwd: customPath || undefined,
  name: 'snippetpop-data'
});

contextBridge.exposeInMainWorld('electronAPI', {
  getStoreValue: (key) => store.get(key),
  setStoreValue: (key, value) => store.set(key, value),
  deleteStoreValue: (key) => store.delete(key),
  clearStore: () => store.clear(),

  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
  migrateData: (payload) => ipcRenderer.invoke('migrate-data', payload),

  minimize: () => ipcRenderer.send('window-control', 'minimize'),
  maximize: () => ipcRenderer.send('window-control', 'maximize'),
  close: () => ipcRenderer.send('window-control', 'close'),
  setLayout: (key, value) => store.set(key, value),
  getLayout: (key) => store.get(key),
  platform: process.platform
})