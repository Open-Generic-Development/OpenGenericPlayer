const {app, BrowserWindow} = require('electron');
const {print} = require('./utils.js');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.setIcon("img/ogp-chan.png")
    win.loadFile("index.html").then()
}

// Enable live reload for all the files inside our project directory
require('electron-reload')(
    __dirname,
    {
        electron: require(`${__dirname}/node_modules/electron`)
    }
);

app.whenReady().then(() => createWindow())
