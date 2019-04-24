/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scss/app.scss":
/*!***********************!*\
  !*** ./scss/app.scss ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ./../scss/app.scss */ "./scss/app.scss");

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
var token = document.getElementById("token");
var state = "start";
var iteration = 1;
var db;
var request = window.indexedDB.open("nightshade-db", 1);

request.onsuccess = function (e) {
  db = event.target.result;
  var store = db.transaction(["tasks"], "readonly").objectStore("tasks");
  if (qd.task) store.get(qd.task).onsuccess = function (e) {
    // check if there was an existing count otherwise start anew.
    var count = e.target.result && e.target.result.completed || 0 || 0;

    for (var index = 0; index < count; index++) {
      document.getElementById("progress").appendChild(getWorkToken());
    }
  };
};

request.onupgradeneeded = function (e) {
  var db = e.target.result;
  var objectStore = db.createObjectStore("tasks", {
    keyPath: "name"
  });
  objectStore.createIndex("completed", "completed", {
    unique: false
  });
}; // parse the query selector in the url


var qd = {};
if (location.search) location.search.substr(1).split("&").forEach(function (item) {
  var s = item.split("="),
      k = s[0],
      v = s[1] && replaceAll(decodeURIComponent(s[1]), /\+/, " "); //  null-coalescing / short-circuit

  (qd[k] = qd[k] || []).push(v); // null-coalescing / short-circuit
});
/**
 * Replaces all occurences of the search pattern with the given replacement.
 * @param {string} target the string on witch to apply the replacements
 * @param {string|Regex} search the pattern to replace
 * @param {string} replace the replacement value.
 */

function replaceAll(target, search, replace) {
  return target.split(search).join(replace);
} // initialize program arguments.


var workspan = qd.timer || 20;
var breakspan = qd.break || 4;
var finished = true; // move into 'work' state if a task has been defined.

var worker;

if (window.Worker) {
  if (worker == undefined) {
    worker = new Worker("worker.bundle.js");
  }
}

window.onload = function (e) {
  var context = new AudioContext();

  if (qd.task != undefined) {
    document.getElementById("task").style.visibility = "hidden";
    document.getElementById("timer").style.visibility = "visible";
    if (worker) timer(workspan);
  } else {
    document.getElementById("task").style.visibility = "visible";
  }
};

worker.onmessage = function (e) {
  var minutes = 99;
  var seconds = 99;

  if (e.data.minutes != undefined && e.data.seconds != undefined) {
    minutes = e.data.minutes;
    seconds = e.data.seconds;
  }

  if (e.data.finished) {
    callback(); // do whatever needs doing when the timer expires...
  }

  if (!finished) {
    var nixie3 = document.getElementById("nixie3");
    var nixie2 = document.getElementById("nixie2");
    var nixie1 = document.getElementById("nixie1");
    var nixie0 = document.getElementById("nixie0");
    document.title = minutes.toLocaleString(undefined, {
      minimumIntegerDigits: 2
    }) + ":" + seconds.toLocaleString(undefined, {
      minimumIntegerDigits: 2
    }) + " " + qd.task;
    setNixie(nixie3, Math.floor(minutes / 10));
    setNixie(nixie2, Math.floor(minutes % 10));
    setNixie(nixie1, Math.floor(seconds / 10));
    setNixie(nixie0, Math.floor(seconds % 10));
  }
};

if ("serviceWorker" in navigator) {
  console.log("sw supported");
  navigator.serviceWorker.register("sw.bundle.js").then(function (sw) {
    console.log("ServiceWorker registration successful with scope: ", sw.scope);
  }, function (err) {
    // registration failed :(
    console.log("ServiceWorker registration failed: ", err);
  });
}

var callback = function callback() {
  return console.log("nothing here");
};
/**
 * Starts a timer for the current task.
 * @param {number} amount - the amount of time in milliseconds
 */


