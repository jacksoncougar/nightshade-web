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

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var R = (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;

if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}

module.exports = EventEmitter; // Backwards-compat with node 0.10.x

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

var defaultMaxListeners = 10;
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function get() {
    return defaultMaxListeners;
  },
  set: function set(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }

    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}; // Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.


EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }

  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];

  for (var i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

  if (doError) {
    var er;
    if (args.length > 0) er = args[0];

    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    } // At least give some kind of context to the user


    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];
  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) {
      ReflectApply(listeners[i], this, args);
    }
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(listener));
  }

  events = target._events;

  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object

      events = target._events;
    }

    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    } // Check for listener leak


    m = $getMaxListeners(target);

    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true; // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax

      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  var args = [];

  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(listener));
  }

  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(listener));
  }

  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
}; // Emits a 'removeListener' event if and only if the listener was removed.


EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(listener));
  }

  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this; // not listening for removeListener, no need to emit

  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }

    return this;
  } // emit removeListener for all listeners on all events


  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;

    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }

    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;

function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);

  for (var i = 0; i < n; ++i) {
    copy[i] = arr[i];
  }

  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) {
    list[index] = list[index + 1];
  }

  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);

  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }

  return ret;
}

/***/ }),

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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/app.scss */ "./scss/app.scss");
/* harmony import */ var _scss_app_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_app_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_util__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timer */ "./src/timer.js");
/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keys */ "./src/keys.js");
/* eslint-disable no-useless-return */

/* eslint-disable no-restricted-globals */




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
var nixie3 = document.getElementById("nixie3");
var nixie2 = document.getElementById("nixie2");
var nixie1 = document.getElementById("nixie1");
var nixie0 = document.getElementById("nixie0");
var token = document.getElementById("token");
var timer = new _timer__WEBPACK_IMPORTED_MODULE_2__["Timer"]();
var keys = new _keys__WEBPACK_IMPORTED_MODULE_3__["Keys"]();
timer.ontick = update;
timer.onexpired = taskFinished;
var state = "start";
var iteration = 1;
var db; // parse the query selector in the url

var qd = {};

if (location.search) {
  location.search.substr(1).split("&").forEach(function (item) {
    var s = item.split("=");
    var k = s[0];
    var v = s[1] && Object(_util__WEBPACK_IMPORTED_MODULE_1__["replaceAll"])(decodeURIComponent(s[1]), /\+/, " "); //  null-coalescing / short-circuit

    (qd[k] = qd[k] || []).push(v); // null-coalescing / short-circuit
  });
}

var request = window.indexedDB.open("nightshade-db", 1);

request.onsuccess = function (e) {
  db = event.target.result;
  var store = db.transaction(["tasks"], "readonly").objectStore("tasks");

  if (qd.task) {
    store.get(qd.task).onsuccess = function (e) {
      // check if there was an existing count otherwise start anew.
      var count = e.target.result && e.target.result.completed || 0 || 0;

      for (var index = 0; index < count; index++) {
        document.getElementById("progress").appendChild(getWorkToken());
      }
    };
  }
};

request.onupgradeneeded = function (e) {
  var db = e.target.result;
  var objectStore = db.createObjectStore("tasks", {
    keyPath: "name"
  });
  objectStore.createIndex("completed", "completed", {
    unique: false
  });
}; // initialize program arguments.


var workspan = qd.timer || 20;
var breakspan = qd["break"] || 4;
var finished = true;

window.onload = function () {
  if (qd.task !== undefined) {
    document.getElementById("task").style.visibility = "hidden";
    document.getElementById("timer").style.visibility = "visible";
    setTimer(workspan);
  } else {
    document.getElementById("task").style.visibility = "visible";
  }
};

function update(minutes, seconds) {
  document.title = "".concat(minutes.toLocaleString(undefined, {
    minimumIntegerDigits: 2
  }), ":").concat(seconds.toLocaleString(undefined, {
    minimumIntegerDigits: 2
  }), " ").concat(qd.task);
  setNixie(nixie3, Math.floor(minutes / 10));
  setNixie(nixie2, Math.floor(minutes % 10));
  setNixie(nixie1, Math.floor(seconds / 10));
  setNixie(nixie0, Math.floor(seconds % 10));
}

if ("serviceWorker" in navigator) {
  console.log("sw supported");
  navigator.serviceWorker.register("sw.bundle.js").then(function (sw) {
    console.log("ServiceWorker registration successful with scope: ", sw.scope);
  }, function (err) {
    // registration failed :(
    console.log("ServiceWorker registration failed: ", err);
  });
}
/**
 * Starts a timer for the current task.
 * @param {number} amount - the amount of time in milliseconds
 */


function setTimer(amount) {
  console.log("starting timer");
  timer.start(amount);
  state = "work";
  document.getElementsByTagName("body").item(0).classList.remove("break");
}
/**
 * Starts a timer for a break.
 * @param {number} amount - the amount of time in milliseconds
 */


