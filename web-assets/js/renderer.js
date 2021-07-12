const {ipcRenderer} = require('electron');


function formatTime (secs) {
    let minutes = Math.floor(secs / 60) || 0;
    let seconds = (secs - minutes * 60) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

ipcRenderer.on("msg", ((event, arg) => console.log(arg)))

ipcRenderer.on("song", ((event, arg) => {
    const song_image = arg.image
    const song_name = arg.name
    const song_interpret = arg.interpret
    const song_source = arg.source
    const song_bar_now = arg.bar[0]
    const song_bar_max = arg.bar[1]

    let song_bar_percent

    if (song_bar_max > 100) {
        song_bar_percent = (song_bar_now / song_bar_max * 100)
    }else
        song_bar_percent = 0;

    document.getElementById("song-icon").src = song_image
    document.getElementById("song-title").innerText = song_name
    document.getElementById("song-interpret").innerText = song_interpret
    document.getElementById("song-source").innerText = song_source
    document.getElementById("song-seconds-now").innerText = formatTime(song_bar_now) === "0:00" ? "--:--": formatTime(song_bar_now)
    document.getElementById("song-seek-bar").value = song_bar_percent
    document.getElementById("song-seconds-max").innerText = formatTime(song_bar_max) === "0:00" ? "--:--": formatTime(song_bar_max)
}))

function onSeek(){
    ipcRenderer.send("search", document.getElementById("song-seek-bar").value/100)
}

function prev(){
    ipcRenderer.send("action", "prev")
}

function next(){
    ipcRenderer.send("action", "next")
}

function playpause(){
    ipcRenderer.send("action", "pp")
}

function sendSongBar(now, max, perc){
    document.getElementById("song-seconds-now").innerText = now
    document.getElementById("song-seek-bar").value = perc*100
    document.getElementById("song-seconds-max").innerText = max
}
