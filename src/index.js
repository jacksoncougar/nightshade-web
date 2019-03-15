import './../scss/app.scss'

var amount = 1000 * 3;
var start = Date.now() + amount;

function update() {
    let minutesSpan = document.getElementById('minutes');
    let secondsSpan = document.getElementById('seconds');

    let moment = start - Date.now();

    let minutes = Math.floor(moment / 1000 / 60);
    let seconds = Math.ceil((moment - (minutes * 1000 * 60)) / 1000) % 60;

    minutesSpan.innerText = minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 });
    secondsSpan.innerText = seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 });

    if (moment <= 0) {
        notifiy("times up")
        clearInterval(t)
    }
}

function notifiy(msg) {
    // Let's check whether notification permissions have already been granted
    if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(msg);
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(msg);
            }
        });
    }
}

var t = setInterval(update, 1000);