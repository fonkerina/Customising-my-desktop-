const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

let win;

function createWindow() {
    if (win) return;
    win = new BrowserWindow({
        width: 240,
        height: 440,
        x: 180,
        y: 80,
        frame: false, //default OS window frame
        transparent: false,
        alwaysOnTop: false,
        resizable: true,
        skipTaskbar: true,
        hasShadow: true,
        webPreferences: {
            reload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, //seperates renderer from Node env for security
            nodeIntegration: false //prevents direct Node access in the renderer
        }
    });

    win.setMenuBarVisibility(false);
    win.loadFile("index.html");

    win.on('closed', () => {
        win = null; // allow recreation after closing
    });
}

ipcMain.on('close-window', () => {
    if (win) win.close();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => { //handles quitting the app
    if (process.platform !== 'darwin') app.quit(); //for macOS
});

app.on('activate', () => {
    if (!win) createWindow();
});