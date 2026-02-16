# 🚀 SnippetPop

**SnippetPop** is a lightweight, cross-platform manager designed to help you organize and access your **snippets**—text fragments, notes, and frequently used information—without relying on centralized databases or expensive cloud subscriptions.

<p align="center">
  <img src="https://github.com/user-attachments/assets/998bf32f-1fea-44d0-9857-f4c1a4795ffc" alt="SnippetPop Logo" width="200" />
</p>

<p align="center">
  <a href="https://github.com/PellegrinoPiccolo/SnippetPop/releases/download/V-1.5.0/SnippetPopSetup.exe">
    <img src="https://img.shields.io/badge/Download-Windows%20.exe-blue?style=for-the-badge&logo=windows" alt="Windows Download" />
  </a>
  <a href="https://github.com/PellegrinoPiccolo/SnippetPop/releases/download/V-1.5.0/SnippetPop.Installer.dmg">
    <img src="https://img.shields.io/badge/Download-macOS%20.dmg-black?style=for-the-badge&logo=apple" alt="macOS Download" />
  </a>
</p>

## 🔒 Security & Installation Note

Since SnippetPop is an independent project and not signed with a paid developer certificate, you may encounter system warnings.

### For macOS Users 🍎
If you see a message saying **"SnippetPop is damaged and cannot be opened"**:
1. Move SnippetPop to your **Applications** folder.
2. Open the **Terminal** app.
3. Type the following command and press Enter:
   `sudo xattr -cr /Applications/SnippetPop.app`
4. Enter your Mac password when prompted (it will remain invisible while typing).
5. Launch the app normally from your Applications.

### For Windows Users 🪟
1. Download and run **`SnippetPopSetup.exe`**.
2. If a **"Windows Protected your PC"** (SmartScreen) popup appears:
   - Click on **"More info"**.
   - Click on **"Run anyway"**.
3. Follow the installation wizard. You can choose to create a desktop shortcut during the process.
4. Once finished, SnippetPop will be available in your **Start Menu** and on your **Desktop**.

---

## 📸 Screenshots

Here is a look at the SnippetPop interface and its key features.

### 🏠 Main Dashboard
*A clean view of all your snippets, organized by custom categories.*
<p align="center">
  <img src="https://github.com/user-attachments/assets/95f51ddc-101f-4dcc-931e-bf1956848e9d" alt="Main Dashboard" width="800" />
  <img src="https://github.com/user-attachments/assets/6e3ac4e4-7efa-41cd-894d-ae045e45e565" alt="Main Dashboard" width="800" />
</p>

### 📁 Category Management
*Customize your workspace with icons and colors to find your snippets instantly.*
<p align="center">
  <img src="https://github.com/user-attachments/assets/a36ea6ff-153f-4f9b-a4ef-83116075c450" alt="Category Management" width="800" />
</p>

### ☁️ Cloud Sync Settings
*Seamlessly redirect your library to your favorite cloud provider.*
<p align="center">
    <img src="https://img.shields.io/badge/Google_Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white" />
    <img src="https://img.shields.io/badge/Dropbox-0061FF?style=for-the-badge&logo=dropbox&logoColor=white" />
    <img src="https://img.shields.io/badge/OneDrive-0078D4?style=for-the-badge&logo=microsoftonedrive&logoColor=white" />
    <img src="https://img.shields.io/badge/iCloud-FFFFFF?style=for-the-badge&logo=icloud&logoColor=black" />
</p>

---

## 🛠️ Key Features

* **Smart Organization**: Categorize your snippets with custom icons and dedicated colors.
* **Privacy First**: No servers, no registration. Your data stays entirely under your control.
* **"Redirect" Cloud Sync**: Effortlessly sync your snippets across devices using **Google Drive, Dropbox, OneDrive**, or any folder of your choice.
* **Modern Interface**: Built for speed and simplicity, ensuring your info is always just a click away.
* **Local Security**: All data is saved directly on your device or chosen cloud folder in a transparent format.

---

## 🏗️ How the Sync Works

SnippetPop uses a unique **two-layer** architecture:

1. **The Compass (`rootStore`)**: A local configuration that remembers where your library is located.
2. **The Treasure (`snippetpop-data.json`)**: The actual file containing all your snippets.

### Why is this great?
When you change the library folder, the app migrates your data to the new location (like your Google Drive folder) and restarts. If you install SnippetPop on another computer and select the same folder, it detects the existing data and loads it instantly.

---

## 💻 Tech Stack

* **Core**: [Electron](https://www.electronjs.org/)
* **Frontend**: [React](https://reactjs.org/) with TypeScript
* **Build Tool**: [Vite](https://vitejs.dev/) & [Electron Forge](https://www.electronforge.io/)
* **Database**: `electron-store`
* **Installer**: Inno Setup (Windows) & DMG (macOS)

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher)
* **npm**

### Installation
1. Clone the repository: `git clone https://github.com/PellegrinoPiccolo/SnippetPop.git`
2. Install dependencies: `npm install`
3. Run in development: `npm run dev`

### Packaging (Build)
To generate the installer for your OS: `npm run make`

---

## 📄 License

This project is licensed under the **MIT License**.

---

**SnippetPop** - *Your snippets, synced everywhere, controlled by you.*
