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
 */
document.getElementById('timer').style.visibility = 'hidden';
document.getElementById('task').style.visibility = 'hidden';
document.getElementById('progress').style.visibility = 'visible';
var token = document.getElementById('token');
var state = 'start';
var iteration = 1;
var db;
var request = window.indexedDB.open("nightshade-db", 1);

request.onsuccess = function (e) {
  db = event.target.result;
  var store = db.transaction(['tasks'], 'readonly').objectStore('tasks');

  store.get(qd.task).onsuccess = function (e) {
    // check if there was an existing count otherwise start anew.
    var count = e.target.result && e.target.result.completed || 0 || 0;

    for (var index = 0; index < count; index++) {
      document.getElementById('progress').appendChild(getWorkToken());
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
    worker = new Worker('worker.bundle.js');
  }
}

window.onload = function (e) {
  if (qd.task != undefined) {
    document.getElementById('task').style.visibility = 'hidden';
    document.getElementById('timer').style.visibility = 'visible';
    if (worker) timer(workspan);
  } else {
    document.getElementById('task').style.visibility = 'visible';
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
    var nixie3 = document.getElementById('nixie3');
    var nixie2 = document.getElementById('nixie2');
    var nixie1 = document.getElementById('nixie1');
    var nixie0 = document.getElementById('nixie0');
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

if ('serviceWorker' in navigator) {
  console.log('sw supported');
  navigator.serviceWorker.register('sw.bundle.js').then(function (sw) {
    console.log('ServiceWorker registration successful with scope: ', sw.scope);
  }, function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

var callback = function callback() {
  return console.log('nothing here');
};
/**
 * Starts a timer for the current task.
 * @param {number} amount - the amount of time in milliseconds
 */


function timer(amount) {
  console.log('starting timer');
  state = 'work';
  finished = false;
  document.getElementsByTagName('body').item(0).classList.remove('break');

  if (window.Worker && worker != undefined) {
    callback = function callback() {
      taskFinished();
      return document.getElementById('progress').appendChild(getWorkToken());
    };

    worker.postMessage(amount * 1000 * 60);
  }
}
/**
 * Starts a timer for a break.
 * @param {number} amount - the amount of time in milliseconds
 */


function breather(amount) {
  state = 'break';
  finished = false;
  document.getElementsByTagName('body').item(0).classList.add('break');

  if (window.Worker) {
    if (worker != undefined) {
      callback = function callback() {
        return document.getElementById('progress').appendChild(getBreakToken());
      };

      worker.postMessage(amount * 1000 * 60);
    }
  }
}

function getBreakToken() {
  var btoken = token.content.cloneNode(true);
  btoken.getElementById('icon').classList.remove('work');
  btoken.getElementById('icon').classList.add('break');
  return btoken;
}

function getWorkToken() {
  var wtoken = token.content.cloneNode(true);
  return wtoken;
}

function taskFinished() {
  finished = true;
  notifiy("Times up");
  iteration++;
  document.title = "finished " + qd.task; // increment how many times this task was completed in the database.

  var store = db.transaction(['tasks'], 'readwrite').objectStore('tasks');

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
  var numbers = nixie.getElementsByTagName('span');

  for (var i = 0; i < numbers.length; i++) {
    numbers[i].classList.remove('active');
  }

  if (0 <= value && value <= 9) nixie.getElementsByClassName(value).item(0).classList.add('active');
}

Notification.requestPermission(function (status) {
  console.log('Notification permission status:', status);
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
  if (state == 'break') return timer(workspan);else return breather(iteration > 0 && iteration % 4 == 0 ? 2 * breakspan : breakspan);
}

window.onclick = begin;

document.onkeydown = function (e) {
  e = e || window.event;
  var presses = debounceKey(e.key);
  if (e.key == ' ') return begin();

  if (e.key == 'Escape') {
    if (presses >= 3 && state == 'work') {
      debounceKey();
      return breather(breakspan);
    }

    if (presses >= 3 && state == 'break') {
      debounceKey();
      return timer(workspan);
    }
  }
};

function notifiy(msg) {
  var _this = this;

  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function (registration) {
      var notification = registration.showNotification('All done!', {
        tag: 'task',
        renotify: true,
        requireInteraction: true,
        icon: 'images/icon.png',
        image: 'https://static1.squarespace.com/static/53fccdc3e4b06d598890737d/54231dffe4b07bb558b1e0d2/54231e31e4b057212f157ec5/1517947886108/GINGERWHITECOFFEELAND.jpg'
      });

      notification.onclick = function () {
        parent.focus();
        window.focus();

        _this.close();
      };
    });
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwidmlzaWJpbGl0eSIsInRva2VuIiwic3RhdGUiLCJpdGVyYXRpb24iLCJkYiIsInJlcXVlc3QiLCJ3aW5kb3ciLCJpbmRleGVkREIiLCJvcGVuIiwib25zdWNjZXNzIiwiZSIsImV2ZW50IiwidGFyZ2V0IiwicmVzdWx0Iiwic3RvcmUiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwiZ2V0IiwicWQiLCJ0YXNrIiwiY291bnQiLCJjb21wbGV0ZWQiLCJpbmRleCIsImFwcGVuZENoaWxkIiwiZ2V0V29ya1Rva2VuIiwib251cGdyYWRlbmVlZGVkIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJrZXlQYXRoIiwiY3JlYXRlSW5kZXgiLCJ1bmlxdWUiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsInNwbGl0IiwiZm9yRWFjaCIsIml0ZW0iLCJzIiwiayIsInYiLCJyZXBsYWNlQWxsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicHVzaCIsInJlcGxhY2UiLCJqb2luIiwid29ya3NwYW4iLCJ0aW1lciIsImJyZWFrc3BhbiIsImJyZWFrIiwiZmluaXNoZWQiLCJ3b3JrZXIiLCJXb3JrZXIiLCJ1bmRlZmluZWQiLCJvbmxvYWQiLCJvbm1lc3NhZ2UiLCJtaW51dGVzIiwic2Vjb25kcyIsImRhdGEiLCJjYWxsYmFjayIsIm5peGllMyIsIm5peGllMiIsIm5peGllMSIsIm5peGllMCIsInRpdGxlIiwidG9Mb2NhbGVTdHJpbmciLCJtaW5pbXVtSW50ZWdlckRpZ2l0cyIsInNldE5peGllIiwiTWF0aCIsImZsb29yIiwibmF2aWdhdG9yIiwiY29uc29sZSIsImxvZyIsInNlcnZpY2VXb3JrZXIiLCJyZWdpc3RlciIsInRoZW4iLCJzdyIsInNjb3BlIiwiZXJyIiwiYW1vdW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ0YXNrRmluaXNoZWQiLCJwb3N0TWVzc2FnZSIsImJyZWF0aGVyIiwiYWRkIiwiZ2V0QnJlYWtUb2tlbiIsImJ0b2tlbiIsImNvbnRlbnQiLCJjbG9uZU5vZGUiLCJ3dG9rZW4iLCJub3RpZml5IiwicHV0IiwibmFtZSIsIm5peGllIiwidmFsdWUiLCJudW1iZXJzIiwiaSIsImxlbmd0aCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJOb3RpZmljYXRpb24iLCJyZXF1ZXN0UGVybWlzc2lvbiIsInN0YXR1cyIsIl9rZXkiLCJyZXNldERlYm91bmNlIiwiZGVib3VuY2VLZXkiLCJrZXkiLCJkZWJvdW5jZSIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJiZWdpbiIsIm9uY2xpY2siLCJvbmtleWRvd24iLCJwcmVzc2VzIiwibXNnIiwicGVybWlzc2lvbiIsImdldFJlZ2lzdHJhdGlvbiIsInJlZ2lzdHJhdGlvbiIsIm5vdGlmaWNhdGlvbiIsInNob3dOb3RpZmljYXRpb24iLCJ0YWciLCJyZW5vdGlmeSIsInJlcXVpcmVJbnRlcmFjdGlvbiIsImljb24iLCJpbWFnZSIsInBhcmVudCIsImZvY3VzIiwiY2xvc2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFzQjtBQUFBOztBQUNsQixNQUFJZCxZQUFZLENBQUNlLFVBQWIsSUFBMkIsU0FBL0IsRUFBMEM7QUFDdEM5QyxhQUFTLENBQUNHLGFBQVYsQ0FBd0I0QyxlQUF4QixHQUEwQzFDLElBQTFDLENBQStDLFVBQUEyQyxZQUFZLEVBQUk7QUFDM0QsVUFBSUMsWUFBWSxHQUFHRCxZQUFZLENBQUNFLGdCQUFiLENBQThCLFdBQTlCLEVBQTJDO0FBQUVDLFdBQUcsRUFBRSxNQUFQO0FBQWVDLGdCQUFRLEVBQUUsSUFBekI7QUFBK0JDLDBCQUFrQixFQUFFLElBQW5EO0FBQXlEQyxZQUFJLEVBQUUsaUJBQS9EO0FBQWtGQyxhQUFLLEVBQUU7QUFBekYsT0FBM0MsQ0FBbkI7O0FBRUFOLGtCQUFZLENBQUNQLE9BQWIsR0FBdUIsWUFBTTtBQUFFYyxjQUFNLENBQUNDLEtBQVA7QUFBZ0J2SCxjQUFNLENBQUN1SCxLQUFQOztBQUFnQixhQUFJLENBQUNDLEtBQUw7QUFBZSxPQUE5RTtBQUNILEtBSkQ7QUFLSDtBQUNKLEMiLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgJy4vLi4vc2Nzcy9hcHAuc2NzcydcclxuXHJcbi8qKlxyXG4gKiBUT0RPOiBzYXZlIHRoZSBjdXJyZW50IHRpbWVyIHRpbWUgYmV0d2VlbiByZWZyZXNoZXNcclxuICogVE9ETzoga2VlcCB0cmFjayBvZiBob3cgbWFueSBtaW51dGVzIGVhY2ggdGFzaydzIHBvbW9kb3JvIHdhc1xyXG4gKiBUT0RPOiBkaXNwbGF5IHRhc2sgc3RhdHNcclxuICogVE9ETzogYW5kIGEgJ2ZpbmlzaGVkJyBzdGF0ZSBhZnRlciB4IHBvbW9kb3JvcyB0byBzdG9wIHdvcmtpbmcuXHJcbiAqIFRPRE86IGFkZCBhICdjb250aW51ZScgc3RhdGUgYWZ0ZXIgdGltZXIgZmluaXNoZXMgYmVmb3JlIGNvbnRpbnVlaW5nLlxyXG4gKiBUT0RPOiBhbGxvdyBtb3JlIHRpbWUgdG8gYmUgYWRkZWQgZnJvbSBub3RpZmljYXRpb24gKCsyIG1pbnV0ZXMpLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDSEFOR0VMT0c6XHJcbiAqIFxyXG4gKiAtIHN0b3JlIG51bWJlciBvZiBjb21wbGV0ZWQgdGFza3MgaW4gaW5kZXhlZERCIGFuZCBkaXNwbGF5IG51bWJlciBvZiBjb21wbGV0ZWQgdGFza3Mgd2hlbiBjb3JyZXNwb25kaW5nIHRhc2sgaXMgcmUtc3RhcnRlZC5cclxuICovXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZXInKS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2snKS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzJykuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJ1xyXG5cclxudmFyIHRva2VuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rva2VuJyk7XHJcblxyXG52YXIgc3RhdGUgPSAnc3RhcnQnO1xyXG5cclxudmFyIGl0ZXJhdGlvbiA9IDE7XHJcblxyXG52YXIgZGI7XHJcbnZhciByZXF1ZXN0ID0gd2luZG93LmluZGV4ZWREQi5vcGVuKFwibmlnaHRzaGFkZS1kYlwiLCAxKTtcclxuXHJcbnJlcXVlc3Qub25zdWNjZXNzID0gKGUpID0+IHtcclxuICAgIGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuXHJcbiAgICBsZXQgc3RvcmUgPSBkYi50cmFuc2FjdGlvbihcclxuICAgICAgICBbJ3Rhc2tzJ10sICdyZWFkb25seScpLm9iamVjdFN0b3JlKCd0YXNrcycpO1xyXG4gICAgXHJcbiAgICBzdG9yZS5nZXQocWQudGFzaykub25zdWNjZXNzID0gKGUpID0+IHtcclxuICAgIFxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIHdhcyBhbiBleGlzdGluZyBjb3VudCBvdGhlcndpc2Ugc3RhcnQgYW5ldy5cclxuICAgICAgICBsZXQgY291bnQgPSAoZS50YXJnZXQucmVzdWx0ICYmIGUudGFyZ2V0LnJlc3VsdC5jb21wbGV0ZWQgfHwgMClcclxuICAgICAgICAgICAgfHwgMDtcclxuICAgIFxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjb3VudDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3MnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChnZXRXb3JrVG9rZW4oKSk7ICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5yZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChlKSA9PiB7XHJcbiAgICBsZXQgZGIgPSBlLnRhcmdldC5yZXN1bHQ7XHJcbiAgICBsZXQgb2JqZWN0U3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShcInRhc2tzXCIsIHsga2V5UGF0aDogXCJuYW1lXCIgfSk7XHJcblxyXG4gICAgb2JqZWN0U3RvcmUuY3JlYXRlSW5kZXgoXCJjb21wbGV0ZWRcIixcclxuICAgICAgICBcImNvbXBsZXRlZFwiLCB7IHVuaXF1ZTogZmFsc2UgfSk7XHJcbn1cclxuXHJcbi8vIHBhcnNlIHRoZSBxdWVyeSBzZWxlY3RvciBpbiB0aGUgdXJsXHJcbnZhciBxZCA9IHt9O1xyXG5pZiAobG9jYXRpb24uc2VhcmNoKSBsb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLnNwbGl0KFwiJlwiKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICB2YXIgcyA9IGl0ZW0uc3BsaXQoXCI9XCIpLFxyXG4gICAgICAgIGsgPSBzWzBdLFxyXG4gICAgICAgIHYgPSBzWzFdICYmIHJlcGxhY2VBbGwoZGVjb2RlVVJJQ29tcG9uZW50KHNbMV0pLFxyXG4gICAgICAgICAgICAvXFwrLywgXCIgXCIpOyAvLyAgbnVsbC1jb2FsZXNjaW5nIC8gc2hvcnQtY2lyY3VpdFxyXG4gICAgKHFkW2tdID0gcWRba10gfHwgW10pLnB1c2godikgLy8gbnVsbC1jb2FsZXNjaW5nIC8gc2hvcnQtY2lyY3VpdFxyXG59KVxyXG5cclxuLyoqXHJcbiAqIFJlcGxhY2VzIGFsbCBvY2N1cmVuY2VzIG9mIHRoZSBzZWFyY2ggcGF0dGVybiB3aXRoIHRoZSBnaXZlbiByZXBsYWNlbWVudC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldCB0aGUgc3RyaW5nIG9uIHdpdGNoIHRvIGFwcGx5IHRoZSByZXBsYWNlbWVudHNcclxuICogQHBhcmFtIHtzdHJpbmd8UmVnZXh9IHNlYXJjaCB0aGUgcGF0dGVybiB0byByZXBsYWNlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXBsYWNlIHRoZSByZXBsYWNlbWVudCB2YWx1ZS5cclxuICovXHJcbmZ1bmN0aW9uIHJlcGxhY2VBbGwodGFyZ2V0LCBzZWFyY2gsIHJlcGxhY2UpIHtcclxuICAgIHJldHVybiB0YXJnZXQuc3BsaXQoc2VhcmNoKS5qb2luKHJlcGxhY2UpO1xyXG59XHJcblxyXG4vLyBpbml0aWFsaXplIHByb2dyYW0gYXJndW1lbnRzLlxyXG5cclxudmFyIHdvcmtzcGFuID0gcWQudGltZXIgfHwgMjBcclxudmFyIGJyZWFrc3BhbiA9IHFkLmJyZWFrIHx8IDRcclxudmFyIGZpbmlzaGVkID0gdHJ1ZTtcclxuXHJcbi8vIG1vdmUgaW50byAnd29yaycgc3RhdGUgaWYgYSB0YXNrIGhhcyBiZWVuIGRlZmluZWQuXHJcblxyXG52YXIgd29ya2VyO1xyXG5cclxuaWYgKHdpbmRvdy5Xb3JrZXIpIHtcclxuICAgIGlmICh3b3JrZXIgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgd29ya2VyID0gbmV3IFdvcmtlcignd29ya2VyLmJ1bmRsZS5qcycpO1xyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cub25sb2FkID0gKGUpID0+IHtcclxuICAgIGlmIChxZC50YXNrICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrJykuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lcicpLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcblxyXG4gICAgICAgIGlmICh3b3JrZXIpIHRpbWVyKHdvcmtzcGFuKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrJykuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgIH1cclxufVxyXG5cclxud29ya2VyLm9ubWVzc2FnZSA9IChlKSA9PiB7XHJcbiAgICBsZXQgbWludXRlcyA9IDk5O1xyXG4gICAgbGV0IHNlY29uZHMgPSA5OTtcclxuXHJcbiAgICBpZiAoZS5kYXRhLm1pbnV0ZXMgIT0gdW5kZWZpbmVkICYmIGUuZGF0YS5zZWNvbmRzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG1pbnV0ZXMgPSBlLmRhdGEubWludXRlcztcclxuICAgICAgICBzZWNvbmRzID0gZS5kYXRhLnNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGUuZGF0YS5maW5pc2hlZCkge1xyXG4gICAgICAgIGNhbGxiYWNrKCk7IC8vIGRvIHdoYXRldmVyIG5lZWRzIGRvaW5nIHdoZW4gdGhlIHRpbWVyIGV4cGlyZXMuLi5cclxuICAgIH1cclxuXHJcbiAgICBpZighZmluaXNoZWQpXHJcbiAgICB7XHJcbiAgICBsZXQgbml4aWUzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25peGllMycpO1xyXG4gICAgbGV0IG5peGllMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduaXhpZTInKTtcclxuICAgIGxldCBuaXhpZTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbml4aWUxJyk7XHJcbiAgICBsZXQgbml4aWUwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25peGllMCcpO1xyXG5cclxuICAgIGRvY3VtZW50LnRpdGxlID0gYCR7bWludXRlcy50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDIgfSl9OiR7c2Vjb25kcy50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDIgfSl9ICR7cWQudGFza31gO1xyXG5cclxuICAgIHNldE5peGllKG5peGllMywgTWF0aC5mbG9vcihtaW51dGVzIC8gMTApKTtcclxuICAgIHNldE5peGllKG5peGllMiwgTWF0aC5mbG9vcihtaW51dGVzICUgMTApKTtcclxuICAgIHNldE5peGllKG5peGllMSwgTWF0aC5mbG9vcihzZWNvbmRzIC8gMTApKTtcclxuICAgIHNldE5peGllKG5peGllMCwgTWF0aC5mbG9vcihzZWNvbmRzICUgMTApKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XHJcbiAgICBjb25zb2xlLmxvZygnc3cgc3VwcG9ydGVkJylcclxuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCdzdy5idW5kbGUuanMnKS50aGVuKChzdykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsIHdpdGggc2NvcGU6ICcsIHN3LnNjb3BlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAvLyByZWdpc3RyYXRpb24gZmFpbGVkIDooXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2VXb3JrZXIgcmVnaXN0cmF0aW9uIGZhaWxlZDogJywgZXJyKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbnZhciBjYWxsYmFjayA9ICgpID0+IGNvbnNvbGUubG9nKCdub3RoaW5nIGhlcmUnKVxyXG5cclxuXHJcbi8qKlxyXG4gKiBTdGFydHMgYSB0aW1lciBmb3IgdGhlIGN1cnJlbnQgdGFzay5cclxuICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHNcclxuICovXHJcbmZ1bmN0aW9uIHRpbWVyKGFtb3VudCkge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCdzdGFydGluZyB0aW1lcicpXHJcbiAgICBzdGF0ZSA9ICd3b3JrJ1xyXG4gICAgZmluaXNoZWQgPSBmYWxzZVxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApLmNsYXNzTGlzdC5yZW1vdmUoJ2JyZWFrJyk7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5Xb3JrZXIgJiYgd29ya2VyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgICAgIHRhc2tGaW5pc2hlZCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzJylcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRDaGlsZChnZXRXb3JrVG9rZW4oKSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZShhbW91bnQgKiAxMDAwICogNjApXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdGFydHMgYSB0aW1lciBmb3IgYSBicmVhay5cclxuICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHNcclxuICovXHJcbmZ1bmN0aW9uIGJyZWF0aGVyKGFtb3VudCkge1xyXG4gICAgc3RhdGUgPSAnYnJlYWsnXHJcbiAgICBmaW5pc2hlZCA9IGZhbHNlXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpLml0ZW0oMCkuY2xhc3NMaXN0LmFkZCgnYnJlYWsnKTtcclxuICAgIGlmICh3aW5kb3cuV29ya2VyKSB7XHJcbiAgICAgICAgaWYgKHdvcmtlciAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sgPSAoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3MnKS5hcHBlbmRDaGlsZChnZXRCcmVha1Rva2VuKCkpXHJcbiAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZShhbW91bnQgKiAxMDAwICogNjApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRCcmVha1Rva2VuKCkge1xyXG4gICAgbGV0IGJ0b2tlbiA9IHRva2VuLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpXHJcbiAgICBidG9rZW4uZ2V0RWxlbWVudEJ5SWQoJ2ljb24nKS5jbGFzc0xpc3QucmVtb3ZlKCd3b3JrJylcclxuICAgIGJ0b2tlbi5nZXRFbGVtZW50QnlJZCgnaWNvbicpLmNsYXNzTGlzdC5hZGQoJ2JyZWFrJylcclxuICAgIHJldHVybiBidG9rZW47XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRXb3JrVG9rZW4oKSB7XHJcbiAgICBsZXQgd3Rva2VuID0gdG9rZW4uY29udGVudC5jbG9uZU5vZGUodHJ1ZSlcclxuICAgIHJldHVybiB3dG9rZW47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tGaW5pc2hlZCgpIHtcclxuICAgIGZpbmlzaGVkID0gdHJ1ZTtcclxuICAgIG5vdGlmaXkoXCJUaW1lcyB1cFwiKVxyXG4gICAgaXRlcmF0aW9uKys7XHJcblxyXG4gICAgZG9jdW1lbnQudGl0bGUgPSBgZmluaXNoZWQgJHtxZC50YXNrfWA7XHJcblxyXG4gICAgLy8gaW5jcmVtZW50IGhvdyBtYW55IHRpbWVzIHRoaXMgdGFzayB3YXMgY29tcGxldGVkIGluIHRoZSBkYXRhYmFzZS5cclxuICAgIGxldCBzdG9yZSA9IGRiLnRyYW5zYWN0aW9uKFxyXG4gICAgICAgIFsndGFza3MnXSwgJ3JlYWR3cml0ZScpLm9iamVjdFN0b3JlKCd0YXNrcycpO1xyXG5cclxuICAgIHN0b3JlLmdldChxZC50YXNrKS5vbnN1Y2Nlc3MgPSAoZSkgPT4ge1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSB3YXMgYW4gZXhpc3RpbmcgY291bnQgb3RoZXJ3aXNlIHN0YXJ0IGFuZXcuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gKGUudGFyZ2V0LnJlc3VsdCAmJiBlLnRhcmdldC5yZXN1bHQuY29tcGxldGVkIHx8IDApXHJcbiAgICAgICAgICAgIHx8IDA7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YWJhc2UgY291bnQgZm9yIHRoZSB0YXNrXHJcbiAgICAgICAgc3RvcmUucHV0KHsgbmFtZTogcWQudGFzaywgY29tcGxldGVkOiBjb3VudCArIDEgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXROaXhpZShuaXhpZSwgdmFsdWUpIHtcclxuICAgIGxldCBudW1iZXJzID0gbml4aWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG51bWJlcnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoMCA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSA5KVxyXG4gICAgICAgIG5peGllLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodmFsdWUpLml0ZW0oMCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbn1cclxuXHJcbk5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiAoc3RhdHVzKSB7XHJcbiAgICBjb25zb2xlLmxvZygnTm90aWZpY2F0aW9uIHBlcm1pc3Npb24gc3RhdHVzOicsIHN0YXR1cyk7XHJcbn0pO1xyXG5cclxudmFyIF9rZXkgPSB1bmRlZmluZWQ7XHJcbnZhciBjb3VudCA9IDA7XHJcblxyXG5mdW5jdGlvbiByZXNldERlYm91bmNlKCkge1xyXG4gICAgX2tleSA9IHVuZGVmaW5lZDtcclxuICAgIGNvdW50ID0gMDtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVib3VuY2VLZXkoa2V5KSB7XHJcbiAgICBpZiAoIWtleSkgeyBjb3VudCA9IDA7IH1cclxuXHJcbiAgICBpZiAoa2V5ICE9IF9rZXkpIHtcclxuICAgICAgICBjb3VudCA9IDBcclxuICAgICAgICBfa2V5ID0ga2V5XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc3VsdCA9ICsrY291bnQ7XHJcblxyXG4gICAgaWYgKGRlYm91bmNlKSBjbGVhclRpbWVvdXQoZGVib3VuY2UpO1xyXG4gICAgZGVib3VuY2UgPSBzZXRUaW1lb3V0KHJlc2V0RGVib3VuY2UsIDIwMClcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG52YXIgZGVib3VuY2U7XHJcblxyXG5mdW5jdGlvbiBiZWdpbigpIHtcclxuICAgIGNvbnNvbGUubG9nKGZpbmlzaGVkKVxyXG5cclxuICAgIGlmICghZmluaXNoZWQpIHJldHVybjtcclxuXHJcbiAgICBpZihzdGF0ZSA9PSAnYnJlYWsnKSByZXR1cm4gdGltZXIod29ya3NwYW4pXHJcbiAgICBlbHNlIHJldHVybiBicmVhdGhlcihpdGVyYXRpb24gPiAwICYmIGl0ZXJhdGlvbiAlIDQgPT0gMCA/IFxyXG4gICAgICAgIDIgKiBicmVha3NwYW4gOiBicmVha3NwYW4pXHJcbn1cclxuXHJcbndpbmRvdy5vbmNsaWNrID0gYmVnaW47XHJcbmRvY3VtZW50Lm9ua2V5ZG93biA9IChlKSA9PiB7XHJcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XHJcbiAgICBsZXQgcHJlc3NlcyA9IGRlYm91bmNlS2V5KGUua2V5KVxyXG4gICAgaWYgKGUua2V5ID09ICcgJykgcmV0dXJuIGJlZ2luKCk7XHJcblxyXG4gICAgaWYgKGUua2V5ID09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgaWYgKHByZXNzZXMgPj0gMyAmJiBzdGF0ZSA9PSAnd29yaycpIHtcclxuICAgICAgICAgICAgZGVib3VuY2VLZXkoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJyZWF0aGVyKGJyZWFrc3BhbilcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByZXNzZXMgPj0gMyAmJiBzdGF0ZSA9PSAnYnJlYWsnKSB7XHJcbiAgICAgICAgICAgIGRlYm91bmNlS2V5KCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aW1lcih3b3Jrc3BhbilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vdGlmaXkobXNnKSB7XHJcbiAgICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT0gJ2dyYW50ZWQnKSB7XHJcbiAgICAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuZ2V0UmVnaXN0cmF0aW9uKCkudGhlbihyZWdpc3RyYXRpb24gPT4ge1xyXG4gICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uID0gcmVnaXN0cmF0aW9uLnNob3dOb3RpZmljYXRpb24oJ0FsbCBkb25lIScsIHsgdGFnOiAndGFzaycsIHJlbm90aWZ5OiB0cnVlLCByZXF1aXJlSW50ZXJhY3Rpb246IHRydWUsIGljb246ICdpbWFnZXMvaWNvbi5wbmcnLCBpbWFnZTogJ2h0dHBzOi8vc3RhdGljMS5zcXVhcmVzcGFjZS5jb20vc3RhdGljLzUzZmNjZGMzZTRiMDZkNTk4ODkwNzM3ZC81NDIzMWRmZmU0YjA3YmI1NThiMWUwZDIvNTQyMzFlMzFlNGIwNTcyMTJmMTU3ZWM1LzE1MTc5NDc4ODYxMDgvR0lOR0VSV0hJVEVDT0ZGRUVMQU5ELmpwZycgfSlcclxuXHJcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5vbmNsaWNrID0gKCkgPT4geyBwYXJlbnQuZm9jdXMoKTsgd2luZG93LmZvY3VzKCk7IHRoaXMuY2xvc2UoKTsgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==