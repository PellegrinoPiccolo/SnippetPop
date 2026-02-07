export interface ElectronAPI {
  getStoreValue: (key: string) => string | null;
  setStoreValue: (key: string, value: string) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}