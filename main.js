const {app, BrowserWindow, ipcMain} = require('electron');
const audioplayer = require(__dirname + '/AudioPlayer.js')

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.setIcon(__dirname + "/img/ogp-chan.png")
    win.setMinimumSize(600, 300)
    win.loadFile("index.html").then(() => {
        win.webContents.send("msg", "Welcome to osu!")
        win.webContents.send("song", {
            image: __dirname + "/img/ogp-chan.png",
            name: "No Song",
            interpret: "",
            source: "",
            bar: [0, 0]
        })

        const mp3 = require('./sources/Mp3source.js')
        audioplayer.setSongSource(new mp3(win))
    })
}

ipcMain.on("search", (event, arg) => {
    audioplayer.search(arg)
})

ipcMain.on("action", (event, args) => {
    switch (args) {
        case "prev":
            audioplayer.prev()
            break
        case "next":
            audioplayer.next()
            break
        case "pp":
            audioplayer.play_pause()
            break
    }
})

try {
// Enable live reload for all the files inside our project directory
    require('electron-reload')(
        __dirname,
        {
            electron: require(`electron`)
        }
    );
} catch (e) {
}

app.whenReady().then(() => {
    createWindow()
})


module.exports = {win}
