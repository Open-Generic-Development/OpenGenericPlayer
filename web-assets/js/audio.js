const howler = require("howler")


function delay(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}

function formatTime (secs) {
    let minutes = Math.floor(secs / 60) || 0;
    let seconds = (secs - minutes * 60) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

let sound;

// Howler Api

let last = ""

function step(){
    let currentTime = formatTime(Math.round(sound.seek() || 0))
    let currentTimeRaw = sound.seek() || 0
    let duration = formatTime(Math.round(sound.duration()))
    let durationRaw = sound.duration()

    if(last !== currentTime) {
        console.log("Seconds Now: " + currentTime + " | Seconds Max: " + duration + " | " + ((currentTimeRaw * 100) / durationRaw) + "%")
        last = currentTime
    }

    sendSongBar(currentTime, duration, ((currentTimeRaw*100)/durationRaw))

    if (sound.playing()) {
        requestAnimationFrame(step.bind(this));
    }
}

ipcRenderer.on("src_lib_ap_howler", (event, args) => {
    switch (args.type) {
        case "new":
            sound = new howler.Howl({
                src: args.src,
                onplay: function () {
                    requestAnimationFrame(step.bind(this))
                }
            })
            break
        case "play":
            sound.play()
            break
        case "pause":
            sound.pause()
            break
        case "search":
            sound.pause()
            console.error(args.percentage)
            sound.seek(args.percentage/100*sound.duration())
            sound.play()
            break
    }
})

async function reloader(){
    while (true){
        const playingrn =
        await delay(10)
    }
}

reloader().then()
