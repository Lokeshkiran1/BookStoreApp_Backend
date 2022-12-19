"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.newUser = exports.loginUser = exports.getUser = exports.getAllUsers = exports.deleteUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = _interopRequireWildcard(require("../config/database"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var User = require('../models/user')(_database["default"], _database.DataTypes);
_dotenv["default"].config();

//get all users
var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.findAll();
          case 2:
            data = _context.sent;
            return _context.abrupt("return", data);
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function getAllUsers() {
    return _ref.apply(this, arguments);
  };
}();

//create new user
exports.getAllUsers = getAllUsers;
var newUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var existingEmail, saltRounds, hashPassword, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return User.findOne({
              where: {
                email: body.email
              }
            });
          case 2:
            existingEmail = _context2.sent;
            if (!(existingEmail === null)) {
              _context2.next = 13;
              break;
            }
            saltRounds = 10;
            hashPassword = _bcrypt["default"].hashSync(body.password, saltRounds);
            body.password = hashPassword;
            _context2.next = 9;
            return User.create(body);
          case 9:
            data = _context2.sent;
            return _context2.abrupt("return", data);
          case 13:
            throw new Error("Oops, User with same EmailId already exists, so use different!!!");
          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function newUser(_x) {
    return _ref2.apply(this, arguments);
  };
}();

//login User
exports.newUser = newUser;
var loginUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var data, passwordAuthentication, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return User.findOne({
              where: {
                email: body.email
              }
            });
          case 2:
            data = _context3.sent;
            if (!(data !== null)) {
              _context3.next = 13;
              break;
            }
            passwordAuthentication = _bcrypt["default"].compareSync(body.password, data.password);
            if (!passwordAuthentication) {
              _context3.next = 10;
              break;
            }
            token = _jsonwebtoken["default"].sign({
              firstName: data.firstName,
              email: data.email,
              id: data.id
            }, process.env.SECRET_KEY);
            return _context3.abrupt("return", token);
          case 10:
            throw new Error('invalid password');
          case 11:
            _context3.next = 14;
            break;
          case 13:
            throw new Error('invalid email');
          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function loginUser(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

//update single user
exports.loginUser = loginUser;
var updateUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, body) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return User.update(body, {
              where: {
                id: id
              }
            });
          case 2:
            return _context4.abrupt("return", body);
          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function updateUser(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

//delete single user
exports.updateUser = updateUser;
var deleteUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return User.destroy({
              where: {
                id: id
              }
            });
          case 2:
            return _context5.abrupt("return", '');
          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function deleteUser(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

//get single user
exports.deleteUser = deleteUser;
var getUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return User.findByPk(id);
          case 2:
            data = _context6.sent;
            return _context6.abrupt("return", data);
          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function getUser(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getUser = getUser;