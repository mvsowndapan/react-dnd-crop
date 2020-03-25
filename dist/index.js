"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Dnd = require("./Dnd/Dnd");

var _Dnd2 = _interopRequireDefault(_Dnd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DndWC = function DndWC(_ref) {
  var rest = _objectWithoutProperties(_ref, []);

  return _react2.default.createElement(_Dnd2.default, rest);
};
exports.default = DndWC;