function breather(amount) {
  state = "break";
  finished = false;
  timer.start(amount);
  document.getElementsByTagName("body").item(0).classList.add("break");
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
  sound.play()["catch"](function (error) {
    return console.log(error);
  });
  notifiy("Times up");
  iteration++;
  document.title = "finished ".concat(qd.task);
  document.getElementById("progress").appendChild(state === "work" ? getWorkToken() : getBreakToken()); // increment how many times this task was completed in the database.

  var store = db.transaction(["tasks"], "readwrite").objectStore("tasks");

  store.get(qd.task).onsuccess = function (e) {
    // check if there was an existing count otherwise start anew.
    var count = e.target.result && e.target.result.completed || 0; // update the database count for the task

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

  if (value >= 0 && value <= 9) {
    nixie.getElementsByClassName(value).item(0).classList.add("active");
  }
}

Notification.requestPermission(function (status) {
  console.log("Notification permission status:", status);
});

function begin() {
  if (!finished) return;

  if (state === "break") {
    setTimer(workspan);
    return;
  }

  if (state === "work") {
    breather(iteration > 0 && iteration % 4 == 0 ? 2 * breakspan : breakspan);
    return;
  }
}

keys.ontriplepress = function (e) {
  if (e.key === "Escape") {
    if (state === "work") {
      breather(breakspan);
      return;
    }

    if (state === "break") {
      setTimer(workspan);
      return;
    }
  }
};

window.onclick = begin;

document.onkeydown = function (e) {
  if (e.key === " ") {
    begin();
    return;
  }
};

function notifiy(msg) {
  var _this = this;

  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(function (registration) {
      var notification = registration.showNotification(msg, {
        tag: "task",
        renotify: true,
        requireInteraction: true,
        icon: "images/icons/icon-72x72.png",
        silent: true,
        image: "https://static1.squarespace.com/static/53fccdc3e4b06d598890737d/54231dffe4b07bb558b1e0d2/54231e31e4b057212f157ec5/1517947886108/GINGERWHITECOFFEELAND.jpg"
      });

      notification.onclick = function () {
        parent.focus();
        window.focus();

        _this.close();
      };
    });
  }
}

/***/ }),

/***/ "./src/keys.js":
/*!*********************!*\
  !*** ./src/keys.js ***!
  \*********************/
/*! exports provided: Keys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Keys", function() { return Keys; });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Keys =
/*#__PURE__*/
function () {
  function Keys() {
    var _this = this;

    _classCallCheck(this, Keys);

    this.emitter = new events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    document.addEventListener("keydown", function (e) {
      var presses = _this.debounceKey(e.key);

      if (presses >= 3) {
        _this.emitter.emit("triplePress", e);

        _this.debounceKey();
      }
    });
  }

  _createClass(Keys, [{
    key: "resetDebounce",
    value: function resetDebounce() {
      this.currentKey = undefined;
      this.countcount = 0;
    }
  }, {
    key: "debounceKey",
    value: function debounceKey(key) {
      if (!key) {
        this.count = 0;
      }

      if (key !== this.currentKey) {
        this.count = 0;
        this.currentKey = key;
      }

      this.count += 1;
      var result = this.count;
      if (this.debounce) clearTimeout(this.debounce);
      this.debounce = setTimeout(this.resetDebounce, 200);
      return result;
    }
  }, {
    key: "ontriplepress",
    set: function set(callback) {
      this.emitter.on("triplePress", callback);
    }
  }]);

  return Keys;
}();



/***/ }),

/***/ "./src/timer.js":
/*!**********************!*\
  !*** ./src/timer.js ***!
  \**********************/
/*! exports provided: Timer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Timer", function() { return Timer; });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Timer =
/*#__PURE__*/
function () {
  function Timer() {
    _classCallCheck(this, Timer);

    this.emitter = new events__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    this.running = false;
  }

  _createClass(Timer, [{
    key: "update",
    value: function update() {
      var moment = this.startTime - Date.now();
      var minutes = Math.floor(moment / 1000 / 60);
      var seconds = Math.floor(moment / 1000 % 60);

      if (moment <= 0) {
        clearInterval(this.interval);
        this.running = false;
        minutes = 0;
        seconds = 0;
        this.emitter.emit("expired");
      }

      this.emitter.emit("tick", minutes, seconds);
    }
  }, {
    key: "start",
    value: function start(time) {
      var _this = this;

      this.running = true;
      var ms = time * 1000 * 60;
      this.startTime = Date.now() + ms;
      this.interval = setInterval(function () {
        _this.update();
      }, 100);
      this.update();
      return new Promise(function (resolve) {
        _this.emitter.once("expired", resolve);
      }, function (reject) {
        _this.emitter.once("cancel", reject);
      });
    }
  }, {
    key: "cancel",
    value: function cancel() {}
  }, {
    key: "ontick",
    set: function set(callback) {
      this.emitter.on("tick", callback);
    }
  }, {
    key: "isRunning",
    get: function get() {
      return this.running;
    }
  }, {
    key: "onexpired",
    set: function set(callback) {
      this.emitter.on("expired", callback);
    }
  }]);

  return Timer;
}();



