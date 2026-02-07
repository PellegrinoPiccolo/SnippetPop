import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';
import fs from 'fs';

Store.initRenderer();

const rootStore = new Store();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function setupHandlers() {
  ipcMain.on('get-custom-path', (event) => {
    event.returnValue = rootStore.get('customPath') || undefined;
  });

  ipcMain.handle('dialog:openDirectory', async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ['openDirectory'],
      title: 'Seleziona cartella di sincronizzazione'
    });

    if (canceled) return undefined;

    const selectedPath = filePaths[0];
    const filePath = path.join(selectedPath, 'snippetpop-data.json');
    
    let existingData = null;

    console.log("Controllo file:", filePath);

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(fileContent);
        if (Array.isArray(json)) {
            existingData = json;
        } else if (json.categories) {
            existingData = json.categories;
        }
        console.log("Dati trovati:", existingData ? "SI" : "NO");
      } catch (e) {
        console.error("Errore lettura file:", e);
      }
    } else {
        console.log("File non trovato.");
    }

    return {
      path: selectedPath,
      existingData: existingData
    };
  });

  ipcMain.handle('migrate-data', async (event, { newPath, currentData }) => {
    try {
      rootStore.set('customPath', newPath);

      const newDataStore = new Store({
        cwd: newPath,
        name: 'snippetpop-data'
      });

      newDataStore.set('categories', currentData);

      setTimeout(() => {
        app.relaunch();
        app.exit();
      }, 500);
      
      return true;
    } catch (e) {
      console.error("Errore durante la migrazione:", e);
      return false;
    }
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 800,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true
    },
  });

  if (!app.isPackaged) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  setupHandlers();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});