function timer(amount) {
  console.log("starting timer");
  state = "work";
  finished = false;
  document.getElementsByTagName("body").item(0).classList.remove("break");

  if (window.Worker && worker != undefined) {
    callback = function callback() {
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
  document.getElementsByTagName("body").item(0).classList.add("break");

  if (window.Worker) {
    if (worker != undefined) {
      callback = function callback() {
        taskFinished();
        document.getElementById("progress").appendChild(getBreakToken());
      };

      worker.postMessage(amount * 1000 * 60);
    }
  }
}

function getBreakToken() {
  var btoken = token.content.cloneNode(true);
  btoken.getElementById("icon").classList.remove("work");
  btoken.getElementById("icon").classList.add("break");
  return btoken;
}

function getWorkToken() {
  var wtoken = token.content.cloneNode(true);
  return wtoken;
}

function taskFinished() {
  finished = true;
  var sound = new Audio("sounds/temple-bell.mp3");
  sound.play().catch(function (error) {
    return console.log(error);
  });
  notifiy("Times up");
  iteration++;
  document.title = "finished " + qd.task; // increment how many times this task was completed in the database.

  var store = db.transaction(["tasks"], "readwrite").objectStore("tasks");

  store.get(qd.task).onsuccess = function (e) {
    // check if there was an existing count otherwise start anew.
    var count = e.target.result && e.target.result.completed || 0 || 0; // update the database count for the task

    store.put({
      name: qd.task,
      completed: count + 1
    });
  };
}

function setNixie(nixie, value) {
  var numbers = nixie.getElementsByTagName("span");

  for (var i = 0; i < numbers.length; i++) {
    numbers[i].classList.remove("active");
  }

  if (0 <= value && value <= 9) nixie.getElementsByClassName(value).item(0).classList.add("active");
}

Notification.requestPermission(function (status) {
  console.log("Notification permission status:", status);
});
var _key = undefined;
var count = 0;

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

  var result = ++count;
  if (debounce) clearTimeout(debounce);
  debounce = setTimeout(resetDebounce, 200);
  return result;
}

var debounce;

function begin() {
  console.log(finished);
  if (!finished) return;
  if (state == "break") return timer(workspan);else if (state == "work") return breather(iteration > 0 && iteration % 4 == 0 ? 2 * breakspan : breakspan);
}

window.onclick = begin;

document.onkeydown = function (e) {
  e = e || window.event;
  var presses = debounceKey(e.key);
  if (e.key == " ") return begin();

  if (e.key == "Escape") {
    if (presses >= 3 && state == "work") {
      debounceKey();
      return breather(breakspan);
    }

    if (presses >= 3 && state == "break") {
      debounceKey();
      return timer(workspan);
    }
  }
};

function notifiy(msg) {
  var _this = this;

  if (Notification.permission == "granted") {
    navigator.serviceWorker.getRegistration().then(function (registration) {
      var notification = registration.showNotification("All done!", {
        tag: "task",
        renotify: true,
        requireInteraction: true,
        icon: "images/icons/icon-72x72.png",
        silent: true,
        image: "https://static1.squarespace.com/static/53fccdc3e4b06d598890737d/54231dffe4b07bb558b1e0d2/54231e31e4b057212f157ec5/1517947886108/GINGERWHITECOFFEELAND.jpg"
      });

      notification.onclick = function () {
        console.log("clicked");
        parent.focus();
        window.focus();

        _this.close();
      };
    });
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwidmlzaWJpbGl0eSIsInRva2VuIiwic3RhdGUiLCJpdGVyYXRpb24iLCJkYiIsInJlcXVlc3QiLCJ3aW5kb3ciLCJpbmRleGVkREIiLCJvcGVuIiwib25zdWNjZXNzIiwiZSIsImV2ZW50IiwidGFyZ2V0IiwicmVzdWx0Iiwic3RvcmUiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwicWQiLCJ0YXNrIiwiZ2V0IiwiY291bnQiLCJjb21wbGV0ZWQiLCJpbmRleCIsImFwcGVuZENoaWxkIiwiZ2V0V29ya1Rva2VuIiwib251cGdyYWRlbmVlZGVkIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJrZXlQYXRoIiwiY3JlYXRlSW5kZXgiLCJ1bmlxdWUiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsInNwbGl0IiwiZm9yRWFjaCIsIml0ZW0iLCJzIiwiayIsInYiLCJyZXBsYWNlQWxsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicHVzaCIsInJlcGxhY2UiLCJqb2luIiwid29ya3NwYW4iLCJ0aW1lciIsImJyZWFrc3BhbiIsImJyZWFrIiwiZmluaXNoZWQiLCJ3b3JrZXIiLCJXb3JrZXIiLCJ1bmRlZmluZWQiLCJvbmxvYWQiLCJjb250ZXh0IiwiQXVkaW9Db250ZXh0Iiwib25tZXNzYWdlIiwibWludXRlcyIsInNlY29uZHMiLCJkYXRhIiwiY2FsbGJhY2siLCJuaXhpZTMiLCJuaXhpZTIiLCJuaXhpZTEiLCJuaXhpZTAiLCJ0aXRsZSIsInRvTG9jYWxlU3RyaW5nIiwibWluaW11bUludGVnZXJEaWdpdHMiLCJzZXROaXhpZSIsIk1hdGgiLCJmbG9vciIsIm5hdmlnYXRvciIsImNvbnNvbGUiLCJsb2ciLCJzZXJ2aWNlV29ya2VyIiwicmVnaXN0ZXIiLCJ0aGVuIiwic3ciLCJzY29wZSIsImVyciIsImFtb3VudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwidGFza0ZpbmlzaGVkIiwicG9zdE1lc3NhZ2UiLCJicmVhdGhlciIsImFkZCIsImdldEJyZWFrVG9rZW4iLCJidG9rZW4iLCJjb250ZW50IiwiY2xvbmVOb2RlIiwid3Rva2VuIiwic291bmQiLCJBdWRpbyIsInBsYXkiLCJjYXRjaCIsImVycm9yIiwibm90aWZpeSIsInB1dCIsIm5hbWUiLCJuaXhpZSIsInZhbHVlIiwibnVtYmVycyIsImkiLCJsZW5ndGgiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiTm90aWZpY2F0aW9uIiwicmVxdWVzdFBlcm1pc3Npb24iLCJzdGF0dXMiLCJfa2V5IiwicmVzZXREZWJvdW5jZSIsImRlYm91bmNlS2V5Iiwia2V5IiwiZGVib3VuY2UiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiYmVnaW4iLCJvbmNsaWNrIiwib25rZXlkb3duIiwicHJlc3NlcyIsIm1zZyIsInBlcm1pc3Npb24iLCJnZXRSZWdpc3RyYXRpb24iLCJyZWdpc3RyYXRpb24iLCJub3RpZmljYXRpb24iLCJzaG93Tm90aWZpY2F0aW9uIiwidGFnIiwicmVub3RpZnkiLCJyZXF1aXJlSW50ZXJhY3Rpb24iLCJpY29uIiwic2lsZW50IiwiaW1hZ2UiLCJwYXJlbnQiLCJmb2N1cyIsImNsb3NlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtB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YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCBcIi4vLi4vc2Nzcy9hcHAuc2Nzc1wiO1xyXG5cclxuLyoqXHJcbiAqIFRPRE86IHNhdmUgdGhlIGN1cnJlbnQgdGltZXIgdGltZSBiZXR3ZWVuIHJlZnJlc2hlc1xyXG4gKiBUT0RPOiBrZWVwIHRyYWNrIG9mIGhvdyBtYW55IG1pbnV0ZXMgZWFjaCB0YXNrJ3MgcG9tb2Rvcm8gd2FzXHJcbiAqIFRPRE86IGRpc3BsYXkgdGFzayBzdGF0c1xyXG4gKiBUT0RPOiBhbmQgYSAnZmluaXNoZWQnIHN0YXRlIGFmdGVyIHggcG9tb2Rvcm9zIHRvIHN0b3Agd29ya2luZy5cclxuICogVE9ETzogYWRkIGEgJ2NvbnRpbnVlJyBzdGF0ZSBhZnRlciB0aW1lciBmaW5pc2hlcyBiZWZvcmUgY29udGludWVpbmcuXHJcbiAqIFRPRE86IGFsbG93IG1vcmUgdGltZSB0byBiZSBhZGRlZCBmcm9tIG5vdGlmaWNhdGlvbiAoKzIgbWludXRlcykuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIENIQU5HRUxPRzpcclxuICpcclxuICogLSBzdG9yZSBudW1iZXIgb2YgY29tcGxldGVkIHRhc2tzIGluIGluZGV4ZWREQiBhbmQgZGlzcGxheSBudW1iZXIgb2YgY29tcGxldGVkIHRhc2tzIHdoZW4gY29ycmVzcG9uZGluZyB0YXNrIGlzIHJlLXN0YXJ0ZWQuXHJcbiAqICMjIyMjIyBUdWUgQXByIDIzIDIyOjAxOjUxIE1EVCAyMDE5XHJcbiAqIC0gYnVnZml4IHRpbWVyIG5vdCBzdGFydGluZyBhZnRlciBicmVha1xyXG4gKiAtIGJ1Z2ZpeCBjbGlja2luZyBub3RpZmljYXRpb24gYnJpbmdzIHVwIHRhYlxyXG4gKiAtIGFkZGVkIGN1c3RvbSBzb3VuZCBwbGF5ZWQgb24gdGltZXIgY29tcGxldGlvbi5cclxuICovXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvZ3Jlc3NcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG5cclxudmFyIHRva2VuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2tlblwiKTtcclxuXHJcbnZhciBzdGF0ZSA9IFwic3RhcnRcIjtcclxuXHJcbnZhciBpdGVyYXRpb24gPSAxO1xyXG5cclxudmFyIGRiO1xyXG52YXIgcmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIub3BlbihcIm5pZ2h0c2hhZGUtZGJcIiwgMSk7XHJcblxyXG5yZXF1ZXN0Lm9uc3VjY2VzcyA9IGUgPT4ge1xyXG4gIGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuXHJcbiAgbGV0IHN0b3JlID0gZGIudHJhbnNhY3Rpb24oW1widGFza3NcIl0sIFwicmVhZG9ubHlcIikub2JqZWN0U3RvcmUoXCJ0YXNrc1wiKTtcclxuXHJcbiAgaWYgKHFkLnRhc2spXHJcbiAgICBzdG9yZS5nZXQocWQudGFzaykub25zdWNjZXNzID0gZSA9PiB7XHJcbiAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIHdhcyBhbiBleGlzdGluZyBjb3VudCBvdGhlcndpc2Ugc3RhcnQgYW5ldy5cclxuICAgICAgbGV0IGNvdW50ID0gKGUudGFyZ2V0LnJlc3VsdCAmJiBlLnRhcmdldC5yZXN1bHQuY29tcGxldGVkKSB8fCAwIHx8IDA7XHJcblxyXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY291bnQ7IGluZGV4KyspIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2dyZXNzXCIpLmFwcGVuZENoaWxkKGdldFdvcmtUb2tlbigpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbnJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZSA9PiB7XHJcbiAgbGV0IGRiID0gZS50YXJnZXQucmVzdWx0O1xyXG4gIGxldCBvYmplY3RTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKFwidGFza3NcIiwgeyBrZXlQYXRoOiBcIm5hbWVcIiB9KTtcclxuXHJcbiAgb2JqZWN0U3RvcmUuY3JlYXRlSW5kZXgoXCJjb21wbGV0ZWRcIiwgXCJjb21wbGV0ZWRcIiwgeyB1bmlxdWU6IGZhbHNlIH0pO1xyXG59O1xyXG5cclxuLy8gcGFyc2UgdGhlIHF1ZXJ5IHNlbGVjdG9yIGluIHRoZSB1cmxcclxudmFyIHFkID0ge307XHJcbmlmIChsb2NhdGlvbi5zZWFyY2gpXHJcbiAgbG9jYXRpb24uc2VhcmNoXHJcbiAgICAuc3Vic3RyKDEpXHJcbiAgICAuc3BsaXQoXCImXCIpXHJcbiAgICAuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgIHZhciBzID0gaXRlbS5zcGxpdChcIj1cIiksXHJcbiAgICAgICAgayA9IHNbMF0sXHJcbiAgICAgICAgdiA9IHNbMV0gJiYgcmVwbGFjZUFsbChkZWNvZGVVUklDb21wb25lbnQoc1sxXSksIC9cXCsvLCBcIiBcIik7IC8vICBudWxsLWNvYWxlc2NpbmcgLyBzaG9ydC1jaXJjdWl0XHJcbiAgICAgIChxZFtrXSA9IHFkW2tdIHx8IFtdKS5wdXNoKHYpOyAvLyBudWxsLWNvYWxlc2NpbmcgLyBzaG9ydC1jaXJjdWl0XHJcbiAgICB9KTtcclxuXHJcbi8qKlxyXG4gKiBSZXBsYWNlcyBhbGwgb2NjdXJlbmNlcyBvZiB0aGUgc2VhcmNoIHBhdHRlcm4gd2l0aCB0aGUgZ2l2ZW4gcmVwbGFjZW1lbnQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXQgdGhlIHN0cmluZyBvbiB3aXRjaCB0byBhcHBseSB0aGUgcmVwbGFjZW1lbnRzXHJcbiAqIEBwYXJhbSB7c3RyaW5nfFJlZ2V4fSBzZWFyY2ggdGhlIHBhdHRlcm4gdG8gcmVwbGFjZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVwbGFjZSB0aGUgcmVwbGFjZW1lbnQgdmFsdWUuXHJcbiAqL1xyXG5mdW5jdGlvbiByZXBsYWNlQWxsKHRhcmdldCwgc2VhcmNoLCByZXBsYWNlKSB7XHJcbiAgcmV0dXJuIHRhcmdldC5zcGxpdChzZWFyY2gpLmpvaW4ocmVwbGFjZSk7XHJcbn1cclxuXHJcbi8vIGluaXRpYWxpemUgcHJvZ3JhbSBhcmd1bWVudHMuXHJcblxyXG52YXIgd29ya3NwYW4gPSBxZC50aW1lciB8fCAyMDtcclxudmFyIGJyZWFrc3BhbiA9IHFkLmJyZWFrIHx8IDQ7XHJcbnZhciBmaW5pc2hlZCA9IHRydWU7XHJcblxyXG4vLyBtb3ZlIGludG8gJ3dvcmsnIHN0YXRlIGlmIGEgdGFzayBoYXMgYmVlbiBkZWZpbmVkLlxyXG5cclxudmFyIHdvcmtlcjtcclxuXHJcbmlmICh3aW5kb3cuV29ya2VyKSB7XHJcbiAgaWYgKHdvcmtlciA9PSB1bmRlZmluZWQpIHtcclxuICAgIHdvcmtlciA9IG5ldyBXb3JrZXIoXCJ3b3JrZXIuYnVuZGxlLmpzXCIpO1xyXG4gIH1cclxufVxyXG5cclxud2luZG93Lm9ubG9hZCA9IGUgPT4ge1xyXG4gIHZhciBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xyXG4gIGlmIChxZC50YXNrICE9IHVuZGVmaW5lZCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lclwiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XHJcblxyXG4gICAgaWYgKHdvcmtlcikgdGltZXIod29ya3NwYW4pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gIH1cclxufTtcclxuXHJcbndvcmtlci5vbm1lc3NhZ2UgPSBlID0+IHtcclxuICBsZXQgbWludXRlcyA9IDk5O1xyXG4gIGxldCBzZWNvbmRzID0gOTk7XHJcblxyXG4gIGlmIChlLmRhdGEubWludXRlcyAhPSB1bmRlZmluZWQgJiYgZS5kYXRhLnNlY29uZHMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICBtaW51dGVzID0gZS5kYXRhLm1pbnV0ZXM7XHJcbiAgICBzZWNvbmRzID0gZS5kYXRhLnNlY29uZHM7XHJcbiAgfVxyXG5cclxuICBpZiAoZS5kYXRhLmZpbmlzaGVkKSB7XHJcbiAgICBjYWxsYmFjaygpOyAvLyBkbyB3aGF0ZXZlciBuZWVkcyBkb2luZyB3aGVuIHRoZSB0aW1lciBleHBpcmVzLi4uXHJcbiAgfVxyXG5cclxuICBpZiAoIWZpbmlzaGVkKSB7XHJcbiAgICBsZXQgbml4aWUzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuaXhpZTNcIik7XHJcbiAgICBsZXQgbml4aWUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuaXhpZTJcIik7XHJcbiAgICBsZXQgbml4aWUxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuaXhpZTFcIik7XHJcbiAgICBsZXQgbml4aWUwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuaXhpZTBcIik7XHJcblxyXG4gICAgZG9jdW1lbnQudGl0bGUgPSBgJHttaW51dGVzLnRvTG9jYWxlU3RyaW5nKHVuZGVmaW5lZCwge1xyXG4gICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogMlxyXG4gICAgfSl9OiR7c2Vjb25kcy50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDIgfSl9ICR7XHJcbiAgICAgIHFkLnRhc2tcclxuICAgIH1gO1xyXG5cclxuICAgIHNldE5peGllKG5peGllMywgTWF0aC5mbG9vcihtaW51dGVzIC8gMTApKTtcclxuICAgIHNldE5peGllKG5peGllMiwgTWF0aC5mbG9vcihtaW51dGVzICUgMTApKTtcclxuICAgIHNldE5peGllKG5peGllMSwgTWF0aC5mbG9vcihzZWNvbmRzIC8gMTApKTtcclxuICAgIHNldE5peGllKG5peGllMCwgTWF0aC5mbG9vcihzZWNvbmRzICUgMTApKTtcclxuICB9XHJcbn07XHJcblxyXG5pZiAoXCJzZXJ2aWNlV29ya2VyXCIgaW4gbmF2aWdhdG9yKSB7XHJcbiAgY29uc29sZS5sb2coXCJzdyBzdXBwb3J0ZWRcIik7XHJcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIucmVnaXN0ZXIoXCJzdy5idW5kbGUuanNcIikudGhlbihcclxuICAgIHN3ID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgXCJTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsIHdpdGggc2NvcGU6IFwiLFxyXG4gICAgICAgIHN3LnNjb3BlXHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgIC8vIHJlZ2lzdHJhdGlvbiBmYWlsZWQgOihcclxuICAgICAgY29uc29sZS5sb2coXCJTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBmYWlsZWQ6IFwiLCBlcnIpO1xyXG4gICAgfVxyXG4gICk7XHJcbn1cclxuXHJcbnZhciBjYWxsYmFjayA9ICgpID0+IGNvbnNvbGUubG9nKFwibm90aGluZyBoZXJlXCIpO1xyXG5cclxuLyoqXHJcbiAqIFN0YXJ0cyBhIHRpbWVyIGZvciB0aGUgY3VycmVudCB0YXNrLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kc1xyXG4gKi9cclxuZnVuY3Rpb24gdGltZXIoYW1vdW50KSB7XHJcbiAgY29uc29sZS5sb2coXCJzdGFydGluZyB0aW1lclwiKTtcclxuICBzdGF0ZSA9IFwid29ya1wiO1xyXG4gIGZpbmlzaGVkID0gZmFsc2U7XHJcbiAgZG9jdW1lbnRcclxuICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilcclxuICAgIC5pdGVtKDApXHJcbiAgICAuY2xhc3NMaXN0LnJlbW92ZShcImJyZWFrXCIpO1xyXG5cclxuICBpZiAod2luZG93LldvcmtlciAmJiB3b3JrZXIgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICBjYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgdGFza0ZpbmlzaGVkKCk7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2dyZXNzXCIpLmFwcGVuZENoaWxkKGdldFdvcmtUb2tlbigpKTtcclxuICAgIH07XHJcbiAgICB3b3JrZXIucG9zdE1lc3NhZ2UoYW1vdW50ICogMTAwMCAqIDYwKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdGFydHMgYSB0aW1lciBmb3IgYSBicmVhay5cclxuICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHNcclxuICovXHJcbmZ1bmN0aW9uIGJyZWF0aGVyKGFtb3VudCkge1xyXG4gIHN0YXRlID0gXCJicmVha1wiO1xyXG4gIGZpbmlzaGVkID0gZmFsc2U7XHJcbiAgZG9jdW1lbnRcclxuICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilcclxuICAgIC5pdGVtKDApXHJcbiAgICAuY2xhc3NMaXN0LmFkZChcImJyZWFrXCIpO1xyXG4gIGlmICh3aW5kb3cuV29ya2VyKSB7XHJcbiAgICBpZiAod29ya2VyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICBjYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICB0YXNrRmluaXNoZWQoKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2dyZXNzXCIpLmFwcGVuZENoaWxkKGdldEJyZWFrVG9rZW4oKSk7XHJcbiAgICAgIH07XHJcbiAgICAgIHdvcmtlci5wb3N0TWVzc2FnZShhbW91bnQgKiAxMDAwICogNjApO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QnJlYWtUb2tlbigpIHtcclxuICBsZXQgYnRva2VuID0gdG9rZW4uY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XHJcbiAgYnRva2VuLmdldEVsZW1lbnRCeUlkKFwiaWNvblwiKS5jbGFzc0xpc3QucmVtb3ZlKFwid29ya1wiKTtcclxuICBidG9rZW4uZ2V0RWxlbWVudEJ5SWQoXCJpY29uXCIpLmNsYXNzTGlzdC5hZGQoXCJicmVha1wiKTtcclxuICByZXR1cm4gYnRva2VuO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXb3JrVG9rZW4oKSB7XHJcbiAgbGV0IHd0b2tlbiA9IHRva2VuLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xyXG4gIHJldHVybiB3dG9rZW47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tGaW5pc2hlZCgpIHtcclxuICBmaW5pc2hlZCA9IHRydWU7XHJcblxyXG4gIGxldCBzb3VuZCA9IG5ldyBBdWRpbyhcInNvdW5kcy90ZW1wbGUtYmVsbC5tcDNcIik7XHJcbiAgc291bmQucGxheSgpLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKGVycm9yKSk7XHJcbiAgbm90aWZpeShcIlRpbWVzIHVwXCIpO1xyXG4gIGl0ZXJhdGlvbisrO1xyXG5cclxuICBkb2N1bWVudC50aXRsZSA9IGBmaW5pc2hlZCAke3FkLnRhc2t9YDtcclxuXHJcbiAgLy8gaW5jcmVtZW50IGhvdyBtYW55IHRpbWVzIHRoaXMgdGFzayB3YXMgY29tcGxldGVkIGluIHRoZSBkYXRhYmFzZS5cclxuICBsZXQgc3RvcmUgPSBkYi50cmFuc2FjdGlvbihbXCJ0YXNrc1wiXSwgXCJyZWFkd3JpdGVcIikub2JqZWN0U3RvcmUoXCJ0YXNrc1wiKTtcclxuXHJcbiAgc3RvcmUuZ2V0KHFkLnRhc2spLm9uc3VjY2VzcyA9IGUgPT4ge1xyXG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgd2FzIGFuIGV4aXN0aW5nIGNvdW50IG90aGVyd2lzZSBzdGFydCBhbmV3LlxyXG4gICAgbGV0IGNvdW50ID0gKGUudGFyZ2V0LnJlc3VsdCAmJiBlLnRhcmdldC5yZXN1bHQuY29tcGxldGVkKSB8fCAwIHx8IDA7XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSBkYXRhYmFzZSBjb3VudCBmb3IgdGhlIHRhc2tcclxuICAgIHN0b3JlLnB1dCh7IG5hbWU6IHFkLnRhc2ssIGNvbXBsZXRlZDogY291bnQgKyAxIH0pO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldE5peGllKG5peGllLCB2YWx1ZSkge1xyXG4gIGxldCBudW1iZXJzID0gbml4aWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzcGFuXCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgbnVtYmVyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH1cclxuICBpZiAoMCA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSA5KVxyXG4gICAgbml4aWVcclxuICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodmFsdWUpXHJcbiAgICAgIC5pdGVtKDApXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG59XHJcblxyXG5Ob3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24oc3RhdHVzKSB7XHJcbiAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb24gcGVybWlzc2lvbiBzdGF0dXM6XCIsIHN0YXR1cyk7XHJcbn0pO1xyXG5cclxudmFyIF9rZXkgPSB1bmRlZmluZWQ7XHJcbnZhciBjb3VudCA9IDA7XHJcblxyXG5mdW5jdGlvbiByZXNldERlYm91bmNlKCkge1xyXG4gIF9rZXkgPSB1bmRlZmluZWQ7XHJcbiAgY291bnQgPSAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWJvdW5jZUtleShrZXkpIHtcclxuICBpZiAoIWtleSkge1xyXG4gICAgY291bnQgPSAwO1xyXG4gIH1cclxuXHJcbiAgaWYgKGtleSAhPSBfa2V5KSB7XHJcbiAgICBjb3VudCA9IDA7XHJcbiAgICBfa2V5ID0ga2V5O1xyXG4gIH1cclxuXHJcbiAgbGV0IHJlc3VsdCA9ICsrY291bnQ7XHJcblxyXG4gIGlmIChkZWJvdW5jZSkgY2xlYXJUaW1lb3V0KGRlYm91bmNlKTtcclxuICBkZWJvdW5jZSA9IHNldFRpbWVvdXQocmVzZXREZWJvdW5jZSwgMjAwKTtcclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxudmFyIGRlYm91bmNlO1xyXG5cclxuZnVuY3Rpb24gYmVnaW4oKSB7XHJcbiAgY29uc29sZS5sb2coZmluaXNoZWQpO1xyXG5cclxuICBpZiAoIWZpbmlzaGVkKSByZXR1cm47XHJcblxyXG4gIGlmIChzdGF0ZSA9PSBcImJyZWFrXCIpIHJldHVybiB0aW1lcih3b3Jrc3Bhbik7XHJcbiAgZWxzZSBpZiAoc3RhdGUgPT0gXCJ3b3JrXCIpXHJcbiAgICByZXR1cm4gYnJlYXRoZXIoXHJcbiAgICAgIGl0ZXJhdGlvbiA+IDAgJiYgaXRlcmF0aW9uICUgNCA9PSAwID8gMiAqIGJyZWFrc3BhbiA6IGJyZWFrc3BhblxyXG4gICAgKTtcclxufVxyXG5cclxud2luZG93Lm9uY2xpY2sgPSBiZWdpbjtcclxuZG9jdW1lbnQub25rZXlkb3duID0gZSA9PiB7XHJcbiAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gIGxldCBwcmVzc2VzID0gZGVib3VuY2VLZXkoZS5rZXkpO1xyXG4gIGlmIChlLmtleSA9PSBcIiBcIikgcmV0dXJuIGJlZ2luKCk7XHJcblxyXG4gIGlmIChlLmtleSA9PSBcIkVzY2FwZVwiKSB7XHJcbiAgICBpZiAocHJlc3NlcyA+PSAzICYmIHN0YXRlID09IFwid29ya1wiKSB7XHJcbiAgICAgIGRlYm91bmNlS2V5KCk7XHJcbiAgICAgIHJldHVybiBicmVhdGhlcihicmVha3NwYW4pO1xyXG4gICAgfVxyXG4gICAgaWYgKHByZXNzZXMgPj0gMyAmJiBzdGF0ZSA9PSBcImJyZWFrXCIpIHtcclxuICAgICAgZGVib3VuY2VLZXkoKTtcclxuICAgICAgcmV0dXJuIHRpbWVyKHdvcmtzcGFuKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBub3RpZml5KG1zZykge1xyXG4gIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PSBcImdyYW50ZWRcIikge1xyXG4gICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuZ2V0UmVnaXN0cmF0aW9uKCkudGhlbihyZWdpc3RyYXRpb24gPT4ge1xyXG4gICAgICB2YXIgbm90aWZpY2F0aW9uID0gcmVnaXN0cmF0aW9uLnNob3dOb3RpZmljYXRpb24oXCJBbGwgZG9uZSFcIiwge1xyXG4gICAgICAgIHRhZzogXCJ0YXNrXCIsXHJcbiAgICAgICAgcmVub3RpZnk6IHRydWUsXHJcbiAgICAgICAgcmVxdWlyZUludGVyYWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIGljb246IFwiaW1hZ2VzL2ljb25zL2ljb24tNzJ4NzIucG5nXCIsXHJcbiAgICAgICAgc2lsZW50OiB0cnVlLFxyXG4gICAgICAgIGltYWdlOlxyXG4gICAgICAgICAgXCJodHRwczovL3N0YXRpYzEuc3F1YXJlc3BhY2UuY29tL3N0YXRpYy81M2ZjY2RjM2U0YjA2ZDU5ODg5MDczN2QvNTQyMzFkZmZlNGIwN2JiNTU4YjFlMGQyLzU0MjMxZTMxZTRiMDU3MjEyZjE1N2VjNS8xNTE3OTQ3ODg2MTA4L0dJTkdFUldISVRFQ09GRkVFTEFORC5qcGdcIlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIG5vdGlmaWNhdGlvbi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZFwiKTtcclxuICAgICAgICBwYXJlbnQuZm9jdXMoKTtcclxuICAgICAgICB3aW5kb3cuZm9jdXMoKTtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==