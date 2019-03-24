import './../scss/app.scss'

/**
 * TODO: save the current timer time between refreshes
 * TODO: keep track of how many minutes each task's pomodoro was
 * TODO: display task stats
 * TODO: and a 'finished' state after x pomodoros to stop working.
 * TODO: add a 'continue' state after timer finishes before continueing.
 * TODO: allow more time to be added from notification (+2 minutes).
 */

document.getElementById('timer').hidden = true;
var start = 0;
var iteration = 1;
var t;


// try to open the indexedDB storage
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

console.log(qd)

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
var finished = false;

// move into 'work' state if a task has been defined.

var worker;

if (qd.task != undefined) {
    document.getElementById('task').hidden = true;
    document.getElementById('timer').hidden = false;

    if (window.Worker) {
        if (worker == undefined) {
            worker = new Worker('worker.bundle.js');
            worker.postMessage(1000 * workspan * 60)
        }
    }
}

worker.onmessage = (e) => {
    let minutes = 0;
    let seconds = 0;

    if (e.data.finished != undefined) {
        // timer has finished...
        notifiy("Times up!")
        finished = e.data.finished
    }
    else if (e.data.minutes != undefined && e.data.seconds != undefined) {
        minutes = e.data.minutes;
        seconds = e.data.seconds;
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


/**
 * Starts a timer for the current task.
 * @param {number} amount - the amount of time in milliseconds
 */ 
function timer(amount) {
    document.getElementsByTagName('body').item(0).classList.remove('break');
    
    if (window.Worker) {
        if (worker != undefined) {
            worker.postMessage(amount)
        }
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
            worker.postMessage(amount)
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
    for (let i = 0; i < nixie.children.length; i++) {
        //nixie.children[i].classList.replace('active', '');
    }


    let numbers = nixie.getElementsByTagName('span');
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].classList.remove('active');
    }
    nixie.getElementsByClassName(value).item(0).classList.add('active');
}


window.onclick = () => {
    console.log(finished)
    if (!finished) return;

    if (iteration % 8 == 0)
        return breather(1000 * 2 * breakspan * 60); // ten minute timer
    else if (iteration % 2 == 0)
        return breather(1000 * breakspan * 60); // ten minute timer
    else return timer(1000 * workspan * 60); // ten minute timer
}

function notifiy(msg) {
    // Let's check whether notification permissions have already been granted
    if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(msg, { icon: './images/icon.png', requireInteraction: true, tag: 'task', renotify: true });
        notification.onclick = () => { parent.focus(); }

    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(msg, { icon: './images/icon.png', requireInteraction: true, tag: 'task', renotify: true });
                notification.onclick = () => { parent.focus(); this.close(); }
            }
        });
    }
}
