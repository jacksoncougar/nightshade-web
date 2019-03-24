onmessage = (e) => {
    start = Date.now() + e.data
    console.log(start);
    setInterval(update, 1000);
    finished = false
}

var finished = false
var start = Date.now()
var t

function update() {
    if(finished) return;
    
    let moment = start - Date.now()
    let minutes = Math.floor(moment / 1000 / 60)
    let seconds = Math.ceil((moment - (minutes * 1000 * 60)) / 1000) % 60

    if (moment <= 0 && !finished) {
        clearInterval(t)
        finished = true
        minutes = seconds = 0
        postMessage({ finished: finished })
    }

    postMessage({ minutes: minutes, seconds: seconds })
}
