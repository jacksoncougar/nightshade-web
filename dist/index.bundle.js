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
var iteration = 1; // try to open the indexedDB storage

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

if (qd.task != undefined) {
  document.getElementById('task').style.visibility = 'hidden';
  document.getElementById('timer').style.visibility = 'visible';

  if (window.Worker) {
    if (worker == undefined) {
      worker = new Worker('worker.bundle.js');
      worker.postMessage({
        wait: true
      });
    }
  }
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
    callback();
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
      callback = function callback() {
        return document.getElementById('progress').innerText += " o";
      };

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
  var numbers = nixie.getElementsByTagName('span');

  for (var i = 0; i < numbers.length; i++) {
    numbers[i].classList.remove('active');
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
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    registrations[0].showNotification('Finished');
  });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwidmlzaWJpbGl0eSIsIml0ZXJhdGlvbiIsImRiIiwicmVxdWVzdCIsIndpbmRvdyIsImluZGV4ZWREQiIsIm9wZW4iLCJvbnN1Y2Nlc3MiLCJlIiwiZXZlbnQiLCJ0YXJnZXQiLCJyZXN1bHQiLCJvbnVwZ3JhZGVuZWVkZWQiLCJvYmplY3RTdG9yZSIsImNyZWF0ZU9iamVjdFN0b3JlIiwia2V5UGF0aCIsImNyZWF0ZUluZGV4IiwidW5pcXVlIiwicWQiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsInNwbGl0IiwiZm9yRWFjaCIsIml0ZW0iLCJzIiwiayIsInYiLCJyZXBsYWNlQWxsIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicHVzaCIsInJlcGxhY2UiLCJqb2luIiwid29ya3NwYW4iLCJ0aW1lciIsImJyZWFrc3BhbiIsImJyZWFrIiwiZmluaXNoZWQiLCJ3b3JrZXIiLCJ0YXNrIiwidW5kZWZpbmVkIiwiV29ya2VyIiwicG9zdE1lc3NhZ2UiLCJ3YWl0Iiwib25tZXNzYWdlIiwibWludXRlcyIsInNlY29uZHMiLCJkYXRhIiwibm90aWZpeSIsImNhbGxiYWNrIiwibml4aWUzIiwibml4aWUyIiwibml4aWUxIiwibml4aWUwIiwidGl0bGUiLCJ0b0xvY2FsZVN0cmluZyIsIm1pbmltdW1JbnRlZ2VyRGlnaXRzIiwic2V0Tml4aWUiLCJNYXRoIiwiZmxvb3IiLCJuYXZpZ2F0b3IiLCJzZXJ2aWNlV29ya2VyIiwiY29uc29sZSIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZWdpc3RlciIsInRoZW4iLCJzdyIsInNjb3BlIiwiZXJyIiwiYW1vdW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJpbm5lclRleHQiLCJicmVhdGhlciIsImFkZCIsInRhc2tGaW5pc2hlZCIsInN0b3JlIiwidHJhbnNhY3Rpb24iLCJnZXQiLCJjb3VudCIsImNvbXBsZXRlZCIsInB1dCIsIm5hbWUiLCJuaXhpZSIsInZhbHVlIiwibnVtYmVycyIsImkiLCJsZW5ndGgiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwib25jbGljayIsIm1zZyIsImdldFJlZ2lzdHJhdGlvbnMiLCJyZWdpc3RyYXRpb25zIiwic2hvd05vdGlmaWNhdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLHVDOzs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUVBOzs7Ozs7OztBQVNBQSxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUNDLEtBQWpDLENBQXVDQyxVQUF2QyxHQUFvRCxRQUFwRDtBQUNBLElBQUlDLFNBQVMsR0FBRyxDQUFoQixDLENBR0E7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T0QsUUFBUCxHQUFrQixFQUFuQixDQUFaLENBUmMsQ0FRc0I7QUFDNUMsQ0FURDs7QUFXQSxTQUFTZSxPQUFULENBQWlCNEMsR0FBakIsRUFBc0I7QUFDbEJoQyxXQUFTLENBQUNDLGFBQVYsQ0FBd0JnQyxnQkFBeEIsR0FBMkMzQixJQUEzQyxDQUFnRCxVQUFVNEIsYUFBVixFQUF5QjtBQUNyRUEsaUJBQWEsQ0FBQyxDQUFELENBQWIsQ0FBaUJDLGdCQUFqQixDQUFrQyxVQUFsQztBQUNILEdBRkQ7QUFHSCxDIiwiZmlsZSI6ImluZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3RcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgJy4vLi4vc2Nzcy9hcHAuc2NzcydcclxuXHJcbi8qKlxyXG4gKiBUT0RPOiBzYXZlIHRoZSBjdXJyZW50IHRpbWVyIHRpbWUgYmV0d2VlbiByZWZyZXNoZXNcclxuICogVE9ETzoga2VlcCB0cmFjayBvZiBob3cgbWFueSBtaW51dGVzIGVhY2ggdGFzaydzIHBvbW9kb3JvIHdhc1xyXG4gKiBUT0RPOiBkaXNwbGF5IHRhc2sgc3RhdHNcclxuICogVE9ETzogYW5kIGEgJ2ZpbmlzaGVkJyBzdGF0ZSBhZnRlciB4IHBvbW9kb3JvcyB0byBzdG9wIHdvcmtpbmcuXHJcbiAqIFRPRE86IGFkZCBhICdjb250aW51ZScgc3RhdGUgYWZ0ZXIgdGltZXIgZmluaXNoZXMgYmVmb3JlIGNvbnRpbnVlaW5nLlxyXG4gKiBUT0RPOiBhbGxvdyBtb3JlIHRpbWUgdG8gYmUgYWRkZWQgZnJvbSBub3RpZmljYXRpb24gKCsyIG1pbnV0ZXMpLlxyXG4gKi9cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lcicpLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xyXG52YXIgaXRlcmF0aW9uID0gMTtcclxuXHJcblxyXG4vLyB0cnkgdG8gb3BlbiB0aGUgaW5kZXhlZERCIHN0b3JhZ2VcclxudmFyIGRiO1xyXG52YXIgcmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIub3BlbihcIm5pZ2h0c2hhZGUtZGJcIiwgMSk7XHJcblxyXG5yZXF1ZXN0Lm9uc3VjY2VzcyA9IChlKSA9PiB7XHJcbiAgICBkYiA9IGV2ZW50LnRhcmdldC5yZXN1bHQ7XHJcbn1cclxuXHJcbnJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGUpID0+IHtcclxuICAgIGxldCBkYiA9IGUudGFyZ2V0LnJlc3VsdDtcclxuICAgIGxldCBvYmplY3RTdG9yZSA9IGRiLmNyZWF0ZU9iamVjdFN0b3JlKFwidGFza3NcIiwgeyBrZXlQYXRoOiBcIm5hbWVcIiB9KTtcclxuXHJcbiAgICBvYmplY3RTdG9yZS5jcmVhdGVJbmRleChcImNvbXBsZXRlZFwiLFxyXG4gICAgICAgIFwiY29tcGxldGVkXCIsIHsgdW5pcXVlOiBmYWxzZSB9KTtcclxufVxyXG5cclxuXHJcbi8vIHBhcnNlIHRoZSBxdWVyeSBzZWxlY3RvciBpbiB0aGUgdXJsXHJcbnZhciBxZCA9IHt9O1xyXG5pZiAobG9jYXRpb24uc2VhcmNoKSBsb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLnNwbGl0KFwiJlwiKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICB2YXIgcyA9IGl0ZW0uc3BsaXQoXCI9XCIpLFxyXG4gICAgICAgIGsgPSBzWzBdLFxyXG4gICAgICAgIHYgPSBzWzFdICYmIHJlcGxhY2VBbGwoZGVjb2RlVVJJQ29tcG9uZW50KHNbMV0pLFxyXG4gICAgICAgICAgICAvXFwrLywgXCIgXCIpOyAvLyAgbnVsbC1jb2FsZXNjaW5nIC8gc2hvcnQtY2lyY3VpdFxyXG4gICAgKHFkW2tdID0gcWRba10gfHwgW10pLnB1c2godikgLy8gbnVsbC1jb2FsZXNjaW5nIC8gc2hvcnQtY2lyY3VpdFxyXG59KVxyXG5cclxuLyoqXHJcbiAqIFJlcGxhY2VzIGFsbCBvY2N1cmVuY2VzIG9mIHRoZSBzZWFyY2ggcGF0dGVybiB3aXRoIHRoZSBnaXZlbiByZXBsYWNlbWVudC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldCB0aGUgc3RyaW5nIG9uIHdpdGNoIHRvIGFwcGx5IHRoZSByZXBsYWNlbWVudHNcclxuICogQHBhcmFtIHtzdHJpbmd8UmVnZXh9IHNlYXJjaCB0aGUgcGF0dGVybiB0byByZXBsYWNlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXBsYWNlIHRoZSByZXBsYWNlbWVudCB2YWx1ZS5cclxuICovXHJcbmZ1bmN0aW9uIHJlcGxhY2VBbGwodGFyZ2V0LCBzZWFyY2gsIHJlcGxhY2UpIHtcclxuICAgIHJldHVybiB0YXJnZXQuc3BsaXQoc2VhcmNoKS5qb2luKHJlcGxhY2UpO1xyXG59XHJcblxyXG4vLyBpbml0aWFsaXplIHByb2dyYW0gYXJndW1lbnRzLlxyXG5cclxudmFyIHdvcmtzcGFuID0gcWQudGltZXIgfHwgMjBcclxudmFyIGJyZWFrc3BhbiA9IHFkLmJyZWFrIHx8IDRcclxudmFyIGZpbmlzaGVkID0gdHJ1ZTtcclxuXHJcbi8vIG1vdmUgaW50byAnd29yaycgc3RhdGUgaWYgYSB0YXNrIGhhcyBiZWVuIGRlZmluZWQuXHJcblxyXG52YXIgd29ya2VyO1xyXG5cclxuaWYgKHFkLnRhc2sgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzaycpLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lcicpLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5Xb3JrZXIpIHtcclxuICAgICAgICBpZiAod29ya2VyID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB3b3JrZXIgPSBuZXcgV29ya2VyKCd3b3JrZXIuYnVuZGxlLmpzJyk7XHJcbiAgICAgICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZSh7d2FpdDogdHJ1ZX0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53b3JrZXIub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgIGxldCBtaW51dGVzID0gMDtcclxuICAgIGxldCBzZWNvbmRzID0gMDtcclxuXHJcbiAgICBpZiAoZS5kYXRhLm1pbnV0ZXMgIT0gdW5kZWZpbmVkICYmIGUuZGF0YS5zZWNvbmRzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG1pbnV0ZXMgPSBlLmRhdGEubWludXRlcztcclxuICAgICAgICBzZWNvbmRzID0gZS5kYXRhLnNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGUuZGF0YS5maW5pc2hlZCAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBub3RpZml5KFwiVGltZXMgdXAhXCIpXHJcblxyXG4gICAgICAgIGZpbmlzaGVkID0gZS5kYXRhLmZpbmlzaGVkXHJcbiAgICAgICAgaXRlcmF0aW9uKys7XHJcblxyXG4gICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGxldCBuaXhpZTMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbml4aWUzJyk7XHJcbiAgICBsZXQgbml4aWUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25peGllMicpO1xyXG4gICAgbGV0IG5peGllMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduaXhpZTEnKTtcclxuICAgIGxldCBuaXhpZTAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbml4aWUwJyk7XHJcblxyXG4gICAgZG9jdW1lbnQudGl0bGUgPSBgJHttaW51dGVzLnRvTG9jYWxlU3RyaW5nKHVuZGVmaW5lZCwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMiB9KX06JHtzZWNvbmRzLnRvTG9jYWxlU3RyaW5nKHVuZGVmaW5lZCwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMiB9KX0gJHtxZC50YXNrfWA7XHJcblxyXG4gICAgc2V0Tml4aWUobml4aWUzLCBNYXRoLmZsb29yKG1pbnV0ZXMgLyAxMCkpO1xyXG4gICAgc2V0Tml4aWUobml4aWUyLCBNYXRoLmZsb29yKG1pbnV0ZXMgJSAxMCkpO1xyXG4gICAgc2V0Tml4aWUobml4aWUxLCBNYXRoLmZsb29yKHNlY29uZHMgLyAxMCkpO1xyXG4gICAgc2V0Tml4aWUobml4aWUwLCBNYXRoLmZsb29yKHNlY29uZHMgJSAxMCkpO1xyXG59XHJcblxyXG5cclxuaWYgKG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgY29uc29sZS5sb2coJ3N3IHN1cHBvcnRlZCcpXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcignLi9zdy5idW5kbGUuanMnKS50aGVuKChzdykgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCB3aXRoIHNjb3BlOiAnLCBzdy5zY29wZSk7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAvLyByZWdpc3RyYXRpb24gZmFpbGVkIDooXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBmYWlsZWQ6ICcsIGVycik7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbnZhciBjYWxsYmFjayA9ICgpID0+IGNvbnNvbGUubG9nKCdub3RoaW5nIGhlcmUnKVxyXG5cclxuXHJcbi8qKlxyXG4gKiBTdGFydHMgYSB0aW1lciBmb3IgdGhlIGN1cnJlbnQgdGFzay5cclxuICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHNcclxuICovXHJcbmZ1bmN0aW9uIHRpbWVyKGFtb3VudCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApLmNsYXNzTGlzdC5yZW1vdmUoJ2JyZWFrJyk7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5Xb3JrZXIpIHtcclxuICAgICAgICBpZiAod29ya2VyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9ICgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcycpLmlubmVyVGV4dCArPSBcIiB4XCJcclxuICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKGFtb3VudClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdGFydHMgYSB0aW1lciBmb3IgYSBicmVhay5cclxuICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHNcclxuICovXHJcbmZ1bmN0aW9uIGJyZWF0aGVyKGFtb3VudCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApLmNsYXNzTGlzdC5hZGQoJ2JyZWFrJyk7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5Xb3JrZXIpIHtcclxuICAgICAgICBpZiAod29ya2VyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayA9ICgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcycpLmlubmVyVGV4dCArPSBcIiBvXCJcclxuICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKGFtb3VudClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tGaW5pc2hlZCgpIHtcclxuICAgIGZpbmlzaGVkID0gdHJ1ZTtcclxuICAgIG5vdGlmaXkoXCJUaW1lcyB1cFwiKVxyXG5cclxuICAgIGl0ZXJhdGlvbisrO1xyXG5cclxuICAgIGRvY3VtZW50LnRpdGxlID0gYGZpbmlzaGVkICR7cWQudGFza31gO1xyXG5cclxuICAgIC8vIGluY3JlbWVudCBob3cgbWFueSB0aW1lcyB0aGlzIHRhc2sgd2FzIGNvbXBsZXRlZCBpbiB0aGUgZGF0YWJhc2UuXHJcbiAgICBsZXQgc3RvcmUgPSBkYi50cmFuc2FjdGlvbihcclxuICAgICAgICBbJ3Rhc2tzJ10sICdyZWFkd3JpdGUnKS5vYmplY3RTdG9yZSgndGFza3MnKTtcclxuXHJcbiAgICBzdG9yZS5nZXQocWQudGFzaykub25zdWNjZXNzID0gKGUpID0+IHtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgd2FzIGFuIGV4aXN0aW5nIGNvdW50IG90aGVyd2lzZSBzdGFydCBhbmV3LlxyXG4gICAgICAgIGxldCBjb3VudCA9IChlLnRhcmdldC5yZXN1bHQgJiYgZS50YXJnZXQucmVzdWx0LmNvbXBsZXRlZCB8fCAwKVxyXG4gICAgICAgICAgICB8fCAwO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGRhdGFiYXNlIGNvdW50IGZvciB0aGUgdGFza1xyXG4gICAgICAgIHN0b3JlLnB1dCh7IG5hbWU6IHFkLnRhc2ssIGNvbXBsZXRlZDogY291bnQgKyAxIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Tml4aWUobml4aWUsIHZhbHVlKSB7XHJcbiAgICBsZXQgbnVtYmVycyA9IG5peGllLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBudW1iZXJzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG4gICAgbml4aWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh2YWx1ZSkuaXRlbSgwKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxufVxyXG5cclxuXHJcbndpbmRvdy5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZmluaXNoZWQpXHJcbiAgICBpZiAoIWZpbmlzaGVkKSByZXR1cm47XHJcblxyXG4gICAgaWYgKGl0ZXJhdGlvbiAlIDggPT0gMClcclxuICAgICAgICByZXR1cm4gYnJlYXRoZXIoMTAwMCAqIDIgKiBicmVha3NwYW4gKiA2MCk7IC8vIHRlbiBtaW51dGUgdGltZXJcclxuICAgIGVsc2UgaWYgKGl0ZXJhdGlvbiAlIDIgPT0gMClcclxuICAgICAgICByZXR1cm4gYnJlYXRoZXIoMTAwMCAqIGJyZWFrc3BhbiAqIDYwKTsgLy8gdGVuIG1pbnV0ZSB0aW1lclxyXG4gICAgZWxzZSByZXR1cm4gdGltZXIoMTAwMCAqIHdvcmtzcGFuICogNjApOyAvLyB0ZW4gbWludXRlIHRpbWVyXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vdGlmaXkobXNnKSB7XHJcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5nZXRSZWdpc3RyYXRpb25zKCkudGhlbihmdW5jdGlvbiAocmVnaXN0cmF0aW9ucykge1xyXG4gICAgICAgIHJlZ2lzdHJhdGlvbnNbMF0uc2hvd05vdGlmaWNhdGlvbignRmluaXNoZWQnKTtcclxuICAgIH0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=