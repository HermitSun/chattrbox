(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChatApp = function ChatApp() {
  _classCallCheck(this, ChatApp);

  console.log('Hello ES6!');
};

var ChatMessage = function ChatMessage(_ref) {
  var m = _ref.message,
      _ref$user = _ref.user,
      u = _ref$user === undefined ? 'batman' : _ref$user,
      _ref$timestamp = _ref.timestamp,
      t = _ref$timestamp === undefined ? new Date().getTime() : _ref$timestamp;

  _classCallCheck(this, ChatMessage);

  this.message = m;
  this.user = u;
  this.timestamp = t;
};

exports.default = ChatApp;

},{}],2:[function(require,module,exports){
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _app2.default();

},{"./app":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztJQ0FNLE8sR0FDSixtQkFBYztBQUFBOztBQUNaLFVBQVEsR0FBUixDQUFZLFlBQVo7QUFDRCxDOztJQUdHLFcsR0FDSiwyQkFJZTtBQUFBLE1BSFEsQ0FHUixRQUhELE9BR0M7QUFBQSx1QkFGRCxJQUVDO0FBQUEsTUFGSyxDQUVMLDZCQUZTLFFBRVQ7QUFBQSw0QkFERCxTQUNDO0FBQUEsTUFEVSxDQUNWLGtDQURjLElBQUksSUFBSixHQUFXLE9BQVgsRUFDZDs7QUFBQTs7QUFDYixPQUFLLE9BQUwsR0FBZSxDQUFmO0FBQ0EsT0FBSyxJQUFMLEdBQVksQ0FBWjtBQUNBLE9BQUssU0FBTCxHQUFpQixDQUFqQjtBQUNELEM7O2tCQUdZLE87Ozs7O0FDbEJmOzs7Ozs7QUFFQSxJQUFJLGFBQUoiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjbGFzcyBDaGF0QXBwIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdIZWxsbyBFUzYhJyk7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBDaGF0TWVzc2FnZSB7XHJcbiAgY29uc3RydWN0b3Ioe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbSxcclxuICAgICAgICAgICAgICAgIHVzZXI6IHUgPSAnYmF0bWFuJyxcclxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogdCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgICAgICAgICAgICAgfSkge1xyXG4gICAgdGhpcy5tZXNzYWdlID0gbTtcclxuICAgIHRoaXMudXNlciA9IHU7XHJcbiAgICB0aGlzLnRpbWVzdGFtcCA9IHQ7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGF0QXBwO1xyXG4iLCJpbXBvcnQgQ2hhdEFwcCBmcm9tICcuL2FwcCc7XHJcblxyXG5uZXcgQ2hhdEFwcCgpO1xyXG4iXX0=
