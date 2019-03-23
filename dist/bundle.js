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

if (qd.task != undefined) {
  document.getElementById('task').hidden = true;
  document.getElementById('timer').hidden = false;
  timer(1000 * workspan * 60);
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImhpZGRlbiIsInN0YXJ0IiwiaXRlcmF0aW9uIiwidCIsImRiIiwicmVxdWVzdCIsIndpbmRvdyIsImluZGV4ZWREQiIsIm9wZW4iLCJvbnN1Y2Nlc3MiLCJlIiwiZXZlbnQiLCJ0YXJnZXQiLCJyZXN1bHQiLCJvbnVwZ3JhZGVuZWVkZWQiLCJvYmplY3RTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwia2V5UGF0aCIsImNyZWF0ZUluZGV4IiwidW5pcXVlIiwicWQiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsInNwbGl0IiwiZm9yRWFjaCIsIml0ZW0iLCJzIiwiayIsInYiLCJyZXBsYWNlQWxsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJyZXBsYWNlIiwiam9pbiIsIndvcmtzcGFuIiwidGltZXIiLCJicmVha3NwYW4iLCJicmVhayIsImZpbmlzaGVkIiwidGFzayIsInVuZGVmaW5lZCIsImFtb3VudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiRGF0ZSIsIm5vdyIsInNldEludGVydmFsIiwidXBkYXRlIiwic2V0VGltZW91dCIsInRhc2tGaW5pc2hlZCIsImJyZWF0aGVyIiwiYWRkIiwibm90aWZpeSIsInRpdGxlIiwic3RvcmUiLCJ0cmFuc2FjdGlvbiIsImdldCIsImNvdW50IiwiY29tcGxldGVkIiwicHV0IiwibmFtZSIsIm5peGllMyIsIm5peGllMiIsIm5peGllMSIsIm5peGllMCIsIm1vbWVudCIsIm1pbnV0ZXMiLCJNYXRoIiwiZmxvb3IiLCJzZWNvbmRzIiwiY2VpbCIsImNsZWFySW50ZXJ2YWwiLCJ0b0xvY2FsZVN0cmluZyIsIm1pbmltdW1JbnRlZ2VyRGlnaXRzIiwic2V0Tml4aWUiLCJuaXhpZSIsInZhbHVlIiwiaSIsImNoaWxkcmVuIiwibGVuZ3RoIiwibnVtYmVycyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvbmNsaWNrIiwibXNnIiwiTm90aWZpY2F0aW9uIiwicGVybWlzc2lvbiIsIm5vdGlmaWNhdGlvbiIsImljb24iLCJyZXF1aXJlSW50ZXJhY3Rpb24iLCJ0YWciLCJyZW5vdGlmeSIsInBhcmVudCIsImZvY3VzIiwicmVxdWVzdFBlcm1pc3Npb24iLCJjbG9zZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLHVDOzs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUVBOzs7Ozs7QUFPQUEsUUFBUSxDQUFDQyxjQUFULENBQXdCLE9BQXhCLEVBQWlDQyxNQUFqQyxHQUEwQyxJQUExQztBQUNBLElBQUlDLEtBQUssR0FBRyxDQUFaO0FBQ0EsSUFBSUMsU0FBUyxH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QkMsOEJBQWtCLEVBQUUsSUFBakQ7QUFBdURDLGVBQUcsRUFBRSxNQUE1RDtBQUFvRUMsb0JBQVEsRUFBRTtBQUE5RSxXQUF0QixDQUFuQjs7QUFDQUosc0JBQVksQ0FBQ0osT0FBYixHQUF1QixZQUFNO0FBQUVTLGtCQUFNLENBQUNDLEtBQVA7O0FBQWdCLGlCQUFJLENBQUNFLEtBQUw7QUFBZSxXQUE5RDtBQUNIO0FBQ0osT0FORDtBQU9IO0FBQ0osQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0XCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0ICcuLy4uL3Njc3MvYXBwLnNjc3MnXHJcblxyXG4vKipcclxuICogVE9ETzogc2F2ZSB0aGUgY3VycmVudCB0aW1lciB0aW1lIGJldHdlZW4gcmVmcmVzaGVzXHJcbiAqIFRPRE86IGtlZXAgdHJhY2sgb2YgaG93IG1hbnkgbWludXRlcyBlYWNoIHRhc2sncyBwb21vZG9ybyB3YXNcclxuICogVE9ETzogZGlzcGxheSB0YXNrIHN0YXRzXHJcbiAqIFRPRE86IGFuZCBhICdmaW5pc2hlZCcgc3RhdGUgYWZ0ZXIgeCBwb21vZG9yb3MgdG8gc3RvcCB3b3JraW5nLlxyXG4gKi9cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lcicpLmhpZGRlbiA9IHRydWU7XHJcbnZhciBzdGFydCA9IDA7XHJcbnZhciBpdGVyYXRpb24gPSAxO1xyXG52YXIgdDtcclxuXHJcblxyXG4vLyB0cnkgdG8gb3BlbiB0aGUgaW5kZXhlZERCIHN0b3JhZ2VcclxudmFyIGRiO1xyXG52YXIgcmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIub3BlbihcIm5pZ2h0c2hhZGUtZGJcIiwgMSk7XHJcblxyXG5yZXF1ZXN0Lm9uc3VjY2VzcyA9IChlKSA9PiB7XHJcbiAgICBkYiA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbn1cclxuXHJcbnJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGUpID0+IHtcclxuICAgIGxldCBkYiA9IGUudGFyZ2V0LnJlc3VsdDtcclxuICAgIGxldCBvYmplY3RTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKFwidGFza3NcIiwgeyBrZXlQYXRoOiBcIm5hbWVcIiB9KTtcclxuXHJcbiAgICBvYmplY3RTdG9yZS5jcmVhdGVJbmRleChcImNvbXBsZXRlZFwiLFxyXG4gICAgICAgIFwiY29tcGxldGVkXCIsIHsgdW5pcXVlOiBmYWxzZSB9KTtcclxufVxyXG5cclxuXHJcbi8vIHBhcnNlIHRoZSBxdWVyeSBzZWxlY3RvciBpbiB0aGUgdXJsXHJcbnZhciBxZCA9IHt9O1xyXG5pZiAobG9jYXRpb24uc2VhcmNoKSBsb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLnNwbGl0KFwiJlwiKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICB2YXIgcyA9IGl0ZW0uc3BsaXQoXCI9XCIpLFxyXG4gICAgICAgIGsgPSBzWzBdLFxyXG4gICAgICAgIHYgPSBzWzFdICYmIHJlcGxhY2VBbGwoZGVjb2RlVVJJQ29tcG9uZW50KHNbMV0pLFxyXG4gICAgICAgICAgICAvXFwrLywgXCIgXCIpOyAvLyAgbnVsbC1jb2FsZXNjaW5nIC8gc2hvcnQtY2lyY3VpdFxyXG4gICAgKHFkW2tdID0gcWRba10gfHwgW10pLnB1c2godikgLy8gbnVsbC1jb2FsZXNjaW5nIC8gc2hvcnQtY2lyY3VpdFxyXG59KVxyXG5cclxuY29uc29sZS5sb2cocWQpXHJcblxyXG4vKipcclxuICogUmVwbGFjZXMgYWxsIG9jY3VyZW5jZXMgb2YgdGhlIHNlYXJjaCBwYXR0ZXJuIHdpdGggdGhlIGdpdmVuIHJlcGxhY2VtZW50LlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFyZ2V0IHRoZSBzdHJpbmcgb24gd2l0Y2ggdG8gYXBwbHkgdGhlIHJlcGxhY2VtZW50c1xyXG4gKiBAcGFyYW0ge3N0cmluZ3xSZWdleH0gc2VhcmNoIHRoZSBwYXR0ZXJuIHRvIHJlcGxhY2VcclxuICogQHBhcmFtIHtzdHJpbmd9IHJlcGxhY2UgdGhlIHJlcGxhY2VtZW50IHZhbHVlLlxyXG4gKi9cclxuZnVuY3Rpb24gcmVwbGFjZUFsbCh0YXJnZXQsIHNlYXJjaCwgcmVwbGFjZSkge1xyXG4gICAgcmV0dXJuIHRhcmdldC5zcGxpdChzZWFyY2gpLmpvaW4ocmVwbGFjZSk7XHJcbn1cclxuXHJcbi8vIGluaXRpYWxpemUgcHJvZ3JhbSBhcmd1bWVudHMuXHJcblxyXG52YXIgd29ya3NwYW4gPSBxZC50aW1lciB8fCAyMFxyXG52YXIgYnJlYWtzcGFuID0gcWQuYnJlYWsgfHwgNFxyXG52YXIgZmluaXNoZWQgPSBmYWxzZTtcclxuXHJcbi8vIG1vdmUgaW50byAnd29yaycgc3RhdGUgaWYgYSB0YXNrIGhhcyBiZWVuIGRlZmluZWQuXHJcblxyXG5pZiAocWQudGFzayAhPSB1bmRlZmluZWQpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrJykuaGlkZGVuID0gdHJ1ZTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lcicpLmhpZGRlbiA9IGZhbHNlO1xyXG5cclxuICAgIHRpbWVyKDEwMDAgKiB3b3Jrc3BhbiAqIDYwKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBTdGFydHMgYSB0aW1lciBmb3IgdGhlIGN1cnJlbnQgdGFzay5cclxuICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHNcclxuICovXHJcbmZ1bmN0aW9uIHRpbWVyKGFtb3VudCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApLmNsYXNzTGlzdC5yZW1vdmUoJ2JyZWFrJyk7XHJcbiAgICBzdGFydCA9IERhdGUubm93KCkgKyBhbW91bnQ7XHJcbiAgICB0ID0gc2V0SW50ZXJ2YWwodXBkYXRlLCAxMDAwKTtcclxuICAgIHNldFRpbWVvdXQodGFza0ZpbmlzaGVkLCBhbW91bnQpO1xyXG59XHJcblxyXG4vKipcclxuICogU3RhcnRzIGEgdGltZXIgZm9yIGEgYnJlYWsuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIHRpbWUgaW4gbWlsbGlzZWNvbmRzXHJcbiAqL1xyXG5mdW5jdGlvbiBicmVhdGhlcihhbW91bnQpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JykuaXRlbSgwKS5jbGFzc0xpc3QuYWRkKCdicmVhaycpO1xyXG4gICAgc3RhcnQgPSBEYXRlLm5vdygpICsgYW1vdW50O1xyXG4gICAgdCA9IHNldEludGVydmFsKHVwZGF0ZSwgMTAwMCk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBmaW5pc2hlZCA9IHRydWU7XHJcbiAgICAgICAgbm90aWZpeSgnQnJlYWtzIG92ZXInKTtcclxuICAgICAgICBpdGVyYXRpb24rKztcclxuXHJcbiAgICB9LCBhbW91bnQgKyAxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGFza0ZpbmlzaGVkKCkge1xyXG4gICAgZmluaXNoZWQgPSB0cnVlO1xyXG4gICAgbm90aWZpeShcIlRpbWVzIHVwXCIpXHJcblxyXG4gICAgaXRlcmF0aW9uKys7XHJcblxyXG4gICAgZG9jdW1lbnQudGl0bGUgPSBgZmluaXNoZWQgJHtxZC50YXNrfWA7XHJcblxyXG4gICAgLy8gaW5jcmVtZW50IGhvdyBtYW55IHRpbWVzIHRoaXMgdGFzayB3YXMgY29tcGxldGVkIGluIHRoZSBkYXRhYmFzZS5cclxuICAgIGxldCBzdG9yZSA9IGRiLnRyYW5zYWN0aW9uKFxyXG4gICAgICAgIFsndGFza3MnXSwgJ3JlYWR3cml0ZScpLm9iamVjdFN0b3JlKCd0YXNrcycpO1xyXG5cclxuICAgIHN0b3JlLmdldChxZC50YXNrKS5vbnN1Y2Nlc3MgPSAoZSkgPT4ge1xyXG5cclxuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSB3YXMgYW4gZXhpc3RpbmcgY291bnQgb3RoZXJ3aXNlIHN0YXJ0IGFuZXcuXHJcbiAgICAgICAgbGV0IGNvdW50ID0gKGUudGFyZ2V0LnJlc3VsdCAmJiBlLnRhcmdldC5yZXN1bHQuY29tcGxldGVkIHx8IDApXHJcbiAgICAgICAgICAgIHx8IDA7XHJcblxyXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZGF0YWJhc2UgY291bnQgZm9yIHRoZSB0YXNrXHJcbiAgICAgICAgc3RvcmUucHV0KHsgbmFtZTogcWQudGFzaywgY29tcGxldGVkOiBjb3VudCArIDEgfSk7XHJcbiAgICB9O1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgZmluaXNoZWQgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgbml4aWUzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25peGllMycpO1xyXG4gICAgbGV0IG5peGllMiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduaXhpZTInKTtcclxuICAgIGxldCBuaXhpZTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbml4aWUxJyk7XHJcbiAgICBsZXQgbml4aWUwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25peGllMCcpO1xyXG5cclxuXHJcbiAgICBsZXQgbW9tZW50ID0gc3RhcnQgLSBEYXRlLm5vdygpO1xyXG4gICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKG1vbWVudCAvIDEwMDAgLyA2MCk7XHJcbiAgICBsZXQgc2Vjb25kcyA9IE1hdGguY2VpbCgobW9tZW50IC0gKG1pbnV0ZXMgKiAxMDAwICogNjApKSAvIDEwMDApICUgNjA7XHJcblxyXG5cclxuICAgIGlmIChtb21lbnQgPD0gMCAmJiAhZmluaXNoZWQpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHQpXHJcbiAgICAgICAgZmluaXNoZWQgPSB0cnVlXHJcbiAgICAgICAgbWludXRlcyA9IHNlY29uZHMgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LnRpdGxlID0gYCR7bWludXRlcy50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDIgfSl9OiR7c2Vjb25kcy50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDIgfSl9ICR7cWQudGFza31gO1xyXG5cclxuICAgIHNldE5peGllKG5peGllMywgTWF0aC5mbG9vcihtaW51dGVzIC8gMTApKTtcclxuICAgIHNldE5peGllKG5peGllMiwgTWF0aC5mbG9vcihtaW51dGVzICUgMTApKTtcclxuICAgIHNldE5peGllKG5peGllMSwgTWF0aC5mbG9vcihzZWNvbmRzIC8gMTApKTtcclxuICAgIHNldE5peGllKG5peGllMCwgTWF0aC5mbG9vcihzZWNvbmRzICUgMTApKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Tml4aWUobml4aWUsIHZhbHVlKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5peGllLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy9uaXhpZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVwbGFjZSgnYWN0aXZlJywgJycpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgbGV0IG51bWJlcnMgPSBuaXhpZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3BhbicpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IG51bWJlcnMubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgbnVtYmVyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIH1cclxuICAgIG5peGllLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodmFsdWUpLml0ZW0oMCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbn1cclxuXHJcblxyXG53aW5kb3cub25jbGljayA9ICgpID0+IHtcclxuICAgIGlmICghZmluaXNoZWQpIHJldHVybjtcclxuXHJcbiAgICBpZiAoaXRlcmF0aW9uICUgOCA9PSAwKVxyXG4gICAgICAgIHJldHVybiBicmVhdGhlcigxMDAwICogMiAqIGJyZWFrc3BhbiAqIDYwKTsgLy8gdGVuIG1pbnV0ZSB0aW1lclxyXG4gICAgZWxzZSBpZiAoaXRlcmF0aW9uICUgMiA9PSAwKVxyXG4gICAgICAgIHJldHVybiBicmVhdGhlcigxMDAwICogYnJlYWtzcGFuICogNjApOyAvLyB0ZW4gbWludXRlIHRpbWVyXHJcbiAgICBlbHNlIHJldHVybiB0aW1lcigxMDAwICogd29ya3NwYW4gKiA2MCk7IC8vIHRlbiBtaW51dGUgdGltZXJcclxufVxyXG5cclxuZnVuY3Rpb24gbm90aWZpeShtc2cpIHtcclxuICAgIC8vIExldCdzIGNoZWNrIHdoZXRoZXIgbm90aWZpY2F0aW9uIHBlcm1pc3Npb25zIGhhdmUgYWxyZWFkeSBiZWVuIGdyYW50ZWRcclxuICAgIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gXCJncmFudGVkXCIpIHtcclxuICAgICAgICAvLyBJZiBpdCdzIG9rYXkgbGV0J3MgY3JlYXRlIGEgbm90aWZpY2F0aW9uXHJcbiAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24obXNnLCB7IGljb246ICcuL2ltYWdlcy9pY29uLnBuZycsIHJlcXVpcmVJbnRlcmFjdGlvbjogdHJ1ZSwgdGFnOiAndGFzaycsIHJlbm90aWZ5OiB0cnVlIH0pO1xyXG4gICAgICAgIG5vdGlmaWNhdGlvbi5vbmNsaWNrID0gKCkgPT4geyBwYXJlbnQuZm9jdXMoKTsgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBPdGhlcndpc2UsIHdlIG5lZWQgdG8gYXNrIHRoZSB1c2VyIGZvciBwZXJtaXNzaW9uXHJcbiAgICBlbHNlIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiAhPT0gJ2RlbmllZCcpIHtcclxuICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gKHBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgYWNjZXB0cywgbGV0J3MgY3JlYXRlIGEgbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgIGlmIChwZXJtaXNzaW9uID09PSBcImdyYW50ZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24obXNnLCB7IGljb246ICcuL2ltYWdlcy9pY29uLnBuZycsIHJlcXVpcmVJbnRlcmFjdGlvbjogdHJ1ZSwgdGFnOiAndGFzaycsIHJlbm90aWZ5OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLm9uY2xpY2sgPSAoKSA9PiB7IHBhcmVudC5mb2N1cygpOyB0aGlzLmNsb3NlKCk7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=