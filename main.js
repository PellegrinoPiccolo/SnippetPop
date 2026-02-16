import { app, BrowserWindow, ipcMain, dialog, shell, net } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';
import fs from 'fs';

Store.initRenderer();

const rootStore = new Store();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isMac = process.platform === 'darwin';

function setupHandlers() {
  ipcMain.on('window-control', (event, action) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;

    switch (action) {
      case 'minimize':
        win.minimize();
        break;
      case 'maximize':
        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
        break;
      case 'close':
        win.close();
        break;
    }
  });

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

  function checkForUpdates() {
    const request = net.request('https://api.github.com/repos/PellegrinoPiccolo/SnippetPop/releases/latest');

    request.on('response', (response) => {
      let data = '';

      response.on('data', (chunk) => {
      data += chunk;
      });

      response.on('end', () => {
      try {
        function isNewerVersion(latest, current) {
          const l = latest.split('.').map(Number);
          const c = current.split('.').map(Number);

          for (let i = 0; i < 3; i++) {
              if (l[i] > c[i]) return true;
              if (l[i] < c[i]) return false;
          }
          return false;
        }
        const release = JSON.parse(data);
        const latestVersion = release.tag_name.replace('V-', '');
        const currentVersion = app.getVersion();
        if (isNewerVersion(latestVersion, currentVersion)) {
        const updateMessage = `A new version of SnippetPop is available: ${latestVersion} (your version: ${currentVersion}). Do you want to download it?`;
        dialog.showMessageBox({
          type: 'info',
          buttons: ['Yes', 'No'],
          title: 'Update Available',
          message: updateMessage
        }).then(result => {
          if (result.response === 0) {
          shell.openExternal(release.html_url);
          }
        });
        }       
      } catch (e) {
        console.error('Error during update check:', e);
      }
      })

      response.on('error', (e) => {
      console.error('Error in update check response:', e);
      });
    })

    request.on('error', (e) => {
      console.error('Error during update check request:', e);
    });

    request.end();
  }

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minHeight: 800,
    minWidth: 1200,
    backgroundColor: '#1e1e1e',
    frame: isMac ? true : false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true
    },
  });

  if (!app.isPackaged) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  setupHandlers();
  createWindow();
  checkForUpdates();

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