import './../scss/app.scss'

var start = 0;
var iteration = 1;
var t;

function timer(amount) {
    document.getElementsByTagName('body').item(0).classList.remove('break');
    start = Date.now() + amount;
    t = setInterval(update, 1000);
}

function breather(amount) {
    document.getElementsByTagName('body').item(0).classList.add('break');
    start = Date.now() + amount;
    t = setInterval(update, 1000);
}

timer(1000 * 60 * 20);

var finished = false;

function update() {
    finished = false;
    let minutesSpan = document.getElementById('minutes');
    let secondsSpan = document.getElementById('seconds');

    let moment = start - Date.now();

    let minutes = Math.floor(moment / 1000 / 60);
    let seconds = Math.ceil((moment - (minutes * 1000 * 60)) / 1000) % 60;

    if (moment <= 900 && !finished) {
        finished = true;
        notifiy("Times up")
        clearInterval(t)

        minutes = 0;
        seconds = 0; 
        iteration++;
    }

    minutesSpan.innerText = minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 });
    secondsSpan.innerText = seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 });
}

window.onclick = () => { 
    if(!finished) return;

    if(iteration % 8 == 0)
    return breather(1000 * 10 * 60); // ten minute timer
    else if(iteration % 2 == 0)
    return breather(1000 * 5 * 60); // ten minute timer
    else return timer(1000 * 20 * 60); // ten minute timer
}

function notifiy(msg) {
    // Let's check whether notification permissions have already been granted
    if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(msg, {icon: './images/icon.png', requireInteraction: true} );
        notification.onclick = () => { parent.focus(); }

    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(msg, {icon: './images/icon.png', requireInteraction: true} );
                notification.onclick = () => { parent.focus(); this.close(); }
            }
        });
    }
}
