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

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function TempCtor() {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function isBuffer(arg) {
  return arg && _typeof(arg) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};

/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(obj) {
  var keys = Object.keys(obj);
  var descriptors = {};

  for (var i = 0; i < keys.length; i++) {
    descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
  }

  return descriptors;
};

var formatRegExp = /%[sdj%]/g;

exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];

    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }

    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;

    switch (x) {
      case '%s':
        return String(args[i++]);

      case '%d':
        return Number(args[i++]);

      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }

      default:
        return x;
    }
  });

  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }

  return str;
}; // Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.


exports.deprecate = function (fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  } // Allow for deprecating things in the process of starting up.


  if (typeof process === 'undefined') {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }

      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;

exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();

  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;

      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }

  return debugs[set];
};
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */

/* legacy: obj, showHidden, depth, colors*/


function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  }; // legacy...

  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];

  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  } // set default options


  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

exports.inspect = inspect; // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
}; // Don't use 'blue' not visible on cmd.exe

inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return "\x1B[" + inspect.colors[style][0] + 'm' + str + "\x1B[" + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};
  array.forEach(function (val, idx) {
    hash[val] = true;
  });
  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);

    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }

    return ret;
  } // Primitive types cannot have properties


  var primitive = formatPrimitive(ctx, value);

  if (primitive) {
    return primitive;
  } // Look up the keys of the object.


  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  } // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  } // Some type of object without properties can be shortcutted.


  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }

    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }

    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }

    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}']; // Make Array say that they are Array

  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  } // Make functions say that they are functions


  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  } // Make RegExps say that they are RegExps


  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  } // Make dates with properties first say the date


  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  } // Make error with message first say the error


  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);
  var output;

  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }

  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];

  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };

  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }

  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }

      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }

  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }

    name = JSON.stringify('' + key);

    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
} // NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.


function isArray(ar) {
  return Array.isArray(ar);
}

exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}

exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}

exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}

exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}

exports.isString = isString;

function isSymbol(arg) {
  return _typeof(arg) === 'symbol';
}

exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}

exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

exports.isRegExp = isRegExp;

function isObject(arg) {
  return _typeof(arg) === 'object' && arg !== null;
}

exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}

exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}

exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || _typeof(arg) === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}

exports.isPrimitive = isPrimitive;
exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 26 Feb 16:19:34

function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
} // log is just a thin wrapper to console.log that prepends a timestamp


exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */


exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;
  var keys = Object.keys(add);
  var i = keys.length;

  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }

  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function') throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];

    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }

    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn,
    enumerable: false,
    writable: false,
    configurable: true
  });
  return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
};

exports.promisify.custom = kCustomPromisifiedSymbol;

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }

  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  } // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.


  function callbackified() {
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();

    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }

    var self = this;

    var cb = function cb() {
      return maybeCb.apply(self, arguments);
    }; // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)


    original.apply(this, args).then(function (ret) {
      process.nextTick(cb, null, ret);
    }, function (rej) {
      process.nextTick(callbackifyOnRejected, rej, cb);
    });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
  return callbackified;
}

exports.callbackify = callbackify;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

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
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! util */ "./node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
var state = "start";
var iteration = 1;
var db;
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
}; // parse the query selector in the url


var qd = {};

if (location.search) {
  location.search.substr(1).split("&").forEach(function (item) {
    var s = item.split("=");
    var k = s[0];
    var v = s[1] && Object(util__WEBPACK_IMPORTED_MODULE_1__["replaceAll"])(decodeURIComponent(s[1]), /\+/, " "); //  null-coalescing / short-circuit

    (qd[k] = qd[k] || []).push(v); // null-coalescing / short-circuit
  });
} // initialize program arguments.


var workspan = qd.timer || 20;
var breakspan = qd["break"] || 4;
var finished = true; // move into 'work' state if a task has been defined.

var worker;

if (window.Worker) {
  if (worker === undefined) {
    worker = new Worker("worker.bundle.js");
  }
}

window.onload = function () {
  if (qd.task !== undefined) {
    document.getElementById("task").style.visibility = "hidden";
    document.getElementById("timer").style.visibility = "visible";
    if (worker) timer(workspan);
  } else {
    document.getElementById("task").style.visibility = "visible";
  }
};

