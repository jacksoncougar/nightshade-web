/* eslint-disable no-useless-return */
/* eslint-disable no-restricted-globals */

import "../scss/app.scss";
import { replaceAll } from "util";
/**
 * TODO: save the current timer time between refreshes
 * TODO: keep track of how many minutes each task's pomodoro was
 * TODO: display task stats
 * TODO: and a 'finished' state after x pomodoros to stop working.
 * TODO: add a 'continue' state after timer finishes before continueing.
 * TODO: allow more time to be added from notification (+2 minutes).
 */

/**
 * CHANGELOG:
 *
 * - store number of completed tasks in indexedDB and display number of completed tasks when corresponding task is re-started.
 * ###### Tue Apr 23 22:01:51 MDT 2019
 * - bugfix timer not starting after break
 * - bugfix clicking notification brings up tab
 * - added custom sound played on timer completion.
 */

document.getElementById("timer").style.visibility = "hidden";
document.getElementById("task").style.visibility = "hidden";
document.getElementById("progress").style.visibility = "visible";

const nixie3 = document.getElementById("nixie3");
const nixie2 = document.getElementById("nixie2");
const nixie1 = document.getElementById("nixie1");
const nixie0 = document.getElementById("nixie0");

const token = document.getElementById("token");

let state = "start";
let iteration = 1;
let db;

const request = window.indexedDB.open("nightshade-db", 1);

request.onsuccess = e => {
  db = event.target.result;

  const store = db.transaction(["tasks"], "readonly").objectStore("tasks");

  if (qd.task) {
    store.get(qd.task).onsuccess = e => {
      // check if there was an existing count otherwise start anew.
      const count = (e.target.result && e.target.result.completed) || 0 || 0;

      for (let index = 0; index < count; index++) {
        document.getElementById("progress").appendChild(getWorkToken());
      }
    };
  }
};

request.onupgradeneeded = e => {
  const db = e.target.result;
  const objectStore = db.createObjectStore("tasks", { keyPath: "name" });

  objectStore.createIndex("completed", "completed", { unique: false });
};

// parse the query selector in the url
const qd = {};
if (location.search) {
  location.search
    .substr(1)
    .split("&")
    .forEach(item => {
      const s = item.split("=");
      const k = s[0];
      const v = s[1] && replaceAll(decodeURIComponent(s[1]), /\+/, " "); //  null-coalescing / short-circuit
      (qd[k] = qd[k] || []).push(v); // null-coalescing / short-circuit
    });
}

// initialize program arguments.

const workspan = qd.timer || 20;
const breakspan = qd.break || 4;
let finished = true;

// move into 'work' state if a task has been defined.

let worker;

if (window.Worker) {
  if (worker === undefined) {
    worker = new Worker("worker.bundle.js");
  }
}

window.onload = () => {
  if (qd.task !== undefined) {
    document.getElementById("task").style.visibility = "hidden";
    document.getElementById("timer").style.visibility = "visible";

    if (worker) timer(workspan);
  } else {
    document.getElementById("task").style.visibility = "visible";
  }
};

worker.onmessage = e => {
  let minutes = 99;
  let seconds = 99;

  if (e.data.minutes !== undefined && e.data.seconds !== undefined) {
    [minutes, seconds] = e.data;
  }

  if (e.data.finished) {
    // do whatever needs doing when the timer expires...
    callback();
  }

  if (!finished) {
    document.title = `${minutes.toLocaleString(undefined, {
      minimumIntegerDigits: 2
    })}:${seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })} ${
      qd.task
    }`;

    setNixie(nixie3, Math.floor(minutes / 10));
    setNixie(nixie2, Math.floor(minutes % 10));
    setNixie(nixie1, Math.floor(seconds / 10));
    setNixie(nixie0, Math.floor(seconds % 10));
  }
};

if ("serviceWorker" in navigator) {
  console.log("sw supported");
  navigator.serviceWorker.register("sw.bundle.js").then(
    sw => {
      console.log(
        "ServiceWorker registration successful with scope: ",
        sw.scope
      );
    },
    err => {
      // registration failed :(
      console.log("ServiceWorker registration failed: ", err);
    }
  );
}

