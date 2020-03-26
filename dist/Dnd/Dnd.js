"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _helper = require("./helper");

var _style = require("./style");

var _Modal = require("../Modal/Modal");

var _Modal2 = _interopRequireDefault(_Modal);

var _cancel = require("../icons/cancel.svg");

var _cancel2 = _interopRequireDefault(_cancel);

var _crop = require("../icons/crop.svg");

var _crop2 = _interopRequireDefault(_crop);

var _image = require("../icons/image.svg");

var _image2 = _interopRequireDefault(_image);

require("./Dnd.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dnd = function (_Component) {
  _inherits(Dnd, _Component);

  function Dnd(props) {
    _classCallCheck(this, Dnd);

    var _this = _possibleConstructorReturn(this, (Dnd.__proto__ || Object.getPrototypeOf(Dnd)).call(this, props));

    _this.state = {
      files: [],
      fixedDataUrl: [],
      imageUrls: [],
      finalUrl: [],
      draggingElmIndex: null,
      cropImgSrc: null,
      currentCropImageIndex: null,
      open: false,
      url: [],
      mimeType: props.mimeType || "png/jpg/jpeg/gif",
      errorMessage: props.errorMessages || {}
    };
    _this.INPUT_REF = _react2.default.createRef();
    _this.onImageBrowse = _this.onImageBrowse.bind(_this);
    _this.openModal = _this.openModal.bind(_this);
    _this.onImageDrop = _this.onImageDrop.bind(_this);
    _this.onDrop = _this.onDrop.bind(_this);
    _this.callback = _this.callback.bind(_this);
    _this.getImageDataUrl = _this.getImageDataUrl.bind(_this);
    _this.onInputChange = _this.onInputChange.bind(_this);
    _this.removeImage = _this.removeImage.bind(_this);
    _this.checkValidImages = _this.checkValidImages.bind(_this);
    _this.convertImageForupload = _this.convertImageForupload.bind(_this);
    _this.getcropImage = _this.getcropImage.bind(_this);
    _this.cancelCrop = _this.cancelCrop.bind(_this);
    _this.handleClearToDefault = _this.handleClearToDefault.bind(_this);
    _this.onDragStart = _this.onDragStart.bind(_this);
    return _this;
  }

  _createClass(Dnd, [{
    key: "preventDefaults",
    value: function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, {
    key: "openModal",
    value: function openModal(index) {
      var fixedDataUrl = this.state.fixedDataUrl;

      var cropImgSrc = fixedDataUrl.find(function (_, i) {
        return i === index;
      });
      this.setState({
        cropImgSrc: cropImgSrc,
        open: true,
        currentCropImageIndex: index
      });
    }
  }, {
    key: "handleClearToDefault",
    value: function handleClearToDefault() {
      this.setState({ open: false });
    }
  }, {
    key: "onDrop",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e, index) {
        var _state, draggingElmIndex, files, imageUrls, fixedDataUrl;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.stopPropagation();
                _state = this.state, draggingElmIndex = _state.draggingElmIndex, files = _state.files, imageUrls = _state.imageUrls, fixedDataUrl = _state.fixedDataUrl;

                files = (0, _helper.swap)(files, draggingElmIndex, index);
                imageUrls = (0, _helper.swap)(imageUrls, draggingElmIndex, index);
                fixedDataUrl = (0, _helper.swap)(fixedDataUrl, draggingElmIndex, index);
                _context.next = 7;
                return this.setState({
                  files: files,
                  imageUrls: imageUrls,
                  fixedDataUrl: fixedDataUrl,
                  draggingElmIndex: null
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onDrop(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return onDrop;
    }()
  }, {
    key: "onDragStart",
    value: function onDragStart(_, index) {
      this.setState({ draggingElmIndex: index });
    }

    // image Events

  }, {
    key: "onImageBrowse",
    value: function onImageBrowse() {
      var DRAG_AND_DROP_AREA_INPUT = this.INPUT_REF.current;
      if (DRAG_AND_DROP_AREA_INPUT && document.createEvent) {
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, false);
        DRAG_AND_DROP_AREA_INPUT.dispatchEvent(evt);
      }
    }
  }, {
    key: "callback",
    value: function callback(payload) {
      if (this.props.callback) return this.props.callback(payload);
      console.log("Provide a callback");
    }
  }, {
    key: "onImageDrop",
    value: function onImageDrop(e) {
      var _this2 = this;

      this.preventDefaults(e);
      var _state2 = this.state,
          files = _state2.files,
          imageUrls = _state2.imageUrls,
          mimeType = _state2.mimeType,
          errorMessage = _state2.errorMessage,
          validUpload = true;

      var newFiles = e.dataTransfer.files;
      if (imageUrls.length + newFiles.length > (this.props.maxImageUpload || 12)) return this.callback({
        error: errorMessage.maxImageUpload || "You Cant Upload More than " + (this.props.maxImageUpload || 12) + " Files"
      });
      [].concat(_toConsumableArray(newFiles)).forEach(function (file) {
        if (!(0, _helper.validateImageMimeType)(file, mimeType)) {
          validUpload = false;
          _this2.callback({
            error: errorMessage.imageFormat || "Only Jpeg/Jpg/Png/Gif Allowed"
          });
          return false;
        }
      });
      if (validUpload) {
        this.setState({ files: [].concat(_toConsumableArray(files), _toConsumableArray(newFiles)) });
        [].concat(_toConsumableArray(newFiles)).forEach(function (file) {
          return (0, _helper.validateImage)(file, _this2.getImageDataUrl);
        });
      }
    }
  }, {
    key: "getImageDataUrl",
    value: function getImageDataUrl(isValid, url) {
      if (!this.props.crop) isValid = true;
      var _state3 = this.state,
          imageUrls = _state3.imageUrls,
          fixedDataUrl = _state3.fixedDataUrl,
          errorMessage = _state3.errorMessage;

      if (imageUrls.length + 1 > (this.props.maxImageUpload || 12)) return this.callback({
        error: errorMessage.maxImageUpload || "You Cant Upload More than " + (this.props.maxImageUpload || 12) + " Files"
      });
      this.setState({
        fixedDataUrl: [].concat(_toConsumableArray(fixedDataUrl), [url]),
        imageUrls: [].concat(_toConsumableArray(imageUrls), [{ url: url, isValid: isValid }])
      });
    }
  }, {
    key: "onInputChange",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
        var _this3 = this;

        var _state4, files, imageUrls, mimeType, errorMessage, file;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _state4 = this.state, files = _state4.files, imageUrls = _state4.imageUrls, mimeType = _state4.mimeType, errorMessage = _state4.errorMessage;
                file = e.target.files[0];

                if (file) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return");

              case 4:
                files = [].concat(_toConsumableArray(files), [file]);

                if ((0, _helper.validateImageMimeType)(file, mimeType)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", this.callback({
                  error: errorMessage.imageFormat || "Only Jpeg/Jpg/Png/Gif Allowed"
                }));

              case 7:
                if (!(imageUrls.length + 1 > this.props.maxImageUpload)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", this.callback({
                  error: errorMessage.maxImageUpload || "You Cant Upload More than " + this.props.maxImageUpload + " Files"
                }));

              case 9:
                this.setState({ files: files }, function () {
                  (0, _helper.validateImage)(file, _this3.getImageDataUrl);
                });
                this.convertImageForupload();

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onInputChange(_x3) {
        return _ref2.apply(this, arguments);
      }

      return onInputChange;
    }()
  }, {
    key: "removeImage",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(index) {
        var _state5, files, imageUrls, fixedDataUrl;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _state5 = this.state, files = _state5.files, imageUrls = _state5.imageUrls, fixedDataUrl = _state5.fixedDataUrl;

                files = (0, _helper.filterWithIndex)(files, index);
                fixedDataUrl = (0, _helper.filterWithIndex)(fixedDataUrl, index);
                imageUrls = (0, _helper.filterWithIndex)(imageUrls, index);
                _context3.next = 6;
                return this.setState({ files: files, imageUrls: imageUrls, fixedDataUrl: fixedDataUrl });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function removeImage(_x4) {
        return _ref3.apply(this, arguments);
      }

      return removeImage;
    }()
  }, {
    key: "checkValidImages",
    value: function checkValidImages() {
      var imageUrls = this.state.imageUrls;

      for (var i = 0; i < imageUrls.length; i++) {
        if (!imageUrls[i].isValid) return false;
      }return true;
    }
  }, {
    key: "convertImageForupload",
    value: function convertImageForupload() {
      var _state6 = this.state,
          imageUrls = _state6.imageUrls,
          files = _state6.files,
          errorMessage = _state6.errorMessage;

      var fileObject = [];
      imageUrls.forEach(function (url, index) {
        var file = (0, _helper.base64StringtoFile)(url.url, files[index].name);
        fileObject.push(file);
      });
      var isUploadValid = this.checkValidImages();
      if (!isUploadValid) return this.callback({
        error: errorMessage.aspectRatio || "Image is not in the proper Aspect Ratio"
      });
      return this.callback({ fileObject: fileObject, imageUrls: imageUrls });
    }
  }, {
    key: "getcropImage",
    value: function getcropImage(url) {
      var _state7 = this.state,
          currentCropImageIndex = _state7.currentCropImageIndex,
          imageUrls = _state7.imageUrls,
          files = _state7.files;

      var file = (0, _helper.base64StringtoFile)(url, files[currentCropImageIndex].name);
      imageUrls = (0, _helper.replaceWithIndex)(imageUrls, currentCropImageIndex, {
        url: url,
        isValid: true
      });
      files = (0, _helper.replaceWithIndex)(files, currentCropImageIndex, file);
      this.setState({
        files: files,
        imageUrls: imageUrls,
        currentCropImageIndex: null,
        open: false
      });
      this.convertImageForupload();
    }
  }, {
    key: "cancelCrop",
    value: function cancelCrop() {
      this.setState({ open: false });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _state8 = this.state,
          imageUrls = _state8.imageUrls,
          open = _state8.open,
          cropImgSrc = _state8.cropImgSrc;

      var styles = (0, _style.style)(this.props);
      return _react2.default.createElement(
        "div",
        { onMouseOut: this.convertImageForupload },
        _react2.default.createElement("input", {
          ref: this.INPUT_REF,
          type: "file",
          id: "DRAG_AND_DROP_AREA_INPUT",
          onChange: this.onInputChange
        }),
        _react2.default.createElement(
          "div",
          {
            id: "DRAG_AND_DROP_AREA",
            style: styles.DRAG_AND_DROP_AREA,
            onDragOver: function onDragOver(e) {
              return _this4.preventDefaults(e);
            },
            onDrop: this.onImageDrop,
            onClick: this.onImageBrowse
          },
          imageUrls.length === 0 ? null : _react2.default.createElement(
            "span",
            {
              id: "DRAG_AND_DROP_MESSAGE",
              style: styles.DRAG_AND_DROP_MESSAGE
            },
            this.props.message || "Hold and Drag to rearrange the order"
          ),
          imageUrls.length === 0 ? _react2.default.createElement(
            "div",
            { id: "DRAG_AND_DROP_PLACEHOLDER" },
            this.props.icons && this.props.icons.labelIcon ? this.props.icons.labelIcon : _react2.default.createElement("img", { src: _image2.default, width: "30", height: "30" }),
            _react2.default.createElement(
              "h1",
              null,
              this.props.label || "Drag and drop images here"
            ),
            _react2.default.createElement(
              "p",
              null,
              this.props.subLabel || "or click to upload"
            )
          ) : _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { id: "DRAG_AND_DROP_ZONE" },
              imageUrls.map(function (item, index) {
                return _react2.default.createElement(
                  "div",
                  {
                    id: "DRAG_AND_DROP_AREA_ITEM",
                    key: index,
                    draggable: true,
                    onClick: function onClick(e) {
                      return _this4.preventDefaults(e);
                    },
                    onDragStart: function onDragStart(e) {
                      return _this4.onDragStart(e, index);
                    },
                    onDragOver: function onDragOver(e) {
                      return _this4.preventDefaults(e);
                    },
                    onDrop: function onDrop(e) {
                      return _this4.onDrop(e, index);
                    },
                    style: item.isValid ? styles.DRAG_AND_DROP_AREA_ITEM : styles.DRAG_AND_DROP_AREA_ITEM_ERROR
                  },
                  _react2.default.createElement(
                    "div",
                    {
                      id: "DRAG_AND_DROP_AREA_ITEM_IMAGE_CONTAINER",
                      onDragOver: function onDragOver(e) {
                        return _this4.preventDefaults(e);
                      },
                      style: { backgroundImage: "url(" + item.url + ")" }
                    },
                    _react2.default.createElement(
                      "span",
                      {
                        id: "DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON",
                        style: styles.DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON,
                        onClick: function onClick() {
                          return _this4.removeImage(index);
                        }
                      },
                      _this4.props.icons && _this4.props.icons.cancelIcon ? _this4.props.icons.cancelIcon : _react2.default.createElement("img", { src: _cancel2.default, width: "15", height: "15" })
                    ),
                    _this4.props.crop ? _react2.default.createElement(
                      "span",
                      {
                        id: "DRAG_AND_DROP_AREA_ITEM_CROP_ICON",
                        style: styles.DRAG_AND_DROP_AREA_ITEM_CROP_ICON,
                        onClick: function onClick() {
                          return _this4.openModal(index);
                        }
                      },
                      _this4.props.icons && _this4.props.icons.cropIcon ? _this4.props.icons.cropIcon : _react2.default.createElement("img", { src: _crop2.default, width: "15", height: "15" })
                    ) : ""
                  )
                );
              })
            )
          )
        ),
        _react2.default.createElement(_Modal2.default, _extends({
          isOpen: open
        }, this.props, {
          onRequestClose: this.handleClearToDefault,
          getcropImage: this.getcropImage,
          cancelCrop: this.cancelCrop,
          imageSrc: cropImgSrc
        }))
      );
    }
  }]);

  return Dnd;
}(_react.Component);

exports.default = Dnd;