"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(_ref) {
  var _ref$text = _ref.text,
      text = _ref$text === undefined ? false : _ref$text,
      style = _ref.style,
      value = _ref.value,
      children = _ref.children,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === undefined ? false : _ref$disabled,
      onClick = _ref.onClick;

  if (text) {
    return _react2.default.createElement(
      "div",
      { onClick: onClick, style: style },
      children || value
    );
  }
  var styles = {
    width: "200px",
    height: "30px",
    borderRadius: "10px",
    background: "white",
    color: "black"
  };
  return _react2.default.createElement(
    "button",
    { style: style || styles, onClick: onClick, disabled: disabled },
    children || value
  );
};
Button.prototype = {
  style: _propTypes2.default.object,
  secondary: _propTypes2.default.bool,
  text: _propTypes2.default.bool,
  value: _propTypes2.default.string,
  medium: _propTypes2.default.bool,
  large: _propTypes2.default.bool,
  onClick: _propTypes2.default.func
};
exports.default = Button;