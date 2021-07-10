const {app, BrowserWindow} = require('electron');
const {print} = require('./utils.js');

function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile("index.html").then()
}

print("Using OS: " + process.platform)

app.whenReady().then(() => createWindow())