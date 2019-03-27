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
document.getElementById('timer').style.visibility = 'hidden';
document.getElementById('task').style.visibility = 'hidden';
document.getElementById('progress').style.visibility = 'visible';
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
  document.getElementsByTagName('body').item(0).classList.remove('break');

  if (window.Worker && worker != undefined) {
    callback = function callback() {
      return document.getElementById('progress').innerText += " x";
    };

    worker.postMessage(amount * 1000 * 60);
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

Notification.requestPermission(function (status) {
  console.log('Notification permission status:', status);
});

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
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function (registration) {
      registration.showNotification('All done!', {
        tag: 'task',
        renotify: true,
        requireInteraction: true,
        icon: 'images/icon.png',
        image: 'https://static1.squarespace.com/static/53fccdc3e4b06d598890737d/54231dffe4b07bb558b1e0d2/54231e31e4b057212f157ec5/1517947886108/GINGERWHITECOFFEELAND.jpg'
      });
    });
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwidmlzaWJpbGl0eSIsIml0ZXJhdGlvbiIsImRiIiwicmVxdWVzdCIsIndpbmRvdyIsImluZGV4ZWREQiIsIm9wZW4iLCJvbnN1Y2Nlc3MiLCJlIiwiZXZlbnQiLCJ0YXJnZXQiLCJyZXN1bHQiLCJvbnVwZ3JhZGVuZWVkZWQiLCJvYmplY3RTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwia2V5UGF0aCIsImNyZWF0ZUluZGV4IiwidW5pcXVlIiwicWQiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsInNwbGl0IiwiZm9yRWFjaCIsIml0ZW0iLCJzIiwiayIsInYiLCJyZXBsYWNlQWxsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicHVzaCIsInJlcGxhY2UiLCJqb2luIiwid29ya3NwYW4iLCJ0aW1lciIsImJyZWFrc3BhbiIsImJyZWFrIiwiZmluaXNoZWQiLCJ3b3JrZXIiLCJXb3JrZXIiLCJ1bmRlZmluZWQiLCJvbmxvYWQiLCJ0YXNrIiwib25tZXNzYWdlIiwibWludXRlcyIsInNlY29uZHMiLCJkYXRhIiwibm90aWZpeSIsImNhbGxiYWNrIiwibml4aWUzIiwibml4aWUyIiwibml4aWUxIiwibml4aWUwIiwidGl0bGUiLCJ0b0xvY2FsZVN0cmluZyIsIm1pbmltdW1JbnRlZ2VyRGlnaXRzIiwic2V0Tml4aWUiLCJNYXRoIiwiZmxvb3IiLCJuYXZpZ2F0b3IiLCJjb25zb2xlIiwibG9nIiwic2VydmljZVdvcmtlciIsInJlZ2lzdGVyIiwidGhlbiIsInN3Iiwic2NvcGUiLCJlcnIiLCJhbW91bnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImlubmVyVGV4dCIsInBvc3RNZXNzYWdlIiwiYnJlYXRoZXIiLCJhZGQiLCJ0YXNrRmluaXNoZWQiLCJzdG9yZSIsInRyYW5zYWN0aW9uIiwiZ2V0IiwiY291bnQiLCJjb21wbGV0ZWQiLCJwdXQiLCJuYW1lIiwibml4aWUiLCJ2YWx1ZSIsIm51bWJlcnMiLCJpIiwibGVuZ3RoIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIk5vdGlmaWNhdGlvbiIsInJlcXVlc3RQZXJtaXNzaW9uIiwic3RhdHVzIiwiYmVnaW4iLCJvbmNsaWNrIiwib25rZXlwcmVzcyIsImtleSIsIm1zZyIsInBlcm1pc3Npb24iLCJnZXRSZWdpc3RyYXRpb24iLCJyZWdpc3RyYXRpb24iLCJzaG93Tm90aWZpY2F0aW9uIiwidGFnIiwicmVub3RpZnkiLCJyZXF1aXJlSW50ZXJhY3Rpb24iLCJpY29uIiwiaW1hZ2UiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSx1Qzs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7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OEJDLDBCQUFrQixFQUFFLElBQWxEO0FBQXdEQyxZQUFJLEVBQUUsaUJBQTlEO0FBQWlGQyxhQUFLLEVBQUU7QUFBeEYsT0FBM0M7QUFDSCxLQUZEO0FBR0g7QUFDSixDIiwiZmlsZSI6ImluZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0ICcuLy4uL3Njc3MvYXBwLnNjc3MnXHJcblxyXG4vKipcclxuICogVE9ETzogc2F2ZSB0aGUgY3VycmVudCB0aW1lciB0aW1lIGJldHdlZW4gcmVmcmVzaGVzXHJcbiAqIFRPRE86IGtlZXAgdHJhY2sgb2YgaG93IG1hbnkgbWludXRlcyBlYWNoIHRhc2sncyBwb21vZG9ybyB3YXNcclxuICogVE9ETzogZGlzcGxheSB0YXNrIHN0YXRzXHJcbiAqIFRPRE86IGFuZCBhICdmaW5pc2hlZCcgc3RhdGUgYWZ0ZXIgeCBwb21vZG9yb3MgdG8gc3RvcCB3b3JraW5nLlxyXG4gKiBUT0RPOiBhZGQgYSAnY29udGludWUnIHN0YXRlIGFmdGVyIHRpbWVyIGZpbmlzaGVzIGJlZm9yZSBjb250aW51ZWluZy5cclxuICogVE9ETzogYWxsb3cgbW9yZSB0aW1lIHRvIGJlIGFkZGVkIGZyb20gbm90aWZpY2F0aW9uICgrMiBtaW51dGVzKS5cclxuICovXHJcblxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyJykuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrJykuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcycpLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSdcclxuXHJcbnZhciBpdGVyYXRpb24gPSAxO1xyXG5cclxudmFyIGRiO1xyXG52YXIgcmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIub3BlbihcIm5pZ2h0c2hhZGUtZGJcIiwgMSk7XHJcblxyXG5yZXF1ZXN0Lm9uc3VjY2VzcyA9IChlKSA9PiB7XHJcbiAgICBkYiA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbn1cclxuXHJcbnJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGUpID0+IHtcclxuICAgIGxldCBkYiA9IGUudGFyZ2V0LnJlc3VsdDtcclxuICAgIGxldCBvYmplY3RTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKFwidGFza3NcIiwgeyBrZXlQYXRoOiBcIm5hbWVcIiB9KTtcclxuXHJcbiAgICBvYmplY3RTdG9yZS5jcmVhdGVJbmRleChcImNvbXBsZXRlZFwiLFxyXG4gICAgICAgIFwiY29tcGxldGVkXCIsIHsgdW5pcXVlOiBmYWxzZSB9KTtcclxufVxyXG5cclxuLy8gcGFyc2UgdGhlIHF1ZXJ5IHNlbGVjdG9yIGluIHRoZSB1cmxcclxudmFyIHFkID0ge307XHJcbmlmIChsb2NhdGlvbi5zZWFyY2gpIGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoXCImXCIpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHZhciBzID0gaXRlbS5zcGxpdChcIj1cIiksXHJcbiAgICAgICAgayA9IHNbMF0sXHJcbiAgICAgICAgdiA9IHNbMV0gJiYgcmVwbGFjZUFsbChkZWNvZGVVUklDb21wb25lbnQoc1sxXSksXHJcbiAgICAgICAgICAgIC9cXCsvLCBcIiBcIik7IC8vICBudWxsLWNvYWxlc2NpbmcgLyBzaG9ydC1jaXJjdWl0XHJcbiAgICAocWRba10gPSBxZFtrXSB8fCBbXSkucHVzaCh2KSAvLyBudWxsLWNvYWxlc2NpbmcgLyBzaG9ydC1jaXJjdWl0XHJcbn0pXHJcblxyXG4vKipcclxuICogUmVwbGFjZXMgYWxsIG9jY3VyZW5jZXMgb2YgdGhlIHNlYXJjaCBwYXR0ZXJuIHdpdGggdGhlIGdpdmVuIHJlcGxhY2VtZW50LlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFyZ2V0IHRoZSBzdHJpbmcgb24gd2l0Y2ggdG8gYXBwbHkgdGhlIHJlcGxhY2VtZW50c1xyXG4gKiBAcGFyYW0ge3N0cmluZ3xSZWdleH0gc2VhcmNoIHRoZSBwYXR0ZXJuIHRvIHJlcGxhY2VcclxuICogQHBhcmFtIHtzdHJpbmd9IHJlcGxhY2UgdGhlIHJlcGxhY2VtZW50IHZhbHVlLlxyXG4gKi9cclxuZnVuY3Rpb24gcmVwbGFjZUFsbCh0YXJnZXQsIHNlYXJjaCwgcmVwbGFjZSkge1xyXG4gICAgcmV0dXJuIHRhcmdldC5zcGxpdChzZWFyY2gpLmpvaW4ocmVwbGFjZSk7XHJcbn1cclxuXHJcbi8vIGluaXRpYWxpemUgcHJvZ3JhbSBhcmd1bWVudHMuXHJcblxyXG52YXIgd29ya3NwYW4gPSBxZC50aW1lciB8fCAyMFxyXG52YXIgYnJlYWtzcGFuID0gcWQuYnJlYWsgfHwgNFxyXG52YXIgZmluaXNoZWQgPSB0cnVlO1xyXG5cclxuLy8gbW92ZSBpbnRvICd3b3JrJyBzdGF0ZSBpZiBhIHRhc2sgaGFzIGJlZW4gZGVmaW5lZC5cclxuXHJcbnZhciB3b3JrZXI7XHJcblxyXG5pZiAod2luZG93Lldvcmtlcikge1xyXG4gICAgaWYgKHdvcmtlciA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB3b3JrZXIgPSBuZXcgV29ya2VyKCd3b3JrZXIuYnVuZGxlLmpzJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5vbmxvYWQgPSAoZSkgPT4ge1xyXG4gICAgaWYgKHFkLnRhc2sgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2snKS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyJykuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuXHJcbiAgICAgICAgaWYgKHdvcmtlcikgdGltZXIod29ya3NwYW4pXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2snKS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgfVxyXG59XHJcblxyXG53b3JrZXIub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBtaW51dGVzID0gMDtcclxuICAgIGxldCBzZWNvbmRzID0gMDtcclxuXHJcbiAgICBpZiAoZS5kYXRhLm1pbnV0ZXMgIT0gdW5kZWZpbmVkICYmIGUuZGF0YS5zZWNvbmRzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG1pbnV0ZXMgPSBlLmRhdGEubWludXRlcztcclxuICAgICAgICBzZWNvbmRzID0gZS5kYXRhLnNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGUuZGF0YS5maW5pc2hlZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBub3RpZml5KFwiVGltZXMgdXAhXCIpXHJcblxyXG4gICAgICAgIGZpbmlzaGVkID0gZS5kYXRhLmZpbmlzaGVkXHJcbiAgICAgICAgaXRlcmF0aW9uKys7XHJcblxyXG4gICAgICAgIGNhbGxiYWNrKCk7IC8vIGRvIHdoYXRldmVyIG5lZWRzIGRvaW5nIHdoZW4gdGhlIHRpbWVyIGV4cGlyZXMuLi5cclxuICAgIH1cclxuXHJcbiAgICBsZXQgbml4aWUzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25peGllMycpO1xyXG4gICAgbGV0IG5peGllMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduaXhpZTInKTtcclxuICAgIGxldCBuaXhpZTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbml4aWUxJyk7XHJcbiAgICBsZXQgbml4aWUwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25peGllMCcpO1xyXG5cclxuICAgIGRvY3VtZW50LnRpdGxlID0gYCR7bWludXRlcy50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDIgfSl9OiR7c2Vjb25kcy50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDIgfSl9ICR7cWQudGFza31gO1xyXG5cclxuICAgIHNldE5peGllKG5peGllMywgTWF0aC5mbG9vcihtaW51dGVzIC8gMTApKTtcclxuICAgIHNldE5peGllKG5peGllMiwgTWF0aC5mbG9vcihtaW51dGVzICUgMTApKTtcclxuICAgIHNldE5peGllKG5peGllMSwgTWF0aC5mbG9vcihzZWNvbmRzIC8gMTApKTtcclxuICAgIHNldE5peGllKG5peGllMCwgTWF0aC5mbG9vcihzZWNvbmRzICUgMTApKTtcclxufVxyXG5cclxuXHJcbmlmICgnc2VydmljZVdvcmtlcicgaW4gbmF2aWdhdG9yKSB7XHJcbiAgICBjb25zb2xlLmxvZygnc3cgc3VwcG9ydGVkJylcclxuICAgIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCdzdy5idW5kbGUuanMnKS50aGVuKChzdykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsIHdpdGggc2NvcGU6ICcsIHN3LnNjb3BlKTtcclxuICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAvLyByZWdpc3RyYXRpb24gZmFpbGVkIDooXHJcbiAgICAgICAgY29uc29sZS5sb2coJ1NlcnZpY2VXb3JrZXIgcmVnaXN0cmF0aW9uIGZhaWxlZDogJywgZXJyKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbnZhciBjYWxsYmFjayA9ICgpID0+IGNvbnNvbGUubG9nKCdub3RoaW5nIGhlcmUnKVxyXG5cclxuXHJcbi8qKlxyXG4gKiBTdGFydHMgYSB0aW1lciBmb3IgdGhlIGN1cnJlbnQgdGFzay5cclxuICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHNcclxuICovXHJcbmZ1bmN0aW9uIHRpbWVyKGFtb3VudCkge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKCdzdGFydGluZyB0aW1lcicpXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpLml0ZW0oMCkuY2xhc3NMaXN0LnJlbW92ZSgnYnJlYWsnKTtcclxuXHJcbiAgICBpZiAod2luZG93LldvcmtlciAmJiB3b3JrZXIgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSAoKSA9PiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3MnKS5pbm5lclRleHQgKz0gXCIgeFwiXHJcbiAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKGFtb3VudCAqIDEwMDAgKiA2MClcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFN0YXJ0cyBhIHRpbWVyIGZvciBhIGJyZWFrLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kc1xyXG4gKi9cclxuZnVuY3Rpb24gYnJlYXRoZXIoYW1vdW50KSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpLml0ZW0oMCkuY2xhc3NMaXN0LmFkZCgnYnJlYWsnKTtcclxuXHJcbiAgICBpZiAod2luZG93Lldvcmtlcikge1xyXG4gICAgICAgIGlmICh3b3JrZXIgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gKCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzJykuaW5uZXJUZXh0ICs9IFwiIG9cIlxyXG4gICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoYW1vdW50ICogMTAwMCAqIDYwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdGFza0ZpbmlzaGVkKCkge1xyXG4gICAgZmluaXNoZWQgPSB0cnVlO1xyXG4gICAgbm90aWZpeShcIlRpbWVzIHVwXCIpXHJcblxyXG4gICAgaXRlcmF0aW9uKys7XHJcblxyXG4gICAgZG9jdW1lbnQudGl0bGUgPSBgZmluaXNoZWQgJHtxZC50YXNrfWA7XHJcblxyXG4gICAgLy8gaW5jcmVtZW50IGhvdyBtYW55IHRpbWVzIHRoaXMgdGFzayB3YXMgY29tcGxldGVkIGluIHRoZSBkYXRhYmFzZS5cclxuICAgIGxldCBzdG9yZSA9IGRiLnRyYW5zYWN0aW9uKFxyXG4gICAgICAgIFsndGFza3MnXSwgJ3JlYWR3cml0ZScpLm9iamVjdFN0b3JlKCd0YXNrcycpO1xyXG5cclxuICAgIHN0b3JlLmdldChxZC50YXNrKS5vbnN1Y2Nlc3MgPSAoZSkgPT4ge1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSB3YXMgYW4gZXhpc3RpbmcgY291bnQgb3RoZXJ3aXNlIHN0YXJ0IGFuZXcuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gKGUudGFyZ2V0LnJlc3VsdCAmJiBlLnRhcmdldC5yZXN1bHQuY29tcGxldGVkIHx8IDApXHJcbiAgICAgICAgICAgIHx8IDA7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YWJhc2UgY291bnQgZm9yIHRoZSB0YXNrXHJcbiAgICAgICAgc3RvcmUucHV0KHsgbmFtZTogcWQudGFzaywgY29tcGxldGVkOiBjb3VudCArIDEgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXROaXhpZShuaXhpZSwgdmFsdWUpIHtcclxuICAgIGxldCBudW1iZXJzID0gbml4aWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG51bWJlcnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoMCA8PSB2YWx1ZSAmJiB2YWx1ZSA8PSA5KVxyXG4gICAgICAgIG5peGllLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodmFsdWUpLml0ZW0oMCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbn1cclxuXHJcbk5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihmdW5jdGlvbiAoc3RhdHVzKSB7XHJcbiAgICBjb25zb2xlLmxvZygnTm90aWZpY2F0aW9uIHBlcm1pc3Npb24gc3RhdHVzOicsIHN0YXR1cyk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gYmVnaW4oKSB7XHJcbiAgICBjb25zb2xlLmxvZyhmaW5pc2hlZClcclxuICAgIGlmICghZmluaXNoZWQpIHJldHVybjtcclxuXHJcbiAgICBpZiAoaXRlcmF0aW9uICUgOCA9PSAwKVxyXG4gICAgICAgIHJldHVybiBicmVhdGhlcigyICogYnJlYWtzcGFuKTsgLy8gdGVuIG1pbnV0ZSB0aW1lclxyXG4gICAgZWxzZSBpZiAoaXRlcmF0aW9uICUgMiA9PSAwKVxyXG4gICAgICAgIHJldHVybiBicmVhdGhlcihicmVha3NwYW4pOyAvLyB0ZW4gbWludXRlIHRpbWVyXHJcbiAgICBlbHNlIHJldHVybiB0aW1lcih3b3Jrc3Bhbik7IC8vIHRlbiBtaW51dGUgdGltZXJcclxufVxyXG5cclxud2luZG93Lm9uY2xpY2sgPSBiZWdpbjtcclxud2luZG93Lm9ua2V5cHJlc3MgPSAoZSkgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09ICcgJykgYmVnaW4oKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbm90aWZpeShtc2cpIHtcclxuICAgIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PSAnZ3JhbnRlZCcpIHtcclxuICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5nZXRSZWdpc3RyYXRpb24oKS50aGVuKHJlZ2lzdHJhdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIHJlZ2lzdHJhdGlvbi5zaG93Tm90aWZpY2F0aW9uKCdBbGwgZG9uZSEnLCB7dGFnOiAndGFzaycsIHJlbm90aWZ5OiB0cnVlLCByZXF1aXJlSW50ZXJhY3Rpb246IHRydWUsIGljb246ICdpbWFnZXMvaWNvbi5wbmcnLCBpbWFnZTogJ2h0dHBzOi8vc3RhdGljMS5zcXVhcmVzcGFjZS5jb20vc3RhdGljLzUzZmNjZGMzZTRiMDZkNTk4ODkwNzM3ZC81NDIzMWRmZmU0YjA3YmI1NThiMWUwZDIvNTQyMzFlMzFlNGIwNTcyMTJmMTU3ZWM1LzE1MTc5NDc4ODYxMDgvR0lOR0VSV0hJVEVDT0ZGRUVMQU5ELmpwZycgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=