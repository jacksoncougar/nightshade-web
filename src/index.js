import './../scss/app.scss'

/**
 * TODO: save the current timer time between refreshes
 * TODO: keep track of how many minutes each task's pomodoro was
 * TODO: display task stats
 * TODO: and a 'finished' state after x pomodoros to stop working.
 * TODO: add a 'continue' state after timer finishes before continueing.
 * TODO: allow more time to be added from notification (+2 minutes).
 */


document.getElementById('timer').style.visibility = 'hidden'
document.getElementById('task').style.visibility = 'hidden'
document.getElementById('progress').style.visibility = 'visible'

var iteration = 1;

var db;
var request = window.indexedDB.open("nightshade-db", 1);

request.onsuccess = (e) => {
    db = event.target.result;
}

request.onupgradeneeded = (e) => {
    let db = e.target.result;
    let objectStore = db.createObjectStore("tasks", { keyPath: "name" });

    objectStore.createIndex("completed",
        "completed", { unique: false });
}

// parse the query selector in the url
var qd = {};
if (location.search) location.search.substr(1).split("&").forEach(function (item) {
    var s = item.split("="),
        k = s[0],
        v = s[1] && replaceAll(decodeURIComponent(s[1]),
            /\+/, " "); //  null-coalescing / short-circuit
    (qd[k] = qd[k] || []).push(v) // null-coalescing / short-circuit
})

/**
 * Replaces all occurences of the search pattern with the given replacement.
 * @param {string} target the string on witch to apply the replacements
 * @param {string|Regex} search the pattern to replace
 * @param {string} replace the replacement value.
 */
function replaceAll(target, search, replace) {
    return target.split(search).join(replace);
}

// initialize program arguments.

var workspan = qd.timer || 20
var breakspan = qd.break || 4
var finished = true;

// move into 'work' state if a task has been defined.

var worker;

if (window.Worker) {
    if (worker == undefined) {
        worker = new Worker('worker.bundle.js');
    }
}

window.onload = (e) => {
    if (qd.task != undefined) {
        document.getElementById('task').style.visibility = 'hidden';
        document.getElementById('timer').style.visibility = 'visible';

        if (worker) timer(workspan)
    }
    else {

        document.getElementById('task').style.visibility = 'visible';
    }
}

worker.onmessage = (e) => {
    let minutes = 0;
    let seconds = 0;

    if (e.data.minutes != undefined && e.data.seconds != undefined) {
        minutes = e.data.minutes;
        seconds = e.data.seconds;
    }

    if (e.data.finished != undefined) {
        notifiy("Times up!")

        finished = e.data.finished
        iteration++;

        callback(); // do whatever needs doing when the timer expires...
    }

    let nixie3 = document.getElementById('nixie3');
    let nixie2 = document.getElementById('nixie2');
    let nixie1 = document.getElementById('nixie1');
    let nixie0 = document.getElementById('nixie0');

    document.title = `${minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })} ${qd.task}`;

    setNixie(nixie3, Math.floor(minutes / 10));
    setNixie(nixie2, Math.floor(minutes % 10));
    setNixie(nixie1, Math.floor(seconds / 10));
    setNixie(nixie0, Math.floor(seconds % 10));
}


if ('serviceWorker' in navigator) {
    console.log('sw supported')
    navigator.serviceWorker.register('sw.bundle.js').then((sw) => {
        console.log('ServiceWorker registration successful with scope: ', sw.scope);
    }, function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    })
}

var callback = () => console.log('nothing here')


/**
 * Starts a timer for the current task.
 * @param {number} amount - the amount of time in milliseconds
 */
function timer(amount) {

    console.log('starting timer')
    document.getElementsByTagName('body').item(0).classList.remove('break');

    if (window.Worker && worker != undefined) {
        callback = () => document.getElementById('progress').innerText += " x"
        worker.postMessage(amount * 1000 * 60)
    }
}

/**
 * Starts a timer for a break.
 * @param {number} amount - the amount of time in milliseconds
 */
function breather(amount) {
    document.getElementsByTagName('body').item(0).classList.add('break');

    if (window.Worker) {
        if (worker != undefined) {
            callback = () => document.getElementById('progress').innerText += " o"
            worker.postMessage(amount * 1000 * 60)
        }
    }
}

function taskFinished() {
    finished = true;
    notifiy("Times up")

    iteration++;

    document.title = `finished ${qd.task}`;

    // increment how many times this task was completed in the database.
    let store = db.transaction(
        ['tasks'], 'readwrite').objectStore('tasks');

    store.get(qd.task).onsuccess = (e) => {

        // check if there was an existing count otherwise start anew.
        let count = (e.target.result && e.target.result.completed || 0)
            || 0;

        // update the database count for the task
        store.put({ name: qd.task, completed: count + 1 });
    };
}

function setNixie(nixie, value) {
    let numbers = nixie.getElementsByTagName('span');
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].classList.remove('active');
    }
    if (0 <= value && value <= 9)
        nixie.getElementsByClassName(value).item(0).classList.add('active');
}

Notification.requestPermission(function (status) {
    console.log('Notification permission status:', status);
});

function begin() {
    console.log(finished)
    if (!finished) return;

    if (iteration % 8 == 0)
        return breather(2 * breakspan); // ten minute timer
    else if (iteration % 2 == 0)
        return breather(breakspan); // ten minute timer
    else return timer(workspan); // ten minute timer
}

window.onclick = begin;
window.onkeypress = (e) => {
    if (e.key == ' ') begin();
}

function notifiy(msg) {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(registration => {
            registration.showNotification('All done!', {tag: 'task', renotify: true, requireInteraction: true, icon: 'images/icon.png', image: 'https://static1.squarespace.com/static/53fccdc3e4b06d598890737d/54231dffe4b07bb558b1e0d2/54231e31e4b057212f157ec5/1517947886108/GINGERWHITECOFFEELAND.jpg' })
        });
    }
}