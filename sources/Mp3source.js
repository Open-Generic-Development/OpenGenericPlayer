const ap = require("../AudioPlayer.js")
const {ipcMain} = require('electron');

class Audio {
    constructor(src, win) {
        this.win = win;
        ipcMain.removeAllListeners("src_lib_ap_howler_info")
        ipcMain.on("src_lib_ap_howler_info", ((event, args) => {
            this.currentTime = args.currentTime
            this.duration = args.duration

            ap.songSourceUpdateMethod(this.currentTime, this.duration)
        }))

        win.webContents.send("src_lib_ap_howler", {
            type: "new",
            src: src
        })

        this.currentTime = 0
        this.duration = 0
    }

    pause(){
        this.win.webContents.send("src_lib_ap_howler", {type: "pause"})
    }

    play(){
        this.win.webContents.send("src_lib_ap_howler", {type: "play"})
    }
}

class Mp3source {
    constructor(win) {
        this.win = win;
        this.playlist = [
            {
                song_image: "img/ogp-chan.png",
                song_name: "Song 0",
                song_interpret: "",
                song_source: "",
                song_src: "/home/user/Music/bigflooliPlustard.mp3"
            },
            {
                song_image: "img/ogp-chan.png",
                song_name: "Song 1",
                song_interpret: "OGP - Chan",
                song_source: "local",
                song_src: "/home/user/Music/sample4.mp3"
            }
        ]
        this.currentSong = 1
        this.song_info = this.playlist[this.currentSong]

        this.reload()
    }

    reload(){
        this.song_info = this.playlist[this.currentSong]
        this.audio = new Audio(this.song_info.song_src, this.win);
    }

    play(){
        this.audio.play();
    }

    pause(){
        this.audio.pause();
    }

    next(){
        this.currentSong++

        if(this.currentSong > this.playlist.length - 1)
            this.currentSong = 0

        this.reload()
    }

    prev(){
        this.currentSong--

        if(this.currentSong === -1)
            this.currentSong = this.playlist.length - 1

        this.reload()
    }

    search(seconds){
        this.audio.currentTime = seconds
    }

}

module.exports = Mp3source
