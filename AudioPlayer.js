const {print} = require("./utils.js")
const main = require("./main.js")

const AudioPlayer = class {
    constructor() {
        this.songSource = undefined
        this.playing = false
        this.update = undefined

        this.songSourceUpdateMethod = function (seconds_now, seconds_max) {
            print("Seconds Now: " + seconds_now + " | Seconds Max: " + seconds_max + " | " + (seconds_now/seconds_max*100) + "%")
            main.win.webContents.send("song", {
                image: ap.songSource.image,
                name: ap.songSource.name,
                interpret: ap.songSource.interpret,
                source: ap.songSource.source,
                bar: [seconds_now, seconds_max]
            })
        }
    }

    setSongSource(src){
        this.songSource = src
    }

    play_pause(){
        if(this.playing){
            this.songSource.pause()
            // this.update.pause()
        }
        else {
            this.songSource.play()
            // this.update.play()
        }

        this.playing = !this.playing
    }

    next(){
        // TODO
        this.update.song(this.songSource.song_info)
    }

    prev(){
        // TODO
        this.update.song(this.songSource.song_info)
    }

    search(seconds){
        this.songSource.search(seconds)
        this.update.search(seconds)
    }
};

let ap = new AudioPlayer()

module.exports = ap;