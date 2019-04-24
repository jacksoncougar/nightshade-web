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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/timer.js");
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
    key: "ontick",
    value: function ontick(callback) {
      this.emitter.on("tick", callback);
    }
  }, {
    key: "onexpired",
    value: function onexpired(callback) {
      this.emitter.on("expired", callback);
    }
  }, {
    key: "update",
    value: function update() {
      var moment = this.start - Date.now();
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
      this.start = Date.now() + ms;
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
    key: "isRunning",
    get: function get() {
      return this.running;
    }
  }]);

  return Timer;
}();

var timer = new Timer();
timer.start(0.1).then(function () {
  return console.log("got here");
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpbWVyLmpzIl0sIm5hbWVzIjpbIlIiLCJSZWZsZWN0IiwiUmVmbGVjdEFwcGx5IiwiYXBwbHkiLCJ0YXJnZXQiLCJyZWNlaXZlciIsImFyZ3MiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsImNhbGwiLCJSZWZsZWN0T3duS2V5cyIsIm93bktleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiY29uY2F0IiwiUHJvY2Vzc0VtaXRXYXJuaW5nIiwid2FybmluZyIsImNvbnNvbGUiLCJ3YXJuIiwiTnVtYmVySXNOYU4iLCJOdW1iZXIiLCJpc05hTiIsInZhbHVlIiwiRXZlbnRFbWl0dGVyIiwiaW5pdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJfZXZlbnRzIiwidW5kZWZpbmVkIiwiX2V2ZW50c0NvdW50IiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJzZXQiLCJhcmciLCJSYW5nZUVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJjcmVhdGUiLCJzZXRNYXhMaXN0ZW5lcnMiLCJuIiwiJGdldE1heExpc3RlbmVycyIsInRoYXQiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlbWl0IiwidHlwZSIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJwdXNoIiwiZG9FcnJvciIsImV2ZW50cyIsImVycm9yIiwiZXIiLCJFcnJvciIsImVyciIsIm1lc3NhZ2UiLCJjb250ZXh0IiwiaGFuZGxlciIsImxlbiIsImxpc3RlbmVycyIsImFycmF5Q2xvbmUiLCJfYWRkTGlzdGVuZXIiLCJsaXN0ZW5lciIsInByZXBlbmQiLCJtIiwiZXhpc3RpbmciLCJUeXBlRXJyb3IiLCJuZXdMaXN0ZW5lciIsInVuc2hpZnQiLCJ3YXJuZWQiLCJ3IiwiU3RyaW5nIiwibmFtZSIsImVtaXR0ZXIiLCJjb3VudCIsImFkZExpc3RlbmVyIiwib24iLCJwcmVwZW5kTGlzdGVuZXIiLCJvbmNlV3JhcHBlciIsImZpcmVkIiwicmVtb3ZlTGlzdGVuZXIiLCJ3cmFwRm4iLCJfb25jZVdyYXAiLCJzdGF0ZSIsIndyYXBwZWQiLCJiaW5kIiwib25jZSIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0IiwicG9zaXRpb24iLCJvcmlnaW5hbExpc3RlbmVyIiwic2hpZnQiLCJzcGxpY2VPbmUiLCJvZmYiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJrZXlzIiwia2V5IiwiX2xpc3RlbmVycyIsInVud3JhcCIsImV2bGlzdGVuZXIiLCJ1bndyYXBMaXN0ZW5lcnMiLCJyYXdMaXN0ZW5lcnMiLCJsaXN0ZW5lckNvdW50IiwiZXZlbnROYW1lcyIsImFyciIsImNvcHkiLCJBcnJheSIsImluZGV4IiwicG9wIiwicmV0IiwiVGltZXIiLCJydW5uaW5nIiwiY2FsbGJhY2siLCJtb21lbnQiLCJzdGFydCIsIkRhdGUiLCJub3ciLCJtaW51dGVzIiwiTWF0aCIsImZsb29yIiwic2Vjb25kcyIsImNsZWFySW50ZXJ2YWwiLCJpbnRlcnZhbCIsInRpbWUiLCJtcyIsInNldEludGVydmFsIiwidXBkYXRlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ0aW1lciIsInRoZW4iLCJsb2ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVhOzs7O0FBRWIsSUFBSUEsQ0FBQyxHQUFHLFFBQU9DLE9BQVAseUNBQU9BLE9BQVAsT0FBbUIsUUFBbkIsR0FBOEJBLE9BQTlCLEdBQXdDLElBQWhEO0FBQ0EsSUFBSUMsWUFBWSxHQUFHRixDQUFDLElBQUksT0FBT0EsQ0FBQyxDQUFDRyxLQUFULEtBQW1CLFVBQXhCLEdBQ2ZILENBQUMsQ0FBQ0csS0FEYSxHQUVmLFNBQVNELFlBQVQsQ0FBc0JFLE1BQXRCLEVBQThCQyxRQUE5QixFQUF3Q0MsSUFBeEMsRUFBOEM7QUFDOUMsU0FBT0MsUUFBUSxDQUFDQyxTQUFULENBQW1CTCxLQUFuQixDQUF5Qk0sSUFBekIsQ0FBOEJMLE1BQTlCLEVBQXNDQyxRQUF0QyxFQUFnREMsSUFBaEQsQ0FBUDtBQUNELENBSkg7QUFNQSxJQUFJSSxjQUFKOztBQUNBLElBQUlWLENBQUMsSUFBSSxPQUFPQSxDQUFDLENBQUNXLE9BQVQsS0FBcUIsVUFBOUIsRUFBMEM7QUFDeENELGdCQUFjLEdBQUdWLENBQUMsQ0FBQ1csT0FBbkI7QUFDRCxDQUZELE1BRU8sSUFBSUMsTUFBTSxDQUFDQyxxQkFBWCxFQUFrQztBQUN2Q0gsZ0JBQWMsR0FBRyxTQUFTQSxjQUFULENBQXdCTixNQUF4QixFQUFnQztBQUMvQyxXQUFPUSxNQUFNLENBQUNFLG1CQUFQLENBQTJCVixNQUEzQixFQUNKVyxNQURJLENBQ0dILE1BQU0sQ0FBQ0MscUJBQVAsQ0FBNkJULE1BQTdCLENBREgsQ0FBUDtBQUVELEdBSEQ7QUFJRCxDQUxNLE1BS0E7QUFDTE0sZ0JBQWMsR0FBRyxTQUFTQSxjQUFULENBQXdCTixNQUF4QixFQUFnQztBQUMvQyxXQUFPUSxNQUFNLENBQUNFLG1CQUFQLENBQTJCVixNQUEzQixDQUFQO0FBQ0QsR0FGRDtBQUdEOztBQUVELFNBQVNZLGtCQUFULENBQTRCQyxPQUE1QixFQUFxQztBQUNuQyxNQUFJQyxPQUFPLElBQUlBLE9BQU8sQ0FBQ0MsSUFBdkIsRUFBNkJELE9BQU8sQ0FBQ0MsSUFBUixDQUFhRixPQUFiO0FBQzlCOztBQUVELElBQUlHLFdBQVcsR0FBR0MsTUFBTSxDQUFDQyxLQUFQLElBQWdCLFNBQVNGLFdBQVQsQ0FBcUJHLEtBQXJCLEVBQTRCO0FBQzVELFNBQU9BLEtBQUssS0FBS0EsS0FBakI7QUFDRCxDQUZEOztBQUlBLFNBQVNDLFlBQVQsR0FBd0I7QUFDdEJBLGNBQVksQ0FBQ0MsSUFBYixDQUFrQmhCLElBQWxCLENBQXVCLElBQXZCO0FBQ0Q7O0FBQ0RpQixNQUFNLENBQUNDLE9BQVAsR0FBaUJILFlBQWpCLEMsQ0FFQTs7QUFDQUEsWUFBWSxDQUFDQSxZQUFiLEdBQTRCQSxZQUE1QjtBQUVBQSxZQUFZLENBQUNoQixTQUFiLENBQXVCb0IsT0FBdkIsR0FBaUNDLFNBQWpDO0FBQ0FMLFlBQVksQ0FBQ2hCLFNBQWIsQ0FBdUJzQixZQUF2QixHQUFzQyxDQUF0QztBQUNBTixZQUFZLENBQUNoQixTQUFiLENBQXVCdUIsYUFBdkIsR0FBdUNGLFNBQXZDLEMsQ0FFQTtBQUNBOztBQUNBLElBQUlHLG1CQUFtQixHQUFHLEVBQTFCO0FBRUFwQixNQUFNLENBQUNxQixjQUFQLENBQXNCVCxZQUF0QixFQUFvQyxxQkFBcEMsRUFBMkQ7QUFDekRVLFlBQVUsRUFBRSxJQUQ2QztBQUV6REMsS0FBRyxFQUFFLGVBQVc7QUFDZCxXQUFPSCxtQkFBUDtBQUNELEdBSndEO0FBS3pESSxLQUFHLEVBQUUsYUFBU0MsR0FBVCxFQUFjO0FBQ2pCLFFBQUksT0FBT0EsR0FBUCxLQUFlLFFBQWYsSUFBMkJBLEdBQUcsR0FBRyxDQUFqQyxJQUFzQ2pCLFdBQVcsQ0FBQ2lCLEdBQUQsQ0FBckQsRUFBNEQ7QUFDMUQsWUFBTSxJQUFJQyxVQUFKLENBQWUsb0dBQW9HRCxHQUFwRyxHQUEwRyxHQUF6SCxDQUFOO0FBQ0Q7O0FBQ0RMLHVCQUFtQixHQUFHSyxHQUF0QjtBQUNEO0FBVndELENBQTNEOztBQWFBYixZQUFZLENBQUNDLElBQWIsR0FBb0IsWUFBVztBQUU3QixNQUFJLEtBQUtHLE9BQUwsS0FBaUJDLFNBQWpCLElBQ0EsS0FBS0QsT0FBTCxLQUFpQmhCLE1BQU0sQ0FBQzJCLGNBQVAsQ0FBc0IsSUFBdEIsRUFBNEJYLE9BRGpELEVBQzBEO0FBQ3hELFNBQUtBLE9BQUwsR0FBZWhCLE1BQU0sQ0FBQzRCLE1BQVAsQ0FBYyxJQUFkLENBQWY7QUFDQSxTQUFLVixZQUFMLEdBQW9CLENBQXBCO0FBQ0Q7O0FBRUQsT0FBS0MsYUFBTCxHQUFxQixLQUFLQSxhQUFMLElBQXNCRixTQUEzQztBQUNELENBVEQsQyxDQVdBO0FBQ0E7OztBQUNBTCxZQUFZLENBQUNoQixTQUFiLENBQXVCaUMsZUFBdkIsR0FBeUMsU0FBU0EsZUFBVCxDQUF5QkMsQ0FBekIsRUFBNEI7QUFDbkUsTUFBSSxPQUFPQSxDQUFQLEtBQWEsUUFBYixJQUF5QkEsQ0FBQyxHQUFHLENBQTdCLElBQWtDdEIsV0FBVyxDQUFDc0IsQ0FBRCxDQUFqRCxFQUFzRDtBQUNwRCxVQUFNLElBQUlKLFVBQUosQ0FBZSxrRkFBa0ZJLENBQWxGLEdBQXNGLEdBQXJHLENBQU47QUFDRDs7QUFDRCxPQUFLWCxhQUFMLEdBQXFCVyxDQUFyQjtBQUNBLFNBQU8sSUFBUDtBQUNELENBTkQ7O0FBUUEsU0FBU0MsZ0JBQVQsQ0FBMEJDLElBQTFCLEVBQWdDO0FBQzlCLE1BQUlBLElBQUksQ0FBQ2IsYUFBTCxLQUF1QkYsU0FBM0IsRUFDRSxPQUFPTCxZQUFZLENBQUNRLG1CQUFwQjtBQUNGLFNBQU9ZLElBQUksQ0FBQ2IsYUFBWjtBQUNEOztBQUVEUCxZQUFZLENBQUNoQixTQUFiLENBQXVCcUMsZUFBdkIsR0FBeUMsU0FBU0EsZUFBVCxHQUEyQjtBQUNsRSxTQUFPRixnQkFBZ0IsQ0FBQyxJQUFELENBQXZCO0FBQ0QsQ0FGRDs7QUFJQW5CLFlBQVksQ0FBQ2hCLFNBQWIsQ0FBdUJzQyxJQUF2QixHQUE4QixTQUFTQSxJQUFULENBQWNDLElBQWQsRUFBb0I7QUFDaEQsTUFBSXpDLElBQUksR0FBRyxFQUFYOztBQUNBLE9BQUssSUFBSTBDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBOUIsRUFBc0NGLENBQUMsRUFBdkM7QUFBMkMxQyxRQUFJLENBQUM2QyxJQUFMLENBQVVGLFNBQVMsQ0FBQ0QsQ0FBRCxDQUFuQjtBQUEzQzs7QUFDQSxNQUFJSSxPQUFPLEdBQUlMLElBQUksS0FBSyxPQUF4QjtBQUVBLE1BQUlNLE1BQU0sR0FBRyxLQUFLekIsT0FBbEI7QUFDQSxNQUFJeUIsTUFBTSxLQUFLeEIsU0FBZixFQUNFdUIsT0FBTyxHQUFJQSxPQUFPLElBQUlDLE1BQU0sQ0FBQ0MsS0FBUCxLQUFpQnpCLFNBQXZDLENBREYsS0FFSyxJQUFJLENBQUN1QixPQUFMLEVBQ0gsT0FBTyxLQUFQLENBVDhDLENBV2hEOztBQUNBLE1BQUlBLE9BQUosRUFBYTtBQUNYLFFBQUlHLEVBQUo7QUFDQSxRQUFJakQsSUFBSSxDQUFDNEMsTUFBTCxHQUFjLENBQWxCLEVBQ0VLLEVBQUUsR0FBR2pELElBQUksQ0FBQyxDQUFELENBQVQ7O0FBQ0YsUUFBSWlELEVBQUUsWUFBWUMsS0FBbEIsRUFBeUI7QUFDdkI7QUFDQTtBQUNBLFlBQU1ELEVBQU4sQ0FIdUIsQ0FHYjtBQUNYLEtBUlUsQ0FTWDs7O0FBQ0EsUUFBSUUsR0FBRyxHQUFHLElBQUlELEtBQUosQ0FBVSxzQkFBc0JELEVBQUUsR0FBRyxPQUFPQSxFQUFFLENBQUNHLE9BQVYsR0FBb0IsR0FBdkIsR0FBNkIsRUFBckQsQ0FBVixDQUFWO0FBQ0FELE9BQUcsQ0FBQ0UsT0FBSixHQUFjSixFQUFkO0FBQ0EsVUFBTUUsR0FBTixDQVpXLENBWUE7QUFDWjs7QUFFRCxNQUFJRyxPQUFPLEdBQUdQLE1BQU0sQ0FBQ04sSUFBRCxDQUFwQjtBQUVBLE1BQUlhLE9BQU8sS0FBSy9CLFNBQWhCLEVBQ0UsT0FBTyxLQUFQOztBQUVGLE1BQUksT0FBTytCLE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDakMxRCxnQkFBWSxDQUFDMEQsT0FBRCxFQUFVLElBQVYsRUFBZ0J0RCxJQUFoQixDQUFaO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsUUFBSXVELEdBQUcsR0FBR0QsT0FBTyxDQUFDVixNQUFsQjtBQUNBLFFBQUlZLFNBQVMsR0FBR0MsVUFBVSxDQUFDSCxPQUFELEVBQVVDLEdBQVYsQ0FBMUI7O0FBQ0EsU0FBSyxJQUFJYixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHYSxHQUFwQixFQUF5QixFQUFFYixDQUEzQjtBQUNFOUMsa0JBQVksQ0FBQzRELFNBQVMsQ0FBQ2QsQ0FBRCxDQUFWLEVBQWUsSUFBZixFQUFxQjFDLElBQXJCLENBQVo7QUFERjtBQUVEOztBQUVELFNBQU8sSUFBUDtBQUNELENBMUNEOztBQTRDQSxTQUFTMEQsWUFBVCxDQUFzQjVELE1BQXRCLEVBQThCMkMsSUFBOUIsRUFBb0NrQixRQUFwQyxFQUE4Q0MsT0FBOUMsRUFBdUQ7QUFDckQsTUFBSUMsQ0FBSjtBQUNBLE1BQUlkLE1BQUo7QUFDQSxNQUFJZSxRQUFKOztBQUVBLE1BQUksT0FBT0gsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUNsQyxVQUFNLElBQUlJLFNBQUosQ0FBYyw2RUFBNEVKLFFBQTVFLENBQWQsQ0FBTjtBQUNEOztBQUVEWixRQUFNLEdBQUdqRCxNQUFNLENBQUN3QixPQUFoQjs7QUFDQSxNQUFJeUIsTUFBTSxLQUFLeEIsU0FBZixFQUEwQjtBQUN4QndCLFVBQU0sR0FBR2pELE1BQU0sQ0FBQ3dCLE9BQVAsR0FBaUJoQixNQUFNLENBQUM0QixNQUFQLENBQWMsSUFBZCxDQUExQjtBQUNBcEMsVUFBTSxDQUFDMEIsWUFBUCxHQUFzQixDQUF0QjtBQUNELEdBSEQsTUFHTztBQUNMO0FBQ0E7QUFDQSxRQUFJdUIsTUFBTSxDQUFDaUIsV0FBUCxLQUF1QnpDLFNBQTNCLEVBQXNDO0FBQ3BDekIsWUFBTSxDQUFDMEMsSUFBUCxDQUFZLGFBQVosRUFBMkJDLElBQTNCLEVBQ1lrQixRQUFRLENBQUNBLFFBQVQsR0FBb0JBLFFBQVEsQ0FBQ0EsUUFBN0IsR0FBd0NBLFFBRHBELEVBRG9DLENBSXBDO0FBQ0E7O0FBQ0FaLFlBQU0sR0FBR2pELE1BQU0sQ0FBQ3dCLE9BQWhCO0FBQ0Q7O0FBQ0R3QyxZQUFRLEdBQUdmLE1BQU0sQ0FBQ04sSUFBRCxDQUFqQjtBQUNEOztBQUVELE1BQUlxQixRQUFRLEtBQUt2QyxTQUFqQixFQUE0QjtBQUMxQjtBQUNBdUMsWUFBUSxHQUFHZixNQUFNLENBQUNOLElBQUQsQ0FBTixHQUFla0IsUUFBMUI7QUFDQSxNQUFFN0QsTUFBTSxDQUFDMEIsWUFBVDtBQUNELEdBSkQsTUFJTztBQUNMLFFBQUksT0FBT3NDLFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDbEM7QUFDQUEsY0FBUSxHQUFHZixNQUFNLENBQUNOLElBQUQsQ0FBTixHQUNUbUIsT0FBTyxHQUFHLENBQUNELFFBQUQsRUFBV0csUUFBWCxDQUFILEdBQTBCLENBQUNBLFFBQUQsRUFBV0gsUUFBWCxDQURuQyxDQUZrQyxDQUlsQztBQUNELEtBTEQsTUFLTyxJQUFJQyxPQUFKLEVBQWE7QUFDbEJFLGNBQVEsQ0FBQ0csT0FBVCxDQUFpQk4sUUFBakI7QUFDRCxLQUZNLE1BRUE7QUFDTEcsY0FBUSxDQUFDakIsSUFBVCxDQUFjYyxRQUFkO0FBQ0QsS0FWSSxDQVlMOzs7QUFDQUUsS0FBQyxHQUFHeEIsZ0JBQWdCLENBQUN2QyxNQUFELENBQXBCOztBQUNBLFFBQUkrRCxDQUFDLEdBQUcsQ0FBSixJQUFTQyxRQUFRLENBQUNsQixNQUFULEdBQWtCaUIsQ0FBM0IsSUFBZ0MsQ0FBQ0MsUUFBUSxDQUFDSSxNQUE5QyxFQUFzRDtBQUNwREosY0FBUSxDQUFDSSxNQUFULEdBQWtCLElBQWxCLENBRG9ELENBRXBEO0FBQ0E7O0FBQ0EsVUFBSUMsQ0FBQyxHQUFHLElBQUlqQixLQUFKLENBQVUsaURBQ0VZLFFBQVEsQ0FBQ2xCLE1BRFgsR0FDb0IsR0FEcEIsR0FDMEJ3QixNQUFNLENBQUMzQixJQUFELENBRGhDLEdBQ3lDLGFBRHpDLEdBRUUsMENBRkYsR0FHRSxnQkFIWixDQUFSO0FBSUEwQixPQUFDLENBQUNFLElBQUYsR0FBUyw2QkFBVDtBQUNBRixPQUFDLENBQUNHLE9BQUYsR0FBWXhFLE1BQVo7QUFDQXFFLE9BQUMsQ0FBQzFCLElBQUYsR0FBU0EsSUFBVDtBQUNBMEIsT0FBQyxDQUFDSSxLQUFGLEdBQVVULFFBQVEsQ0FBQ2xCLE1BQW5CO0FBQ0FsQyx3QkFBa0IsQ0FBQ3lELENBQUQsQ0FBbEI7QUFDRDtBQUNGOztBQUVELFNBQU9yRSxNQUFQO0FBQ0Q7O0FBRURvQixZQUFZLENBQUNoQixTQUFiLENBQXVCc0UsV0FBdkIsR0FBcUMsU0FBU0EsV0FBVCxDQUFxQi9CLElBQXJCLEVBQTJCa0IsUUFBM0IsRUFBcUM7QUFDeEUsU0FBT0QsWUFBWSxDQUFDLElBQUQsRUFBT2pCLElBQVAsRUFBYWtCLFFBQWIsRUFBdUIsS0FBdkIsQ0FBbkI7QUFDRCxDQUZEOztBQUlBekMsWUFBWSxDQUFDaEIsU0FBYixDQUF1QnVFLEVBQXZCLEdBQTRCdkQsWUFBWSxDQUFDaEIsU0FBYixDQUF1QnNFLFdBQW5EOztBQUVBdEQsWUFBWSxDQUFDaEIsU0FBYixDQUF1QndFLGVBQXZCLEdBQ0ksU0FBU0EsZUFBVCxDQUF5QmpDLElBQXpCLEVBQStCa0IsUUFBL0IsRUFBeUM7QUFDdkMsU0FBT0QsWUFBWSxDQUFDLElBQUQsRUFBT2pCLElBQVAsRUFBYWtCLFFBQWIsRUFBdUIsSUFBdkIsQ0FBbkI7QUFDRCxDQUhMOztBQUtBLFNBQVNnQixXQUFULEdBQXVCO0FBQ3JCLE1BQUkzRSxJQUFJLEdBQUcsRUFBWDs7QUFDQSxPQUFLLElBQUkwQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHQyxTQUFTLENBQUNDLE1BQTlCLEVBQXNDRixDQUFDLEVBQXZDO0FBQTJDMUMsUUFBSSxDQUFDNkMsSUFBTCxDQUFVRixTQUFTLENBQUNELENBQUQsQ0FBbkI7QUFBM0M7O0FBQ0EsTUFBSSxDQUFDLEtBQUtrQyxLQUFWLEVBQWlCO0FBQ2YsU0FBSzlFLE1BQUwsQ0FBWStFLGNBQVosQ0FBMkIsS0FBS3BDLElBQWhDLEVBQXNDLEtBQUtxQyxNQUEzQztBQUNBLFNBQUtGLEtBQUwsR0FBYSxJQUFiO0FBQ0FoRixnQkFBWSxDQUFDLEtBQUsrRCxRQUFOLEVBQWdCLEtBQUs3RCxNQUFyQixFQUE2QkUsSUFBN0IsQ0FBWjtBQUNEO0FBQ0Y7O0FBRUQsU0FBUytFLFNBQVQsQ0FBbUJqRixNQUFuQixFQUEyQjJDLElBQTNCLEVBQWlDa0IsUUFBakMsRUFBMkM7QUFDekMsTUFBSXFCLEtBQUssR0FBRztBQUFFSixTQUFLLEVBQUUsS0FBVDtBQUFnQkUsVUFBTSxFQUFFdkQsU0FBeEI7QUFBbUN6QixVQUFNLEVBQUVBLE1BQTNDO0FBQW1EMkMsUUFBSSxFQUFFQSxJQUF6RDtBQUErRGtCLFlBQVEsRUFBRUE7QUFBekUsR0FBWjtBQUNBLE1BQUlzQixPQUFPLEdBQUdOLFdBQVcsQ0FBQ08sSUFBWixDQUFpQkYsS0FBakIsQ0FBZDtBQUNBQyxTQUFPLENBQUN0QixRQUFSLEdBQW1CQSxRQUFuQjtBQUNBcUIsT0FBSyxDQUFDRixNQUFOLEdBQWVHLE9BQWY7QUFDQSxTQUFPQSxPQUFQO0FBQ0Q7O0FBRUQvRCxZQUFZLENBQUNoQixTQUFiLENBQXVCaUYsSUFBdkIsR0FBOEIsU0FBU0EsSUFBVCxDQUFjMUMsSUFBZCxFQUFvQmtCLFFBQXBCLEVBQThCO0FBQzFELE1BQUksT0FBT0EsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUNsQyxVQUFNLElBQUlJLFNBQUosQ0FBYyw2RUFBNEVKLFFBQTVFLENBQWQsQ0FBTjtBQUNEOztBQUNELE9BQUtjLEVBQUwsQ0FBUWhDLElBQVIsRUFBY3NDLFNBQVMsQ0FBQyxJQUFELEVBQU90QyxJQUFQLEVBQWFrQixRQUFiLENBQXZCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FORDs7QUFRQXpDLFlBQVksQ0FBQ2hCLFNBQWIsQ0FBdUJrRixtQkFBdkIsR0FDSSxTQUFTQSxtQkFBVCxDQUE2QjNDLElBQTdCLEVBQW1Da0IsUUFBbkMsRUFBNkM7QUFDM0MsTUFBSSxPQUFPQSxRQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ2xDLFVBQU0sSUFBSUksU0FBSixDQUFjLDZFQUE0RUosUUFBNUUsQ0FBZCxDQUFOO0FBQ0Q7O0FBQ0QsT0FBS2UsZUFBTCxDQUFxQmpDLElBQXJCLEVBQTJCc0MsU0FBUyxDQUFDLElBQUQsRUFBT3RDLElBQVAsRUFBYWtCLFFBQWIsQ0FBcEM7QUFDQSxTQUFPLElBQVA7QUFDRCxDQVBMLEMsQ0FTQTs7O0FBQ0F6QyxZQUFZLENBQUNoQixTQUFiLENBQXVCMkUsY0FBdkIsR0FDSSxTQUFTQSxjQUFULENBQXdCcEMsSUFBeEIsRUFBOEJrQixRQUE5QixFQUF3QztBQUN0QyxNQUFJMEIsSUFBSixFQUFVdEMsTUFBVixFQUFrQnVDLFFBQWxCLEVBQTRCNUMsQ0FBNUIsRUFBK0I2QyxnQkFBL0I7O0FBRUEsTUFBSSxPQUFPNUIsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUNsQyxVQUFNLElBQUlJLFNBQUosQ0FBYyw2RUFBNEVKLFFBQTVFLENBQWQsQ0FBTjtBQUNEOztBQUVEWixRQUFNLEdBQUcsS0FBS3pCLE9BQWQ7QUFDQSxNQUFJeUIsTUFBTSxLQUFLeEIsU0FBZixFQUNFLE9BQU8sSUFBUDtBQUVGOEQsTUFBSSxHQUFHdEMsTUFBTSxDQUFDTixJQUFELENBQWI7QUFDQSxNQUFJNEMsSUFBSSxLQUFLOUQsU0FBYixFQUNFLE9BQU8sSUFBUDs7QUFFRixNQUFJOEQsSUFBSSxLQUFLMUIsUUFBVCxJQUFxQjBCLElBQUksQ0FBQzFCLFFBQUwsS0FBa0JBLFFBQTNDLEVBQXFEO0FBQ25ELFFBQUksRUFBRSxLQUFLbkMsWUFBUCxLQUF3QixDQUE1QixFQUNFLEtBQUtGLE9BQUwsR0FBZWhCLE1BQU0sQ0FBQzRCLE1BQVAsQ0FBYyxJQUFkLENBQWYsQ0FERixLQUVLO0FBQ0gsYUFBT2EsTUFBTSxDQUFDTixJQUFELENBQWI7QUFDQSxVQUFJTSxNQUFNLENBQUM4QixjQUFYLEVBQ0UsS0FBS3JDLElBQUwsQ0FBVSxnQkFBVixFQUE0QkMsSUFBNUIsRUFBa0M0QyxJQUFJLENBQUMxQixRQUFMLElBQWlCQSxRQUFuRDtBQUNIO0FBQ0YsR0FSRCxNQVFPLElBQUksT0FBTzBCLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDckNDLFlBQVEsR0FBRyxDQUFDLENBQVo7O0FBRUEsU0FBSzVDLENBQUMsR0FBRzJDLElBQUksQ0FBQ3pDLE1BQUwsR0FBYyxDQUF2QixFQUEwQkYsQ0FBQyxJQUFJLENBQS9CLEVBQWtDQSxDQUFDLEVBQW5DLEVBQXVDO0FBQ3JDLFVBQUkyQyxJQUFJLENBQUMzQyxDQUFELENBQUosS0FBWWlCLFFBQVosSUFBd0IwQixJQUFJLENBQUMzQyxDQUFELENBQUosQ0FBUWlCLFFBQVIsS0FBcUJBLFFBQWpELEVBQTJEO0FBQ3pENEIsd0JBQWdCLEdBQUdGLElBQUksQ0FBQzNDLENBQUQsQ0FBSixDQUFRaUIsUUFBM0I7QUFDQTJCLGdCQUFRLEdBQUc1QyxDQUFYO0FBQ0E7QUFDRDtBQUNGOztBQUVELFFBQUk0QyxRQUFRLEdBQUcsQ0FBZixFQUNFLE9BQU8sSUFBUDtBQUVGLFFBQUlBLFFBQVEsS0FBSyxDQUFqQixFQUNFRCxJQUFJLENBQUNHLEtBQUwsR0FERixLQUVLO0FBQ0hDLGVBQVMsQ0FBQ0osSUFBRCxFQUFPQyxRQUFQLENBQVQ7QUFDRDtBQUVELFFBQUlELElBQUksQ0FBQ3pDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFDRUcsTUFBTSxDQUFDTixJQUFELENBQU4sR0FBZTRDLElBQUksQ0FBQyxDQUFELENBQW5CO0FBRUYsUUFBSXRDLE1BQU0sQ0FBQzhCLGNBQVAsS0FBMEJ0RCxTQUE5QixFQUNFLEtBQUtpQixJQUFMLENBQVUsZ0JBQVYsRUFBNEJDLElBQTVCLEVBQWtDOEMsZ0JBQWdCLElBQUk1QixRQUF0RDtBQUNIOztBQUVELFNBQU8sSUFBUDtBQUNELENBcERMOztBQXNEQXpDLFlBQVksQ0FBQ2hCLFNBQWIsQ0FBdUJ3RixHQUF2QixHQUE2QnhFLFlBQVksQ0FBQ2hCLFNBQWIsQ0FBdUIyRSxjQUFwRDs7QUFFQTNELFlBQVksQ0FBQ2hCLFNBQWIsQ0FBdUJ5RixrQkFBdkIsR0FDSSxTQUFTQSxrQkFBVCxDQUE0QmxELElBQTVCLEVBQWtDO0FBQ2hDLE1BQUllLFNBQUosRUFBZVQsTUFBZixFQUF1QkwsQ0FBdkI7QUFFQUssUUFBTSxHQUFHLEtBQUt6QixPQUFkO0FBQ0EsTUFBSXlCLE1BQU0sS0FBS3hCLFNBQWYsRUFDRSxPQUFPLElBQVAsQ0FMOEIsQ0FPaEM7O0FBQ0EsTUFBSXdCLE1BQU0sQ0FBQzhCLGNBQVAsS0FBMEJ0RCxTQUE5QixFQUF5QztBQUN2QyxRQUFJb0IsU0FBUyxDQUFDQyxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFdBQUt0QixPQUFMLEdBQWVoQixNQUFNLENBQUM0QixNQUFQLENBQWMsSUFBZCxDQUFmO0FBQ0EsV0FBS1YsWUFBTCxHQUFvQixDQUFwQjtBQUNELEtBSEQsTUFHTyxJQUFJdUIsTUFBTSxDQUFDTixJQUFELENBQU4sS0FBaUJsQixTQUFyQixFQUFnQztBQUNyQyxVQUFJLEVBQUUsS0FBS0MsWUFBUCxLQUF3QixDQUE1QixFQUNFLEtBQUtGLE9BQUwsR0FBZWhCLE1BQU0sQ0FBQzRCLE1BQVAsQ0FBYyxJQUFkLENBQWYsQ0FERixLQUdFLE9BQU9hLE1BQU0sQ0FBQ04sSUFBRCxDQUFiO0FBQ0g7O0FBQ0QsV0FBTyxJQUFQO0FBQ0QsR0FuQitCLENBcUJoQzs7O0FBQ0EsTUFBSUUsU0FBUyxDQUFDQyxNQUFWLEtBQXFCLENBQXpCLEVBQTRCO0FBQzFCLFFBQUlnRCxJQUFJLEdBQUd0RixNQUFNLENBQUNzRixJQUFQLENBQVk3QyxNQUFaLENBQVg7QUFDQSxRQUFJOEMsR0FBSjs7QUFDQSxTQUFLbkQsQ0FBQyxHQUFHLENBQVQsRUFBWUEsQ0FBQyxHQUFHa0QsSUFBSSxDQUFDaEQsTUFBckIsRUFBNkIsRUFBRUYsQ0FBL0IsRUFBa0M7QUFDaENtRCxTQUFHLEdBQUdELElBQUksQ0FBQ2xELENBQUQsQ0FBVjtBQUNBLFVBQUltRCxHQUFHLEtBQUssZ0JBQVosRUFBOEI7QUFDOUIsV0FBS0Ysa0JBQUwsQ0FBd0JFLEdBQXhCO0FBQ0Q7O0FBQ0QsU0FBS0Ysa0JBQUwsQ0FBd0IsZ0JBQXhCO0FBQ0EsU0FBS3JFLE9BQUwsR0FBZWhCLE1BQU0sQ0FBQzRCLE1BQVAsQ0FBYyxJQUFkLENBQWY7QUFDQSxTQUFLVixZQUFMLEdBQW9CLENBQXBCO0FBQ0EsV0FBTyxJQUFQO0FBQ0Q7O0FBRURnQyxXQUFTLEdBQUdULE1BQU0sQ0FBQ04sSUFBRCxDQUFsQjs7QUFFQSxNQUFJLE9BQU9lLFNBQVAsS0FBcUIsVUFBekIsRUFBcUM7QUFDbkMsU0FBS3FCLGNBQUwsQ0FBb0JwQyxJQUFwQixFQUEwQmUsU0FBMUI7QUFDRCxHQUZELE1BRU8sSUFBSUEsU0FBUyxLQUFLakMsU0FBbEIsRUFBNkI7QUFDbEM7QUFDQSxTQUFLbUIsQ0FBQyxHQUFHYyxTQUFTLENBQUNaLE1BQVYsR0FBbUIsQ0FBNUIsRUFBK0JGLENBQUMsSUFBSSxDQUFwQyxFQUF1Q0EsQ0FBQyxFQUF4QyxFQUE0QztBQUMxQyxXQUFLbUMsY0FBTCxDQUFvQnBDLElBQXBCLEVBQTBCZSxTQUFTLENBQUNkLENBQUQsQ0FBbkM7QUFDRDtBQUNGOztBQUVELFNBQU8sSUFBUDtBQUNELENBakRMOztBQW1EQSxTQUFTb0QsVUFBVCxDQUFvQmhHLE1BQXBCLEVBQTRCMkMsSUFBNUIsRUFBa0NzRCxNQUFsQyxFQUEwQztBQUN4QyxNQUFJaEQsTUFBTSxHQUFHakQsTUFBTSxDQUFDd0IsT0FBcEI7QUFFQSxNQUFJeUIsTUFBTSxLQUFLeEIsU0FBZixFQUNFLE9BQU8sRUFBUDtBQUVGLE1BQUl5RSxVQUFVLEdBQUdqRCxNQUFNLENBQUNOLElBQUQsQ0FBdkI7QUFDQSxNQUFJdUQsVUFBVSxLQUFLekUsU0FBbkIsRUFDRSxPQUFPLEVBQVA7QUFFRixNQUFJLE9BQU95RSxVQUFQLEtBQXNCLFVBQTFCLEVBQ0UsT0FBT0QsTUFBTSxHQUFHLENBQUNDLFVBQVUsQ0FBQ3JDLFFBQVgsSUFBdUJxQyxVQUF4QixDQUFILEdBQXlDLENBQUNBLFVBQUQsQ0FBdEQ7QUFFRixTQUFPRCxNQUFNLEdBQ1hFLGVBQWUsQ0FBQ0QsVUFBRCxDQURKLEdBQ21CdkMsVUFBVSxDQUFDdUMsVUFBRCxFQUFhQSxVQUFVLENBQUNwRCxNQUF4QixDQUQxQztBQUVEOztBQUVEMUIsWUFBWSxDQUFDaEIsU0FBYixDQUF1QnNELFNBQXZCLEdBQW1DLFNBQVNBLFNBQVQsQ0FBbUJmLElBQW5CLEVBQXlCO0FBQzFELFNBQU9xRCxVQUFVLENBQUMsSUFBRCxFQUFPckQsSUFBUCxFQUFhLElBQWIsQ0FBakI7QUFDRCxDQUZEOztBQUlBdkIsWUFBWSxDQUFDaEIsU0FBYixDQUF1QmdHLFlBQXZCLEdBQXNDLFNBQVNBLFlBQVQsQ0FBc0J6RCxJQUF0QixFQUE0QjtBQUNoRSxTQUFPcUQsVUFBVSxDQUFDLElBQUQsRUFBT3JELElBQVAsRUFBYSxLQUFiLENBQWpCO0FBQ0QsQ0FGRDs7QUFJQXZCLFlBQVksQ0FBQ2lGLGFBQWIsR0FBNkIsVUFBUzdCLE9BQVQsRUFBa0I3QixJQUFsQixFQUF3QjtBQUNuRCxNQUFJLE9BQU82QixPQUFPLENBQUM2QixhQUFmLEtBQWlDLFVBQXJDLEVBQWlEO0FBQy9DLFdBQU83QixPQUFPLENBQUM2QixhQUFSLENBQXNCMUQsSUFBdEIsQ0FBUDtBQUNELEdBRkQsTUFFTztBQUNMLFdBQU8wRCxhQUFhLENBQUNoRyxJQUFkLENBQW1CbUUsT0FBbkIsRUFBNEI3QixJQUE1QixDQUFQO0FBQ0Q7QUFDRixDQU5EOztBQVFBdkIsWUFBWSxDQUFDaEIsU0FBYixDQUF1QmlHLGFBQXZCLEdBQXVDQSxhQUF2Qzs7QUFDQSxTQUFTQSxhQUFULENBQXVCMUQsSUFBdkIsRUFBNkI7QUFDM0IsTUFBSU0sTUFBTSxHQUFHLEtBQUt6QixPQUFsQjs7QUFFQSxNQUFJeUIsTUFBTSxLQUFLeEIsU0FBZixFQUEwQjtBQUN4QixRQUFJeUUsVUFBVSxHQUFHakQsTUFBTSxDQUFDTixJQUFELENBQXZCOztBQUVBLFFBQUksT0FBT3VELFVBQVAsS0FBc0IsVUFBMUIsRUFBc0M7QUFDcEMsYUFBTyxDQUFQO0FBQ0QsS0FGRCxNQUVPLElBQUlBLFVBQVUsS0FBS3pFLFNBQW5CLEVBQThCO0FBQ25DLGFBQU95RSxVQUFVLENBQUNwRCxNQUFsQjtBQUNEO0FBQ0Y7O0FBRUQsU0FBTyxDQUFQO0FBQ0Q7O0FBRUQxQixZQUFZLENBQUNoQixTQUFiLENBQXVCa0csVUFBdkIsR0FBb0MsU0FBU0EsVUFBVCxHQUFzQjtBQUN4RCxTQUFPLEtBQUs1RSxZQUFMLEdBQW9CLENBQXBCLEdBQXdCcEIsY0FBYyxDQUFDLEtBQUtrQixPQUFOLENBQXRDLEdBQXVELEVBQTlEO0FBQ0QsQ0FGRDs7QUFJQSxTQUFTbUMsVUFBVCxDQUFvQjRDLEdBQXBCLEVBQXlCakUsQ0FBekIsRUFBNEI7QUFDMUIsTUFBSWtFLElBQUksR0FBRyxJQUFJQyxLQUFKLENBQVVuRSxDQUFWLENBQVg7O0FBQ0EsT0FBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHTixDQUFwQixFQUF1QixFQUFFTSxDQUF6QjtBQUNFNEQsUUFBSSxDQUFDNUQsQ0FBRCxDQUFKLEdBQVUyRCxHQUFHLENBQUMzRCxDQUFELENBQWI7QUFERjs7QUFFQSxTQUFPNEQsSUFBUDtBQUNEOztBQUVELFNBQVNiLFNBQVQsQ0FBbUJKLElBQW5CLEVBQXlCbUIsS0FBekIsRUFBZ0M7QUFDOUIsU0FBT0EsS0FBSyxHQUFHLENBQVIsR0FBWW5CLElBQUksQ0FBQ3pDLE1BQXhCLEVBQWdDNEQsS0FBSyxFQUFyQztBQUNFbkIsUUFBSSxDQUFDbUIsS0FBRCxDQUFKLEdBQWNuQixJQUFJLENBQUNtQixLQUFLLEdBQUcsQ0FBVCxDQUFsQjtBQURGOztBQUVBbkIsTUFBSSxDQUFDb0IsR0FBTDtBQUNEOztBQUVELFNBQVNSLGVBQVQsQ0FBeUJJLEdBQXpCLEVBQThCO0FBQzVCLE1BQUlLLEdBQUcsR0FBRyxJQUFJSCxLQUFKLENBQVVGLEdBQUcsQ0FBQ3pELE1BQWQsQ0FBVjs7QUFDQSxPQUFLLElBQUlGLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdnRSxHQUFHLENBQUM5RCxNQUF4QixFQUFnQyxFQUFFRixDQUFsQyxFQUFxQztBQUNuQ2dFLE9BQUcsQ0FBQ2hFLENBQUQsQ0FBSCxHQUFTMkQsR0FBRyxDQUFDM0QsQ0FBRCxDQUFILENBQU9pQixRQUFQLElBQW1CMEMsR0FBRyxDQUFDM0QsQ0FBRCxDQUEvQjtBQUNEOztBQUNELFNBQU9nRSxHQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9iRDs7SUFFTUMsSzs7O0FBQ0osbUJBQWM7QUFBQTs7QUFDWixTQUFLckMsT0FBTCxHQUFlLElBQUlwRCxtREFBSixFQUFmO0FBQ0EsU0FBSzBGLE9BQUwsR0FBZSxLQUFmO0FBQ0Q7Ozs7MkJBRU1DLFEsRUFBVTtBQUNmLFdBQUt2QyxPQUFMLENBQWFHLEVBQWIsQ0FBZ0IsTUFBaEIsRUFBd0JvQyxRQUF4QjtBQUNEOzs7OEJBTVNBLFEsRUFBVTtBQUNsQixXQUFLdkMsT0FBTCxDQUFhRyxFQUFiLENBQWdCLFNBQWhCLEVBQTJCb0MsUUFBM0I7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBTUMsTUFBTSxHQUFHLEtBQUtDLEtBQUwsR0FBYUMsSUFBSSxDQUFDQyxHQUFMLEVBQTVCO0FBRUEsVUFBSUMsT0FBTyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV04sTUFBTSxHQUFHLElBQVQsR0FBZ0IsRUFBM0IsQ0FBZDtBQUNBLFVBQUlPLE9BQU8sR0FBR0YsSUFBSSxDQUFDQyxLQUFMLENBQVlOLE1BQU0sR0FBRyxJQUFWLEdBQWtCLEVBQTdCLENBQWQ7O0FBRUEsVUFBSUEsTUFBTSxJQUFJLENBQWQsRUFBaUI7QUFDZlEscUJBQWEsQ0FBQyxLQUFLQyxRQUFOLENBQWI7QUFDQSxhQUFLWCxPQUFMLEdBQWUsS0FBZjtBQUNBTSxlQUFPLEdBQUcsQ0FBVjtBQUNBRyxlQUFPLEdBQUcsQ0FBVjtBQUNBLGFBQUsvQyxPQUFMLENBQWE5QixJQUFiLENBQWtCLFNBQWxCO0FBQ0Q7O0FBRUQsV0FBSzhCLE9BQUwsQ0FBYTlCLElBQWIsQ0FBa0IsTUFBbEIsRUFBMEIwRSxPQUExQixFQUFtQ0csT0FBbkM7QUFDRDs7OzBCQUVLRyxJLEVBQU07QUFBQTs7QUFDVixXQUFLWixPQUFMLEdBQWUsSUFBZjtBQUNBLFVBQU1hLEVBQUUsR0FBR0QsSUFBSSxHQUFHLElBQVAsR0FBYyxFQUF6QjtBQUNBLFdBQUtULEtBQUwsR0FBYUMsSUFBSSxDQUFDQyxHQUFMLEtBQWFRLEVBQTFCO0FBQ0EsV0FBS0YsUUFBTCxHQUFnQkcsV0FBVyxDQUFDLFlBQU07QUFDaEMsYUFBSSxDQUFDQyxNQUFMO0FBQ0QsT0FGMEIsRUFFeEIsR0FGd0IsQ0FBM0I7QUFHQSxXQUFLQSxNQUFMO0FBRUEsYUFBTyxJQUFJQyxPQUFKLENBQ0wsVUFBQUMsT0FBTyxFQUFJO0FBQ1QsYUFBSSxDQUFDdkQsT0FBTCxDQUFhYSxJQUFiLENBQWtCLFNBQWxCLEVBQTZCMEMsT0FBN0I7QUFDRCxPQUhJLEVBSUwsVUFBQUMsTUFBTSxFQUFJO0FBQ1IsYUFBSSxDQUFDeEQsT0FBTCxDQUFhYSxJQUFiLENBQWtCLFFBQWxCLEVBQTRCMkMsTUFBNUI7QUFDRCxPQU5JLENBQVA7QUFRRDs7OzZCQUVRLENBQUU7Ozt3QkE1Q0s7QUFDZCxhQUFPLEtBQUtsQixPQUFaO0FBQ0Q7Ozs7OztBQTZDSCxJQUFNbUIsS0FBSyxHQUFHLElBQUlwQixLQUFKLEVBQWQ7QUFDQW9CLEtBQUssQ0FBQ2hCLEtBQU4sQ0FBWSxHQUFaLEVBQWlCaUIsSUFBakIsQ0FBc0I7QUFBQSxTQUFNcEgsT0FBTyxDQUFDcUgsR0FBUixDQUFZLFVBQVosQ0FBTjtBQUFBLENBQXRCIiwiZmlsZSI6InRpbWVyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3RpbWVyLmpzXCIpO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSAkZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgUmVmbGVjdEFwcGx5KHRoaXMubGlzdGVuZXIsIHRoaXMudGFyZ2V0LCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRzXCI7XHJcblxyXG5jbGFzcyBUaW1lciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIG9udGljayhjYWxsYmFjaykge1xyXG4gICAgdGhpcy5lbWl0dGVyLm9uKFwidGlja1wiLCBjYWxsYmFjayk7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNSdW5uaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucnVubmluZztcclxuICB9XHJcblxyXG4gIG9uZXhwaXJlZChjYWxsYmFjaykge1xyXG4gICAgdGhpcy5lbWl0dGVyLm9uKFwiZXhwaXJlZFwiLCBjYWxsYmFjayk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBjb25zdCBtb21lbnQgPSB0aGlzLnN0YXJ0IC0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IobW9tZW50IC8gMTAwMCAvIDYwKTtcclxuICAgIGxldCBzZWNvbmRzID0gTWF0aC5mbG9vcigobW9tZW50IC8gMTAwMCkgJSA2MCk7XHJcblxyXG4gICAgaWYgKG1vbWVudCA8PSAwKSB7XHJcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XHJcbiAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xyXG4gICAgICBtaW51dGVzID0gMDtcclxuICAgICAgc2Vjb25kcyA9IDA7XHJcbiAgICAgIHRoaXMuZW1pdHRlci5lbWl0KFwiZXhwaXJlZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVtaXR0ZXIuZW1pdChcInRpY2tcIiwgbWludXRlcywgc2Vjb25kcyk7XHJcbiAgfVxyXG5cclxuICBzdGFydCh0aW1lKSB7XHJcbiAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG4gICAgY29uc3QgbXMgPSB0aW1lICogMTAwMCAqIDYwO1xyXG4gICAgdGhpcy5zdGFydCA9IERhdGUubm93KCkgKyBtcztcclxuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9LCAxMDApO1xyXG4gICAgdGhpcy51cGRhdGUoKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoXHJcbiAgICAgIHJlc29sdmUgPT4ge1xyXG4gICAgICAgIHRoaXMuZW1pdHRlci5vbmNlKFwiZXhwaXJlZFwiLCByZXNvbHZlKTtcclxuICAgICAgfSxcclxuICAgICAgcmVqZWN0ID0+IHtcclxuICAgICAgICB0aGlzLmVtaXR0ZXIub25jZShcImNhbmNlbFwiLCByZWplY3QpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY2FuY2VsKCkge31cclxufVxyXG5cclxuY29uc3QgdGltZXIgPSBuZXcgVGltZXIoKTtcclxudGltZXIuc3RhcnQoMC4xKS50aGVuKCgpID0+IGNvbnNvbGUubG9nKFwiZ290IGhlcmVcIikpO1xyXG5cclxuZXhwb3J0IHsgVGltZXIgfTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==