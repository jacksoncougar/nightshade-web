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
var token = document.getElementById('token');
var state = 'start';
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
  var minutes = 99;
  var seconds = 99;

  if (e.data.minutes != undefined && e.data.seconds != undefined) {
    minutes = e.data.minutes;
    seconds = e.data.seconds;
  }

  if (e.data.finished) {
    notifiy("Times up!");
    finished = true;
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
  state = 'work';
  finished = false;
  document.getElementsByTagName('body').item(0).classList.remove('break');

  if (window.Worker && worker != undefined) {
    callback = function callback() {
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
  if (iteration % 8 == 0) return breather(2 * breakspan); // ten minute timer
  else if (iteration % 2 == 0) return breather(breakspan); // ten minute timer
    else return timer(workspan); // ten minute timer
}

window.onclick = begin;

document.onkeydown = function (e) {
  e = e || window.event;
  var presses = debounceKey(e.key);
  if (e.key == ' ') return begin();

  if (e.key == 'Escape') {
    if (presses >= 3 && state == 'work') return breather(breakspan);
    if (presses >= 2 && state == 'break') return timer(workspan);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwidmlzaWJpbGl0eSIsInRva2VuIiwic3RhdGUiLCJpdGVyYXRpb24iLCJkYiIsInJlcXVlc3QiLCJ3aW5kb3ciLCJpbmRleGVkREIiLCJvcGVuIiwib25zdWNjZXNzIiwiZSIsImV2ZW50IiwidGFyZ2V0IiwicmVzdWx0Iiwib251cGdyYWRlbmVlZGVkIiwib2JqZWN0U3RvcmUiLCJjcmVhdGVPYmplY3RTdG9yZSIsImtleVBhdGgiLCJjcmVhdGVJbmRleCIsInVuaXF1ZSIsInFkIiwibG9jYXRpb24iLCJzZWFyY2giLCJzdWJzdHIiLCJzcGxpdCIsImZvckVhY2giLCJpdGVtIiwicyIsImsiLCJ2IiwicmVwbGFjZUFsbCIsImRlY29kZVVSSUNvbXBvbmVudCIsInB1c2giLCJyZXBsYWNlIiwiam9pbiIsIndvcmtzcGFuIiwidGltZXIiLCJicmVha3NwYW4iLCJicmVhayIsImZpbmlzaGVkIiwid29ya2VyIiwiV29ya2VyIiwidW5kZWZpbmVkIiwib25sb2FkIiwidGFzayIsIm9ubWVzc2FnZSIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiZGF0YSIsIm5vdGlmaXkiLCJjYWxsYmFjayIsIm5peGllMyIsIm5peGllMiIsIm5peGllMSIsIm5peGllMCIsInRpdGxlIiwidG9Mb2NhbGVTdHJpbmciLCJtaW5pbXVtSW50ZWdlckRpZ2l0cyIsInNldE5peGllIiwiTWF0aCIsImZsb29yIiwibmF2aWdhdG9yIiwiY29uc29sZSIsImxvZyIsInNlcnZpY2VXb3JrZXIiLCJyZWdpc3RlciIsInRoZW4iLCJzdyIsInNjb3BlIiwiZXJyIiwiYW1vdW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhcHBlbmRDaGlsZCIsImdldFdvcmtUb2tlbiIsInBvc3RNZXNzYWdlIiwiYnJlYXRoZXIiLCJhZGQiLCJnZXRCcmVha1Rva2VuIiwiYnRva2VuIiwiY29udGVudCIsImNsb25lTm9kZSIsInd0b2tlbiIsInRhc2tGaW5pc2hlZCIsInN0b3JlIiwidHJhbnNhY3Rpb24iLCJnZXQiLCJjb3VudCIsImNvbXBsZXRlZCIsInB1dCIsIm5hbWUiLCJuaXhpZSIsInZhbHVlIiwibnVtYmVycyIsImkiLCJsZW5ndGgiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiTm90aWZpY2F0aW9uIiwicmVxdWVzdFBlcm1pc3Npb24iLCJzdGF0dXMiLCJfa2V5IiwicmVzZXREZWJvdW5jZSIsImRlYm91bmNlS2V5Iiwia2V5IiwiZGVib3VuY2UiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiYmVnaW4iLCJvbmNsaWNrIiwib25rZXlkb3duIiwicHJlc3NlcyIsIm1zZyIsInBlcm1pc3Npb24iLCJnZXRSZWdpc3RyYXRpb24iLCJyZWdpc3RyYXRpb24iLCJub3RpZmljYXRpb24iLCJzaG93Tm90aWZpY2F0aW9uIiwidGFnIiwicmVub3RpZnkiLCJyZXF1aXJlSW50ZXJhY3Rpb24iLCJpY29uIiwiaW1hZ2UiLCJwYXJlbnQiLCJmb2N1cyIsImNsb3NlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LEdBQUdSLFdBQVcsQ0FBQzdGLENBQUMsQ0FBQzhGLEdBQUgsQ0FBekI7QUFDQSxNQUFJOUYsQ0FBQyxDQUFDOEYsR0FBRixJQUFTLEdBQWIsRUFBa0IsT0FBT0ksS0FBSyxFQUFaOztBQUNsQixNQUFHbEcsQ0FBQyxDQUFDOEYsR0FBRixJQUFTLFFBQVosRUFDQTtBQUNJLFFBQUdPLE9BQU8sSUFBSSxDQUFYLElBQWdCN0csS0FBSyxJQUFJLE1BQTVCLEVBQW9DLE9BQU8yRSxRQUFRLENBQUN4QyxTQUFELENBQWY7QUFDcEMsUUFBRzBFLE9BQU8sSUFBSSxDQUFYLElBQWdCN0csS0FBSyxJQUFJLE9BQTVCLEVBQXFDLE9BQU9rQyxLQUFLLENBQUNELFFBQUQsQ0FBWjtBQUN4QztBQUNKLENBVEQ7O0FBV0EsU0FBU2MsT0FBVCxDQUFpQitELEdBQWpCLEVBQXNCO0FBQUE7O0FBQ2xCLE1BQUlkLFlBQVksQ0FBQ2UsVUFBYixJQUEyQixTQUEvQixFQUEwQztBQUN0Q3BELGFBQVMsQ0FBQ0csYUFBVixDQUF3QmtELGVBQXhCLEdBQTBDaEQsSUFBMUMsQ0FBK0MsVUFBQWlELFlBQVksRUFBSTtBQUMzRCxVQUFJQyxZQUFZLEdBQUdELFlBQVksQ0FBQ0UsZ0JBQWIsQ0FBOEIsV0FBOUIsRUFBMkM7QUFBQ0MsV0FBRyxFQUFFLE1BQU47QUFBY0MsZ0JBQVEsRUFBRSxJQUF4QjtBQUE4QkMsMEJBQWtCLEVBQUUsSUFBbEQ7QUFBd0RDLFlBQUksRUFBRSxpQkFBOUQ7QUFBaUZDLGFBQUssRUFBRTtBQUF4RixPQUEzQyxDQUFuQjs7QUFFQU4sa0JBQVksQ0FBQ1AsT0FBYixHQUF1QixZQUFNO0FBQUVjLGNBQU0sQ0FBQ0MsS0FBUDtBQUFnQnRILGNBQU0sQ0FBQ3NILEtBQVA7O0FBQWdCLGFBQUksQ0FBQ0MsS0FBTDtBQUFlLE9BQTlFO0FBQ0gsS0FKRDtBQUtIO0FBQ0osQyIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImltcG9ydCAnLi8uLi9zY3NzL2FwcC5zY3NzJ1xyXG5cclxuLyoqXHJcbiAqIFRPRE86IHNhdmUgdGhlIGN1cnJlbnQgdGltZXIgdGltZSBiZXR3ZWVuIHJlZnJlc2hlc1xyXG4gKiBUT0RPOiBrZWVwIHRyYWNrIG9mIGhvdyBtYW55IG1pbnV0ZXMgZWFjaCB0YXNrJ3MgcG9tb2Rvcm8gd2FzXHJcbiAqIFRPRE86IGRpc3BsYXkgdGFzayBzdGF0c1xyXG4gKiBUT0RPOiBhbmQgYSAnZmluaXNoZWQnIHN0YXRlIGFmdGVyIHggcG9tb2Rvcm9zIHRvIHN0b3Agd29ya2luZy5cclxuICogVE9ETzogYWRkIGEgJ2NvbnRpbnVlJyBzdGF0ZSBhZnRlciB0aW1lciBmaW5pc2hlcyBiZWZvcmUgY29udGludWVpbmcuXHJcbiAqIFRPRE86IGFsbG93IG1vcmUgdGltZSB0byBiZSBhZGRlZCBmcm9tIG5vdGlmaWNhdGlvbiAoKzIgbWludXRlcykuXHJcbiAqL1xyXG5cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lcicpLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzaycpLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3MnKS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnXHJcblxyXG52YXIgdG9rZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9rZW4nKTtcclxuXHJcbnZhciBzdGF0ZSA9ICdzdGFydCc7XHJcblxyXG52YXIgaXRlcmF0aW9uID0gMTtcclxuXHJcbnZhciBkYjtcclxudmFyIHJlcXVlc3QgPSB3aW5kb3cuaW5kZXhlZERCLm9wZW4oXCJuaWdodHNoYWRlLWRiXCIsIDEpO1xyXG5cclxucmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZSkgPT4ge1xyXG4gICAgZGIgPSBldmVudC50YXJnZXQucmVzdWx0O1xyXG59XHJcblxyXG5yZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IChlKSA9PiB7XHJcbiAgICBsZXQgZGIgPSBlLnRhcmdldC5yZXN1bHQ7XHJcbiAgICBsZXQgb2JqZWN0U3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShcInRhc2tzXCIsIHsga2V5UGF0aDogXCJuYW1lXCIgfSk7XHJcblxyXG4gICAgb2JqZWN0U3RvcmUuY3JlYXRlSW5kZXgoXCJjb21wbGV0ZWRcIixcclxuICAgICAgICBcImNvbXBsZXRlZFwiLCB7IHVuaXF1ZTogZmFsc2UgfSk7XHJcbn1cclxuXHJcbi8vIHBhcnNlIHRoZSBxdWVyeSBzZWxlY3RvciBpbiB0aGUgdXJsXHJcbnZhciBxZCA9IHt9O1xyXG5pZiAobG9jYXRpb24uc2VhcmNoKSBsb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLnNwbGl0KFwiJlwiKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICB2YXIgcyA9IGl0ZW0uc3BsaXQoXCI9XCIpLFxyXG4gICAgICAgIGsgPSBzWzBdLFxyXG4gICAgICAgIHYgPSBzWzFdICYmIHJlcGxhY2VBbGwoZGVjb2RlVVJJQ29tcG9uZW50KHNbMV0pLFxyXG4gICAgICAgICAgICAvXFwrLywgXCIgXCIpOyAvLyAgbnVsbC1jb2FsZXNjaW5nIC8gc2hvcnQtY2lyY3VpdFxyXG4gICAgKHFkW2tdID0gcWRba10gfHwgW10pLnB1c2godikgLy8gbnVsbC1jb2FsZXNjaW5nIC8gc2hvcnQtY2lyY3VpdFxyXG59KVxyXG5cclxuLyoqXHJcbiAqIFJlcGxhY2VzIGFsbCBvY2N1cmVuY2VzIG9mIHRoZSBzZWFyY2ggcGF0dGVybiB3aXRoIHRoZSBnaXZlbiByZXBsYWNlbWVudC5cclxuICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldCB0aGUgc3RyaW5nIG9uIHdpdGNoIHRvIGFwcGx5IHRoZSByZXBsYWNlbWVudHNcclxuICogQHBhcmFtIHtzdHJpbmd8UmVnZXh9IHNlYXJjaCB0aGUgcGF0dGVybiB0byByZXBsYWNlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXBsYWNlIHRoZSByZXBsYWNlbWVudCB2YWx1ZS5cclxuICovXHJcbmZ1bmN0aW9uIHJlcGxhY2VBbGwodGFyZ2V0LCBzZWFyY2gsIHJlcGxhY2UpIHtcclxuICAgIHJldHVybiB0YXJnZXQuc3BsaXQoc2VhcmNoKS5qb2luKHJlcGxhY2UpO1xyXG59XHJcblxyXG4vLyBpbml0aWFsaXplIHByb2dyYW0gYXJndW1lbnRzLlxyXG5cclxudmFyIHdvcmtzcGFuID0gcWQudGltZXIgfHwgMjBcclxudmFyIGJyZWFrc3BhbiA9IHFkLmJyZWFrIHx8IDRcclxudmFyIGZpbmlzaGVkID0gdHJ1ZTtcclxuXHJcbi8vIG1vdmUgaW50byAnd29yaycgc3RhdGUgaWYgYSB0YXNrIGhhcyBiZWVuIGRlZmluZWQuXHJcblxyXG52YXIgd29ya2VyO1xyXG5cclxuaWYgKHdpbmRvdy5Xb3JrZXIpIHtcclxuICAgIGlmICh3b3JrZXIgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgd29ya2VyID0gbmV3IFdvcmtlcignd29ya2VyLmJ1bmRsZS5qcycpO1xyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cub25sb2FkID0gKGUpID0+IHtcclxuICAgIGlmIChxZC50YXNrICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrJykuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lcicpLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcblxyXG4gICAgICAgIGlmICh3b3JrZXIpIHRpbWVyKHdvcmtzcGFuKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrJykuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgIH1cclxufVxyXG5cclxud29ya2VyLm9ubWVzc2FnZSA9IChlKSA9PiB7XHJcbiAgICBsZXQgbWludXRlcyA9IDk5O1xyXG4gICAgbGV0IHNlY29uZHMgPSA5OTtcclxuXHJcbiAgICBpZiAoZS5kYXRhLm1pbnV0ZXMgIT0gdW5kZWZpbmVkICYmIGUuZGF0YS5zZWNvbmRzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG1pbnV0ZXMgPSBlLmRhdGEubWludXRlcztcclxuICAgICAgICBzZWNvbmRzID0gZS5kYXRhLnNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGUuZGF0YS5maW5pc2hlZCkge1xyXG4gICAgICAgIG5vdGlmaXkoXCJUaW1lcyB1cCFcIilcclxuXHJcbiAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xyXG4gICAgICAgIGl0ZXJhdGlvbisrO1xyXG5cclxuICAgICAgICBjYWxsYmFjaygpOyAvLyBkbyB3aGF0ZXZlciBuZWVkcyBkb2luZyB3aGVuIHRoZSB0aW1lciBleHBpcmVzLi4uXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG5peGllMyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduaXhpZTMnKTtcclxuICAgIGxldCBuaXhpZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbml4aWUyJyk7XHJcbiAgICBsZXQgbml4aWUxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25peGllMScpO1xyXG4gICAgbGV0IG5peGllMCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduaXhpZTAnKTtcclxuXHJcbiAgICBkb2N1bWVudC50aXRsZSA9IGAke21pbnV0ZXMudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAyIH0pfToke3NlY29uZHMudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAyIH0pfSAke3FkLnRhc2t9YDtcclxuXHJcbiAgICBzZXROaXhpZShuaXhpZTMsIE1hdGguZmxvb3IobWludXRlcyAvIDEwKSk7XHJcbiAgICBzZXROaXhpZShuaXhpZTIsIE1hdGguZmxvb3IobWludXRlcyAlIDEwKSk7XHJcbiAgICBzZXROaXhpZShuaXhpZTEsIE1hdGguZmxvb3Ioc2Vjb25kcyAvIDEwKSk7XHJcbiAgICBzZXROaXhpZShuaXhpZTAsIE1hdGguZmxvb3Ioc2Vjb25kcyAlIDEwKSk7XHJcbn1cclxuXHJcblxyXG5pZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xyXG4gICAgY29uc29sZS5sb2coJ3N3IHN1cHBvcnRlZCcpXHJcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3Rlcignc3cuYnVuZGxlLmpzJykudGhlbigoc3cpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCB3aXRoIHNjb3BlOiAnLCBzdy5zY29wZSk7XHJcbiAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgLy8gcmVnaXN0cmF0aW9uIGZhaWxlZCA6KFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBmYWlsZWQ6ICcsIGVycik7XHJcbiAgICB9KVxyXG59XHJcblxyXG52YXIgY2FsbGJhY2sgPSAoKSA9PiBjb25zb2xlLmxvZygnbm90aGluZyBoZXJlJylcclxuXHJcblxyXG4vKipcclxuICogU3RhcnRzIGEgdGltZXIgZm9yIHRoZSBjdXJyZW50IHRhc2suXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIHRpbWUgaW4gbWlsbGlzZWNvbmRzXHJcbiAqL1xyXG5mdW5jdGlvbiB0aW1lcihhbW91bnQpIHtcclxuXHJcbiAgICBjb25zb2xlLmxvZygnc3RhcnRpbmcgdGltZXInKVxyXG4gICAgc3RhdGUgPSAnd29yaydcclxuICAgIGZpbmlzaGVkID0gZmFsc2VcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JykuaXRlbSgwKS5jbGFzc0xpc3QucmVtb3ZlKCdicmVhaycpO1xyXG5cclxuICAgIGlmICh3aW5kb3cuV29ya2VyICYmIHdvcmtlciAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjYWxsYmFjayA9ICgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzcycpXHJcbiAgICAgICAgLmFwcGVuZENoaWxkKGdldFdvcmtUb2tlbigpKTtcclxuICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoYW1vdW50ICogMTAwMCAqIDYwKVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogU3RhcnRzIGEgdGltZXIgZm9yIGEgYnJlYWsuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIHRpbWUgaW4gbWlsbGlzZWNvbmRzXHJcbiAqL1xyXG5mdW5jdGlvbiBicmVhdGhlcihhbW91bnQpIHtcclxuICAgIHN0YXRlID0gJ2JyZWFrJ1xyXG4gICAgZmluaXNoZWQgPSBmYWxzZVxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApLmNsYXNzTGlzdC5hZGQoJ2JyZWFrJyk7XHJcbiAgICBpZiAod2luZG93Lldvcmtlcikge1xyXG4gICAgICAgIGlmICh3b3JrZXIgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gKCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzJykuYXBwZW5kQ2hpbGQoZ2V0QnJlYWtUb2tlbigpKVxyXG4gICAgICAgICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoYW1vdW50ICogMTAwMCAqIDYwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QnJlYWtUb2tlbigpIFxyXG57XHJcbiAgICBsZXQgYnRva2VuID0gdG9rZW4uY29udGVudC5jbG9uZU5vZGUodHJ1ZSlcclxuICAgIGJ0b2tlbi5nZXRFbGVtZW50QnlJZCgnaWNvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ3dvcmsnKVxyXG4gICAgYnRva2VuLmdldEVsZW1lbnRCeUlkKCdpY29uJykuY2xhc3NMaXN0LmFkZCgnYnJlYWsnKVxyXG4gICAgcmV0dXJuIGJ0b2tlbjtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldFdvcmtUb2tlbigpIFxyXG57XHJcbiAgICBsZXQgd3Rva2VuID0gdG9rZW4uY29udGVudC5jbG9uZU5vZGUodHJ1ZSlcclxuICAgIHJldHVybiB3dG9rZW47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhc2tGaW5pc2hlZCgpIHtcclxuICAgIGZpbmlzaGVkID0gdHJ1ZTtcclxuICAgIG5vdGlmaXkoXCJUaW1lcyB1cFwiKVxyXG5cclxuICAgIGl0ZXJhdGlvbisrO1xyXG5cclxuICAgIGRvY3VtZW50LnRpdGxlID0gYGZpbmlzaGVkICR7cWQudGFza31gO1xyXG5cclxuICAgIC8vIGluY3JlbWVudCBob3cgbWFueSB0aW1lcyB0aGlzIHRhc2sgd2FzIGNvbXBsZXRlZCBpbiB0aGUgZGF0YWJhc2UuXHJcbiAgICBsZXQgc3RvcmUgPSBkYi50cmFuc2FjdGlvbihcclxuICAgICAgICBbJ3Rhc2tzJ10sICdyZWFkd3JpdGUnKS5vYmplY3RTdG9yZSgndGFza3MnKTtcclxuXHJcbiAgICBzdG9yZS5nZXQocWQudGFzaykub25zdWNjZXNzID0gKGUpID0+IHtcclxuXHJcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgd2FzIGFuIGV4aXN0aW5nIGNvdW50IG90aGVyd2lzZSBzdGFydCBhbmV3LlxyXG4gICAgICAgIGxldCBjb3VudCA9IChlLnRhcmdldC5yZXN1bHQgJiYgZS50YXJnZXQucmVzdWx0LmNvbXBsZXRlZCB8fCAwKVxyXG4gICAgICAgICAgICB8fCAwO1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGRhdGFiYXNlIGNvdW50IGZvciB0aGUgdGFza1xyXG4gICAgICAgIHN0b3JlLnB1dCh7IG5hbWU6IHFkLnRhc2ssIGNvbXBsZXRlZDogY291bnQgKyAxIH0pO1xyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Tml4aWUobml4aWUsIHZhbHVlKSB7XHJcbiAgICBsZXQgbnVtYmVycyA9IG5peGllLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzcGFuJyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBudW1iZXJzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG4gICAgaWYgKDAgPD0gdmFsdWUgJiYgdmFsdWUgPD0gOSlcclxuICAgICAgICBuaXhpZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHZhbHVlKS5pdGVtKDApLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG59XHJcblxyXG5Ob3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gKHN0YXR1cykge1xyXG4gICAgY29uc29sZS5sb2coJ05vdGlmaWNhdGlvbiBwZXJtaXNzaW9uIHN0YXR1czonLCBzdGF0dXMpO1xyXG59KTtcclxuXHJcbnZhciBfa2V5ID0gdW5kZWZpbmVkO1xyXG52YXIgY291bnQgPSAwO1xyXG5cclxuZnVuY3Rpb24gcmVzZXREZWJvdW5jZSgpIHtcclxuICAgIF9rZXkgPSB1bmRlZmluZWQ7XHJcbiAgICBjb3VudCA9IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlYm91bmNlS2V5KGtleSlcclxue1xyXG4gICAgaWYoa2V5ICE9IF9rZXkpIFxyXG4gICAge1xyXG4gICAgICAgIGNvdW50ID0gMFxyXG4gICAgIF9rZXkgPSBrZXlcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gKytjb3VudDtcclxuICAgIFxyXG4gICAgaWYoZGVib3VuY2UpIGNsZWFyVGltZW91dChkZWJvdW5jZSk7XHJcbiAgICBkZWJvdW5jZSA9IHNldFRpbWVvdXQocmVzZXREZWJvdW5jZSwgMjAwKVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbnZhciBkZWJvdW5jZTtcclxuXHJcbmZ1bmN0aW9uIGJlZ2luKCkge1xyXG4gICAgY29uc29sZS5sb2coZmluaXNoZWQpXHJcblxyXG4gICAgaWYgKCFmaW5pc2hlZCkgcmV0dXJuO1xyXG5cclxuICAgIGlmIChpdGVyYXRpb24gJSA4ID09IDApXHJcbiAgICAgICAgcmV0dXJuIGJyZWF0aGVyKDIgKiBicmVha3NwYW4pOyAvLyB0ZW4gbWludXRlIHRpbWVyXHJcbiAgICBlbHNlIGlmIChpdGVyYXRpb24gJSAyID09IDApXHJcbiAgICAgICAgcmV0dXJuIGJyZWF0aGVyKGJyZWFrc3Bhbik7IC8vIHRlbiBtaW51dGUgdGltZXJcclxuICAgIGVsc2UgcmV0dXJuIHRpbWVyKHdvcmtzcGFuKTsgLy8gdGVuIG1pbnV0ZSB0aW1lclxyXG59XHJcblxyXG53aW5kb3cub25jbGljayA9IGJlZ2luO1xyXG5kb2N1bWVudC5vbmtleWRvd24gPSAoZSkgPT4ge1xyXG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgbGV0IHByZXNzZXMgPSBkZWJvdW5jZUtleShlLmtleSlcclxuICAgIGlmIChlLmtleSA9PSAnICcpIHJldHVybiBiZWdpbigpO1xyXG4gICAgaWYoZS5rZXkgPT0gJ0VzY2FwZScpIFxyXG4gICAge1xyXG4gICAgICAgIGlmKHByZXNzZXMgPj0gMyAmJiBzdGF0ZSA9PSAnd29yaycpIHJldHVybiBicmVhdGhlcihicmVha3NwYW4pXHJcbiAgICAgICAgaWYocHJlc3NlcyA+PSAyICYmIHN0YXRlID09ICdicmVhaycpIHJldHVybiB0aW1lcih3b3Jrc3BhbilcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbm90aWZpeShtc2cpIHtcclxuICAgIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PSAnZ3JhbnRlZCcpIHtcclxuICAgICAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5nZXRSZWdpc3RyYXRpb24oKS50aGVuKHJlZ2lzdHJhdGlvbiA9PiB7XHJcbiAgICAgICAgICAgIHZhciBub3RpZmljYXRpb24gPSByZWdpc3RyYXRpb24uc2hvd05vdGlmaWNhdGlvbignQWxsIGRvbmUhJywge3RhZzogJ3Rhc2snLCByZW5vdGlmeTogdHJ1ZSwgcmVxdWlyZUludGVyYWN0aW9uOiB0cnVlLCBpY29uOiAnaW1hZ2VzL2ljb24ucG5nJywgaW1hZ2U6ICdodHRwczovL3N0YXRpYzEuc3F1YXJlc3BhY2UuY29tL3N0YXRpYy81M2ZjY2RjM2U0YjA2ZDU5ODg5MDczN2QvNTQyMzFkZmZlNGIwN2JiNTU4YjFlMGQyLzU0MjMxZTMxZTRiMDU3MjEyZjE1N2VjNS8xNTE3OTQ3ODg2MTA4L0dJTkdFUldISVRFQ09GRkVFTEFORC5qcGcnIH0pXHJcblxyXG4gICAgICAgICAgICBub3RpZmljYXRpb24ub25jbGljayA9ICgpID0+IHsgcGFyZW50LmZvY3VzKCk7IHdpbmRvdy5mb2N1cygpOyB0aGlzLmNsb3NlKCk7IH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=