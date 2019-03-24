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
      worker = new Worker('worker.bundle.js');
      worker.postMessage(1000 * workspan * 60);
    }
  }
}

worker.onmessage = function (e) {
  var minutes = 0;
  var seconds = 0;

  if (e.data.finished != undefined) {
    // timer has finished...
    notifiy("Times up!");
    finished = e.data.finished;
  } else if (e.data.minutes != undefined && e.data.seconds != undefined) {
    minutes = e.data.minutes;
    seconds = e.data.seconds;
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
/**
 * Starts a timer for the current task.
 * @param {number} amount - the amount of time in milliseconds
 */


function timer(amount) {
  document.getElementsByTagName('body').item(0).classList.remove('break');

  if (window.Worker) {
    if (worker != undefined) {
      worker.postMessage(amount);
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
      worker.postMessage(amount);
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
  for (var i = 0; i < nixie.children.length; i++) {//nixie.children[i].classList.replace('active', '');
  }

  var numbers = nixie.getElementsByTagName('span');

  for (var _i = 0; _i < numbers.length; _i++) {
    numbers[_i].classList.remove('active');
  }

  nixie.getElementsByClassName(value).item(0).classList.add('active');
}

window.onclick = function () {
  console.log(finished);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImhpZGRlbiIsInN0YXJ0IiwiaXRlcmF0aW9uIiwidCIsImRiIiwicmVxdWVzdCIsIndpbmRvdyIsImluZGV4ZWREQiIsIm9wZW4iLCJvbnN1Y2Nlc3MiLCJlIiwiZXZlbnQiLCJ0YXJnZXQiLCJyZXN1bHQiLCJvbnVwZ3JhZGVuZWVkZWQiLCJvYmplY3RTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwia2V5UGF0aCIsImNyZWF0ZUluZGV4IiwidW5pcXVlIiwicWQiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsInNwbGl0IiwiZm9yRWFjaCIsIml0ZW0iLCJzIiwiayIsInYiLCJyZXBsYWNlQWxsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJyZXBsYWNlIiwiam9pbiIsIndvcmtzcGFuIiwidGltZXIiLCJicmVha3NwYW4iLCJicmVhayIsImZpbmlzaGVkIiwid29ya2VyIiwidGFzayIsInVuZGVmaW5lZCIsIldvcmtlciIsInBvc3RNZXNzYWdlIiwib25tZXNzYWdlIiwibWludXRlcyIsInNlY29uZHMiLCJkYXRhIiwibm90aWZpeSIsIm5peGllMyIsIm5peGllMiIsIm5peGllMSIsIm5peGllMCIsInRpdGxlIiwidG9Mb2NhbGVTdHJpbmciLCJtaW5pbXVtSW50ZWdlckRpZ2l0cyIsInNldE5peGllIiwiTWF0aCIsImZsb29yIiwiYW1vdW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJicmVhdGhlciIsImFkZCIsInRhc2tGaW5pc2hlZCIsInN0b3JlIiwidHJhbnNhY3Rpb24iLCJnZXQiLCJjb3VudCIsImNvbXBsZXRlZCIsInB1dCIsIm5hbWUiLCJuaXhpZSIsInZhbHVlIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwibnVtYmVycyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvbmNsaWNrIiwibXNnIiwiTm90aWZpY2F0aW9uIiwicGVybWlzc2lvbiIsIm5vdGlmaWNhdGlvbiIsImljb24iLCJyZXF1aXJlSW50ZXJhY3Rpb24iLCJ0YWciLCJyZW5vdGlmeSIsInBhcmVudCIsImZvY3VzIiwicmVxdWVzdFBlcm1pc3Npb24iLCJjbG9zZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLHVDOzs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUVBOzs7Ozs7OztBQVNBQSxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUNDLE1BQWpDLEdBQTBDLElBQTFDO0FBQ0EsSUFBSUMsS0FBSyxHQUFHLENBQVo7QUFDQSxJQUFJQyxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxJQUFJQyxDQUFKLEMs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QUFHLElBQUlGLFlBQUosQ0FBaUJELEdBQWpCLEVBQXNCO0FBQUVJLGdCQUFJLEVBQUUsbUJBQVI7QUFBNkJDLDhCQUFrQixFQUFFLElBQWpEO0FBQXVEQyxlQUFHLEVBQUUsTUFBNUQ7QUFBb0VDLG9CQUFRLEVBQUU7QUFBOUUsV0FBdEIsQ0FBbkI7O0FBQ0FKLHNCQUFZLENBQUNKLE9BQWIsR0FBdUIsWUFBTTtBQUFFUyxrQkFBTSxDQUFDQyxLQUFQOztBQUFnQixpQkFBSSxDQUFDRSxLQUFMO0FBQWUsV0FBOUQ7QUFDSDtBQUNKLE9BTkQ7QUFPSDtBQUNKLEMiLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdFwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCAnLi8uLi9zY3NzL2FwcC5zY3NzJ1xyXG5cclxuLyoqXHJcbiAqIFRPRE86IHNhdmUgdGhlIGN1cnJlbnQgdGltZXIgdGltZSBiZXR3ZWVuIHJlZnJlc2hlc1xyXG4gKiBUT0RPOiBrZWVwIHRyYWNrIG9mIGhvdyBtYW55IG1pbnV0ZXMgZWFjaCB0YXNrJ3MgcG9tb2Rvcm8gd2FzXHJcbiAqIFRPRE86IGRpc3BsYXkgdGFzayBzdGF0c1xyXG4gKiBUT0RPOiBhbmQgYSAnZmluaXNoZWQnIHN0YXRlIGFmdGVyIHggcG9tb2Rvcm9zIHRvIHN0b3Agd29ya2luZy5cclxuICogVE9ETzogYWRkIGEgJ2NvbnRpbnVlJyBzdGF0ZSBhZnRlciB0aW1lciBmaW5pc2hlcyBiZWZvcmUgY29udGludWVpbmcuXHJcbiAqIFRPRE86IGFsbG93IG1vcmUgdGltZSB0byBiZSBhZGRlZCBmcm9tIG5vdGlmaWNhdGlvbiAoKzIgbWludXRlcykuXHJcbiAqL1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyJykuaGlkZGVuID0gdHJ1ZTtcclxudmFyIHN0YXJ0ID0gMDtcclxudmFyIGl0ZXJhdGlvbiA9IDE7XHJcbnZhciB0O1xyXG5cclxuXHJcbi8vIHRyeSB0byBvcGVuIHRoZSBpbmRleGVkREIgc3RvcmFnZVxyXG52YXIgZGI7XHJcbnZhciByZXF1ZXN0ID0gd2luZG93LmluZGV4ZWREQi5vcGVuKFwibmlnaHRzaGFkZS1kYlwiLCAxKTtcclxuXHJcbnJlcXVlc3Qub25zdWNjZXNzID0gKGUpID0+IHtcclxuICAgIGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxufVxyXG5cclxucmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRiID0gZS50YXJnZXQucmVzdWx0O1xyXG4gICAgbGV0IG9iamVjdFN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoXCJ0YXNrc1wiLCB7IGtleVBhdGg6IFwibmFtZVwiIH0pO1xyXG5cclxuICAgIG9iamVjdFN0b3JlLmNyZWF0ZUluZGV4KFwiY29tcGxldGVkXCIsXHJcbiAgICAgICAgXCJjb21wbGV0ZWRcIiwgeyB1bmlxdWU6IGZhbHNlIH0pO1xyXG59XHJcblxyXG5cclxuLy8gcGFyc2UgdGhlIHF1ZXJ5IHNlbGVjdG9yIGluIHRoZSB1cmxcclxudmFyIHFkID0ge307XHJcbmlmIChsb2NhdGlvbi5zZWFyY2gpIGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoXCImXCIpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHZhciBzID0gaXRlbS5zcGxpdChcIj1cIiksXHJcbiAgICAgICAgayA9IHNbMF0sXHJcbiAgICAgICAgdiA9IHNbMV0gJiYgcmVwbGFjZUFsbChkZWNvZGVVUklDb21wb25lbnQoc1sxXSksXHJcbiAgICAgICAgICAgIC9cXCsvLCBcIiBcIik7IC8vICBudWxsLWNvYWxlc2NpbmcgLyBzaG9ydC1jaXJjdWl0XHJcbiAgICAocWRba10gPSBxZFtrXSB8fCBbXSkucHVzaCh2KSAvLyBudWxsLWNvYWxlc2NpbmcgLyBzaG9ydC1jaXJjdWl0XHJcbn0pXHJcblxyXG5jb25zb2xlLmxvZyhxZClcclxuXHJcbi8qKlxyXG4gKiBSZXBsYWNlcyBhbGwgb2NjdXJlbmNlcyBvZiB0aGUgc2VhcmNoIHBhdHRlcm4gd2l0aCB0aGUgZ2l2ZW4gcmVwbGFjZW1lbnQuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0YXJnZXQgdGhlIHN0cmluZyBvbiB3aXRjaCB0byBhcHBseSB0aGUgcmVwbGFjZW1lbnRzXHJcbiAqIEBwYXJhbSB7c3RyaW5nfFJlZ2V4fSBzZWFyY2ggdGhlIHBhdHRlcm4gdG8gcmVwbGFjZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVwbGFjZSB0aGUgcmVwbGFjZW1lbnQgdmFsdWUuXHJcbiAqL1xyXG5mdW5jdGlvbiByZXBsYWNlQWxsKHRhcmdldCwgc2VhcmNoLCByZXBsYWNlKSB7XHJcbiAgICByZXR1cm4gdGFyZ2V0LnNwbGl0KHNlYXJjaCkuam9pbihyZXBsYWNlKTtcclxufVxyXG5cclxuLy8gaW5pdGlhbGl6ZSBwcm9ncmFtIGFyZ3VtZW50cy5cclxuXHJcbnZhciB3b3Jrc3BhbiA9IHFkLnRpbWVyIHx8IDIwXHJcbnZhciBicmVha3NwYW4gPSBxZC5icmVhayB8fCA0XHJcbnZhciBmaW5pc2hlZCA9IGZhbHNlO1xyXG5cclxuLy8gbW92ZSBpbnRvICd3b3JrJyBzdGF0ZSBpZiBhIHRhc2sgaGFzIGJlZW4gZGVmaW5lZC5cclxuXHJcbnZhciB3b3JrZXI7XHJcblxyXG5pZiAocWQudGFzayAhPSB1bmRlZmluZWQpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrJykuaGlkZGVuID0gdHJ1ZTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lcicpLmhpZGRlbiA9IGZhbHNlO1xyXG5cclxuICAgIGlmICh3aW5kb3cuV29ya2VyKSB7XHJcbiAgICAgICAgaWYgKHdvcmtlciA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgd29ya2VyID0gbmV3IFdvcmtlcignd29ya2VyLmJ1bmRsZS5qcycpO1xyXG4gICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoMTAwMCAqIHdvcmtzcGFuICogNjApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53b3JrZXIub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBtaW51dGVzID0gMDtcclxuICAgIGxldCBzZWNvbmRzID0gMDtcclxuXHJcbiAgICBpZiAoZS5kYXRhLmZpbmlzaGVkICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vIHRpbWVyIGhhcyBmaW5pc2hlZC4uLlxyXG4gICAgICAgIG5vdGlmaXkoXCJUaW1lcyB1cCFcIilcclxuICAgICAgICBmaW5pc2hlZCA9IGUuZGF0YS5maW5pc2hlZFxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZS5kYXRhLm1pbnV0ZXMgIT0gdW5kZWZpbmVkICYmIGUuZGF0YS5zZWNvbmRzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG1pbnV0ZXMgPSBlLmRhdGEubWludXRlcztcclxuICAgICAgICBzZWNvbmRzID0gZS5kYXRhLnNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG5peGllMyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduaXhpZTMnKTtcclxuICAgIGxldCBuaXhpZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbml4aWUyJyk7XHJcbiAgICBsZXQgbml4aWUxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25peGllMScpO1xyXG4gICAgbGV0IG5peGllMCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduaXhpZTAnKTtcclxuXHJcbiAgICBkb2N1bWVudC50aXRsZSA9IGAke21pbnV0ZXMudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAyIH0pfToke3NlY29uZHMudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAyIH0pfSAke3FkLnRhc2t9YDtcclxuXHJcbiAgICBzZXROaXhpZShuaXhpZTMsIE1hdGguZmxvb3IobWludXRlcyAvIDEwKSk7XHJcbiAgICBzZXROaXhpZShuaXhpZTIsIE1hdGguZmxvb3IobWludXRlcyAlIDEwKSk7XHJcbiAgICBzZXROaXhpZShuaXhpZTEsIE1hdGguZmxvb3Ioc2Vjb25kcyAvIDEwKSk7XHJcbiAgICBzZXROaXhpZShuaXhpZTAsIE1hdGguZmxvb3Ioc2Vjb25kcyAlIDEwKSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogU3RhcnRzIGEgdGltZXIgZm9yIHRoZSBjdXJyZW50IHRhc2suXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIHRpbWUgaW4gbWlsbGlzZWNvbmRzXHJcbiAqLyBcclxuZnVuY3Rpb24gdGltZXIoYW1vdW50KSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpLml0ZW0oMCkuY2xhc3NMaXN0LnJlbW92ZSgnYnJlYWsnKTtcclxuICAgIFxyXG4gICAgaWYgKHdpbmRvdy5Xb3JrZXIpIHtcclxuICAgICAgICBpZiAod29ya2VyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoYW1vdW50KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFN0YXJ0cyBhIHRpbWVyIGZvciBhIGJyZWFrLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kc1xyXG4gKi9cclxuZnVuY3Rpb24gYnJlYXRoZXIoYW1vdW50KSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpLml0ZW0oMCkuY2xhc3NMaXN0LmFkZCgnYnJlYWsnKTtcclxuICAgIFxyXG4gICAgaWYgKHdpbmRvdy5Xb3JrZXIpIHtcclxuICAgICAgICBpZiAod29ya2VyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoYW1vdW50KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdGFza0ZpbmlzaGVkKCkge1xyXG4gICAgZmluaXNoZWQgPSB0cnVlO1xyXG4gICAgbm90aWZpeShcIlRpbWVzIHVwXCIpXHJcblxyXG4gICAgaXRlcmF0aW9uKys7XHJcblxyXG4gICAgZG9jdW1lbnQudGl0bGUgPSBgZmluaXNoZWQgJHtxZC50YXNrfWA7XHJcblxyXG4gICAgLy8gaW5jcmVtZW50IGhvdyBtYW55IHRpbWVzIHRoaXMgdGFzayB3YXMgY29tcGxldGVkIGluIHRoZSBkYXRhYmFzZS5cclxuICAgIGxldCBzdG9yZSA9IGRiLnRyYW5zYWN0aW9uKFxyXG4gICAgICAgIFsndGFza3MnXSwgJ3JlYWR3cml0ZScpLm9iamVjdFN0b3JlKCd0YXNrcycpO1xyXG5cclxuICAgIHN0b3JlLmdldChxZC50YXNrKS5vbnN1Y2Nlc3MgPSAoZSkgPT4ge1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSB3YXMgYW4gZXhpc3RpbmcgY291bnQgb3RoZXJ3aXNlIHN0YXJ0IGFuZXcuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gKGUudGFyZ2V0LnJlc3VsdCAmJiBlLnRhcmdldC5yZXN1bHQuY29tcGxldGVkIHx8IDApXHJcbiAgICAgICAgICAgIHx8IDA7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YWJhc2UgY291bnQgZm9yIHRoZSB0YXNrXHJcbiAgICAgICAgc3RvcmUucHV0KHsgbmFtZTogcWQudGFzaywgY29tcGxldGVkOiBjb3VudCArIDEgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXROaXhpZShuaXhpZSwgdmFsdWUpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbml4aWUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAvL25peGllLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZXBsYWNlKCdhY3RpdmUnLCAnJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGxldCBudW1iZXJzID0gbml4aWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NwYW4nKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG51bWJlcnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICB9XHJcbiAgICBuaXhpZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHZhbHVlKS5pdGVtKDApLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG59XHJcblxyXG5cclxud2luZG93Lm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhmaW5pc2hlZClcclxuICAgIGlmICghZmluaXNoZWQpIHJldHVybjtcclxuXHJcbiAgICBpZiAoaXRlcmF0aW9uICUgOCA9PSAwKVxyXG4gICAgICAgIHJldHVybiBicmVhdGhlcigxMDAwICogMiAqIGJyZWFrc3BhbiAqIDYwKTsgLy8gdGVuIG1pbnV0ZSB0aW1lclxyXG4gICAgZWxzZSBpZiAoaXRlcmF0aW9uICUgMiA9PSAwKVxyXG4gICAgICAgIHJldHVybiBicmVhdGhlcigxMDAwICogYnJlYWtzcGFuICogNjApOyAvLyB0ZW4gbWludXRlIHRpbWVyXHJcbiAgICBlbHNlIHJldHVybiB0aW1lcigxMDAwICogd29ya3NwYW4gKiA2MCk7IC8vIHRlbiBtaW51dGUgdGltZXJcclxufVxyXG5cclxuZnVuY3Rpb24gbm90aWZpeShtc2cpIHtcclxuICAgIC8vIExldCdzIGNoZWNrIHdoZXRoZXIgbm90aWZpY2F0aW9uIHBlcm1pc3Npb25zIGhhdmUgYWxyZWFkeSBiZWVuIGdyYW50ZWRcclxuICAgIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gXCJncmFudGVkXCIpIHtcclxuICAgICAgICAvLyBJZiBpdCdzIG9rYXkgbGV0J3MgY3JlYXRlIGEgbm90aWZpY2F0aW9uXHJcbiAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24obXNnLCB7IGljb246ICcuL2ltYWdlcy9pY29uLnBuZycsIHJlcXVpcmVJbnRlcmFjdGlvbjogdHJ1ZSwgdGFnOiAndGFzaycsIHJlbm90aWZ5OiB0cnVlIH0pO1xyXG4gICAgICAgIG5vdGlmaWNhdGlvbi5vbmNsaWNrID0gKCkgPT4geyBwYXJlbnQuZm9jdXMoKTsgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBPdGhlcndpc2UsIHdlIG5lZWQgdG8gYXNrIHRoZSB1c2VyIGZvciBwZXJtaXNzaW9uXHJcbiAgICBlbHNlIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiAhPT0gJ2RlbmllZCcpIHtcclxuICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gKHBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgYWNjZXB0cywgbGV0J3MgY3JlYXRlIGEgbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgIGlmIChwZXJtaXNzaW9uID09PSBcImdyYW50ZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24obXNnLCB7IGljb246ICcuL2ltYWdlcy9pY29uLnBuZycsIHJlcXVpcmVJbnRlcmFjdGlvbjogdHJ1ZSwgdGFnOiAndGFzaycsIHJlbm90aWZ5OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLm9uY2xpY2sgPSAoKSA9PiB7IHBhcmVudC5mb2N1cygpOyB0aGlzLmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=