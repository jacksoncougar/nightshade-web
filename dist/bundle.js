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

var amount = 1000 * 3;
var start = Date.now() + amount;

function update() {
  var minutesSpan = document.getElementById('minutes');
  var secondsSpan = document.getElementById('seconds');
  var moment = start - Date.now();
  var minutes = Math.floor(moment / 1000 / 60);
  var seconds = Math.ceil((moment - minutes * 1000 * 60) / 1000) % 60;
  minutesSpan.innerText = minutes.toLocaleString(undefined, {
    minimumIntegerDigits: 2
  });
  secondsSpan.innerText = seconds.toLocaleString(undefined, {
    minimumIntegerDigits: 2
  });

  if (moment <= 0) {
    notifiy("times up");
    clearInterval(t);
  }
}

function notifiy(msg) {
  // Let's check whether notification permissions have already been granted
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(msg);
  } // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(msg);
        }
      });
    }
}

var t = setInterval(update, 1000);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc2Nzcy9hcHAuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiYW1vdW50Iiwic3RhcnQiLCJEYXRlIiwibm93IiwidXBkYXRlIiwibWludXRlc1NwYW4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2Vjb25kc1NwYW4iLCJtb21lbnQiLCJtaW51dGVzIiwiTWF0aCIsImZsb29yIiwic2Vjb25kcyIsImNlaWwiLCJpbm5lclRleHQiLCJ0b0xvY2FsZVN0cmluZyIsInVuZGVmaW5lZCIsIm1pbmltdW1JbnRlZ2VyRGlnaXRzIiwibm90aWZpeSIsImNsZWFySW50ZXJ2YWwiLCJ0IiwibXNnIiwiTm90aWZpY2F0aW9uIiwicGVybWlzc2lvbiIsIm5vdGlmaWNhdGlvbiIsInJlcXVlc3RQZXJtaXNzaW9uIiwic2V0SW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSx1Qzs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFFQSxJQUFJQSxNQUFNLEdBQUcsT0FBTyxDQUFwQjtBQUNBLElBQUlDLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxHQUFMLEtBQWFILE1BQXpCOztBQUVBLFNBQVNJLE1BQVQsR0FBa0I7QUFDZCxNQUFJQyxXQUFXLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixTQUF4QixDQUFsQjtBQUNBLE1BQUlDLFdBQVcsR0FBR0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLENBQWxCO0FBRUEsTUFBSUUsTUFBTSxHQUFHUixLQUFLLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxFQUFyQjtBQUVBLE1BQUlPLE9BQU8sR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdILE1BQU0sR0FBRyxJQUFULEdBQWdCLEVBQTNCLENBQWQ7QUFDQSxNQUFJSSxPQUFPLEdBQUdGLElBQUksQ0FBQ0csSUFBTCxDQUFVLENBQUNMLE1BQU0sR0FBSUMsT0FBTyxHQUFHLElBQVYsR0FBaUIsRUFBNUIsSUFBbUMsSUFBN0MsSUFBcUQsRUFBbkU7QUFFQUwsYUFBVyxDQUFDVSxTQUFaLEdBQXdCTCxPQUFPLENBQUNNLGNBQVIsQ0FBdUJDLFNBQXZCLEVBQWtDO0FBQUVDLHdCQUFvQixFQUFFO0FBQXhCLEdBQWxDLENBQXhCO0FBQ0FWLGFBQVcsQ0FBQ08sU0FBWixHQUF3QkYsT0FBTyxDQUFDRyxjQUFSLENBQXVCQyxTQUF2QixFQUFrQztBQUFFQyx3QkFBb0IsRUFBRTtBQUF4QixHQUFsQyxDQUF4Qjs7QUFFQSxNQUFJVCxNQUFNLElBQUksQ0FBZCxFQUFpQjtBQUNiVSxXQUFPLENBQUMsVUFBRCxDQUFQO0FBQ0FDLGlCQUFhLENBQUNDLENBQUQsQ0FBYjtBQUNQO0FBQUM7O0FBRUYsU0FBU0YsT0FBVCxDQUFpQkcsR0FBakIsRUFBc0I7QUFDbEI7QUFDQSxNQUFJQyxZQUFZLENBQUNDLFVBQWIsS0FBNEIsU0FBaEMsRUFBMkM7QUFDdkM7QUFDQSxRQUFJQyxZQUFZLEdBQUcsSUFBSUYsWUFBSixDQUFpQkQsR0FBakIsQ0FBbkI7QUFDSCxHQUhELENBS0E7QUFMQSxPQU1LLElBQUlDLFlBQVksQ0FBQ0MsVUFBYixLQUE0QixRQUFoQyxFQUEwQztBQUMzQ0Qsa0JBQVksQ0FBQ0csaUJBQWIsQ0FBK0IsVUFBVUYsVUFBVixFQUFzQjtBQUNqRDtBQUNBLFlBQUlBLFVBQVUsS0FBSyxTQUFuQixFQUE4QjtBQUMxQixjQUFJQyxZQUFZLEdBQUcsSUFBSUYsWUFBSixDQUFpQkQsR0FBakIsQ0FBbkI7QUFDSDtBQUNKLE9BTEQ7QUFNSDtBQUNKOztBQUVELElBQUlELENBQUMsR0FBR00sV0FBVyxDQUFDdkIsTUFBRCxFQUFTLElBQVQsQ0FBbkIsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0XCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW1wb3J0ICcuLy4uL3Njc3MvYXBwLnNjc3MnXHJcblxyXG52YXIgYW1vdW50ID0gMTAwMCAqIDM7XHJcbnZhciBzdGFydCA9IERhdGUubm93KCkgKyBhbW91bnQ7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICBsZXQgbWludXRlc1NwYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWludXRlcycpO1xyXG4gICAgbGV0IHNlY29uZHNTcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlY29uZHMnKTtcclxuXHJcbiAgICBsZXQgbW9tZW50ID0gc3RhcnQgLSBEYXRlLm5vdygpO1xyXG5cclxuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcihtb21lbnQgLyAxMDAwIC8gNjApO1xyXG4gICAgbGV0IHNlY29uZHMgPSBNYXRoLmNlaWwoKG1vbWVudCAtIChtaW51dGVzICogMTAwMCAqIDYwKSkgLyAxMDAwKSAlIDYwO1xyXG5cclxuICAgIG1pbnV0ZXNTcGFuLmlubmVyVGV4dCA9IG1pbnV0ZXMudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7IG1pbmltdW1JbnRlZ2VyRGlnaXRzOiAyIH0pO1xyXG4gICAgc2Vjb25kc1NwYW4uaW5uZXJUZXh0ID0gc2Vjb25kcy50b0xvY2FsZVN0cmluZyh1bmRlZmluZWQsIHsgbWluaW11bUludGVnZXJEaWdpdHM6IDIgfSk7XHJcblxyXG4gICAgaWYgKG1vbWVudCA8PSAwKSB7XHJcbiAgICAgICAgbm90aWZpeShcInRpbWVzIHVwXCIpXHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0KVxyXG59fVxyXG5cclxuZnVuY3Rpb24gbm90aWZpeShtc2cpIHtcclxuICAgIC8vIExldCdzIGNoZWNrIHdoZXRoZXIgbm90aWZpY2F0aW9uIHBlcm1pc3Npb25zIGhhdmUgYWxyZWFkeSBiZWVuIGdyYW50ZWRcclxuICAgIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gXCJncmFudGVkXCIpIHtcclxuICAgICAgICAvLyBJZiBpdCdzIG9rYXkgbGV0J3MgY3JlYXRlIGEgbm90aWZpY2F0aW9uXHJcbiAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24obXNnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPdGhlcndpc2UsIHdlIG5lZWQgdG8gYXNrIHRoZSB1c2VyIGZvciBwZXJtaXNzaW9uXHJcbiAgICBlbHNlIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiAhPT0gJ2RlbmllZCcpIHtcclxuICAgICAgICBOb3RpZmljYXRpb24ucmVxdWVzdFBlcm1pc3Npb24oZnVuY3Rpb24gKHBlcm1pc3Npb24pIHtcclxuICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgYWNjZXB0cywgbGV0J3MgY3JlYXRlIGEgbm90aWZpY2F0aW9uXHJcbiAgICAgICAgICAgIGlmIChwZXJtaXNzaW9uID09PSBcImdyYW50ZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IG5ldyBOb3RpZmljYXRpb24obXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgdCA9IHNldEludGVydmFsKHVwZGF0ZSwgMTAwMCk7Il0sInNvdXJjZVJvb3QiOiIifQ==