/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  /**
   * Replaces all occurences of the search pattern with the given replacement.
   * @param {string} target the string on witch to apply the replacements
   * @param {string|Regex} search the pattern to replace
   * @param {string} replace the replacement value.
   */
  replaceAll: function replaceAll(target, search, replace) {
    return target.split(search).join(replace);
  }
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbWVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbIlIiLCJSZWZsZWN0IiwiUmVmbGVjdEFwcGx5IiwiYXBwbHkiLCJ0YXJnZXQiLCJyZWNlaXZlciIsImFyZ3MiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsImNhbGwiLCJSZWZsZWN0T3duS2V5cyIsIm93bktleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiY29uY2F0IiwiUHJvY2Vzc0VtaXRXYXJuaW5nIiwid2FybmluZyIsImNvbnNvbGUiLCJ3YXJuIiwiTnVtYmVySXNOYU4iLCJOdW1iZXIiLCJpc05hTiIsInZhbHVlIiwiRXZlbnRFbWl0dGVyIiwiaW5pdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJfZXZlbnRzIiwidW5kZWZpbmVkIiwiX2V2ZW50c0NvdW50IiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJzZXQiLCJhcmciLCJSYW5nZUVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJjcmVhdGUiLCJzZXRNYXhMaXN0ZW5lcnMiLCJuIiwiJGdldE1heExpc3RlbmVycyIsInRoYXQiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlbWl0IiwidHlwZSIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJwdXNoIiwiZG9FcnJvciIsImV2ZW50cyIsImVycm9yIiwiZXIiLCJFcnJvciIsImVyciIsIm1lc3NhZ2UiLCJjb250ZXh0IiwiaGFuZGxlciIsImxlbiIsImxpc3RlbmVycyIsImFycmF5Q2xvbmUiLCJfYWRkTGlzdGVuZXIiLCJsaXN0ZW5lciIsInByZXBlbmQiLCJtIiwiZXhpc3RpbmciLCJUeXBlRXJyb3IiLCJuZXdMaXN0ZW5lciIsInVuc2hpZnQiLCJ3YXJuZWQiLCJ3IiwiU3RyaW5nIiwibmFtZSIsImVtaXR0ZXIiLCJjb3VudCIsImFkZExpc3RlbmVyIiwib24iLCJwcmVwZW5kTGlzdGVuZXIiLCJvbmNlV3JhcHBlciIsImZpcmVkIiwicmVtb3ZlTGlzdGVuZXIiLCJ3cmFwRm4iLCJfb25jZVdyYXAiLCJzdGF0ZSIsIndyYXBwZWQiLCJiaW5kIiwib25jZSIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0IiwicG9zaXRpb24iLCJvcmlnaW5hbExpc3RlbmVyIiwic2hpZnQiLCJzcGxpY2VPbmUiLCJvZmYiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJrZXlzIiwia2V5IiwiX2xpc3RlbmVycyIsInVud3JhcCIsImV2bGlzdGVuZXIiLCJ1bndyYXBMaXN0ZW5lcnMiLCJyYXdMaXN0ZW5lcnMiLCJsaXN0ZW5lckNvdW50IiwiZXZlbnROYW1lcyIsImFyciIsImNvcHkiLCJBcnJheSIsImluZGV4IiwicG9wIiwicmV0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwidmlzaWJpbGl0eSIsIm5peGllMyIsIm5peGllMiIsIm5peGllMSIsIm5peGllMCIsInRva2VuIiwidGltZXIiLCJUaW1lciIsIktleXMiLCJvbnRpY2siLCJ1cGRhdGUiLCJvbmV4cGlyZWQiLCJ0YXNrRmluaXNoZWQiLCJpdGVyYXRpb24iLCJkYiIsInFkIiwibG9jYXRpb24iLCJzZWFyY2giLCJzdWJzdHIiLCJzcGxpdCIsImZvckVhY2giLCJpdGVtIiwicyIsImsiLCJ2IiwicmVwbGFjZUFsbCIsImRlY29kZVVSSUNvbXBvbmVudCIsInJlcXVlc3QiLCJ3aW5kb3ciLCJpbmRleGVkREIiLCJvcGVuIiwib25zdWNjZXNzIiwiZSIsImV2ZW50IiwicmVzdWx0Iiwic3RvcmUiLCJ0cmFuc2FjdGlvbiIsIm9iamVjdFN0b3JlIiwidGFzayIsImNvbXBsZXRlZCIsImFwcGVuZENoaWxkIiwiZ2V0V29ya1Rva2VuIiwib251cGdyYWRlbmVlZGVkIiwiY3JlYXRlT2JqZWN0U3RvcmUiLCJrZXlQYXRoIiwiY3JlYXRlSW5kZXgiLCJ1bmlxdWUiLCJ3b3Jrc3BhbiIsImJyZWFrc3BhbiIsImZpbmlzaGVkIiwib25sb2FkIiwic2V0VGltZXIiLCJtaW51dGVzIiwic2Vjb25kcyIsInRpdGxlIiwidG9Mb2NhbGVTdHJpbmciLCJtaW5pbXVtSW50ZWdlckRpZ2l0cyIsInNldE5peGllIiwiTWF0aCIsImZsb29yIiwibmF2aWdhdG9yIiwibG9nIiwic2VydmljZVdvcmtlciIsInJlZ2lzdGVyIiwidGhlbiIsInN3Iiwic2NvcGUiLCJhbW91bnQiLCJzdGFydCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYnJlYXRoZXIiLCJhZGQiLCJnZXRCcmVha1Rva2VuIiwiYnRva2VuIiwiY29udGVudCIsImNsb25lTm9kZSIsInd0b2tlbiIsInNvdW5kIiwiQXVkaW8iLCJwbGF5Iiwibm90aWZpeSIsInB1dCIsIm5peGllIiwibnVtYmVycyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJOb3RpZmljYXRpb24iLCJyZXF1ZXN0UGVybWlzc2lvbiIsInN0YXR1cyIsImJlZ2luIiwib250cmlwbGVwcmVzcyIsIm9uY2xpY2siLCJvbmtleWRvd24iLCJtc2ciLCJwZXJtaXNzaW9uIiwiZ2V0UmVnaXN0cmF0aW9uIiwicmVnaXN0cmF0aW9uIiwibm90aWZpY2F0aW9uIiwic2hvd05vdGlmaWNhdGlvbiIsInRhZyIsInJlbm90aWZ5IiwicmVxdWlyZUludGVyYWN0aW9uIiwiaWNvbiIsInNpbGVudCIsImltYWdlIiwicGFyZW50IiwiZm9jdXMiLCJjbG9zZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJwcmVzc2VzIiwiZGVib3VuY2VLZXkiLCJjdXJyZW50S2V5IiwiY291bnRjb3VudCIsImRlYm91bmNlIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInJlc2V0RGVib3VuY2UiLCJjYWxsYmFjayIsInJ1bm5pbmciLCJtb21lbnQiLCJzdGFydFRpbWUiLCJEYXRlIiwibm93IiwiY2xlYXJJbnRlcnZhbCIsImludGVydmFsIiwidGltZSIsIm1zIiwic2V0SW50ZXJ2YWwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcGxhY2UiLCJqb2luIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFYTs7OztBQUViLElBQUlBLENBQUMsR0FBRyxRQUFPQyxPQUFQLHlDQUFPQSxPQUFQLE9B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QUw7QUFFQSxhQUFPLElBQUl1SCxPQUFKLENBQ0wsVUFBQUMsT0FBTyxFQUFJO0FBQ1QsYUFBSSxDQUFDMUssT0FBTCxDQUFhYSxJQUFiLENBQWtCLFNBQWxCLEVBQTZCNkosT0FBN0I7QUFDRCxPQUhJLEVBSUwsVUFBQUMsTUFBTSxFQUFJO0FBQ1IsYUFBSSxDQUFDM0ssT0FBTCxDQUFhYSxJQUFiLENBQWtCLFFBQWxCLEVBQTRCOEosTUFBNUI7QUFDRCxPQU5JLENBQVA7QUFRRDs7OzZCQUVRLENBQUU7OztzQkFoREFiLFEsRUFBVTtBQUNuQixXQUFLOUosT0FBTCxDQUFhRyxFQUFiLENBQWdCLE1BQWhCLEVBQXdCMkosUUFBeEI7QUFDRDs7O3dCQUVlO0FBQ2QsYUFBTyxLQUFLQyxPQUFaO0FBQ0Q7OztzQkFFYUQsUSxFQUFVO0FBQ3RCLFdBQUs5SixPQUFMLENBQWFHLEVBQWIsQ0FBZ0IsU0FBaEIsRUFBMkIySixRQUEzQjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCSGhOLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNmOzs7Ozs7QUFNQWtILFlBUGUsc0JBT0p6SSxNQVBJLEVBT0lpSSxNQVBKLEVBT1ltSCxPQVBaLEVBT3FCO0FBQ2xDLFdBQU9wUCxNQUFNLENBQUNtSSxLQUFQLENBQWFGLE1BQWIsRUFBcUJvSCxJQUFyQixDQUEwQkQsT0FBMUIsQ0FBUDtBQUNEO0FBVGMsQ0FBakIsQyIsImZpbGUiOiJpbmRleC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiAkZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiAkZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gJGdldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIFJlZmxlY3RBcHBseSh0aGlzLmxpc3RlbmVyLCB0aGlzLnRhcmdldCwgYXJncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1yZXR1cm4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtZ2xvYmFscyAqL1xuXG5pbXBvcnQgXCIuLi9zY3NzL2FwcC5zY3NzXCI7XG5pbXBvcnQgeyByZXBsYWNlQWxsIH0gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IHsgVGltZXIgfSBmcm9tIFwiLi90aW1lclwiO1xuaW1wb3J0IHsgS2V5cyB9IGZyb20gXCIuL2tleXNcIjtcbi8qKlxuICogVE9ETzogc2F2ZSB0aGUgY3VycmVudCB0aW1lciB0aW1lIGJldHdlZW4gcmVmcmVzaGVzXG4gKiBUT0RPOiBrZWVwIHRyYWNrIG9mIGhvdyBtYW55IG1pbnV0ZXMgZWFjaCB0YXNrJ3MgcG9tb2Rvcm8gd2FzXG4gKiBUT0RPOiBkaXNwbGF5IHRhc2sgc3RhdHNcbiAqIFRPRE86IGFuZCBhICdmaW5pc2hlZCcgc3RhdGUgYWZ0ZXIgeCBwb21vZG9yb3MgdG8gc3RvcCB3b3JraW5nLlxuICogVE9ETzogYWRkIGEgJ2NvbnRpbnVlJyBzdGF0ZSBhZnRlciB0aW1lciBmaW5pc2hlcyBiZWZvcmUgY29udGludWVpbmcuXG4gKiBUT0RPOiBhbGxvdyBtb3JlIHRpbWUgdG8gYmUgYWRkZWQgZnJvbSBub3RpZmljYXRpb24gKCsyIG1pbnV0ZXMpLlxuICovXG5cbi8qKlxuICogQ0hBTkdFTE9HOlxuICpcbiAqIC0gc3RvcmUgbnVtYmVyIG9mIGNvbXBsZXRlZCB0YXNrcyBpbiBpbmRleGVkREIgYW5kIGRpc3BsYXkgbnVtYmVyIG9mIGNvbXBsZXRlZCB0YXNrcyB3aGVuIGNvcnJlc3BvbmRpbmcgdGFzayBpcyByZS1zdGFydGVkLlxuICogIyMjIyMjIFR1ZSBBcHIgMjMgMjI6MDE6NTEgTURUIDIwMTlcbiAqIC0gYnVnZml4IHRpbWVyIG5vdCBzdGFydGluZyBhZnRlciBicmVha1xuICogLSBidWdmaXggY2xpY2tpbmcgbm90aWZpY2F0aW9uIGJyaW5ncyB1cCB0YWJcbiAqIC0gYWRkZWQgY3VzdG9tIHNvdW5kIHBsYXllZCBvbiB0aW1lciBjb21wbGV0aW9uLlxuICovXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2dyZXNzXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcblxuY29uc3Qgbml4aWUzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuaXhpZTNcIik7XG5jb25zdCBuaXhpZTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5peGllMlwiKTtcbmNvbnN0IG5peGllMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibml4aWUxXCIpO1xuY29uc3Qgbml4aWUwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuaXhpZTBcIik7XG5cbmNvbnN0IHRva2VuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2tlblwiKTtcbmNvbnN0IHRpbWVyID0gbmV3IFRpbWVyKCk7XG5jb25zdCBrZXlzID0gbmV3IEtleXMoKTtcblxudGltZXIub250aWNrID0gdXBkYXRlO1xudGltZXIub25leHBpcmVkID0gdGFza0ZpbmlzaGVkO1xuXG5sZXQgc3RhdGUgPSBcInN0YXJ0XCI7XG5sZXQgaXRlcmF0aW9uID0gMTtcbmxldCBkYjtcblxuLy8gcGFyc2UgdGhlIHF1ZXJ5IHNlbGVjdG9yIGluIHRoZSB1cmxcbmNvbnN0IHFkID0ge307XG5pZiAobG9jYXRpb24uc2VhcmNoKSB7XG4gIGxvY2F0aW9uLnNlYXJjaFxuICAgIC5zdWJzdHIoMSlcbiAgICAuc3BsaXQoXCImXCIpXG4gICAgLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCBzID0gaXRlbS5zcGxpdChcIj1cIik7XG4gICAgICBjb25zdCBrID0gc1swXTtcbiAgICAgIGNvbnN0IHYgPSBzWzFdICYmIHJlcGxhY2VBbGwoZGVjb2RlVVJJQ29tcG9uZW50KHNbMV0pLCAvXFwrLywgXCIgXCIpOyAvLyAgbnVsbC1jb2FsZXNjaW5nIC8gc2hvcnQtY2lyY3VpdFxuICAgICAgKHFkW2tdID0gcWRba10gfHwgW10pLnB1c2godik7IC8vIG51bGwtY29hbGVzY2luZyAvIHNob3J0LWNpcmN1aXRcbiAgICB9KTtcbn1cblxuY29uc3QgcmVxdWVzdCA9IHdpbmRvdy5pbmRleGVkREIub3BlbihcIm5pZ2h0c2hhZGUtZGJcIiwgMSk7XG5cbnJlcXVlc3Qub25zdWNjZXNzID0gZSA9PiB7XG4gIGRiID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcblxuICBjb25zdCBzdG9yZSA9IGRiLnRyYW5zYWN0aW9uKFtcInRhc2tzXCJdLCBcInJlYWRvbmx5XCIpLm9iamVjdFN0b3JlKFwidGFza3NcIik7XG5cbiAgaWYgKHFkLnRhc2spIHtcbiAgICBzdG9yZS5nZXQocWQudGFzaykub25zdWNjZXNzID0gZSA9PiB7XG4gICAgICAvLyBjaGVjayBpZiB0aGVyZSB3YXMgYW4gZXhpc3RpbmcgY291bnQgb3RoZXJ3aXNlIHN0YXJ0IGFuZXcuXG4gICAgICBjb25zdCBjb3VudCA9IChlLnRhcmdldC5yZXN1bHQgJiYgZS50YXJnZXQucmVzdWx0LmNvbXBsZXRlZCkgfHwgMCB8fCAwO1xuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY291bnQ7IGluZGV4KyspIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9ncmVzc1wiKS5hcHBlbmRDaGlsZChnZXRXb3JrVG9rZW4oKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufTtcblxucmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBlID0+IHtcbiAgY29uc3QgZGIgPSBlLnRhcmdldC5yZXN1bHQ7XG4gIGNvbnN0IG9iamVjdFN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoXCJ0YXNrc1wiLCB7IGtleVBhdGg6IFwibmFtZVwiIH0pO1xuXG4gIG9iamVjdFN0b3JlLmNyZWF0ZUluZGV4KFwiY29tcGxldGVkXCIsIFwiY29tcGxldGVkXCIsIHsgdW5pcXVlOiBmYWxzZSB9KTtcbn07XG5cbi8vIGluaXRpYWxpemUgcHJvZ3JhbSBhcmd1bWVudHMuXG5cbmNvbnN0IHdvcmtzcGFuID0gcWQudGltZXIgfHwgMjA7XG5jb25zdCBicmVha3NwYW4gPSBxZC5icmVhayB8fCA0O1xubGV0IGZpbmlzaGVkID0gdHJ1ZTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgaWYgKHFkLnRhc2sgIT09IHVuZGVmaW5lZCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcblxuICAgIHNldFRpbWVyKHdvcmtzcGFuKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuICB9XG59O1xuXG5mdW5jdGlvbiB1cGRhdGUobWludXRlcywgc2Vjb25kcykge1xuICBkb2N1bWVudC50aXRsZSA9IGAke21pbnV0ZXMudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7XG4gICAgbWluaW11bUludGVnZXJEaWdpdHM6IDJcbiAgfSl9OiR7c2Vjb25kcy50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHtcbiAgICBtaW5pbXVtSW50ZWdlckRpZ2l0czogMlxuICB9KX0gJHtxZC50YXNrfWA7XG5cbiAgc2V0Tml4aWUobml4aWUzLCBNYXRoLmZsb29yKG1pbnV0ZXMgLyAxMCkpO1xuICBzZXROaXhpZShuaXhpZTIsIE1hdGguZmxvb3IobWludXRlcyAlIDEwKSk7XG4gIHNldE5peGllKG5peGllMSwgTWF0aC5mbG9vcihzZWNvbmRzIC8gMTApKTtcbiAgc2V0Tml4aWUobml4aWUwLCBNYXRoLmZsb29yKHNlY29uZHMgJSAxMCkpO1xufVxuXG5pZiAoXCJzZXJ2aWNlV29ya2VyXCIgaW4gbmF2aWdhdG9yKSB7XG4gIGNvbnNvbGUubG9nKFwic3cgc3VwcG9ydGVkXCIpO1xuICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5yZWdpc3RlcihcInN3LmJ1bmRsZS5qc1wiKS50aGVuKFxuICAgIHN3ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBcIlNlcnZpY2VXb3JrZXIgcmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwgd2l0aCBzY29wZTogXCIsXG4gICAgICAgIHN3LnNjb3BlXG4gICAgICApO1xuICAgIH0sXG4gICAgZXJyID0+IHtcbiAgICAgIC8vIHJlZ2lzdHJhdGlvbiBmYWlsZWQgOihcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gZmFpbGVkOiBcIiwgZXJyKTtcbiAgICB9XG4gICk7XG59XG5cbi8qKlxuICogU3RhcnRzIGEgdGltZXIgZm9yIHRoZSBjdXJyZW50IHRhc2suXG4gKiBAcGFyYW0ge251bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kc1xuICovXG5mdW5jdGlvbiBzZXRUaW1lcihhbW91bnQpIHtcbiAgY29uc29sZS5sb2coXCJzdGFydGluZyB0aW1lclwiKTtcbiAgdGltZXIuc3RhcnQoYW1vdW50KTtcbiAgc3RhdGUgPSBcIndvcmtcIjtcblxuICBkb2N1bWVudFxuICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilcbiAgICAuaXRlbSgwKVxuICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYnJlYWtcIik7XG59XG5cbi8qKlxuICogU3RhcnRzIGEgdGltZXIgZm9yIGEgYnJlYWsuXG4gKiBAcGFyYW0ge251bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kc1xuICovXG5mdW5jdGlvbiBicmVhdGhlcihhbW91bnQpIHtcbiAgc3RhdGUgPSBcImJyZWFrXCI7XG4gIGZpbmlzaGVkID0gZmFsc2U7XG5cbiAgdGltZXIuc3RhcnQoYW1vdW50KTtcblxuICBkb2N1bWVudFxuICAgIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilcbiAgICAuaXRlbSgwKVxuICAgIC5jbGFzc0xpc3QuYWRkKFwiYnJlYWtcIik7XG59XG5cbmZ1bmN0aW9uIGdldEJyZWFrVG9rZW4oKSB7XG4gIGNvbnN0IGJ0b2tlbiA9IHRva2VuLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICBidG9rZW4uZ2V0RWxlbWVudEJ5SWQoXCJpY29uXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJ3b3JrXCIpO1xuICBidG9rZW4uZ2V0RWxlbWVudEJ5SWQoXCJpY29uXCIpLmNsYXNzTGlzdC5hZGQoXCJicmVha1wiKTtcbiAgcmV0dXJuIGJ0b2tlbjtcbn1cblxuZnVuY3Rpb24gZ2V0V29ya1Rva2VuKCkge1xuICBjb25zdCB3dG9rZW4gPSB0b2tlbi5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgcmV0dXJuIHd0b2tlbjtcbn1cblxuZnVuY3Rpb24gdGFza0ZpbmlzaGVkKCkge1xuICBmaW5pc2hlZCA9IHRydWU7XG5cbiAgY29uc3Qgc291bmQgPSBuZXcgQXVkaW8oXCJzb3VuZHMvdGVtcGxlLWJlbGwubXAzXCIpO1xuICBzb3VuZC5wbGF5KCkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpKTtcblxuICBub3RpZml5KFwiVGltZXMgdXBcIik7XG5cbiAgaXRlcmF0aW9uKys7XG5cbiAgZG9jdW1lbnQudGl0bGUgPSBgZmluaXNoZWQgJHtxZC50YXNrfWA7XG5cbiAgZG9jdW1lbnRcbiAgICAuZ2V0RWxlbWVudEJ5SWQoXCJwcm9ncmVzc1wiKVxuICAgIC5hcHBlbmRDaGlsZChzdGF0ZSA9PT0gXCJ3b3JrXCIgPyBnZXRXb3JrVG9rZW4oKSA6IGdldEJyZWFrVG9rZW4oKSk7XG5cbiAgLy8gaW5jcmVtZW50IGhvdyBtYW55IHRpbWVzIHRoaXMgdGFzayB3YXMgY29tcGxldGVkIGluIHRoZSBkYXRhYmFzZS5cbiAgY29uc3Qgc3RvcmUgPSBkYi50cmFuc2FjdGlvbihbXCJ0YXNrc1wiXSwgXCJyZWFkd3JpdGVcIikub2JqZWN0U3RvcmUoXCJ0YXNrc1wiKTtcblxuICBzdG9yZS5nZXQocWQudGFzaykub25zdWNjZXNzID0gZSA9PiB7XG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgd2FzIGFuIGV4aXN0aW5nIGNvdW50IG90aGVyd2lzZSBzdGFydCBhbmV3LlxuICAgIGNvbnN0IGNvdW50ID0gKGUudGFyZ2V0LnJlc3VsdCAmJiBlLnRhcmdldC5yZXN1bHQuY29tcGxldGVkKSB8fCAwO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBkYXRhYmFzZSBjb3VudCBmb3IgdGhlIHRhc2tcbiAgICBzdG9yZS5wdXQoeyBuYW1lOiBxZC50YXNrLCBjb21wbGV0ZWQ6IGNvdW50ICsgMSB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0Tml4aWUobml4aWUsIHZhbHVlKSB7XG4gIGNvbnN0IG51bWJlcnMgPSBuaXhpZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNwYW5cIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgIG51bWJlcnNbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgfVxuICBpZiAodmFsdWUgPj0gMCAmJiB2YWx1ZSA8PSA5KSB7XG4gICAgbml4aWVcbiAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHZhbHVlKVxuICAgICAgLml0ZW0oMClcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9XG59XG5cbk5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihzdGF0dXMgPT4ge1xuICBjb25zb2xlLmxvZyhcIk5vdGlmaWNhdGlvbiBwZXJtaXNzaW9uIHN0YXR1czpcIiwgc3RhdHVzKTtcbn0pO1xuXG5mdW5jdGlvbiBiZWdpbigpIHtcbiAgaWYgKCFmaW5pc2hlZCkgcmV0dXJuO1xuXG4gIGlmIChzdGF0ZSA9PT0gXCJicmVha1wiKSB7XG4gICAgc2V0VGltZXIod29ya3NwYW4pO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoc3RhdGUgPT09IFwid29ya1wiKSB7XG4gICAgYnJlYXRoZXIoaXRlcmF0aW9uID4gMCAmJiBpdGVyYXRpb24gJSA0ID09IDAgPyAyICogYnJlYWtzcGFuIDogYnJlYWtzcGFuKTtcbiAgICByZXR1cm47XG4gIH1cbn1cblxua2V5cy5vbnRyaXBsZXByZXNzID0gZSA9PiB7XG4gIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgIGlmIChzdGF0ZSA9PT0gXCJ3b3JrXCIpIHtcbiAgICAgIGJyZWF0aGVyKGJyZWFrc3Bhbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzdGF0ZSA9PT0gXCJicmVha1wiKSB7XG4gICAgICBzZXRUaW1lcih3b3Jrc3Bhbik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG59O1xuXG53aW5kb3cub25jbGljayA9IGJlZ2luO1xuXG5kb2N1bWVudC5vbmtleWRvd24gPSBlID0+IHtcbiAgaWYgKGUua2V5ID09PSBcIiBcIikge1xuICAgIGJlZ2luKCk7XG4gICAgcmV0dXJuO1xuICB9XG59O1xuXG5mdW5jdGlvbiBub3RpZml5KG1zZykge1xuICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09IFwiZ3JhbnRlZFwiKSB7XG4gICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuZ2V0UmVnaXN0cmF0aW9uKCkudGhlbihyZWdpc3RyYXRpb24gPT4ge1xuICAgICAgY29uc3Qgbm90aWZpY2F0aW9uID0gcmVnaXN0cmF0aW9uLnNob3dOb3RpZmljYXRpb24obXNnLCB7XG4gICAgICAgIHRhZzogXCJ0YXNrXCIsXG4gICAgICAgIHJlbm90aWZ5OiB0cnVlLFxuICAgICAgICByZXF1aXJlSW50ZXJhY3Rpb246IHRydWUsXG4gICAgICAgIGljb246IFwiaW1hZ2VzL2ljb25zL2ljb24tNzJ4NzIucG5nXCIsXG4gICAgICAgIHNpbGVudDogdHJ1ZSxcbiAgICAgICAgaW1hZ2U6XG4gICAgICAgICAgXCJodHRwczovL3N0YXRpYzEuc3F1YXJlc3BhY2UuY29tL3N0YXRpYy81M2ZjY2RjM2U0YjA2ZDU5ODg5MDczN2QvNTQyMzFkZmZlNGIwN2JiNTU4YjFlMGQyLzU0MjMxZTMxZTRiMDU3MjEyZjE1N2VjNS8xNTE3OTQ3ODg2MTA4L0dJTkdFUldISVRFQ09GRkVFTEFORC5qcGdcIlxuICAgICAgfSk7XG5cbiAgICAgIG5vdGlmaWNhdGlvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBwYXJlbnQuZm9jdXMoKTtcbiAgICAgICAgd2luZG93LmZvY3VzKCk7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJldmVudHNcIjtcclxuXHJcbmNsYXNzIEtleXMge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGUgPT4ge1xyXG4gICAgICBjb25zdCBwcmVzc2VzID0gdGhpcy5kZWJvdW5jZUtleShlLmtleSk7XHJcblxyXG4gICAgICBpZiAocHJlc3NlcyA+PSAzKSB7XHJcbiAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQoXCJ0cmlwbGVQcmVzc1wiLCBlKTtcclxuICAgICAgICB0aGlzLmRlYm91bmNlS2V5KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2V0IG9udHJpcGxlcHJlc3MoY2FsbGJhY2spIHtcclxuICAgIHRoaXMuZW1pdHRlci5vbihcInRyaXBsZVByZXNzXCIsIGNhbGxiYWNrKTtcclxuICB9XHJcblxyXG4gIHJlc2V0RGVib3VuY2UoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRLZXkgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmNvdW50Y291bnQgPSAwO1xyXG4gIH1cclxuXHJcbiAgZGVib3VuY2VLZXkoa2V5KSB7XHJcbiAgICBpZiAoIWtleSkge1xyXG4gICAgICB0aGlzLmNvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoa2V5ICE9PSB0aGlzLmN1cnJlbnRLZXkpIHtcclxuICAgICAgdGhpcy5jb3VudCA9IDA7XHJcbiAgICAgIHRoaXMuY3VycmVudEtleSA9IGtleTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvdW50ICs9IDE7XHJcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNvdW50O1xyXG5cclxuICAgIGlmICh0aGlzLmRlYm91bmNlKSBjbGVhclRpbWVvdXQodGhpcy5kZWJvdW5jZSk7XHJcbiAgICB0aGlzLmRlYm91bmNlID0gc2V0VGltZW91dCh0aGlzLnJlc2V0RGVib3VuY2UsIDIwMCk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEtleXMgfTtcclxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xyXG5cclxuY2xhc3MgVGltZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXQgb250aWNrKGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLmVtaXR0ZXIub24oXCJ0aWNrXCIsIGNhbGxiYWNrKTtcclxuICB9XHJcblxyXG4gIGdldCBpc1J1bm5pbmcoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ydW5uaW5nO1xyXG4gIH1cclxuXHJcbiAgc2V0IG9uZXhwaXJlZChjYWxsYmFjaykge1xyXG4gICAgdGhpcy5lbWl0dGVyLm9uKFwiZXhwaXJlZFwiLCBjYWxsYmFjayk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBjb25zdCBtb21lbnQgPSB0aGlzLnN0YXJ0VGltZSAtIERhdGUubm93KCk7XHJcblxyXG4gICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKG1vbWVudCAvIDEwMDAgLyA2MCk7XHJcbiAgICBsZXQgc2Vjb25kcyA9IE1hdGguZmxvb3IoKG1vbWVudCAvIDEwMDApICUgNjApO1xyXG5cclxuICAgIGlmIChtb21lbnQgPD0gMCkge1xyXG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgbWludXRlcyA9IDA7XHJcbiAgICAgIHNlY29uZHMgPSAwO1xyXG4gICAgICB0aGlzLmVtaXR0ZXIuZW1pdChcImV4cGlyZWRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbWl0dGVyLmVtaXQoXCJ0aWNrXCIsIG1pbnV0ZXMsIHNlY29uZHMpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQodGltZSkge1xyXG4gICAgdGhpcy5ydW5uaW5nID0gdHJ1ZTtcclxuICAgIGNvbnN0IG1zID0gdGltZSAqIDEwMDAgKiA2MDtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKSArIG1zO1xyXG4gICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH0sIDEwMCk7XHJcbiAgICB0aGlzLnVwZGF0ZSgpO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShcclxuICAgICAgcmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgdGhpcy5lbWl0dGVyLm9uY2UoXCJleHBpcmVkXCIsIHJlc29sdmUpO1xyXG4gICAgICB9LFxyXG4gICAgICByZWplY3QgPT4ge1xyXG4gICAgICAgIHRoaXMuZW1pdHRlci5vbmNlKFwiY2FuY2VsXCIsIHJlamVjdCk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjYW5jZWwoKSB7fVxyXG59XHJcblxyXG5leHBvcnQgeyBUaW1lciB9O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAvKipcclxuICAgKiBSZXBsYWNlcyBhbGwgb2NjdXJlbmNlcyBvZiB0aGUgc2VhcmNoIHBhdHRlcm4gd2l0aCB0aGUgZ2l2ZW4gcmVwbGFjZW1lbnQuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldCB0aGUgc3RyaW5nIG9uIHdpdGNoIHRvIGFwcGx5IHRoZSByZXBsYWNlbWVudHNcclxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWdleH0gc2VhcmNoIHRoZSBwYXR0ZXJuIHRvIHJlcGxhY2VcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwbGFjZSB0aGUgcmVwbGFjZW1lbnQgdmFsdWUuXHJcbiAgICovXHJcbiAgcmVwbGFjZUFsbCh0YXJnZXQsIHNlYXJjaCwgcmVwbGFjZSkge1xyXG4gICAgcmV0dXJuIHRhcmdldC5zcGxpdChzZWFyY2gpLmpvaW4ocmVwbGFjZSk7XHJcbiAgfVxyXG59O1xyXG4iXSwic291cmNlUm9vdCI6IiJ9