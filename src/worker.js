onmessage = (e) => {

    console.log(e)
    if(e.data.wait) return;
    start = Date.now() + e.data
    console.log(start);
    setInterval(update, 100);
    finished = false

    update();
}

var finished = false
var start = Date.now()
var t

function update() {
    if(finished) return;

    let moment = start - Date.now()

    let minutes = Math.floor(moment / 1000 / 60)
    let seconds = Math.floor(moment / 1000 % 60)

    if (moment <= 0) {
        clearInterval(t)
        finished = true
        minutes = seconds = 0
        postMessage({ finished: true })
    }

    postMessage({ minutes: minutes, seconds: seconds })
}