worker.onmessage = function (e) {
  var minutes = 99;
  var seconds = 99;

  if (e.data.minutes !== undefined && e.data.seconds !== undefined) {
    var _e$data = _slicedToArray(e.data, 2);

    minutes = _e$data[0];
    seconds = _e$data[1];
  }

  if (e.data.finished) {
    // do whatever needs doing when the timer expires...
    callback();
  }

  if (!finished) {
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
};

if ("serviceWorker" in navigator) {
  console.log("sw supported");
  navigator.serviceWorker.register("sw.bundle.js").then(function (sw) {
    console.log("ServiceWorker registration successful with scope: ", sw.scope);
  }, function (err) {
    // registration failed :(
    console.log("ServiceWorker registration failed: ", err);
  });
}

var callback = function callback() {
  return console.log("nothing here");
};
/**
 * Starts a timer for the current task.
 * @param {number} amount - the amount of time in milliseconds
 */


function timer(amount) {
  console.log("starting timer");
  state = "work";
  finished = false;
  document.getElementsByTagName("body").item(0).classList.remove("break");

  if (window.Worker && worker != undefined) {
    callback = function callback() {
      taskFinished();
      return document.getElementById("progress").appendChild(getWorkToken());
    };

    worker.postMessage(amount * 1000 * 60);
  }
}
/**
 * Starts a timer for a break.
 * @param {number} amount - the amount of time in milliseconds
 */


function breather(amount) {
  state = "break";
  finished = false;
  document.getElementsByTagName("body").item(0).classList.add("break");

  if (window.Worker) {
    if (worker != undefined) {
      callback = function callback() {
        taskFinished();
        document.getElementById("progress").appendChild(getBreakToken());
      };

      worker.postMessage(amount * 1000 * 60);
    }
  }
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
  document.title = "finished ".concat(qd.task); // increment how many times this task was completed in the database.

  var store = db.transaction(["tasks"], "readwrite").objectStore("tasks");

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

var _key;

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

  if (state === "break") {
    timer(workspan);
    return;
  }

  if (state === "work") {
    breather(iteration > 0 && iteration % 4 == 0 ? 2 * breakspan : breakspan);
    return;
  }
}

window.onclick = begin;

document.onkeydown = function (e) {
  e = e || window.event;
  var presses = debounceKey(e.key);

  if (e.key === " ") {
    begin();
    return;
  }

  if (e.key === "Escape") {
    if (presses >= 3 && state == "work") {
      debounceKey();
      breather(breakspan);
      return;
    }

    if (presses >= 3 && state == "break") {
      debounceKey();
      timer(workspan);
      return;
    }
  }
};

function notifiy(msg) {
  var _this = this;

  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(function (registration) {
      var notification = registration.showNotification("All done!", {
        tag: "task",
        renotify: true,
        requireInteraction: true,
        icon: "images/icons/icon-72x72.png",
        silent: true,
        image: "https://static1.squarespace.com/static/53fccdc3e4b06d598890737d/54231dffe4b07bb558b1e0d2/54231e31e4b057212f157ec5/1517947886108/GINGERWHITECOFFEELAND.jpg"
      });

      notification.onclick = function () {
        console.log("clicked");
        parent.focus();
        window.focus();

        _this.close();
      };
    });
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXRpbC9zdXBwb3J0L2lzQnVmZmVyQnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXRpbC91dGlsLmpzIiwid2VicGFjazovLy8uL3Njc3MvYXBwLnNjc3M/NjE5OCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiY3JlYXRlIiwibW9kdWxlIiwiZXhwb3J0cyIsImluaGVyaXRzIiwiY3RvciIsInN1cGVyQ3RvciIsInN1cGVyXyIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwidmFsdWUiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJjb25maWd1cmFibGUiLCJUZW1wQ3RvciIsInByb2Nlc3MiLCJjYWNoZWRTZXRUaW1lb3V0IiwiY2FjaGVkQ2xlYXJUaW1lb3V0IiwiZGVmYXVsdFNldFRpbW91dCIsIkVycm9yIiwiZGVmYXVsdENsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJlIiwiY2xlYXJUaW1lb3V0IiwicnVuVGltZW91dCIsImZ1biIsImNhbGwiLCJydW5DbGVhclRpbWVvdXQiLCJtYXJrZXIiLCJxdWV1ZSIsImRyYWluaW5nIiwiY3VycmVudFF1ZXVlIiwicXVldWVJbmRleCIsImNsZWFuVXBOZXh0VGljayIsImxlbmd0aCIsImNvbmNhdCIsImRyYWluUXVldWUiLCJ0aW1lb3V0IiwibGVuIiwicnVuIiwibmV4dFRpY2siLCJhcmdzIiwiQXJyYXkiLCJhcmd1bWVudHMiLCJpIiwicHVzaCIsIkl0ZW0iLCJhcnJheSIsImFwcGx5IiwidGl0bGUiLCJicm93c2VyIiwiZW52IiwiYXJndiIsInZlcnNpb24iLCJ2ZXJzaW9ucyIsIm5vb3AiLCJvbiIsImFkZExpc3RlbmVyIiwib25jZSIsIm9mZiIsInJlbW92ZUxpc3RlbmVyIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwiZW1pdCIsInByZXBlbmRMaXN0ZW5lciIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0ZW5lcnMiLCJuYW1lIiwiYmluZGluZyIsImN3ZCIsImNoZGlyIiwiZGlyIiwidW1hc2siLCJpc0J1ZmZlciIsImFyZyIsImNvcHkiLCJmaWxsIiwicmVhZFVJbnQ4IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsIm9iaiIsImtleXMiLCJkZXNjcmlwdG9ycyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImZvcm1hdFJlZ0V4cCIsImZvcm1hdCIsImYiLCJpc1N0cmluZyIsIm9iamVjdHMiLCJpbnNwZWN0Iiwiam9pbiIsInN0ciIsIlN0cmluZyIsInJlcGxhY2UiLCJ4IiwiTnVtYmVyIiwiSlNPTiIsInN0cmluZ2lmeSIsIl8iLCJpc051bGwiLCJpc09iamVjdCIsImRlcHJlY2F0ZSIsImZuIiwibXNnIiwibm9EZXByZWNhdGlvbiIsIndhcm5lZCIsImRlcHJlY2F0ZWQiLCJ0aHJvd0RlcHJlY2F0aW9uIiwidHJhY2VEZXByZWNhdGlvbiIsImNvbnNvbGUiLCJ0cmFjZSIsImVycm9yIiwiZGVidWdzIiwiZGVidWdFbnZpcm9uIiwiZGVidWdsb2ciLCJzZXQiLCJpc1VuZGVmaW5lZCIsIk5PREVfREVCVUciLCJ0b1VwcGVyQ2FzZSIsIlJlZ0V4cCIsInRlc3QiLCJwaWQiLCJvcHRzIiwiY3R4Iiwic2VlbiIsInN0eWxpemUiLCJzdHlsaXplTm9Db2xvciIsImRlcHRoIiwiY29sb3JzIiwiaXNCb29sZWFuIiwic2hvd0hpZGRlbiIsIl9leHRlbmQiLCJjdXN0b21JbnNwZWN0Iiwic3R5bGl6ZVdpdGhDb2xvciIsImZvcm1hdFZhbHVlIiwic3R5bGVzIiwic3R5bGVUeXBlIiwic3R5bGUiLCJhcnJheVRvSGFzaCIsImhhc2giLCJmb3JFYWNoIiwidmFsIiwiaWR4IiwicmVjdXJzZVRpbWVzIiwiaXNGdW5jdGlvbiIsInJldCIsInByaW1pdGl2ZSIsImZvcm1hdFByaW1pdGl2ZSIsInZpc2libGVLZXlzIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImlzRXJyb3IiLCJpbmRleE9mIiwiZm9ybWF0RXJyb3IiLCJpc1JlZ0V4cCIsInRvU3RyaW5nIiwiaXNEYXRlIiwiRGF0ZSIsImJhc2UiLCJicmFjZXMiLCJpc0FycmF5IiwibiIsInRvVVRDU3RyaW5nIiwib3V0cHV0IiwiZm9ybWF0QXJyYXkiLCJtYXAiLCJrZXkiLCJmb3JtYXRQcm9wZXJ0eSIsInBvcCIsInJlZHVjZVRvU2luZ2xlU3RyaW5nIiwic2ltcGxlIiwiaXNOdW1iZXIiLCJsIiwiaGFzT3duUHJvcGVydHkiLCJtYXRjaCIsImRlc2MiLCJnZXQiLCJzcGxpdCIsImxpbmUiLCJzdWJzdHIiLCJudW1MaW5lc0VzdCIsInJlZHVjZSIsInByZXYiLCJjdXIiLCJhciIsImlzTnVsbE9yVW5kZWZpbmVkIiwiaXNTeW1ib2wiLCJyZSIsIm9iamVjdFRvU3RyaW5nIiwiZCIsImlzUHJpbWl0aXZlIiwicmVxdWlyZSIsIm8iLCJwYWQiLCJtb250aHMiLCJ0aW1lc3RhbXAiLCJ0aW1lIiwiZ2V0SG91cnMiLCJnZXRNaW51dGVzIiwiZ2V0U2Vjb25kcyIsImdldERhdGUiLCJnZXRNb250aCIsImxvZyIsIm9yaWdpbiIsImFkZCIsInByb3AiLCJrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wiLCJTeW1ib2wiLCJ1bmRlZmluZWQiLCJwcm9taXNpZnkiLCJvcmlnaW5hbCIsIlR5cGVFcnJvciIsImRlZmluZVByb3BlcnR5IiwicHJvbWlzZVJlc29sdmUiLCJwcm9taXNlUmVqZWN0IiwicHJvbWlzZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZXJyIiwic2V0UHJvdG90eXBlT2YiLCJnZXRQcm90b3R5cGVPZiIsImRlZmluZVByb3BlcnRpZXMiLCJjdXN0b20iLCJjYWxsYmFja2lmeU9uUmVqZWN0ZWQiLCJyZWFzb24iLCJjYiIsIm5ld1JlYXNvbiIsImNhbGxiYWNraWZ5IiwiY2FsbGJhY2tpZmllZCIsIm1heWJlQ2IiLCJzZWxmIiwidGhlbiIsInJlaiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ2aXNpYmlsaXR5Iiwibml4aWUzIiwibml4aWUyIiwibml4aWUxIiwibml4aWUwIiwidG9rZW4iLCJzdGF0ZSIsIml0ZXJhdGlvbiIsImRiIiwicmVxdWVzdCIsIndpbmRvdyIsImluZGV4ZWREQiIsIm9wZW4iLCJvbnN1Y2Nlc3MiLCJldmVudCIsInRhcmdldCIsInJlc3VsdCIsInN0b3JlIiwidHJhbnNhY3Rpb24iLCJvYmplY3RTdG9yZSIsInFkIiwidGFzayIsImNvdW50IiwiY29tcGxldGVkIiwiaW5kZXgiLCJhcHBlbmRDaGlsZCIsImdldFdvcmtUb2tlbiIsIm9udXBncmFkZW5lZWRlZCIsImNyZWF0ZU9iamVjdFN0b3JlIiwia2V5UGF0aCIsImNyZWF0ZUluZGV4IiwidW5pcXVlIiwibG9jYXRpb24iLCJzZWFyY2giLCJpdGVtIiwicyIsImsiLCJ2IiwicmVwbGFjZUFsbCIsImRlY29kZVVSSUNvbXBvbmVudCIsIndvcmtzcGFuIiwidGltZXIiLCJicmVha3NwYW4iLCJmaW5pc2hlZCIsIndvcmtlciIsIldvcmtlciIsIm9ubG9hZCIsIm9ubWVzc2FnZSIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiZGF0YSIsImNhbGxiYWNrIiwidG9Mb2NhbGVTdHJpbmciLCJtaW5pbXVtSW50ZWdlckRpZ2l0cyIsInNldE5peGllIiwiTWF0aCIsImZsb29yIiwibmF2aWdhdG9yIiwic2VydmljZVdvcmtlciIsInJlZ2lzdGVyIiwic3ciLCJzY29wZSIsImFtb3VudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwidGFza0ZpbmlzaGVkIiwicG9zdE1lc3NhZ2UiLCJicmVhdGhlciIsImdldEJyZWFrVG9rZW4iLCJidG9rZW4iLCJjb250ZW50IiwiY2xvbmVOb2RlIiwid3Rva2VuIiwic291bmQiLCJBdWRpbyIsInBsYXkiLCJub3RpZml5IiwicHV0Iiwibml4aWUiLCJudW1iZXJzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIk5vdGlmaWNhdGlvbiIsInJlcXVlc3RQZXJtaXNzaW9uIiwic3RhdHVzIiwiX2tleSIsInJlc2V0RGVib3VuY2UiLCJkZWJvdW5jZUtleSIsImRlYm91bmNlIiwiYmVnaW4iLCJvbmNsaWNrIiwib25rZXlkb3duIiwicHJlc3NlcyIsInBlcm1pc3Npb24iLCJnZXRSZWdpc3RyYXRpb24iLCJyZWdpc3RyYXRpb24iLCJub3RpZmljYXRpb24iLCJzaG93Tm90aWZpY2F0aW9uIiwidGFnIiwicmVub3RpZnkiLCJyZXF1aXJlSW50ZXJhY3Rpb24iLCJpY29uIiwic2lsZW50IiwiaW1hZ2UiLCJwYXJlbnQiLCJmb2N1cyIsImNsb3NlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7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QUFVLFFBQWQsRUFBd0I7QUFDdEIsUUFBSWtLLE9BQU8sSUFBSSxDQUFYLElBQWdCdEYsS0FBSyxJQUFJLE1BQTdCLEVBQXFDO0FBQ25DaUYsaUJBQVc7QUFDWG5CLGNBQVEsQ0FBQzFCLFNBQUQsQ0FBUjtBQUNBO0FBQ0Q7O0FBQ0QsUUFBSWtELE9BQU8sSUFBSSxDQUFYLElBQWdCdEYsS0FBSyxJQUFJLE9BQTdCLEVBQXNDO0FBQ3BDaUYsaUJBQVc7QUFDWDlDLFdBQUssQ0FBQ0QsUUFBRCxDQUFMO0FBQ0E7QUFDRDtBQUNGO0FBQ0YsQ0FyQkQ7O0FBdUJBLFNBQVNxQyxPQUFULENBQWlCak4sR0FBakIsRUFBc0I7QUFBQTs7QUFDcEIsTUFBSXNOLFlBQVksQ0FBQ1csVUFBYixLQUE0QixTQUFoQyxFQUEyQztBQUN6Q3BDLGFBQVMsQ0FBQ0MsYUFBVixDQUF3Qm9DLGVBQXhCLEdBQTBDbEcsSUFBMUMsQ0FBK0MsVUFBQW1HLFlBQVksRUFBSTtBQUM3RCxVQUFNQyxZQUFZLEdBQUdELFlBQVksQ0FBQ0UsZ0JBQWIsQ0FBOEIsV0FBOUIsRUFBMkM7QUFDOURDLFdBQUcsRUFBRSxNQUR5RDtBQUU5REMsZ0JBQVEsRUFBRSxJQUZvRDtBQUc5REMsMEJBQWtCLEVBQUUsSUFIMEM7QUFJOURDLFlBQUksRUFBRSw2QkFKd0Q7QUFLOURDLGNBQU0sRUFBRSxJQUxzRDtBQU05REMsYUFBSyxFQUNIO0FBUDRELE9BQTNDLENBQXJCOztBQVVBUCxrQkFBWSxDQUFDTixPQUFiLEdBQXVCLFlBQU07QUFDM0J4TixlQUFPLENBQUM0RixHQUFSLENBQVksU0FBWjtBQUNBMEksY0FBTSxDQUFDQyxLQUFQO0FBQ0EvRixjQUFNLENBQUMrRixLQUFQOztBQUNBLGFBQUksQ0FBQ0MsS0FBTDtBQUNELE9BTEQ7QUFNRCxLQWpCRDtBQWtCRDtBQUNGLEMiLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyKGFyZykge1xuICByZXR1cm4gYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnXG4gICAgJiYgdHlwZW9mIGFyZy5jb3B5ID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5maWxsID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5yZWFkVUludDggPT09ICdmdW5jdGlvbic7XG59IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgfHxcbiAgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgdmFyIGRlc2NyaXB0b3JzID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZXNjcmlwdG9yc1trZXlzW2ldXSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXlzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc2NyaXB0b3JzO1xuICB9O1xuXG52YXIgZm9ybWF0UmVnRXhwID0gLyVbc2RqJV0vZztcbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZikge1xuICBpZiAoIWlzU3RyaW5nKGYpKSB7XG4gICAgdmFyIG9iamVjdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgb2JqZWN0cy5wdXNoKGluc3BlY3QoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3RzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHZhciBpID0gMTtcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcbiAgdmFyIHN0ciA9IFN0cmluZyhmKS5yZXBsYWNlKGZvcm1hdFJlZ0V4cCwgZnVuY3Rpb24oeCkge1xuICAgIGlmICh4ID09PSAnJSUnKSByZXR1cm4gJyUnO1xuICAgIGlmIChpID49IGxlbikgcmV0dXJuIHg7XG4gICAgc3dpdGNoICh4KSB7XG4gICAgICBjYXNlICclcyc6IHJldHVybiBTdHJpbmcoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVkJzogcmV0dXJuIE51bWJlcihhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWonOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmdzW2krK10pO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9KTtcbiAgZm9yICh2YXIgeCA9IGFyZ3NbaV07IGkgPCBsZW47IHggPSBhcmdzWysraV0pIHtcbiAgICBpZiAoaXNOdWxsKHgpIHx8ICFpc09iamVjdCh4KSkge1xuICAgICAgc3RyICs9ICcgJyArIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciArPSAnICcgKyBpbnNwZWN0KHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufTtcblxuXG4vLyBNYXJrIHRoYXQgYSBtZXRob2Qgc2hvdWxkIG5vdCBiZSB1c2VkLlxuLy8gUmV0dXJucyBhIG1vZGlmaWVkIGZ1bmN0aW9uIHdoaWNoIHdhcm5zIG9uY2UgYnkgZGVmYXVsdC5cbi8vIElmIC0tbm8tZGVwcmVjYXRpb24gaXMgc2V0LCB0aGVuIGl0IGlzIGEgbm8tb3AuXG5leHBvcnRzLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKGZuLCBtc2cpIHtcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLm5vRGVwcmVjYXRpb24gPT09IHRydWUpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICAvLyBBbGxvdyBmb3IgZGVwcmVjYXRpbmcgdGhpbmdzIGluIHRoZSBwcm9jZXNzIG9mIHN0YXJ0aW5nIHVwLlxuICBpZiAodHlwZW9mIHByb2Nlc3MgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVwcmVjYXRlKGZuLCBtc2cpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0Vudmlyb247XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIGlmIChpc1VuZGVmaW5lZChkZWJ1Z0Vudmlyb24pKVxuICAgIGRlYnVnRW52aXJvbiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJyc7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKG5ldyBSZWdFeHAoJ1xcXFxiJyArIHNldCArICdcXFxcYicsICdpJykudGVzdChkZWJ1Z0Vudmlyb24pKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbnZhciBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyA/IFN5bWJvbCgndXRpbC5wcm9taXNpZnkuY3VzdG9tJykgOiB1bmRlZmluZWQ7XG5cbmV4cG9ydHMucHJvbWlzaWZ5ID0gZnVuY3Rpb24gcHJvbWlzaWZ5KG9yaWdpbmFsKSB7XG4gIGlmICh0eXBlb2Ygb3JpZ2luYWwgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwib3JpZ2luYWxcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24nKTtcblxuICBpZiAoa0N1c3RvbVByb21pc2lmaWVkU3ltYm9sICYmIG9yaWdpbmFsW2tDdXN0b21Qcm9taXNpZmllZFN5bWJvbF0pIHtcbiAgICB2YXIgZm4gPSBvcmlnaW5hbFtrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xdO1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcInV0aWwucHJvbWlzaWZ5LmN1c3RvbVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIGtDdXN0b21Qcm9taXNpZmllZFN5bWJvbCwge1xuICAgICAgdmFsdWU6IGZuLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICBmdW5jdGlvbiBmbigpIHtcbiAgICB2YXIgcHJvbWlzZVJlc29sdmUsIHByb21pc2VSZWplY3Q7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBwcm9taXNlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICBwcm9taXNlUmVqZWN0ID0gcmVqZWN0O1xuICAgIH0pO1xuXG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuICAgIGFyZ3MucHVzaChmdW5jdGlvbiAoZXJyLCB2YWx1ZSkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBwcm9taXNlUmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9taXNlUmVzb2x2ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBwcm9taXNlUmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZm4sIE9iamVjdC5nZXRQcm90b3R5cGVPZihvcmlnaW5hbCkpO1xuXG4gIGlmIChrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2wpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwga0N1c3RvbVByb21pc2lmaWVkU3ltYm9sLCB7XG4gICAgdmFsdWU6IGZuLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IGZhbHNlLCBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhcbiAgICBmbixcbiAgICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9yaWdpbmFsKVxuICApO1xufVxuXG5leHBvcnRzLnByb21pc2lmeS5jdXN0b20gPSBrQ3VzdG9tUHJvbWlzaWZpZWRTeW1ib2xcblxuZnVuY3Rpb24gY2FsbGJhY2tpZnlPblJlamVjdGVkKHJlYXNvbiwgY2IpIHtcbiAgLy8gYCFyZWFzb25gIGd1YXJkIGluc3BpcmVkIGJ5IGJsdWViaXJkIChSZWY6IGh0dHBzOi8vZ29vLmdsL3Q1SVM2TSkuXG4gIC8vIEJlY2F1c2UgYG51bGxgIGlzIGEgc3BlY2lhbCBlcnJvciB2YWx1ZSBpbiBjYWxsYmFja3Mgd2hpY2ggbWVhbnMgXCJubyBlcnJvclxuICAvLyBvY2N1cnJlZFwiLCB3ZSBlcnJvci13cmFwIHNvIHRoZSBjYWxsYmFjayBjb25zdW1lciBjYW4gZGlzdGluZ3Vpc2ggYmV0d2VlblxuICAvLyBcInRoZSBwcm9taXNlIHJlamVjdGVkIHdpdGggbnVsbFwiIG9yIFwidGhlIHByb21pc2UgZnVsZmlsbGVkIHdpdGggdW5kZWZpbmVkXCIuXG4gIGlmICghcmVhc29uKSB7XG4gICAgdmFyIG5ld1JlYXNvbiA9IG5ldyBFcnJvcignUHJvbWlzZSB3YXMgcmVqZWN0ZWQgd2l0aCBhIGZhbHN5IHZhbHVlJyk7XG4gICAgbmV3UmVhc29uLnJlYXNvbiA9IHJlYXNvbjtcbiAgICByZWFzb24gPSBuZXdSZWFzb247XG4gIH1cbiAgcmV0dXJuIGNiKHJlYXNvbik7XG59XG5cbmZ1bmN0aW9uIGNhbGxiYWNraWZ5KG9yaWdpbmFsKSB7XG4gIGlmICh0eXBlb2Ygb3JpZ2luYWwgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJvcmlnaW5hbFwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbicpO1xuICB9XG5cbiAgLy8gV2UgRE8gTk9UIHJldHVybiB0aGUgcHJvbWlzZSBhcyBpdCBnaXZlcyB0aGUgdXNlciBhIGZhbHNlIHNlbnNlIHRoYXRcbiAgLy8gdGhlIHByb21pc2UgaXMgYWN0dWFsbHkgc29tZWhvdyByZWxhdGVkIHRvIHRoZSBjYWxsYmFjaydzIGV4ZWN1dGlvblxuICAvLyBhbmQgdGhhdCB0aGUgY2FsbGJhY2sgdGhyb3dpbmcgd2lsbCByZWplY3QgdGhlIHByb21pc2UuXG4gIGZ1bmN0aW9uIGNhbGxiYWNraWZpZWQoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gICAgfVxuXG4gICAgdmFyIG1heWJlQ2IgPSBhcmdzLnBvcCgpO1xuICAgIGlmICh0eXBlb2YgbWF5YmVDYiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGxhc3QgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgY2IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBtYXliZUNiLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgICAvLyBJbiB0cnVlIG5vZGUgc3R5bGUgd2UgcHJvY2VzcyB0aGUgY2FsbGJhY2sgb24gYG5leHRUaWNrYCB3aXRoIGFsbCB0aGVcbiAgICAvLyBpbXBsaWNhdGlvbnMgKHN0YWNrLCBgdW5jYXVnaHRFeGNlcHRpb25gLCBgYXN5bmNfaG9va3NgKVxuICAgIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgICAudGhlbihmdW5jdGlvbihyZXQpIHsgcHJvY2Vzcy5uZXh0VGljayhjYiwgbnVsbCwgcmV0KSB9LFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVqKSB7IHByb2Nlc3MubmV4dFRpY2soY2FsbGJhY2tpZnlPblJlamVjdGVkLCByZWosIGNiKSB9KTtcbiAgfVxuXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihjYWxsYmFja2lmaWVkLCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob3JpZ2luYWwpKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoY2FsbGJhY2tpZmllZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvcmlnaW5hbCkpO1xuICByZXR1cm4gY2FsbGJhY2tpZmllZDtcbn1cbmV4cG9ydHMuY2FsbGJhY2tpZnkgPSBjYWxsYmFja2lmeTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtcmV0dXJuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLWdsb2JhbHMgKi9cblxuaW1wb3J0IFwiLi4vc2Nzcy9hcHAuc2Nzc1wiO1xuaW1wb3J0IHsgcmVwbGFjZUFsbCB9IGZyb20gXCJ1dGlsXCI7XG4vKipcbiAqIFRPRE86IHNhdmUgdGhlIGN1cnJlbnQgdGltZXIgdGltZSBiZXR3ZWVuIHJlZnJlc2hlc1xuICogVE9ETzoga2VlcCB0cmFjayBvZiBob3cgbWFueSBtaW51dGVzIGVhY2ggdGFzaydzIHBvbW9kb3JvIHdhc1xuICogVE9ETzogZGlzcGxheSB0YXNrIHN0YXRzXG4gKiBUT0RPOiBhbmQgYSAnZmluaXNoZWQnIHN0YXRlIGFmdGVyIHggcG9tb2Rvcm9zIHRvIHN0b3Agd29ya2luZy5cbiAqIFRPRE86IGFkZCBhICdjb250aW51ZScgc3RhdGUgYWZ0ZXIgdGltZXIgZmluaXNoZXMgYmVmb3JlIGNvbnRpbnVlaW5nLlxuICogVE9ETzogYWxsb3cgbW9yZSB0aW1lIHRvIGJlIGFkZGVkIGZyb20gbm90aWZpY2F0aW9uICgrMiBtaW51dGVzKS5cbiAqL1xuXG4vKipcbiAqIENIQU5HRUxPRzpcbiAqXG4gKiAtIHN0b3JlIG51bWJlciBvZiBjb21wbGV0ZWQgdGFza3MgaW4gaW5kZXhlZERCIGFuZCBkaXNwbGF5IG51bWJlciBvZiBjb21wbGV0ZWQgdGFza3Mgd2hlbiBjb3JyZXNwb25kaW5nIHRhc2sgaXMgcmUtc3RhcnRlZC5cbiAqICMjIyMjIyBUdWUgQXByIDIzIDIyOjAxOjUxIE1EVCAyMDE5XG4gKiAtIGJ1Z2ZpeCB0aW1lciBub3Qgc3RhcnRpbmcgYWZ0ZXIgYnJlYWtcbiAqIC0gYnVnZml4IGNsaWNraW5nIG5vdGlmaWNhdGlvbiBicmluZ3MgdXAgdGFiXG4gKiAtIGFkZGVkIGN1c3RvbSBzb3VuZCBwbGF5ZWQgb24gdGltZXIgY29tcGxldGlvbi5cbiAqL1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVyXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9ncmVzc1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG5cbmNvbnN0IG5peGllMyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibml4aWUzXCIpO1xuY29uc3Qgbml4aWUyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuaXhpZTJcIik7XG5jb25zdCBuaXhpZTEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5peGllMVwiKTtcbmNvbnN0IG5peGllMCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibml4aWUwXCIpO1xuXG5jb25zdCB0b2tlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9rZW5cIik7XG5cbmxldCBzdGF0ZSA9IFwic3RhcnRcIjtcbmxldCBpdGVyYXRpb24gPSAxO1xubGV0IGRiO1xuXG5jb25zdCByZXF1ZXN0ID0gd2luZG93LmluZGV4ZWREQi5vcGVuKFwibmlnaHRzaGFkZS1kYlwiLCAxKTtcblxucmVxdWVzdC5vbnN1Y2Nlc3MgPSBlID0+IHtcbiAgZGIgPSBldmVudC50YXJnZXQucmVzdWx0O1xuXG4gIGNvbnN0IHN0b3JlID0gZGIudHJhbnNhY3Rpb24oW1widGFza3NcIl0sIFwicmVhZG9ubHlcIikub2JqZWN0U3RvcmUoXCJ0YXNrc1wiKTtcblxuICBpZiAocWQudGFzaykge1xuICAgIHN0b3JlLmdldChxZC50YXNrKS5vbnN1Y2Nlc3MgPSBlID0+IHtcbiAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIHdhcyBhbiBleGlzdGluZyBjb3VudCBvdGhlcndpc2Ugc3RhcnQgYW5ldy5cbiAgICAgIGNvbnN0IGNvdW50ID0gKGUudGFyZ2V0LnJlc3VsdCAmJiBlLnRhcmdldC5yZXN1bHQuY29tcGxldGVkKSB8fCAwIHx8IDA7XG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjb3VudDsgaW5kZXgrKykge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2dyZXNzXCIpLmFwcGVuZENoaWxkKGdldFdvcmtUb2tlbigpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG5yZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGUgPT4ge1xuICBjb25zdCBkYiA9IGUudGFyZ2V0LnJlc3VsdDtcbiAgY29uc3Qgb2JqZWN0U3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShcInRhc2tzXCIsIHsga2V5UGF0aDogXCJuYW1lXCIgfSk7XG5cbiAgb2JqZWN0U3RvcmUuY3JlYXRlSW5kZXgoXCJjb21wbGV0ZWRcIiwgXCJjb21wbGV0ZWRcIiwgeyB1bmlxdWU6IGZhbHNlIH0pO1xufTtcblxuLy8gcGFyc2UgdGhlIHF1ZXJ5IHNlbGVjdG9yIGluIHRoZSB1cmxcbmNvbnN0IHFkID0ge307XG5pZiAobG9jYXRpb24uc2VhcmNoKSB7XG4gIGxvY2F0aW9uLnNlYXJjaFxuICAgIC5zdWJzdHIoMSlcbiAgICAuc3BsaXQoXCImXCIpXG4gICAgLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCBzID0gaXRlbS5zcGxpdChcIj1cIik7XG4gICAgICBjb25zdCBrID0gc1swXTtcbiAgICAgIGNvbnN0IHYgPSBzWzFdICYmIHJlcGxhY2VBbGwoZGVjb2RlVVJJQ29tcG9uZW50KHNbMV0pLCAvXFwrLywgXCIgXCIpOyAvLyAgbnVsbC1jb2FsZXNjaW5nIC8gc2hvcnQtY2lyY3VpdFxuICAgICAgKHFkW2tdID0gcWRba10gfHwgW10pLnB1c2godik7IC8vIG51bGwtY29hbGVzY2luZyAvIHNob3J0LWNpcmN1aXRcbiAgICB9KTtcbn1cblxuLy8gaW5pdGlhbGl6ZSBwcm9ncmFtIGFyZ3VtZW50cy5cblxuY29uc3Qgd29ya3NwYW4gPSBxZC50aW1lciB8fCAyMDtcbmNvbnN0IGJyZWFrc3BhbiA9IHFkLmJyZWFrIHx8IDQ7XG5sZXQgZmluaXNoZWQgPSB0cnVlO1xuXG4vLyBtb3ZlIGludG8gJ3dvcmsnIHN0YXRlIGlmIGEgdGFzayBoYXMgYmVlbiBkZWZpbmVkLlxuXG5sZXQgd29ya2VyO1xuXG5pZiAod2luZG93Lldvcmtlcikge1xuICBpZiAod29ya2VyID09PSB1bmRlZmluZWQpIHtcbiAgICB3b3JrZXIgPSBuZXcgV29ya2VyKFwid29ya2VyLmJ1bmRsZS5qc1wiKTtcbiAgfVxufVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBpZiAocWQudGFzayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrXCIpLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZXJcIikuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xuXG4gICAgaWYgKHdvcmtlcikgdGltZXIod29ya3NwYW4pO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza1wiKS5zdHlsZS52aXNpYmlsaXR5ID0gXCJ2aXNpYmxlXCI7XG4gIH1cbn07XG5cbndvcmtlci5vbm1lc3NhZ2UgPSBlID0+IHtcbiAgbGV0IG1pbnV0ZXMgPSA5OTtcbiAgbGV0IHNlY29uZHMgPSA5OTtcblxuICBpZiAoZS5kYXRhLm1pbnV0ZXMgIT09IHVuZGVmaW5lZCAmJiBlLmRhdGEuc2Vjb25kcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgW21pbnV0ZXMsIHNlY29uZHNdID0gZS5kYXRhO1xuICB9XG5cbiAgaWYgKGUuZGF0YS5maW5pc2hlZCkge1xuICAgIC8vIGRvIHdoYXRldmVyIG5lZWRzIGRvaW5nIHdoZW4gdGhlIHRpbWVyIGV4cGlyZXMuLi5cbiAgICBjYWxsYmFjaygpO1xuICB9XG5cbiAgaWYgKCFmaW5pc2hlZCkge1xuICAgIGRvY3VtZW50LnRpdGxlID0gYCR7bWludXRlcy50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHtcbiAgICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAyXG4gICAgfSl9OiR7c2Vjb25kcy50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDIgfSl9ICR7XG4gICAgICBxZC50YXNrXG4gICAgfWA7XG5cbiAgICBzZXROaXhpZShuaXhpZTMsIE1hdGguZmxvb3IobWludXRlcyAvIDEwKSk7XG4gICAgc2V0Tml4aWUobml4aWUyLCBNYXRoLmZsb29yKG1pbnV0ZXMgJSAxMCkpO1xuICAgIHNldE5peGllKG5peGllMSwgTWF0aC5mbG9vcihzZWNvbmRzIC8gMTApKTtcbiAgICBzZXROaXhpZShuaXhpZTAsIE1hdGguZmxvb3Ioc2Vjb25kcyAlIDEwKSk7XG4gIH1cbn07XG5cbmlmIChcInNlcnZpY2VXb3JrZXJcIiBpbiBuYXZpZ2F0b3IpIHtcbiAgY29uc29sZS5sb2coXCJzdyBzdXBwb3J0ZWRcIik7XG4gIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKFwic3cuYnVuZGxlLmpzXCIpLnRoZW4oXG4gICAgc3cgPT4ge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIFwiU2VydmljZVdvcmtlciByZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCB3aXRoIHNjb3BlOiBcIixcbiAgICAgICAgc3cuc2NvcGVcbiAgICAgICk7XG4gICAgfSxcbiAgICBlcnIgPT4ge1xuICAgICAgLy8gcmVnaXN0cmF0aW9uIGZhaWxlZCA6KFxuICAgICAgY29uc29sZS5sb2coXCJTZXJ2aWNlV29ya2VyIHJlZ2lzdHJhdGlvbiBmYWlsZWQ6IFwiLCBlcnIpO1xuICAgIH1cbiAgKTtcbn1cblxudmFyIGNhbGxiYWNrID0gKCkgPT4gY29uc29sZS5sb2coXCJub3RoaW5nIGhlcmVcIik7XG5cbi8qKlxuICogU3RhcnRzIGEgdGltZXIgZm9yIHRoZSBjdXJyZW50IHRhc2suXG4gKiBAcGFyYW0ge251bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kc1xuICovXG5mdW5jdGlvbiB0aW1lcihhbW91bnQpIHtcbiAgY29uc29sZS5sb2coXCJzdGFydGluZyB0aW1lclwiKTtcbiAgc3RhdGUgPSBcIndvcmtcIjtcbiAgZmluaXNoZWQgPSBmYWxzZTtcbiAgZG9jdW1lbnRcbiAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpXG4gICAgLml0ZW0oMClcbiAgICAuY2xhc3NMaXN0LnJlbW92ZShcImJyZWFrXCIpO1xuXG4gIGlmICh3aW5kb3cuV29ya2VyICYmIHdvcmtlciAhPSB1bmRlZmluZWQpIHtcbiAgICBjYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIHRhc2tGaW5pc2hlZCgpO1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvZ3Jlc3NcIikuYXBwZW5kQ2hpbGQoZ2V0V29ya1Rva2VuKCkpO1xuICAgIH07XG4gICAgd29ya2VyLnBvc3RNZXNzYWdlKGFtb3VudCAqIDEwMDAgKiA2MCk7XG4gIH1cbn1cblxuLyoqXG4gKiBTdGFydHMgYSB0aW1lciBmb3IgYSBicmVhay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnQgLSB0aGUgYW1vdW50IG9mIHRpbWUgaW4gbWlsbGlzZWNvbmRzXG4gKi9cbmZ1bmN0aW9uIGJyZWF0aGVyKGFtb3VudCkge1xuICBzdGF0ZSA9IFwiYnJlYWtcIjtcbiAgZmluaXNoZWQgPSBmYWxzZTtcbiAgZG9jdW1lbnRcbiAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpXG4gICAgLml0ZW0oMClcbiAgICAuY2xhc3NMaXN0LmFkZChcImJyZWFrXCIpO1xuICBpZiAod2luZG93Lldvcmtlcikge1xuICAgIGlmICh3b3JrZXIgIT0gdW5kZWZpbmVkKSB7XG4gICAgICBjYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgdGFza0ZpbmlzaGVkKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvZ3Jlc3NcIikuYXBwZW5kQ2hpbGQoZ2V0QnJlYWtUb2tlbigpKTtcbiAgICAgIH07XG4gICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoYW1vdW50ICogMTAwMCAqIDYwKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QnJlYWtUb2tlbigpIHtcbiAgY29uc3QgYnRva2VuID0gdG9rZW4uY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gIGJ0b2tlbi5nZXRFbGVtZW50QnlJZChcImljb25cIikuY2xhc3NMaXN0LnJlbW92ZShcIndvcmtcIik7XG4gIGJ0b2tlbi5nZXRFbGVtZW50QnlJZChcImljb25cIikuY2xhc3NMaXN0LmFkZChcImJyZWFrXCIpO1xuICByZXR1cm4gYnRva2VuO1xufVxuXG5mdW5jdGlvbiBnZXRXb3JrVG9rZW4oKSB7XG4gIGNvbnN0IHd0b2tlbiA9IHRva2VuLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICByZXR1cm4gd3Rva2VuO1xufVxuXG5mdW5jdGlvbiB0YXNrRmluaXNoZWQoKSB7XG4gIGZpbmlzaGVkID0gdHJ1ZTtcblxuICBjb25zdCBzb3VuZCA9IG5ldyBBdWRpbyhcInNvdW5kcy90ZW1wbGUtYmVsbC5tcDNcIik7XG4gIHNvdW5kLnBsYXkoKS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcikpO1xuICBub3RpZml5KFwiVGltZXMgdXBcIik7XG4gIGl0ZXJhdGlvbisrO1xuXG4gIGRvY3VtZW50LnRpdGxlID0gYGZpbmlzaGVkICR7cWQudGFza31gO1xuXG4gIC8vIGluY3JlbWVudCBob3cgbWFueSB0aW1lcyB0aGlzIHRhc2sgd2FzIGNvbXBsZXRlZCBpbiB0aGUgZGF0YWJhc2UuXG4gIGNvbnN0IHN0b3JlID0gZGIudHJhbnNhY3Rpb24oW1widGFza3NcIl0sIFwicmVhZHdyaXRlXCIpLm9iamVjdFN0b3JlKFwidGFza3NcIik7XG5cbiAgc3RvcmUuZ2V0KHFkLnRhc2spLm9uc3VjY2VzcyA9IGUgPT4ge1xuICAgIC8vIGNoZWNrIGlmIHRoZXJlIHdhcyBhbiBleGlzdGluZyBjb3VudCBvdGhlcndpc2Ugc3RhcnQgYW5ldy5cbiAgICBjb25zdCBjb3VudCA9IChlLnRhcmdldC5yZXN1bHQgJiYgZS50YXJnZXQucmVzdWx0LmNvbXBsZXRlZCkgfHwgMCB8fCAwO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBkYXRhYmFzZSBjb3VudCBmb3IgdGhlIHRhc2tcbiAgICBzdG9yZS5wdXQoeyBuYW1lOiBxZC50YXNrLCBjb21wbGV0ZWQ6IGNvdW50ICsgMSB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0Tml4aWUobml4aWUsIHZhbHVlKSB7XG4gIGNvbnN0IG51bWJlcnMgPSBuaXhpZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNwYW5cIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgIG51bWJlcnNbaV0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgfVxuICBpZiAodmFsdWUgPj0gMCAmJiB2YWx1ZSA8PSA5KSB7XG4gICAgbml4aWVcbiAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHZhbHVlKVxuICAgICAgLml0ZW0oMClcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9XG59XG5cbk5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbihzdGF0dXMgPT4ge1xuICBjb25zb2xlLmxvZyhcIk5vdGlmaWNhdGlvbiBwZXJtaXNzaW9uIHN0YXR1czpcIiwgc3RhdHVzKTtcbn0pO1xuXG5sZXQgX2tleTtcbmxldCBjb3VudCA9IDA7XG5cbmZ1bmN0aW9uIHJlc2V0RGVib3VuY2UoKSB7XG4gIF9rZXkgPSB1bmRlZmluZWQ7XG4gIGNvdW50ID0gMDtcbn1cblxuZnVuY3Rpb24gZGVib3VuY2VLZXkoa2V5KSB7XG4gIGlmICgha2V5KSB7XG4gICAgY291bnQgPSAwO1xuICB9XG5cbiAgaWYgKGtleSAhPSBfa2V5KSB7XG4gICAgY291bnQgPSAwO1xuICAgIF9rZXkgPSBrZXk7XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSArK2NvdW50O1xuXG4gIGlmIChkZWJvdW5jZSkgY2xlYXJUaW1lb3V0KGRlYm91bmNlKTtcbiAgZGVib3VuY2UgPSBzZXRUaW1lb3V0KHJlc2V0RGVib3VuY2UsIDIwMCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubGV0IGRlYm91bmNlO1xuXG5mdW5jdGlvbiBiZWdpbigpIHtcbiAgY29uc29sZS5sb2coZmluaXNoZWQpO1xuXG4gIGlmICghZmluaXNoZWQpIHJldHVybjtcblxuICBpZiAoc3RhdGUgPT09IFwiYnJlYWtcIikge1xuICAgIHRpbWVyKHdvcmtzcGFuKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHN0YXRlID09PSBcIndvcmtcIikge1xuICAgIGJyZWF0aGVyKGl0ZXJhdGlvbiA+IDAgJiYgaXRlcmF0aW9uICUgNCA9PSAwID8gMiAqIGJyZWFrc3BhbiA6IGJyZWFrc3Bhbik7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbndpbmRvdy5vbmNsaWNrID0gYmVnaW47XG5kb2N1bWVudC5vbmtleWRvd24gPSBlID0+IHtcbiAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICBjb25zdCBwcmVzc2VzID0gZGVib3VuY2VLZXkoZS5rZXkpO1xuXG4gIGlmIChlLmtleSA9PT0gXCIgXCIpIHtcbiAgICBiZWdpbigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChlLmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgIGlmIChwcmVzc2VzID49IDMgJiYgc3RhdGUgPT0gXCJ3b3JrXCIpIHtcbiAgICAgIGRlYm91bmNlS2V5KCk7XG4gICAgICBicmVhdGhlcihicmVha3NwYW4pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocHJlc3NlcyA+PSAzICYmIHN0YXRlID09IFwiYnJlYWtcIikge1xuICAgICAgZGVib3VuY2VLZXkoKTtcbiAgICAgIHRpbWVyKHdvcmtzcGFuKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIG5vdGlmaXkobXNnKSB7XG4gIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gXCJncmFudGVkXCIpIHtcbiAgICBuYXZpZ2F0b3Iuc2VydmljZVdvcmtlci5nZXRSZWdpc3RyYXRpb24oKS50aGVuKHJlZ2lzdHJhdGlvbiA9PiB7XG4gICAgICBjb25zdCBub3RpZmljYXRpb24gPSByZWdpc3RyYXRpb24uc2hvd05vdGlmaWNhdGlvbihcIkFsbCBkb25lIVwiLCB7XG4gICAgICAgIHRhZzogXCJ0YXNrXCIsXG4gICAgICAgIHJlbm90aWZ5OiB0cnVlLFxuICAgICAgICByZXF1aXJlSW50ZXJhY3Rpb246IHRydWUsXG4gICAgICAgIGljb246IFwiaW1hZ2VzL2ljb25zL2ljb24tNzJ4NzIucG5nXCIsXG4gICAgICAgIHNpbGVudDogdHJ1ZSxcbiAgICAgICAgaW1hZ2U6XG4gICAgICAgICAgXCJodHRwczovL3N0YXRpYzEuc3F1YXJlc3BhY2UuY29tL3N0YXRpYy81M2ZjY2RjM2U0YjA2ZDU5ODg5MDczN2QvNTQyMzFkZmZlNGIwN2JiNTU4YjFlMGQyLzU0MjMxZTMxZTRiMDU3MjEyZjE1N2VjNS8xNTE3OTQ3ODg2MTA4L0dJTkdFUldISVRFQ09GRkVFTEFORC5qcGdcIlxuICAgICAgfSk7XG5cbiAgICAgIG5vdGlmaWNhdGlvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrZWRcIik7XG4gICAgICAgIHBhcmVudC5mb2N1cygpO1xuICAgICAgICB3aW5kb3cuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==