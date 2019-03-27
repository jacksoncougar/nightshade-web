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
document.getElementById('timer').style.visibility = 'hidden';
document.getElementById('task').style.visibility = 'hidden';
document.getElementById('progress').style.visibility = 'hidden';
var iteration = 1;
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

if (qd.task != undefined) {
  document.getElementById('task').style.visibility = 'hidden';
  document.getElementById('timer').style.visibility = 'visible';
  if (worker) timer(workspan);
} else {
  document.getElementById('task').style.visibility = 'visible';
}

worker.onmessage = function (e) {
  var minutes = 0;
  var seconds = 0;

  if (e.data.minutes != undefined && e.data.seconds != undefined) {
    minutes = e.data.minutes;
    seconds = e.data.seconds;
  }

  if (e.data.finished != undefined) {
    notifiy("Times up!");
    finished = e.data.finished;
    iteration++;
    callback(); // do whatever needs doing when the timer expires...
  }

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
};

if (navigator.serviceWorker != undefined) {
  console.log('sw supported');
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.bundle.js').then(function (sw) {
      console.log('ServiceWorker registration successful with scope: ', sw.scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
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
  document.getElementsByTagName('body').item(0).classList.remove('break');

  if (window.Worker) {
    if (worker != undefined) {
      callback = function callback() {
        return document.getElementById('progress').innerText += " x";
      };

      worker.postMessage(amount * 1000 * 60);
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
      callback = function callback() {
        return document.getElementById('progress').innerText += " o";
      };

      worker.postMessage(amount * 1000 * 60);
    }
  }
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

function begin() {
  console.log(finished);
  if (!finished) return;
  if (iteration % 8 == 0) return breather(2 * breakspan); // ten minute timer
  else if (iteration % 2 == 0) return breather(breakspan); // ten minute timer
    else return timer(workspan); // ten minute timer
}

window.onclick = begin;

window.onkeypress = function (e) {
  if (e.key == ' ') begin();
};

function notifiy(msg) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    registrations[0].showNotification('Finished');
  });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2Nzcz82MTk4Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJ2aXNpYmlsaXR5IiwiaXRlcmF0aW9uIiwiZGIiLCJyZXF1ZXN0Iiwid2luZG93IiwiaW5kZXhlZERCIiwib3BlbiIsIm9uc3VjY2VzcyIsImUiLCJldmVudCIsInRhcmdldCIsInJlc3VsdCIsIm9udXBncmFkZW5lZWRlZCIsIm9iamVjdFN0b3JlIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJrZXlQYXRoIiwiY3JlYXRlSW5kZXgiLCJ1bmlxdWUiLCJxZCIsImxvY2F0aW9uIiwic2VhcmNoIiwic3Vic3RyIiwic3BsaXQiLCJmb3JFYWNoIiwiaXRlbSIsInMiLCJrIiwidiIsInJlcGxhY2VBbGwiLCJkZWNvZGVVUklDb21wb25lbnQiLCJwdXNoIiwicmVwbGFjZSIsImpvaW4iLCJ3b3Jrc3BhbiIsInRpbWVyIiwiYnJlYWtzcGFuIiwiYnJlYWsiLCJmaW5pc2hlZCIsIndvcmtlciIsIldvcmtlciIsInVuZGVmaW5lZCIsInRhc2siLCJvbm1lc3NhZ2UiLCJtaW51dGVzIiwic2Vjb25kcyIsImRhdGEiLCJub3RpZml5IiwiY2FsbGJhY2siLCJuaXhpZTMiLCJuaXhpZTIiLCJuaXhpZTEiLCJuaXhpZTAiLCJ0aXRsZSIsInRvTG9jYWxlU3RyaW5nIiwibWluaW11bUludGVnZXJEaWdpdHMiLCJzZXROaXhpZSIsIk1hdGgiLCJmbG9vciIsIm5hdmlnYXRvciIsInNlcnZpY2VXb3JrZXIiLCJjb25zb2xlIiwibG9nIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlZ2lzdGVyIiwidGhlbiIsInN3Iiwic2NvcGUiLCJlcnIiLCJhbW91bnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImlubmVyVGV4dCIsInBvc3RNZXNzYWdlIiwiYnJlYXRoZXIiLCJhZGQiLCJ0YXNrRmluaXNoZWQiLCJzdG9yZSIsInRyYW5zYWN0aW9uIiwiZ2V0IiwiY291bnQiLCJjb21wbGV0ZWQiLCJwdXQiLCJuYW1lIiwibml4aWUiLCJ2YWx1ZSIsIm51bWJlcnMiLCJpIiwibGVuZ3RoIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImJlZ2luIiwib25jbGljayIsIm9ua2V5cHJlc3MiLCJrZXkiLCJtc2ciLCJnZXRSZWdpc3RyYXRpb25zIiwicmVnaXN0cmF0aW9ucyIsInNob3dOb3RpZmljYXRpb24iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSx1Qzs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFFQTs7Ozs7Ozs7QUFVQUEsUUFBUSxDQUFDQyxjQUFULENBQXdCLE9BQXhCLEVBQWlDQyxLQUFqQyxDQUF1Q0MsVUFBdkMsR0FBb0QsUUFBcEQ7QUFDQUgsUUFB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LEtBQVQsR0FBaUI7QUFDYjlCLFNBQU8sQ0FBQ0MsR0FBUixDQUFZeEIsUUFBWjtBQUNBLE1BQUksQ0FBQ0EsUUFBTCxFQUFlO0FBRWYsTUFBSXBDLFNBQVMsR0FBRyxDQUFaLElBQWlCLENBQXJCLEVBQ0ksT0FBT3lFLFFBQVEsQ0FBQyxJQUFJdkMsU0FBTCxDQUFmLENBREosQ0FDb0M7QUFEcEMsT0FFSyxJQUFJbEMsU0FBUyxHQUFHLENBQVosSUFBaUIsQ0FBckIsRUFDRCxPQUFPeUUsUUFBUSxDQUFDdkMsU0FBRCxDQUFmLENBREMsQ0FDMkI7QUFEM0IsU0FFQSxPQUFPRCxLQUFLLENBQUNELFFBQUQsQ0FBWixDQVJRLENBUWdCO0FBQ2hDOztBQUVEN0IsTUFBTSxDQUFDdUYsT0FBUCxHQUFpQkQsS0FBakI7O0FBQ0F0RixNQUFNLENBQUN3RixVQUFQLEdBQW9CLFVBQUNwRixDQUFELEVBQU87QUFDdkIsTUFBSUEsQ0FBQyxDQUFDcUYsR0FBRixJQUFTLEdBQWIsRUFBa0JILEtBQUs7QUFDMUIsQ0FGRDs7QUFJQSxTQUFTNUMsT0FBVCxDQUFpQmdELEdBQWpCLEVBQXNCO0FBQ2xCcEMsV0FBUyxDQUFDQyxhQUFWLENBQXdCb0MsZ0JBQXhCLEdBQTJDL0IsSUFBM0MsQ0FBZ0QsVUFBVWdDLGFBQVYsRUFBeUI7QUFDckVBLGlCQUFhLENBQUMsQ0FBRCxDQUFiLENBQWlCQyxnQkFBakIsQ0FBa0MsVUFBbEM7QUFDSCxHQUZEO0FBR0gsQyIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0XCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0ICcuLy4uL3Njc3MvYXBwLnNjc3MnXHJcblxyXG4vKipcclxuICogVE9ETzogc2F2ZSB0aGUgY3VycmVudCB0aW1lciB0aW1lIGJldHdlZW4gcmVmcmVzaGVzXHJcbiAqIFRPRE86IGtlZXAgdHJhY2sgb2YgaG93IG1hbnkgbWludXRlcyBlYWNoIHRhc2sncyBwb21vZG9ybyB3YXNcclxuICogVE9ETzogZGlzcGxheSB0YXNrIHN0YXRzXHJcbiAqIFRPRE86IGFuZCBhICdmaW5pc2hlZCcgc3RhdGUgYWZ0ZXIgeCBwb21vZG9yb3MgdG8gc3RvcCB3b3JraW5nLlxyXG4gKiBUT0RPOiBhZGQgYSAnY29udGludWUnIHN0YXRlIGFmdGVyIHRpbWVyIGZpbmlzaGVzIGJlZm9yZSBjb250aW51ZWluZy5cclxuICogVE9ETzogYWxsb3cgbW9yZSB0aW1lIHRvIGJlIGFkZGVkIGZyb20gbm90aWZpY2F0aW9uICgrMiBtaW51dGVzKS5cclxuICovXHJcblxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyJykuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrJykuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcycpLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xyXG5cclxudmFyIGl0ZXJhdGlvbiA9IDE7XHJcblxyXG52YXIgZGI7XHJcbnZhciByZXF1ZXN0ID0gd2luZG93LmluZGV4ZWREQi5vcGVuKFwibmlnaHRzaGFkZS1kYlwiLCAxKTtcclxuXHJcbnJlcXVlc3Qub25zdWNjZXNzID0gKGUpID0+IHtcclxuICAgIGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxufVxyXG5cclxucmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRiID0gZS50YXJnZXQucmVzdWx0O1xyXG4gICAgbGV0IG9iamVjdFN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoXCJ0YXNrc1wiLCB7IGtleVBhdGg6IFwibmFtZVwiIH0pO1xyXG5cclxuICAgIG9iamVjdFN0b3JlLmNyZWF0ZUluZGV4KFwiY29tcGxldGVkXCIsXHJcbiAgICAgICAgXCJjb21wbGV0ZWRcIiwgeyB1bmlxdWU6IGZhbHNlIH0pO1xyXG59XHJcblxyXG4vLyBwYXJzZSB0aGUgcXVlcnkgc2VsZWN0b3IgaW4gdGhlIHVybFxyXG52YXIgcWQgPSB7fTtcclxuaWYgKGxvY2F0aW9uLnNlYXJjaCkgbG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5zcGxpdChcIiZcIikuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgdmFyIHMgPSBpdGVtLnNwbGl0KFwiPVwiKSxcclxuICAgICAgICBrID0gc1swXSxcclxuICAgICAgICB2ID0gc1sxXSAmJiByZXBsYWNlQWxsKGRlY29kZVVSSUNvbXBvbmVudChzWzFdKSxcclxuICAgICAgICAgICAgL1xcKy8sIFwiIFwiKTsgLy8gIG51bGwtY29hbGVzY2luZyAvIHNob3J0LWNpcmN1aXRcclxuICAgIChxZFtrXSA9IHFkW2tdIHx8IFtdKS5wdXNoKHYpIC8vIG51bGwtY29hbGVzY2luZyAvIHNob3J0LWNpcmN1aXRcclxufSlcclxuXHJcbi8qKlxyXG4gKiBSZXBsYWNlcyBhbGwgb2NjdXJlbmNlcyBvZiB0aGUgc2VhcmNoIHBhdHRlcm4gd2l0aCB0aGUgZ2l2ZW4gcmVwbGFjZW1lbnQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXQgdGhlIHN0cmluZyBvbiB3aXRjaCB0byBhcHBseSB0aGUgcmVwbGFjZW1lbnRzXHJcbiAqIEBwYXJhbSB7c3RyaW5nfFJlZ2V4fSBzZWFyY2ggdGhlIHBhdHRlcm4gdG8gcmVwbGFjZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVwbGFjZSB0aGUgcmVwbGFjZW1lbnQgdmFsdWUuXHJcbiAqL1xyXG5mdW5jdGlvbiByZXBsYWNlQWxsKHRhcmdldCwgc2VhcmNoLCByZXBsYWNlKSB7XHJcbiAgICByZXR1cm4gdGFyZ2V0LnNwbGl0KHNlYXJjaCkuam9pbihyZXBsYWNlKTtcclxufVxyXG5cclxuLy8gaW5pdGlhbGl6ZSBwcm9ncmFtIGFyZ3VtZW50cy5cclxuXHJcbnZhciB3b3Jrc3BhbiA9IHFkLnRpbWVyIHx8IDIwXHJcbnZhciBicmVha3NwYW4gPSBxZC5icmVhayB8fCA0XHJcbnZhciBmaW5pc2hlZCA9IHRydWU7XHJcblxyXG4vLyBtb3ZlIGludG8gJ3dvcmsnIHN0YXRlIGlmIGEgdGFzayBoYXMgYmVlbiBkZWZpbmVkLlxyXG5cclxudmFyIHdvcmtlcjtcclxuXHJcbmlmICh3aW5kb3cuV29ya2VyKSB7XHJcbiAgICBpZiAod29ya2VyID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHdvcmtlciA9IG5ldyBXb3JrZXIoJ3dvcmtlci5idW5kbGUuanMnKTtcclxuICAgIH1cclxufVxyXG5cclxuaWYgKHFkLnRhc2sgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzaycpLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lcicpLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcblxyXG4gICAgaWYod29ya2VyKSAgICB0aW1lcih3b3Jrc3BhbilcclxufVxyXG5lbHNlXHJcbntcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzaycpLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbn1cclxuXHJcbndvcmtlci5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgbGV0IG1pbnV0ZXMgPSAwO1xyXG4gICAgbGV0IHNlY29uZHMgPSAwO1xyXG5cclxuICAgIGlmIChlLmRhdGEubWludXRlcyAhPSB1bmRlZmluZWQgJiYgZS5kYXRhLnNlY29uZHMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbWludXRlcyA9IGUuZGF0YS5taW51dGVzO1xyXG4gICAgICAgIHNlY29uZHMgPSBlLmRhdGEuc2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZS5kYXRhLmZpbmlzaGVkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG5vdGlmaXkoXCJUaW1lcyB1cCFcIilcclxuXHJcbiAgICAgICAgZmluaXNoZWQgPSBlLmRhdGEuZmluaXNoZWRcclxuICAgICAgICBpdGVyYXRpb24rKztcclxuXHJcbiAgICAgICAgY2FsbGJhY2soKTsgLy8gZG8gd2hhdGV2ZXIgbmVlZHMgZG9pbmcgd2hlbiB0aGUgdGltZXIgZXhwaXJlcy4uLlxyXG4gICAgfVxyXG5cclxuICAgIGxldCBuaXhpZTMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbml4aWUzJyk7XHJcbiAgICBsZXQgbml4aWUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25peGllMicpO1xyXG4gICAgbGV0IG5peGllMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduaXhpZTEnKTtcclxuICAgIGxldCBuaXhpZTAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbml4aWUwJyk7XHJcblxyXG4gICAgZG9jdW1lbnQudGl0bGUgPSBgJHttaW51dGVzLnRvTG9jYWxlU3RyaW5nKHVuZGVmaW5lZCwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMiB9KX06JHtzZWNvbmRzLnRvTG9jYWxlU3RyaW5nKHVuZGVmaW5lZCwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMiB9KX0gJHtxZC50YXNrfWA7XHJcblxyXG4gICAgc2V0Tml4aWUobml4aWUzLCBNYXRoLmZsb29yKG1pbnV0ZXMgLyAxMCkpO1xyXG4gICAgc2V0Tml4aWUobml4aWUyLCBNYXRoLmZsb29yKG1pbnV0ZXMgJSAxMCkpO1xyXG4gICAgc2V0Tml4aWUobml4aWUxLCBNYXRoLmZsb29yKHNlY29uZHMgLyAxMCkpO1xyXG4gICAgc2V0Tml4aWUobml4aWUwLCBNYXRoLmZsb29yKHNlY29uZHMgJSAxMCkpO1xyXG59XHJcblxyXG5cclxuaWYgKG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgY29uc29sZS5sb2coJ3N3IHN1cHBvcnRlZCcpXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignLi9zdy5idW5kbGUuanMnKS50aGVuKChzdykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCB3aXRoIHNjb3BlOiAnLCBzdy5zY29wZSk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAvLyByZWdpc3RyYXRpb24gZmFpbGVkIDooXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBmYWlsZWQ6ICcsIGVycik7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbnZhciBjYWxsYmFjayA9ICgpID0+IGNvbnNvbGUubG9nKCdub3RoaW5nIGhlcmUnKVxyXG5cclxuXHJcbi8qKlxyXG4gKiBTdGFydHMgYSB0aW1lciBmb3IgdGhlIGN1cnJlbnQgdGFzay5cclxuICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHNcclxuICovXHJcbmZ1bmN0aW9uIHRpbWVyKGFtb3VudCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApLmNsYXNzTGlzdC5yZW1vdmUoJ2JyZWFrJyk7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5Xb3JrZXIpIHtcclxuICAgICAgICBpZiAod29ya2VyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9ICgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcycpLmlubmVyVGV4dCArPSBcIiB4XCJcclxuICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKGFtb3VudCAqIDEwMDAgKiA2MClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdGFydHMgYSB0aW1lciBmb3IgYSBicmVhay5cclxuICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHNcclxuICovXHJcbmZ1bmN0aW9uIGJyZWF0aGVyKGFtb3VudCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApLmNsYXNzTGlzdC5hZGQoJ2JyZWFrJyk7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5Xb3JrZXIpIHtcclxuICAgICAgICBpZiAod29ya2VyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9ICgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcycpLmlubmVyVGV4dCArPSBcIiBvXCJcclxuICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKGFtb3VudCAqIDEwMDAgKiA2MClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tGaW5pc2hlZCgpIHtcclxuICAgIGZpbmlzaGVkID0gdHJ1ZTtcclxuICAgIG5vdGlmaXkoXCJUaW1lcyB1cFwiKVxyXG5cclxuICAgIGl0ZXJhdGlvbisrO1xyXG5cclxuICAgIGRvY3VtZW50LnRpdGxlID0gYGZpbmlzaGVkICR7cWQudGFza31gO1xyXG5cclxuICAgIC8vIGluY3JlbWVudCBob3cgbWFueSB0aW1lcyB0aGlzIHRhc2sgd2FzIGNvbXBsZXRlZCBpbiB0aGUgZGF0YWJhc2UuXHJcbiAgICBsZXQgc3RvcmUgPSBkYi50cmFuc2FjdGlvbihcclxuICAgICAgICBbJ3Rhc2tzJ10sICdyZWFkd3JpdGUnKS5vYmplY3RTdG9yZSgndGFza3MnKTtcclxuXHJcbiAgICBzdG9yZS5nZXQocWQudGFzaykub25zdWNjZXNzID0gKGUpID0+IHtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgd2FzIGFuIGV4aXN0aW5nIGNvdW50IG90aGVyd2lzZSBzdGFydCBhbmV3LlxyXG4gICAgICAgIGxldCBjb3VudCA9IChlLnRhcmdldC5yZXN1bHQgJiYgZS50YXJnZXQucmVzdWx0LmNvbXBsZXRlZCB8fCAwKVxyXG4gICAgICAgICAgICB8fCAwO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGRhdGFiYXNlIGNvdW50IGZvciB0aGUgdGFza1xyXG4gICAgICAgIHN0b3JlLnB1dCh7IG5hbWU6IHFkLnRhc2ssIGNvbXBsZXRlZDogY291bnQgKyAxIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Tml4aWUobml4aWUsIHZhbHVlKSB7XHJcbiAgICBsZXQgbnVtYmVycyA9IG5peGllLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBudW1iZXJzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG4gICAgaWYgKDAgPD0gdmFsdWUgJiYgdmFsdWUgPD0gOSlcclxuICAgICAgICBuaXhpZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHZhbHVlKS5pdGVtKDApLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGJlZ2luKCkge1xyXG4gICAgY29uc29sZS5sb2coZmluaXNoZWQpXHJcbiAgICBpZiAoIWZpbmlzaGVkKSByZXR1cm47XHJcblxyXG4gICAgaWYgKGl0ZXJhdGlvbiAlIDggPT0gMClcclxuICAgICAgICByZXR1cm4gYnJlYXRoZXIoMiAqIGJyZWFrc3Bhbik7IC8vIHRlbiBtaW51dGUgdGltZXJcclxuICAgIGVsc2UgaWYgKGl0ZXJhdGlvbiAlIDIgPT0gMClcclxuICAgICAgICByZXR1cm4gYnJlYXRoZXIoYnJlYWtzcGFuKTsgLy8gdGVuIG1pbnV0ZSB0aW1lclxyXG4gICAgZWxzZSByZXR1cm4gdGltZXIod29ya3NwYW4pOyAvLyB0ZW4gbWludXRlIHRpbWVyXHJcbn1cclxuXHJcbndpbmRvdy5vbmNsaWNrID0gYmVnaW47XHJcbndpbmRvdy5vbmtleXByZXNzID0gKGUpID0+IHtcclxuICAgIGlmIChlLmtleSA9PSAnICcpIGJlZ2luKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vdGlmaXkobXNnKSB7XHJcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5nZXRSZWdpc3RyYXRpb25zKCkudGhlbihmdW5jdGlvbiAocmVnaXN0cmF0aW9ucykge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbnNbMF0uc2hvd05vdGlmaWNhdGlvbignRmluaXNoZWQnKTtcclxuICAgIH0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=