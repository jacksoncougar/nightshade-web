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
/******/ 	__webpack_require__.p = "/dist";
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
document.getElementById('timer').hidden = true;
var start = 0;
var iteration = 1;
var t; // try to open the indexedDB storage

var db;
var request = window.indexedDB.open("nightshade-db", 1);

request.onsuccess = function (e) {
  db = event.target.result;
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
console.log(qd);
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
var finished = false; // move into 'work' state if a task has been defined.

var worker;

if (qd.task != undefined) {
  document.getElementById('task').hidden = true;
  document.getElementById('timer').hidden = false;

  if (window.Worker) {
    if (worker == undefined) {
      worker = new Worker('worker.js');
      worker.postMessage(1000 * workspan * 60);
    }
  }
}

worker.onmessage = function (e) {
  if (e.data.finished != undefined) {// timer has finished...
  }

  if (e.data.minutes != undefined && e.data.seconds != undefined) {
    var nixie3 = document.getElementById('nixie3');
    var nixie2 = document.getElementById('nixie2');
    var nixie1 = document.getElementById('nixie1');
    var nixie0 = document.getElementById('nixie0');
    var minutes = e.data.minutes;
    var seconds = e.data.seconds;
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
/**
 * Starts a timer for the current task.
 * @param {number} amount - the amount of time in milliseconds
 */


function timer(amount) {
  document.getElementsByTagName('body').item(0).classList.remove('break');
  start = Date.now() + amount;
  t = setInterval(update, 1000);
  setTimeout(taskFinished, amount);
}
/**
 * Starts a timer for a break.
 * @param {number} amount - the amount of time in milliseconds
 */


function breather(amount) {
  document.getElementsByTagName('body').item(0).classList.add('break');
  start = Date.now() + amount;
  t = setInterval(update, 1000);
  setTimeout(function () {
    finished = true;
    notifiy('Breaks over');
    iteration++;
  }, amount + 1);
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

function update() {
  finished = false;
  var nixie3 = document.getElementById('nixie3');
  var nixie2 = document.getElementById('nixie2');
  var nixie1 = document.getElementById('nixie1');
  var nixie0 = document.getElementById('nixie0');
  var moment = start - Date.now();
  var minutes = Math.floor(moment / 1000 / 60);
  var seconds = Math.ceil((moment - minutes * 1000 * 60) / 1000) % 60;

  if (moment <= 0 && !finished) {
    clearInterval(t);
    finished = true;
    minutes = seconds = 0;
  }

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

function setNixie(nixie, value) {
  for (var i = 0; i < nixie.children.length; i++) {//nixie.children[i].classList.replace('active', '');
  }

  var numbers = nixie.getElementsByTagName('span');

  for (var _i = 0; _i < numbers.length; _i++) {
    numbers[_i].classList.remove('active');
  }

  nixie.getElementsByClassName(value).item(0).classList.add('active');
}

window.onclick = function () {
  if (!finished) return;
  if (iteration % 8 == 0) return breather(1000 * 2 * breakspan * 60); // ten minute timer
  else if (iteration % 2 == 0) return breather(1000 * breakspan * 60); // ten minute timer
    else return timer(1000 * workspan * 60); // ten minute timer
};

function notifiy(msg) {
  // Let's check whether notification permissions have already been granted
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(msg, {
      icon: './images/icon.png',
      requireInteraction: true,
      tag: 'task',
      renotify: true
    });

    notification.onclick = function () {
      parent.focus();
    };
  } // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        var _this = this;

        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(msg, {
            icon: './images/icon.png',
            requireInteraction: true,
            tag: 'task',
            renotify: true
          });

          notification.onclick = function () {
            parent.focus();

            _this.close();
          };
        }
      });
    }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2Nzcz82MTk4Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaGlkZGVuIiwic3RhcnQiLCJpdGVyYXRpb24iLCJ0IiwiZGIiLCJyZXF1ZXN0Iiwid2luZG93IiwiaW5kZXhlZERCIiwib3BlbiIsIm9uc3VjY2VzcyIsImUiLCJldmVudCIsInRhcmdldCIsInJlc3VsdCIsIm9udXBncmFkZW5lZWRlZCIsIm9iamVjdFN0b3JlIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJrZXlQYXRoIiwiY3JlYXRlSW5kZXgiLCJ1bmlxdWUiLCJxZCIsImxvY2F0aW9uIiwic2VhcmNoIiwic3Vic3RyIiwic3BsaXQiLCJmb3JFYWNoIiwiaXRlbSIsInMiLCJrIiwidiIsInJlcGxhY2VBbGwiLCJkZWNvZGVVUklDb21wb25lbnQiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsInJlcGxhY2UiLCJqb2luIiwid29ya3NwYW4iLCJ0aW1lciIsImJyZWFrc3BhbiIsImJyZWFrIiwiZmluaXNoZWQiLCJ3b3JrZXIiLCJ0YXNrIiwidW5kZWZpbmVkIiwiV29ya2VyIiwicG9zdE1lc3NhZ2UiLCJvbm1lc3NhZ2UiLCJkYXRhIiwibWludXRlcyIsInNlY29uZHMiLCJuaXhpZTMiLCJuaXhpZTIiLCJuaXhpZTEiLCJuaXhpZTAiLCJ0aXRsZSIsInRvTG9jYWxlU3RyaW5nIiwibWluaW11bUludGVnZXJEaWdpdHMiLCJzZXROaXhpZSIsIk1hdGgiLCJmbG9vciIsImFtb3VudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiRGF0ZSIsIm5vdyIsInNldEludGVydmFsIiwidXBkYXRlIiwic2V0VGltZW91dCIsInRhc2tGaW5pc2hlZCIsImJyZWF0aGVyIiwiYWRkIiwibm90aWZpeSIsInN0b3JlIiwidHJhbnNhY3Rpb24iLCJnZXQiLCJjb3VudCIsImNvbXBsZXRlZCIsInB1dCIsIm5hbWUiLCJtb21lbnQiLCJjZWlsIiwiY2xlYXJJbnRlcnZhbCIsIm5peGllIiwidmFsdWUiLCJpIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJudW1iZXJzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIm9uY2xpY2siLCJtc2ciLCJOb3RpZmljYXRpb24iLCJwZXJtaXNzaW9uIiwibm90aWZpY2F0aW9uIiwiaWNvbiIsInJlcXVpcmVJbnRlcmFjdGlvbiIsInRhZyIsInJlbm90aWZ5IiwicGFyZW50IiwiZm9jdXMiLCJyZXF1ZXN0UGVybWlzc2lvbiIsImNsb3NlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsdUM7Ozs7Ozs7Ozs7Ozs7O0FDQUE7O0FBRUE7Ozs7Ozs7O0FBU0FBLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixPQUF4QixFQUFpQ0MsTUFB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RSxtQkFBUjtBQUE2QkMsd0JBQWtCLEVBQUUsSUFBakQ7QUFBdURDLFNBQUcsRUFBRSxNQUE1RDtBQUFvRUMsY0FBUSxFQUFFO0FBQTlFLEtBQXRCLENBQW5COztBQUNBSixnQkFBWSxDQUFDSixPQUFiLEdBQXVCLFlBQU07QUFBRVMsWUFBTSxDQUFDQyxLQUFQO0FBQWlCLEtBQWhEO0FBRUgsR0FMRCxDQU9BO0FBUEEsT0FRSyxJQUFJUixZQUFZLENBQUNDLFVBQWIsS0FBNEIsUUFBaEMsRUFBMEM7QUFDM0NELGtCQUFZLENBQUNTLGlCQUFiLENBQStCLFVBQVVSLFVBQVYsRUFBc0I7QUFBQTs7QUFDakQ7QUFDQSxZQUFJQSxVQUFVLEtBQUssU0FBbkIsRUFBOEI7QUFDMUIsY0FBSUMsWUFBWSxHQUFHLElBQUlGLFlBQUosQ0FBaUJELEdBQWpCLEVBQXNCO0FBQUVJLGdCQUFJLEVBQUUsbUJBQVI7QUFBNkJDLDhCQUFrQixFQUFFLElBQWpEO0FBQXVEQyxlQUFHLEVBQUUsTUFBNUQ7QUFBb0VDLG9CQUFRLEVBQUU7QUFBOUUsV0FBdEIsQ0FBbkI7O0FBQ0FKLHNCQUFZLENBQUNKLE9BQWIsR0FBdUIsWUFBTTtBQUFFUyxrQkFBTSxDQUFDQyxLQUFQOztBQUFnQixpQkFBSSxDQUFDRSxLQUFMO0FBQWUsV0FBOUQ7QUFDSDtBQUNKLE9BTkQ7QUFPSDtBQUNKLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdFwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCAnLi8uLi9zY3NzL2FwcC5zY3NzJ1xyXG5cclxuLyoqXHJcbiAqIFRPRE86IHNhdmUgdGhlIGN1cnJlbnQgdGltZXIgdGltZSBiZXR3ZWVuIHJlZnJlc2hlc1xyXG4gKiBUT0RPOiBrZWVwIHRyYWNrIG9mIGhvdyBtYW55IG1pbnV0ZXMgZWFjaCB0YXNrJ3MgcG9tb2Rvcm8gd2FzXHJcbiAqIFRPRE86IGRpc3BsYXkgdGFzayBzdGF0c1xyXG4gKiBUT0RPOiBhbmQgYSAnZmluaXNoZWQnIHN0YXRlIGFmdGVyIHggcG9tb2Rvcm9zIHRvIHN0b3Agd29ya2luZy5cclxuICogVE9ETzogYWRkIGEgJ2NvbnRpbnVlJyBzdGF0ZSBhZnRlciB0aW1lciBmaW5pc2hlcyBiZWZvcmUgY29udGludWVpbmcuXHJcbiAqIFRPRE86IGFsbG93IG1vcmUgdGltZSB0byBiZSBhZGRlZCBmcm9tIG5vdGlmaWNhdGlvbiAoKzIgbWludXRlcykuXHJcbiAqL1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyJykuaGlkZGVuID0gdHJ1ZTtcclxudmFyIHN0YXJ0ID0gMDtcclxudmFyIGl0ZXJhdGlvbiA9IDE7XHJcbnZhciB0O1xyXG5cclxuXHJcbi8vIHRyeSB0byBvcGVuIHRoZSBpbmRleGVkREIgc3RvcmFnZVxyXG52YXIgZGI7XHJcbnZhciByZXF1ZXN0ID0gd2luZG93LmluZGV4ZWREQi5vcGVuKFwibmlnaHRzaGFkZS1kYlwiLCAxKTtcclxuXHJcbnJlcXVlc3Qub25zdWNjZXNzID0gKGUpID0+IHtcclxuICAgIGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxufVxyXG5cclxucmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRiID0gZS50YXJnZXQucmVzdWx0O1xyXG4gICAgbGV0IG9iamVjdFN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoXCJ0YXNrc1wiLCB7IGtleVBhdGg6IFwibmFtZVwiIH0pO1xyXG5cclxuICAgIG9iamVjdFN0b3JlLmNyZWF0ZUluZGV4KFwiY29tcGxldGVkXCIsXHJcbiAgICAgICAgXCJjb21wbGV0ZWRcIiwgeyB1bmlxdWU6IGZhbHNlIH0pO1xyXG59XHJcblxyXG5cclxuLy8gcGFyc2UgdGhlIHF1ZXJ5IHNlbGVjdG9yIGluIHRoZSB1cmxcclxudmFyIHFkID0ge307XHJcbmlmIChsb2NhdGlvbi5zZWFyY2gpIGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoXCImXCIpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHZhciBzID0gaXRlbS5zcGxpdChcIj1cIiksXHJcbiAgICAgICAgayA9IHNbMF0sXHJcbiAgICAgICAgdiA9IHNbMV0gJiYgcmVwbGFjZUFsbChkZWNvZGVVUklDb21wb25lbnQoc1sxXSksXHJcbiAgICAgICAgICAgIC9cXCsvLCBcIiBcIik7IC8vICBudWxsLWNvYWxlc2NpbmcgLyBzaG9ydC1jaXJjdWl0XHJcbiAgICAocWRba10gPSBxZFtrXSB8fCBbXSkucHVzaCh2KSAvLyBudWxsLWNvYWxlc2NpbmcgLyBzaG9ydC1jaXJjdWl0XHJcbn0pXHJcblxyXG5jb25zb2xlLmxvZyhxZClcclxuXHJcbi8qKlxyXG4gKiBSZXBsYWNlcyBhbGwgb2NjdXJlbmNlcyBvZiB0aGUgc2VhcmNoIHBhdHRlcm4gd2l0aCB0aGUgZ2l2ZW4gcmVwbGFjZW1lbnQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXQgdGhlIHN0cmluZyBvbiB3aXRjaCB0byBhcHBseSB0aGUgcmVwbGFjZW1lbnRzXHJcbiAqIEBwYXJhbSB7c3RyaW5nfFJlZ2V4fSBzZWFyY2ggdGhlIHBhdHRlcm4gdG8gcmVwbGFjZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVwbGFjZSB0aGUgcmVwbGFjZW1lbnQgdmFsdWUuXHJcbiAqL1xyXG5mdW5jdGlvbiByZXBsYWNlQWxsKHRhcmdldCwgc2VhcmNoLCByZXBsYWNlKSB7XHJcbiAgICByZXR1cm4gdGFyZ2V0LnNwbGl0KHNlYXJjaCkuam9pbihyZXBsYWNlKTtcclxufVxyXG5cclxuLy8gaW5pdGlhbGl6ZSBwcm9ncmFtIGFyZ3VtZW50cy5cclxuXHJcbnZhciB3b3Jrc3BhbiA9IHFkLnRpbWVyIHx8IDIwXHJcbnZhciBicmVha3NwYW4gPSBxZC5icmVhayB8fCA0XHJcbnZhciBmaW5pc2hlZCA9IGZhbHNlO1xyXG5cclxuLy8gbW92ZSBpbnRvICd3b3JrJyBzdGF0ZSBpZiBhIHRhc2sgaGFzIGJlZW4gZGVmaW5lZC5cclxuXHJcbnZhciB3b3JrZXI7XHJcblxyXG5pZiAocWQudGFzayAhPSB1bmRlZmluZWQpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrJykuaGlkZGVuID0gdHJ1ZTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lcicpLmhpZGRlbiA9IGZhbHNlO1xyXG5cclxuICAgIGlmICh3aW5kb3cuV29ya2VyKSB7XHJcbiAgICAgICAgaWYgKHdvcmtlciA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgd29ya2VyID0gbmV3IFdvcmtlcignd29ya2VyLmpzJyk7XHJcbiAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSgxMDAwICogd29ya3NwYW4gKiA2MClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbndvcmtlci5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgaWYgKGUuZGF0YS5maW5pc2hlZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAvLyB0aW1lciBoYXMgZmluaXNoZWQuLi5cclxuICAgIH1cclxuICAgIGlmIChlLmRhdGEubWludXRlcyAhPSB1bmRlZmluZWQgJiYgZS5kYXRhLnNlY29uZHMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGV0IG5peGllMyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduaXhpZTMnKTtcclxuICAgICAgICBsZXQgbml4aWUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25peGllMicpO1xyXG4gICAgICAgIGxldCBuaXhpZTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbml4aWUxJyk7XHJcbiAgICAgICAgbGV0IG5peGllMCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduaXhpZTAnKTtcclxuXHJcbiAgICAgICAgbGV0IG1pbnV0ZXMgPSBlLmRhdGEubWludXRlcztcclxuICAgICAgICBsZXQgc2Vjb25kcyA9IGUuZGF0YS5zZWNvbmRzO1xyXG5cclxuICAgICAgICBkb2N1bWVudC50aXRsZSA9IGAke21pbnV0ZXMudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAyIH0pfToke3NlY29uZHMudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAyIH0pfSAke3FkLnRhc2t9YDtcclxuXHJcbiAgICAgICAgc2V0Tml4aWUobml4aWUzLCBNYXRoLmZsb29yKG1pbnV0ZXMgLyAxMCkpO1xyXG4gICAgICAgIHNldE5peGllKG5peGllMiwgTWF0aC5mbG9vcihtaW51dGVzICUgMTApKTtcclxuICAgICAgICBzZXROaXhpZShuaXhpZTEsIE1hdGguZmxvb3Ioc2Vjb25kcyAvIDEwKSk7XHJcbiAgICAgICAgc2V0Tml4aWUobml4aWUwLCBNYXRoLmZsb29yKHNlY29uZHMgJSAxMCkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFN0YXJ0cyBhIHRpbWVyIGZvciB0aGUgY3VycmVudCB0YXNrLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kc1xyXG4gKi9cclxuZnVuY3Rpb24gdGltZXIoYW1vdW50KSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpLml0ZW0oMCkuY2xhc3NMaXN0LnJlbW92ZSgnYnJlYWsnKTtcclxuICAgIHN0YXJ0ID0gRGF0ZS5ub3coKSArIGFtb3VudDtcclxuICAgIHQgPSBzZXRJbnRlcnZhbCh1cGRhdGUsIDEwMDApO1xyXG4gICAgc2V0VGltZW91dCh0YXNrRmluaXNoZWQsIGFtb3VudCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdGFydHMgYSB0aW1lciBmb3IgYSBicmVhay5cclxuICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHNcclxuICovXHJcbmZ1bmN0aW9uIGJyZWF0aGVyKGFtb3VudCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApLmNsYXNzTGlzdC5hZGQoJ2JyZWFrJyk7XHJcbiAgICBzdGFydCA9IERhdGUubm93KCkgKyBhbW91bnQ7XHJcbiAgICB0ID0gc2V0SW50ZXJ2YWwodXBkYXRlLCAxMDAwKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcclxuICAgICAgICBub3RpZml5KCdCcmVha3Mgb3ZlcicpO1xyXG4gICAgICAgIGl0ZXJhdGlvbisrO1xyXG5cclxuICAgIH0sIGFtb3VudCArIDEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0YXNrRmluaXNoZWQoKSB7XHJcbiAgICBmaW5pc2hlZCA9IHRydWU7XHJcbiAgICBub3RpZml5KFwiVGltZXMgdXBcIilcclxuXHJcbiAgICBpdGVyYXRpb24rKztcclxuXHJcbiAgICBkb2N1bWVudC50aXRsZSA9IGBmaW5pc2hlZCAke3FkLnRhc2t9YDtcclxuXHJcbiAgICAvLyBpbmNyZW1lbnQgaG93IG1hbnkgdGltZXMgdGhpcyB0YXNrIHdhcyBjb21wbGV0ZWQgaW4gdGhlIGRhdGFiYXNlLlxyXG4gICAgbGV0IHN0b3JlID0gZGIudHJhbnNhY3Rpb24oXHJcbiAgICAgICAgWyd0YXNrcyddLCAncmVhZHdyaXRlJykub2JqZWN0U3RvcmUoJ3Rhc2tzJyk7XHJcblxyXG4gICAgc3RvcmUuZ2V0KHFkLnRhc2spLm9uc3VjY2VzcyA9IChlKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIHdhcyBhbiBleGlzdGluZyBjb3VudCBvdGhlcndpc2Ugc3RhcnQgYW5ldy5cclxuICAgICAgICBsZXQgY291bnQgPSAoZS50YXJnZXQucmVzdWx0ICYmIGUudGFyZ2V0LnJlc3VsdC5jb21wbGV0ZWQgfHwgMClcclxuICAgICAgICAgICAgfHwgMDtcclxuXHJcbiAgICAgICAgLy8gdXBkYXRlIHRoZSBkYXRhYmFzZSBjb3VudCBmb3IgdGhlIHRhc2tcclxuICAgICAgICBzdG9yZS5wdXQoeyBuYW1lOiBxZC50YXNrLCBjb21wbGV0ZWQ6IGNvdW50ICsgMSB9KTtcclxuICAgIH07XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICBmaW5pc2hlZCA9IGZhbHNlO1xyXG5cclxuICAgIGxldCBuaXhpZTMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbml4aWUzJyk7XHJcbiAgICBsZXQgbml4aWUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25peGllMicpO1xyXG4gICAgbGV0IG5peGllMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduaXhpZTEnKTtcclxuICAgIGxldCBuaXhpZTAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbml4aWUwJyk7XHJcblxyXG5cclxuICAgIGxldCBtb21lbnQgPSBzdGFydCAtIERhdGUubm93KCk7XHJcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IobW9tZW50IC8gMTAwMCAvIDYwKTtcclxuICAgIGxldCBzZWNvbmRzID0gTWF0aC5jZWlsKChtb21lbnQgLSAobWludXRlcyAqIDEwMDAgKiA2MCkpIC8gMTAwMCkgJSA2MDtcclxuXHJcblxyXG4gICAgaWYgKG1vbWVudCA8PSAwICYmICFmaW5pc2hlZCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodClcclxuICAgICAgICBmaW5pc2hlZCA9IHRydWVcclxuICAgICAgICBtaW51dGVzID0gc2Vjb25kcyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQudGl0bGUgPSBgJHttaW51dGVzLnRvTG9jYWxlU3RyaW5nKHVuZGVmaW5lZCwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMiB9KX06JHtzZWNvbmRzLnRvTG9jYWxlU3RyaW5nKHVuZGVmaW5lZCwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMiB9KX0gJHtxZC50YXNrfWA7XHJcblxyXG4gICAgc2V0Tml4aWUobml4aWUzLCBNYXRoLmZsb29yKG1pbnV0ZXMgLyAxMCkpO1xyXG4gICAgc2V0Tml4aWUobml4aWUyLCBNYXRoLmZsb29yKG1pbnV0ZXMgJSAxMCkpO1xyXG4gICAgc2V0Tml4aWUobml4aWUxLCBNYXRoLmZsb29yKHNlY29uZHMgLyAxMCkpO1xyXG4gICAgc2V0Tml4aWUobml4aWUwLCBNYXRoLmZsb29yKHNlY29uZHMgJSAxMCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXROaXhpZShuaXhpZSwgdmFsdWUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbml4aWUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvL25peGllLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZXBsYWNlKCdhY3RpdmUnLCAnJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGxldCBudW1iZXJzID0gbml4aWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG51bWJlcnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgICBuaXhpZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHZhbHVlKS5pdGVtKDApLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG59XHJcblxyXG5cclxud2luZG93Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICBpZiAoIWZpbmlzaGVkKSByZXR1cm47XHJcblxyXG4gICAgaWYgKGl0ZXJhdGlvbiAlIDggPT0gMClcclxuICAgICAgICByZXR1cm4gYnJlYXRoZXIoMTAwMCAqIDIgKiBicmVha3NwYW4gKiA2MCk7IC8vIHRlbiBtaW51dGUgdGltZXJcclxuICAgIGVsc2UgaWYgKGl0ZXJhdGlvbiAlIDIgPT0gMClcclxuICAgICAgICByZXR1cm4gYnJlYXRoZXIoMTAwMCAqIGJyZWFrc3BhbiAqIDYwKTsgLy8gdGVuIG1pbnV0ZSB0aW1lclxyXG4gICAgZWxzZSByZXR1cm4gdGltZXIoMTAwMCAqIHdvcmtzcGFuICogNjApOyAvLyB0ZW4gbWludXRlIHRpbWVyXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vdGlmaXkobXNnKSB7XHJcbiAgICAvLyBMZXQncyBjaGVjayB3aGV0aGVyIG5vdGlmaWNhdGlvbiBwZXJtaXNzaW9ucyBoYXZlIGFscmVhZHkgYmVlbiBncmFudGVkXHJcbiAgICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09IFwiZ3JhbnRlZFwiKSB7XHJcbiAgICAgICAgLy8gSWYgaXQncyBva2F5IGxldCdzIGNyZWF0ZSBhIG5vdGlmaWNhdGlvblxyXG4gICAgICAgIHZhciBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKG1zZywgeyBpY29uOiAnLi9pbWFnZXMvaWNvbi5wbmcnLCByZXF1aXJlSW50ZXJhY3Rpb246IHRydWUsIHRhZzogJ3Rhc2snLCByZW5vdGlmeTogdHJ1ZSB9KTtcclxuICAgICAgICBub3RpZmljYXRpb24ub25jbGljayA9ICgpID0+IHsgcGFyZW50LmZvY3VzKCk7IH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3RoZXJ3aXNlLCB3ZSBuZWVkIHRvIGFzayB0aGUgdXNlciBmb3IgcGVybWlzc2lvblxyXG4gICAgZWxzZSBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gIT09ICdkZW5pZWQnKSB7XHJcbiAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKGZ1bmN0aW9uIChwZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIGFjY2VwdHMsIGxldCdzIGNyZWF0ZSBhIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgICBpZiAocGVybWlzc2lvbiA9PT0gXCJncmFudGVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKG1zZywgeyBpY29uOiAnLi9pbWFnZXMvaWNvbi5wbmcnLCByZXF1aXJlSW50ZXJhY3Rpb246IHRydWUsIHRhZzogJ3Rhc2snLCByZW5vdGlmeTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5vbmNsaWNrID0gKCkgPT4geyBwYXJlbnQuZm9jdXMoKTsgdGhpcy5jbG9zZSgpOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9