var callback = () => console.log("nothing here");

/**
 * Starts a timer for the current task.
 * @param {number} amount - the amount of time in milliseconds
 */
function timer(amount) {
  console.log("starting timer");
  state = "work";
  finished = false;
  document
    .getElementsByTagName("body")
    .item(0)
    .classList.remove("break");

  if (window.Worker && worker != undefined) {
    callback = () => {
      taskFinished();
      return document.getElementById("progress").appendChild(getWorkToken());
    };
    worker.postMessage(amount * 1000 * 60);
  }
}

/**
 * Starts a timer for a break.
 * @param {number} amount - the amount of time in milliseconds
 */
function breather(amount) {
  state = "break";
  finished = false;
  document
    .getElementsByTagName("body")
    .item(0)
    .classList.add("break");
  if (window.Worker) {
    if (worker != undefined) {
      callback = () => {
        taskFinished();
        document.getElementById("progress").appendChild(getBreakToken());
      };
      worker.postMessage(amount * 1000 * 60);
    }
  }
}

function getBreakToken() {
  const btoken = token.content.cloneNode(true);
  btoken.getElementById("icon").classList.remove("work");
  btoken.getElementById("icon").classList.add("break");
  return btoken;
}

function getWorkToken() {
  const wtoken = token.content.cloneNode(true);
  return wtoken;
}

function taskFinished() {
  finished = true;

  const sound = new Audio("sounds/temple-bell.mp3");
  sound.play().catch(error => console.log(error));
  notifiy("Times up");
  iteration++;

  document.title = `finished ${qd.task}`;

  // increment how many times this task was completed in the database.
  const store = db.transaction(["tasks"], "readwrite").objectStore("tasks");

  store.get(qd.task).onsuccess = e => {
    // check if there was an existing count otherwise start anew.
    const count = (e.target.result && e.target.result.completed) || 0 || 0;

    // update the database count for the task
    store.put({ name: qd.task, completed: count + 1 });
  };
}

function setNixie(nixie, value) {
  const numbers = nixie.getElementsByTagName("span");
  for (let i = 0; i < numbers.length; i++) {
    numbers[i].classList.remove("active");
  }
  if (value >= 0 && value <= 9) {
    nixie
      .getElementsByClassName(value)
      .item(0)
      .classList.add("active");
  }
}

Notification.requestPermission(status => {
  console.log("Notification permission status:", status);
});

let _key;
let count = 0;

function resetDebounce() {
  _key = undefined;
  count = 0;
}

function debounceKey(key) {
  if (!key) {
    count = 0;
  }

  if (key != _key) {
    count = 0;
    _key = key;
  }

  const result = ++count;

  if (debounce) clearTimeout(debounce);
  debounce = setTimeout(resetDebounce, 200);

  return result;
}

let debounce;

function begin() {
  console.log(finished);

  if (!finished) return;

  if (state === "break") {
    timer(workspan);
    return;
  }
  if (state === "work") {
    breather(iteration > 0 && iteration % 4 == 0 ? 2 * breakspan : breakspan);
    return;
  }
}

window.onclick = begin;
document.onkeydown = e => {
  e = e || window.event;
  const presses = debounceKey(e.key);

  if (e.key === " ") {
    begin();
    return;
  }

  if (e.key === "Escape") {
    if (presses >= 3 && state == "work") {
      debounceKey();
      breather(breakspan);
      return;
    }
    if (presses >= 3 && state == "break") {
      debounceKey();
      timer(workspan);
      return;
    }
  }
};

function notifiy(msg) {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(registration => {
      const notification = registration.showNotification("All done!", {
        tag: "task",
        renotify: true,
        requireInteraction: true,
        icon: "images/icons/icon-72x72.png",
        silent: true,
        image:
          "https://static1.squarespace.com/static/53fccdc3e4b06d598890737d/54231dffe4b07bb558b1e0d2/54231e31e4b057212f157ec5/1517947886108/GINGERWHITECOFFEELAND.jpg"
      });

      notification.onclick = () => {
        console.log("clicked");
        parent.focus();
        window.focus();
        this.close();
      };
    });
  }
}
