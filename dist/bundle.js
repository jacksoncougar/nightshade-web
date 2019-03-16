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

var start = 0;
var iteration = 1;
var t;

function timer(amount) {
  document.getElementsByTagName('body').item(0).classList.remove('break');
  start = Date.now() + amount;
  t = setInterval(update, 1000);
}

function breather(amount) {
  document.getElementsByTagName('body').item(0).classList.add('break');
  start = Date.now() + amount;
  t = setInterval(update, 1000);
}

timer(1000 * 60 * 20);
var finished = false;

function update() {
  finished = false;
  var minutesSpan = document.getElementById('minutes');
  var secondsSpan = document.getElementById('seconds');
  var moment = start - Date.now();
  var minutes = Math.floor(moment / 1000 / 60);
  var seconds = Math.ceil((moment - minutes * 1000 * 60) / 1000) % 60;

  if (moment <= 900 && !finished) {
    finished = true;
    notifiy("Times up");
    clearInterval(t);
    minutes = 0;
    seconds = 0;
    iteration++;
  }

  minutesSpan.innerText = minutes.toLocaleString(undefined, {
    minimumIntegerDigits: 2
  });
  secondsSpan.innerText = seconds.toLocaleString(undefined, {
    minimumIntegerDigits: 2
  });
}

window.onclick = function () {
  if (!finished) return;
  if (iteration % 8 == 0) return breather(1000 * 10 * 60); // ten minute timer
  else if (iteration % 2 == 0) return breather(1000 * 5 * 60); // ten minute timer
    else return timer(1000 * 20 * 60); // ten minute timer
};

