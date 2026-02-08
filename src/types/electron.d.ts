export interface ElectronAPI {
  getStoreValue: (key: string) => Promise<any>;
  setStoreValue: (key: string, value: any) => Promise<void>;
  selectFolder: () => Promise<{ path: string; existingData: any[] | null } | undefined>;
  migrateData: (payload: { newPath: string; currentData: any }) => Promise<void>;
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  platform: string;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}