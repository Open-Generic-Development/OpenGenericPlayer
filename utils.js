function print(msg){
    console.log(msg)
}

function delay(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}

module.exports = {print, delay}
