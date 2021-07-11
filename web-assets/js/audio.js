const howler = require("howler")

let sound;

// Howler Api
ipcRenderer.on("src_lib_ap_howler", (event, args) => {
    switch (args.type) {
        case "new":
            sound = new howler.Howl({
                src: args.src
            })
            break
        case "play":
            sound.play()
            break
        case "pause":
            sound.pause()
            break
    }
})