function notifiy(msg) {
  // Let's check whether notification permissions have already been granted
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(msg, {
      icon: './images/icon.png',
      requireInteraction: true
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
            requireInteraction: true
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2Nzcz82MTk4Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJzdGFydCIsIml0ZXJhdGlvbiIsInQiLCJ0aW1lciIsImFtb3VudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpdGVtIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiRGF0ZSIsIm5vdyIsInNldEludGVydmFsIiwidXBkYXRlIiwiYnJlYXRoZXIiLCJhZGQiLCJmaW5pc2hlZCIsIm1pbnV0ZXNTcGFuIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWNvbmRzU3BhbiIsIm1vbWVudCIsIm1pbnV0ZXMiLCJNYXRoIiwiZmxvb3IiLCJzZWNvbmRzIiwiY2VpbCIsIm5vdGlmaXkiLCJjbGVhckludGVydmFsIiwiaW5uZXJUZXh0IiwidG9Mb2NhbGVTdHJpbmciLCJ1bmRlZmluZWQiLCJtaW5pbXVtSW50ZWdlckRpZ2l0cyIsIndpbmRvdyIsIm9uY2xpY2siLCJtc2ciLCJOb3RpZmljYXRpb24iLCJwZXJtaXNzaW9uIiwibm90aWZpY2F0aW9uIiwiaWNvbiIsInJlcXVpcmVJbnRlcmFjdGlvbiIsInBhcmVudCIsImZvY3VzIiwicmVxdWVzdFBlcm1pc3Npb24iLCJjbG9zZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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aGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3RcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgJy4vLi4vc2Nzcy9hcHAuc2NzcydcclxuXHJcbnZhciBzdGFydCA9IDA7XHJcbnZhciBpdGVyYXRpb24gPSAxO1xyXG52YXIgdDtcclxuXHJcbmZ1bmN0aW9uIHRpbWVyKGFtb3VudCkge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKS5pdGVtKDApLmNsYXNzTGlzdC5yZW1vdmUoJ2JyZWFrJyk7XHJcbiAgICBzdGFydCA9IERhdGUubm93KCkgKyBhbW91bnQ7XHJcbiAgICB0ID0gc2V0SW50ZXJ2YWwodXBkYXRlLCAxMDAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnJlYXRoZXIoYW1vdW50KSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpLml0ZW0oMCkuY2xhc3NMaXN0LmFkZCgnYnJlYWsnKTtcclxuICAgIHN0YXJ0ID0gRGF0ZS5ub3coKSArIGFtb3VudDtcclxuICAgIHQgPSBzZXRJbnRlcnZhbCh1cGRhdGUsIDEwMDApO1xyXG59XHJcblxyXG50aW1lcigxMDAwICogNjAgKiAyMCk7XHJcblxyXG52YXIgZmluaXNoZWQgPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcclxuICAgIGZpbmlzaGVkID0gZmFsc2U7XHJcbiAgICBsZXQgbWludXRlc1NwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWludXRlcycpO1xyXG4gICAgbGV0IHNlY29uZHNTcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY29uZHMnKTtcclxuXHJcbiAgICBsZXQgbW9tZW50ID0gc3RhcnQgLSBEYXRlLm5vdygpO1xyXG5cclxuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcihtb21lbnQgLyAxMDAwIC8gNjApO1xyXG4gICAgbGV0IHNlY29uZHMgPSBNYXRoLmNlaWwoKG1vbWVudCAtIChtaW51dGVzICogMTAwMCAqIDYwKSkgLyAxMDAwKSAlIDYwO1xyXG5cclxuICAgIGlmIChtb21lbnQgPD0gOTAwICYmICFmaW5pc2hlZCkge1xyXG4gICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcclxuICAgICAgICBub3RpZml5KFwiVGltZXMgdXBcIilcclxuICAgICAgICBjbGVhckludGVydmFsKHQpXHJcblxyXG4gICAgICAgIG1pbnV0ZXMgPSAwO1xyXG4gICAgICAgIHNlY29uZHMgPSAwOyBcclxuICAgICAgICBpdGVyYXRpb24rKztcclxuICAgIH1cclxuXHJcbiAgICBtaW51dGVzU3Bhbi5pbm5lclRleHQgPSBtaW51dGVzLnRvTG9jYWxlU3RyaW5nKHVuZGVmaW5lZCwgeyBtaW5pbXVtSW50ZWdlckRpZ2l0czogMiB9KTtcclxuICAgIHNlY29uZHNTcGFuLmlubmVyVGV4dCA9IHNlY29uZHMudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAyIH0pO1xyXG59XHJcblxyXG53aW5kb3cub25jbGljayA9ICgpID0+IHsgXHJcbiAgICBpZighZmluaXNoZWQpIHJldHVybjtcclxuXHJcbiAgICBpZihpdGVyYXRpb24gJSA4ID09IDApXHJcbiAgICByZXR1cm4gYnJlYXRoZXIoMTAwMCAqIDEwICogNjApOyAvLyB0ZW4gbWludXRlIHRpbWVyXHJcbiAgICBlbHNlIGlmKGl0ZXJhdGlvbiAlIDIgPT0gMClcclxuICAgIHJldHVybiBicmVhdGhlcigxMDAwICogNSAqIDYwKTsgLy8gdGVuIG1pbnV0ZSB0aW1lclxyXG4gICAgZWxzZSByZXR1cm4gdGltZXIoMTAwMCAqIDIwICogNjApOyAvLyB0ZW4gbWludXRlIHRpbWVyXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vdGlmaXkobXNnKSB7XHJcbiAgICAvLyBMZXQncyBjaGVjayB3aGV0aGVyIG5vdGlmaWNhdGlvbiBwZXJtaXNzaW9ucyBoYXZlIGFscmVhZHkgYmVlbiBncmFudGVkXHJcbiAgICBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gPT09IFwiZ3JhbnRlZFwiKSB7XHJcbiAgICAgICAgLy8gSWYgaXQncyBva2F5IGxldCdzIGNyZWF0ZSBhIG5vdGlmaWNhdGlvblxyXG4gICAgICAgIHZhciBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKG1zZywge2ljb246ICcuL2ltYWdlcy9pY29uLnBuZycsIHJlcXVpcmVJbnRlcmFjdGlvbjogdHJ1ZX0gKTtcclxuICAgICAgICBub3RpZmljYXRpb24ub25jbGljayA9ICgpID0+IHsgcGFyZW50LmZvY3VzKCk7IH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3RoZXJ3aXNlLCB3ZSBuZWVkIHRvIGFzayB0aGUgdXNlciBmb3IgcGVybWlzc2lvblxyXG4gICAgZWxzZSBpZiAoTm90aWZpY2F0aW9uLnBlcm1pc3Npb24gIT09ICdkZW5pZWQnKSB7XHJcbiAgICAgICAgTm90aWZpY2F0aW9uLnJlcXVlc3RQZXJtaXNzaW9uKGZ1bmN0aW9uIChwZXJtaXNzaW9uKSB7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIGFjY2VwdHMsIGxldCdzIGNyZWF0ZSBhIG5vdGlmaWNhdGlvblxyXG4gICAgICAgICAgICBpZiAocGVybWlzc2lvbiA9PT0gXCJncmFudGVkXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBub3RpZmljYXRpb24gPSBuZXcgTm90aWZpY2F0aW9uKG1zZywge2ljb246ICcuL2ltYWdlcy9pY29uLnBuZycsIHJlcXVpcmVJbnRlcmFjdGlvbjogdHJ1ZX0gKTtcclxuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5vbmNsaWNrID0gKCkgPT4geyBwYXJlbnQuZm9jdXMoKTsgdGhpcy5jbG9zZSgpOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9