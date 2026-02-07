# 🚀 SnippetPop

**SnippetPop** is a lightweight, cross-platform snippet manager designed for developers who want to organize their code and technical notes without relying on centralized databases or expensive cloud subscriptions.

[![Windows Download](https://img.shields.io/badge/Download-Windows%20.zip-blue?style=for-the-badge&logo=windows)](https://github.com/PellegrinoPiccolo/SnippetPop/releases/download/V-1.0/SnippetPop-win32-x64.zip)
[![macOS Download](https://img.shields.io/badge/Download-macOS%20.dmg-black?style=for-the-badge&logo=apple)](https://github.com/PellegrinoPiccolo/SnippetPop/releases/download/V-1.0/SnippetPop.Installer.dmg)

---

## 🛠️ Key Features

* **Intelligent Organization**: Categorize your snippets with custom icons and dedicated colors.
* **Zero Backend**: No servers, no registration. Your data stays under your control.
* **"Redirect" Cloud Sync**: Effortlessly sync your snippets using **Google Drive, Dropbox, OneDrive**, or even a simple USB drive thanks to folder redirection technology.
* **Modern Interface**: Built with **React** and **Vite** for lightning-fast performance.
* **Local Security**: All data is saved in JSON format on your local disk or chosen cloud folder.

---

## 🏗️ How the Sync Works

SnippetPop uses a unique **two-layer** architecture to ensure maximum flexibility:

1.  **The Compass (`rootStore`)**: A local configuration (saved in system app data) that remembers where your library is located.
2.  **The Treasure (`snippetpop-data.json`)**: The actual file containing all your snippets.

### Why is this great?
When you change the library folder in the settings, the app migrates your data to the new location (e.g., your Google Drive folder) and restarts. From then on, every change is saved directly to the cloud. If you install SnippetPop on another computer and select the same folder, the app will detect the existing data and load it instantly.

---



---

## 💻 Tech Stack

* **Core**: [Electron](https://www.electronjs.org/)
* **Frontend**: [React](https://reactjs.org/) with TypeScript
* **Build Tool**: [Vite](https://vitejs.dev/) & [Electron Forge](https://www.electronforge.io/)
* **Database**: `electron-store`
* **Installer**: NSIS (Windows) & DMG (macOS)

---

## 🚀 Getting Started

To contribute to the project or build it locally:

### Prerequisites
* **Node.js** (v18 or higher)
* **npm**

### Installation
1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/snippetpop.git](https://github.com/your-username/snippetpop.git)
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run in development mode:
    ```bash
    npm run dev
    ```

### Packaging (Build)
To generate the installer (.exe or .dmg) for your current operating system:
```bash
npm run make
