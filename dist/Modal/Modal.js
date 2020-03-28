"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactModal = require("react-modal");

var _reactModal2 = _interopRequireDefault(_reactModal);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Crop = require("../Crop/Crop");

var _Crop2 = _interopRequireDefault(_Crop);

require("../Crop/Crop.css");

var _Button = require("../Button/Button");

var _Button2 = _interopRequireDefault(_Button);

require("./Modal.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_reactModal2.default.setAppElement("body");

var Cropper = function (_Component) {
  _inherits(Cropper, _Component);

  function Cropper(props) {
    var _this2 = this;

    _classCallCheck(this, Cropper);

    var _this = _possibleConstructorReturn(this, (Cropper.__proto__ || Object.getPrototypeOf(Cropper)).call(this, props));

    _this.helperfunc = function () {
      return _this.props.getcropImage(_this.state.croppedImageUrl);
    };

    _this.cancelFunc = function () {
      return _this.props.cancelCrop();
    };

    _this.onImageLoaded = function (image) {
      return _this.imageRef = image;
    };

    _this.onCropComplete = function (crop) {
      return _this.makeClientCrop(crop);
    };

    _this.onCropChange = function (crop) {
      return _this.setState({ crop: crop });
    };

    _this.makeClientCrop = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(crop) {
        var croppedImageUrl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this.imageRef && crop.width && crop.height)) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return _this.getCroppedImg(_this.imageRef, crop);

              case 3:
                croppedImageUrl = _context.sent;

                _this.setState({ croppedImageUrl: croppedImageUrl });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.getCroppedImg = function (image, crop) {
      var canvas = document.createElement("canvas");
      var scaleX = image.naturalWidth / image.width;
      var scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);
      return canvas.toDataURL();
    };

    var cropRatio = props.cropRatio ? props.cropRatio : {
      unit: "%",
      width: 30,
      aspect: 4 / 3
    };
    if (props.freeCrop) cropRatio = {};
    _this.state = {
      crop: cropRatio
    };
    return _this;
  }

  _createClass(Cropper, [{
    key: "render",
    value: function render() {
      var crop = this.state.crop;

      return _react2.default.createElement(
        "div",
        { className: "CropperModalOuterContainer" },
        _react2.default.createElement(
          _reactModal2.default,
          { isOpen: this.props.isOpen, onRequestClose: this.props.onRequestClose, className: "CropperModal" },
          _react2.default.createElement(
            "div",
            { className: "CropperImage" },
            this.props.imageSrc && _react2.default.createElement(_Crop2.default, {
              className: "Cropper",
              style: {
                maxHeight: "100px !important",
                maxWidth: "100px !important"
              },
              src: this.props.imageSrc,
              crop: crop,
              err: false,
              ruleOfThirds: true,
              onImageLoaded: this.onImageLoaded,
              onComplete: this.onCropComplete,
              onChange: this.onCropChange
            })
          ),
          _react2.default.createElement(
            "div",
            { id: "CROPPER_BUTTON_CONTAINER" },
            _react2.default.createElement(_Button2.default, {
              value: this.props.buttonvalue && this.props.buttonvalue.cropButton ? this.props.buttonvalue.cropButton : "Crop",
              style: this.props.style && this.props.style.CROP_BUTTON ? this.props.style.CROP_BUTTON : null,
              onClick: this.helperfunc
            }),
            this.props.buttonvalue && this.props.buttonvalue.cancelButton ? _react2.default.createElement(_Button2.default, {
              value: this.props.buttonvalue && this.props.buttonvalue.cancelButton ? this.props.buttonvalue.cancelButton : "Cancel",
              style: this.props.style && this.props.style.CANCEL_BUTTON ? this.props.style.CANCEL_BUTTON : null,
              onClick: this.cancelFunc
            }) : ""
          )
        )
      );
    }
  }]);

  return Cropper;
}(_react.Component);

exports.default = Cropper;