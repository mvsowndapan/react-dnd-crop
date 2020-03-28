"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containCrop = exports.makeAspectCrop = exports.Component = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _clsx = require("clsx");

var _clsx2 = _interopRequireDefault(_clsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Feature detection
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
var passiveSupported = false;

try {
  window.addEventListener("test", null, Object.defineProperty({}, "passive", {
    get: function get() {
      passiveSupported = true;
      return true;
    }
  }));
} catch (err) {} // eslint-disable-line no-empty

function getClientPos(e) {
  var pageX = void 0;
  var pageY = void 0;

  if (e.touches) {
    var _e$touches = _slicedToArray(e.touches, 1);

    var _e$touches$ = _e$touches[0];
    pageX = _e$touches$.pageX;
    pageY = _e$touches$.pageY;
  } else {
    pageX = e.pageX;
    pageY = e.pageY;
  }

  return {
    x: pageX,
    y: pageY
  };
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function isCropValid(crop) {
  return crop && crop.width && crop.height && !isNaN(crop.width) && !isNaN(crop.height);
}

function inverseOrd(ord) {
  if (ord === "n") return "s";
  if (ord === "ne") return "sw";
  if (ord === "e") return "w";
  if (ord === "se") return "nw";
  if (ord === "s") return "n";
  if (ord === "sw") return "ne";
  if (ord === "w") return "e";
  if (ord === "nw") return "se";
  return ord;
}

function makeAspectCrop(crop, imageWidth, imageHeight) {
  if (isNaN(crop.aspect)) {
    console.warn("`crop.aspect` should be a number in order to make an aspect crop", crop);
    return crop;
  }

  var completeCrop = _extends({
    unit: "px",
    x: 0,
    y: 0
  }, crop);

  if (crop.width) {
    completeCrop.height = completeCrop.width / crop.aspect;
  }

  if (crop.height) {
    completeCrop.width = completeCrop.height * crop.aspect;
  }

  if (completeCrop.y + completeCrop.height > imageHeight) {
    completeCrop.height = imageHeight - completeCrop.y;
    completeCrop.width = completeCrop.height * crop.aspect;
  }

  if (completeCrop.x + completeCrop.width > imageWidth) {
    completeCrop.width = imageWidth - completeCrop.x;
    completeCrop.height = completeCrop.width / crop.aspect;
  }

  return completeCrop;
}

function convertToPercentCrop(crop, imageWidth, imageHeight) {
  if (crop.unit === "%") {
    return crop;
  }

  return {
    unit: "%",
    aspect: crop.aspect,
    x: crop.x / imageWidth * 100,
    y: crop.y / imageHeight * 100,
    width: crop.width / imageWidth * 100,
    height: crop.height / imageHeight * 100
  };
}

function convertToPixelCrop(crop, imageWidth, imageHeight) {
  if (!crop.unit) {
    return _extends({}, crop, { unit: "px" });
  }

  if (crop.unit === "px") {
    return crop;
  }

  return {
    unit: "px",
    aspect: crop.aspect,
    x: crop.x * imageWidth / 100,
    y: crop.y * imageHeight / 100,
    width: crop.width * imageWidth / 100,
    height: crop.height * imageHeight / 100
  };
}

function isAspectInvalid(crop, imageWidth, imageHeight) {
  if (!crop.width && crop.height || crop.width && !crop.height) {
    return true;
  }

  if (crop.y + crop.height > imageHeight || crop.x + crop.width > imageWidth) {
    return true;
  }

  // Allow a 1px tolerance due to %->px rounding.
  if (crop.width / crop.aspect < crop.height - 1 || crop.width / crop.aspect > crop.height + 1) {
    return true;
  }
  if (crop.height * crop.aspect < crop.width - 1 || crop.height * crop.aspect > crop.width + 1) {
    return true;
  }

  return false;
}

function resolveCrop(pixelCrop, imageWidth, imageHeight) {
  if (!pixelCrop) {
    return pixelCrop;
  }

  var fixedCrop = pixelCrop;
  var widthOverflows = pixelCrop.x + pixelCrop.width > imageWidth;
  var heightOverflows = pixelCrop.y + pixelCrop.height > imageHeight;

  if (widthOverflows && heightOverflows) {
    fixedCrop = {
      unit: "px",
      x: 0,
      y: 0,
      width: imageWidth > pixelCrop.width ? pixelCrop.width : imageWidth,
      height: imageHeight > pixelCrop.height ? pixelCrop.height : imageHeight
    };
  } else if (widthOverflows) {
    fixedCrop = _extends({}, pixelCrop, {
      x: 0,
      width: imageWidth > pixelCrop.width ? pixelCrop.width : imageWidth
    });
  } else if (heightOverflows) {
    fixedCrop = _extends({}, pixelCrop, {
      y: 0,
      height: imageHeight > pixelCrop.height ? pixelCrop.height : imageHeight
    });
  }

  if (fixedCrop.aspect && isAspectInvalid(fixedCrop, imageWidth, imageHeight)) {
    return makeAspectCrop(fixedCrop, imageWidth, imageHeight);
  }

  return fixedCrop;
}

function containCrop(prevCrop, crop, imageWidth, imageHeight) {
  var pixelCrop = convertToPixelCrop(crop, imageWidth, imageHeight);
  var prevPixelCrop = convertToPixelCrop(prevCrop, imageWidth, imageHeight);
  var contained = _extends({}, pixelCrop);

  // Non-aspects are simple
  if (!pixelCrop.aspect) {
    if (pixelCrop.x < 0) {
      contained.x = 0;
      contained.width += pixelCrop.x;
    } else if (pixelCrop.x + pixelCrop.width > imageWidth) {
      contained.width = imageWidth - pixelCrop.x;
    }

    if (pixelCrop.y + pixelCrop.height > imageHeight) {
      contained.height = imageHeight - pixelCrop.y;
    }

    return contained;
  }

  var adjustedForX = false;

  if (pixelCrop.x < 0) {
    contained.x = 0;
    contained.width += pixelCrop.x;
    contained.height = contained.width / pixelCrop.aspect;
    adjustedForX = true;
  } else if (pixelCrop.x + pixelCrop.width > imageWidth) {
    contained.width = imageWidth - pixelCrop.x;
    contained.height = contained.width / pixelCrop.aspect;
    adjustedForX = true;
  }

  // If sizing in up direction we need to pin Y at the point it
  // would be at the boundary.
  if (adjustedForX && prevPixelCrop.y > contained.y) {
    contained.y = pixelCrop.y + (pixelCrop.height - contained.height);
  }

  var adjustedForY = false;

  if (contained.y + contained.height > imageHeight) {
    contained.height = imageHeight - pixelCrop.y;
    contained.width = contained.height * pixelCrop.aspect;
    adjustedForY = true;
  }

  // If sizing in left direction we need to pin X at the point it
  // would be at the boundary.
  if (adjustedForY && prevPixelCrop.x > contained.x) {
    contained.x = pixelCrop.x + (pixelCrop.width - contained.width);
  }

  return contained;
}

var Cropper = function (_PureComponent) {
  _inherits(Cropper, _PureComponent);

  function Cropper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Cropper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cropper.__proto__ || Object.getPrototypeOf(Cropper)).call.apply(_ref, [this].concat(args))), _this), _this.window = typeof window !== "undefined" ? window : {}, _this.document = typeof document !== "undefined" ? document : {}, _this.state = {}, _this.onCropMouseTouchDown = function (e) {
      var _this$props = _this.props,
          crop = _this$props.crop,
          disabled = _this$props.disabled;
      var _this$mediaDimensions = _this.mediaDimensions,
          width = _this$mediaDimensions.width,
          height = _this$mediaDimensions.height;

      var pixelCrop = convertToPixelCrop(crop, width, height);

      if (disabled) {
        return;
      }
      e.preventDefault(); // Stop drag selection.

      var clientPos = getClientPos(e);

      // Focus for detecting keypress.
      if (_this.componentRef.setActive) {
        _this.componentRef.setActive({ preventScroll: true }); // IE/Edge #289
      } else {
        _this.componentRef.focus({ preventScroll: true }); // All other browsers
      }

      var ord = e.target.dataset.ord;

      var xInversed = ord === "nw" || ord === "w" || ord === "sw";
      var yInversed = ord === "nw" || ord === "n" || ord === "ne";

      var cropOffset = void 0;

      if (pixelCrop.aspect) {
        cropOffset = _this.getElementOffset(_this.cropSelectRef);
      }

      _this.evData = {
        clientStartX: clientPos.x,
        clientStartY: clientPos.y,
        cropStartWidth: pixelCrop.width,
        cropStartHeight: pixelCrop.height,
        cropStartX: xInversed ? pixelCrop.x + pixelCrop.width : pixelCrop.x,
        cropStartY: yInversed ? pixelCrop.y + pixelCrop.height : pixelCrop.y,
        xInversed: xInversed,
        yInversed: yInversed,
        xCrossOver: xInversed,
        yCrossOver: yInversed,
        startXCrossOver: xInversed,
        startYCrossOver: yInversed,
        isResize: e.target.dataset.ord,
        ord: ord,
        cropOffset: cropOffset
      };

      _this.mouseDownOnCrop = true;
      _this.setState({ cropIsActive: true });
    }, _this.onComponentMouseTouchDown = function (e) {
      var _this$props2 = _this.props,
          crop = _this$props2.crop,
          disabled = _this$props2.disabled,
          locked = _this$props2.locked,
          keepSelection = _this$props2.keepSelection,
          onChange = _this$props2.onChange;


      var componentEl = _this.mediaWrapperRef.firstChild;

      if (e.target !== componentEl || !componentEl.contains(e.target)) {
        return;
      }

      if (disabled || locked || keepSelection && isCropValid(crop)) {
        return;
      }

      e.preventDefault(); // Stop drag selection.

      var clientPos = getClientPos(e);

      // Focus for detecting keypress.
      if (_this.componentRef.setActive) {
        _this.componentRef.setActive({ preventScroll: true }); // IE/Edge #289
      } else {
        _this.componentRef.focus({ preventScroll: true }); // All other browsers
      }

      var mediaOffset = _this.getElementOffset(_this.mediaWrapperRef);
      var x = clientPos.x - mediaOffset.left;
      var y = clientPos.y - mediaOffset.top;

      var nextCrop = {
        unit: "px",
        aspect: crop ? crop.aspect : undefined,
        x: x,
        y: y,
        width: 0,
        height: 0
      };

      _this.evData = {
        clientStartX: clientPos.x,
        clientStartY: clientPos.y,
        cropStartWidth: nextCrop.width,
        cropStartHeight: nextCrop.height,
        cropStartX: nextCrop.x,
        cropStartY: nextCrop.y,
        xInversed: false,
        yInversed: false,
        xCrossOver: false,
        yCrossOver: false,
        startXCrossOver: false,
        startYCrossOver: false,
        isResize: true,
        ord: "nw"
      };

      _this.mouseDownOnCrop = true;

      var _this$mediaDimensions2 = _this.mediaDimensions,
          width = _this$mediaDimensions2.width,
          height = _this$mediaDimensions2.height;


      onChange(convertToPixelCrop(nextCrop, width, height), convertToPercentCrop(nextCrop, width, height));

      _this.setState({ cropIsActive: true, newCropIsBeingDrawn: true });
    }, _this.onDocMouseTouchMove = function (e) {
      var _this$props3 = _this.props,
          crop = _this$props3.crop,
          disabled = _this$props3.disabled,
          onChange = _this$props3.onChange,
          onDragStart = _this$props3.onDragStart;


      if (disabled) {
        return;
      }

      if (!_this.mouseDownOnCrop) {
        return;
      }

      e.preventDefault(); // Stop drag selection.

      if (!_this.dragStarted) {
        _this.dragStarted = true;
        onDragStart(e);
      }

      var _this2 = _this,
          evData = _this2.evData;

      var clientPos = getClientPos(e);

      if (evData.isResize && crop.aspect && evData.cropOffset) {
        clientPos.y = _this.straightenYPath(clientPos.x);
      }

      evData.xDiff = clientPos.x - evData.clientStartX;
      evData.yDiff = clientPos.y - evData.clientStartY;

      var nextCrop = void 0;

      if (evData.isResize) {
        nextCrop = _this.resizeCrop();
      } else {
        nextCrop = _this.dragCrop();
      }

      if (nextCrop !== crop) {
        var _this$mediaDimensions3 = _this.mediaDimensions,
            width = _this$mediaDimensions3.width,
            height = _this$mediaDimensions3.height;

        onChange(convertToPixelCrop(nextCrop, width, height), convertToPercentCrop(nextCrop, width, height));
      }
    }, _this.onComponentKeyDown = function (e) {
      var _this$props4 = _this.props,
          crop = _this$props4.crop,
          disabled = _this$props4.disabled,
          onChange = _this$props4.onChange,
          onComplete = _this$props4.onComplete;


      if (disabled) {
        return;
      }

      var keyCode = e.key;
      var nudged = false;

      if (!isCropValid(crop)) {
        return;
      }

      var nextCrop = _this.makeNewCrop();
      var nudgeStep = e.shiftKey ? Cropper.nudgeStepLarge : Cropper.nudgeStep;

      if (keyCode === "ArrowLeft") {
        nextCrop.x -= nudgeStep;
        nudged = true;
      } else if (keyCode === "ArrowRight") {
        nextCrop.x += nudgeStep;
        nudged = true;
      } else if (keyCode === "ArrowUp") {
        nextCrop.y -= nudgeStep;
        nudged = true;
      } else if (keyCode === "ArrowDown") {
        nextCrop.y += nudgeStep;
        nudged = true;
      }

      if (nudged) {
        e.preventDefault(); // Stop drag selection.
        var _this$mediaDimensions4 = _this.mediaDimensions,
            width = _this$mediaDimensions4.width,
            height = _this$mediaDimensions4.height;


        nextCrop.x = clamp(nextCrop.x, 0, width - nextCrop.width);
        nextCrop.y = clamp(nextCrop.y, 0, height - nextCrop.height);

        var pixelCrop = convertToPixelCrop(nextCrop, width, height);
        var percentCrop = convertToPercentCrop(nextCrop, width, height);

        onChange(pixelCrop, percentCrop);
        onComplete(pixelCrop, percentCrop);
      }
    }, _this.onDocMouseTouchEnd = function (e) {
      var _this$props5 = _this.props,
          crop = _this$props5.crop,
          disabled = _this$props5.disabled,
          onComplete = _this$props5.onComplete,
          onDragEnd = _this$props5.onDragEnd;


      if (disabled) {
        return;
      }

      if (_this.mouseDownOnCrop) {
        _this.mouseDownOnCrop = false;
        _this.dragStarted = false;

        var _this$mediaDimensions5 = _this.mediaDimensions,
            width = _this$mediaDimensions5.width,
            height = _this$mediaDimensions5.height;


        onDragEnd(e);
        onComplete(convertToPixelCrop(crop, width, height), convertToPercentCrop(crop, width, height));

        _this.setState({ cropIsActive: false, newCropIsBeingDrawn: false });
      }
    }, _this.onMediaLoaded = function () {
      var _this$props6 = _this.props,
          onComplete = _this$props6.onComplete,
          onChange = _this$props6.onChange;

      var _this$createNewCrop = _this.createNewCrop(),
          pixelCrop = _this$createNewCrop.pixelCrop,
          percentCrop = _this$createNewCrop.percentCrop;

      onChange(pixelCrop, percentCrop);
      onComplete(pixelCrop, percentCrop);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Cropper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.document.addEventListener) {
        var options = passiveSupported ? { passive: false } : false;

        this.document.addEventListener("mousemove", this.onDocMouseTouchMove, options);
        this.document.addEventListener("touchmove", this.onDocMouseTouchMove, options);

        this.document.addEventListener("mouseup", this.onDocMouseTouchEnd, options);
        this.document.addEventListener("touchend", this.onDocMouseTouchEnd, options);
        this.document.addEventListener("touchcancel", this.onDocMouseTouchEnd, options);

        this.componentRef.addEventListener("medialoaded", this.onMediaLoaded);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.document.removeEventListener) {
        this.document.removeEventListener("mousemove", this.onDocMouseTouchMove);
        this.document.removeEventListener("touchmove", this.onDocMouseTouchMove);

        this.document.removeEventListener("mouseup", this.onDocMouseTouchEnd);
        this.document.removeEventListener("touchend", this.onDocMouseTouchEnd);
        this.document.removeEventListener("touchcancel", this.onDocMouseTouchEnd);

        this.componentRef.removeEventListener("medialoaded", this.onMediaLoaded);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.crop !== this.props.crop && this.imageRef) {
        var _imageRef = this.imageRef,
            width = _imageRef.width,
            height = _imageRef.height;

        var crop = this.makeNewCrop();
        var resolvedCrop = resolveCrop(crop, width, height);

        if (crop !== resolvedCrop) {
          var pixelCrop = convertToPixelCrop(resolvedCrop, width, height);
          var percentCrop = convertToPercentCrop(resolvedCrop, width, height);
          this.props.onChange(pixelCrop, percentCrop);
          this.props.onComplete(pixelCrop, percentCrop);
        }
      }
    }
  }, {
    key: "createNewCrop",


    // When the image is loaded or when a custom component via `renderComponent` prop fires
    // a custom "medialoaded" event.
    value: function createNewCrop() {
      var _mediaDimensions = this.mediaDimensions,
          width = _mediaDimensions.width,
          height = _mediaDimensions.height;

      var crop = this.makeNewCrop();
      var resolvedCrop = resolveCrop(crop, width, height);
      var pixelCrop = convertToPixelCrop(resolvedCrop, width, height);
      var percentCrop = convertToPercentCrop(resolvedCrop, width, height);
      return { pixelCrop: pixelCrop, percentCrop: percentCrop };
    }

    // Custom components (using `renderComponent`) should fire a custom event
    // called "medialoaded" when they are loaded.

  }, {
    key: "onImageLoad",
    value: function onImageLoad(image) {
      var _props = this.props,
          onComplete = _props.onComplete,
          onChange = _props.onChange,
          onImageLoaded = _props.onImageLoaded;

      // Return false from onImageLoaded if you set the crop with setState in there as otherwise
      // the subsequent onChange + onComplete will not have your updated crop.

      var res = onImageLoaded(image);

      if (res !== false) {
        var _createNewCrop = this.createNewCrop(),
            pixelCrop = _createNewCrop.pixelCrop,
            percentCrop = _createNewCrop.percentCrop;

        onChange(pixelCrop, percentCrop);
        onComplete(pixelCrop, percentCrop);
      }
    }
  }, {
    key: "getDocumentOffset",
    value: function getDocumentOffset() {
      var _ref2 = this.document.documentElement || {},
          _ref2$clientTop = _ref2.clientTop,
          clientTop = _ref2$clientTop === undefined ? 0 : _ref2$clientTop,
          _ref2$clientLeft = _ref2.clientLeft,
          clientLeft = _ref2$clientLeft === undefined ? 0 : _ref2$clientLeft;

      return { clientTop: clientTop, clientLeft: clientLeft };
    }
  }, {
    key: "getWindowOffset",
    value: function getWindowOffset() {
      var _window = this.window,
          _window$pageYOffset = _window.pageYOffset,
          pageYOffset = _window$pageYOffset === undefined ? 0 : _window$pageYOffset,
          _window$pageXOffset = _window.pageXOffset,
          pageXOffset = _window$pageXOffset === undefined ? 0 : _window$pageXOffset;

      return { pageYOffset: pageYOffset, pageXOffset: pageXOffset };
    }
  }, {
    key: "getElementOffset",
    value: function getElementOffset(el) {
      var rect = el.getBoundingClientRect();
      var doc = this.getDocumentOffset();
      var win = this.getWindowOffset();

      var top = rect.top + win.pageYOffset - doc.clientTop;
      var left = rect.left + win.pageXOffset - doc.clientLeft;

      return { top: top, left: left };
    }
  }, {
    key: "getCropStyle",
    value: function getCropStyle() {
      var crop = this.makeNewCrop(this.props.crop ? this.props.crop.unit : "px");

      return {
        top: "" + crop.y + crop.unit,
        left: "" + crop.x + crop.unit,
        width: "" + crop.width + crop.unit,
        height: "" + crop.height + crop.unit
      };
    }
  }, {
    key: "getNewSize",
    value: function getNewSize() {
      var _props2 = this.props,
          crop = _props2.crop,
          minWidth = _props2.minWidth,
          maxWidth = _props2.maxWidth,
          minHeight = _props2.minHeight,
          maxHeight = _props2.maxHeight;
      var evData = this.evData;
      var _mediaDimensions2 = this.mediaDimensions,
          width = _mediaDimensions2.width,
          height = _mediaDimensions2.height;

      // New width.

      var newWidth = evData.cropStartWidth + evData.xDiff;

      if (evData.xCrossOver) {
        newWidth = Math.abs(newWidth);
      }

      newWidth = clamp(newWidth, minWidth, maxWidth || width);

      // New height.
      var newHeight = void 0;

      if (crop.aspect) {
        newHeight = newWidth / crop.aspect;
      } else {
        newHeight = evData.cropStartHeight + evData.yDiff;
      }

      if (evData.yCrossOver) {
        // Cap if polarity is inversed and the height fills the y space.
        newHeight = Math.min(Math.abs(newHeight), evData.cropStartY);
      }

      newHeight = clamp(newHeight, minHeight, maxHeight || height);

      if (crop.aspect) {
        newWidth = clamp(newHeight * crop.aspect, 0, width);
      }

      return {
        width: newWidth,
        height: newHeight
      };
    }
  }, {
    key: "dragCrop",
    value: function dragCrop() {
      var nextCrop = this.makeNewCrop();
      var evData = this.evData;
      var _mediaDimensions3 = this.mediaDimensions,
          width = _mediaDimensions3.width,
          height = _mediaDimensions3.height;


      nextCrop.x = clamp(evData.cropStartX + evData.xDiff, 0, width - nextCrop.width);
      nextCrop.y = clamp(evData.cropStartY + evData.yDiff, 0, height - nextCrop.height);

      return nextCrop;
    }
  }, {
    key: "resizeCrop",
    value: function resizeCrop() {
      var evData = this.evData;

      var nextCrop = this.makeNewCrop();
      var ord = evData.ord;

      // On the inverse change the diff so it's the same and
      // the same algo applies.

      if (evData.xInversed) {
        evData.xDiff -= evData.cropStartWidth * 2;
        evData.xDiffPc -= evData.cropStartWidth * 2;
      }
      if (evData.yInversed) {
        evData.yDiff -= evData.cropStartHeight * 2;
        evData.yDiffPc -= evData.cropStartHeight * 2;
      }

      // New size.
      var newSize = this.getNewSize();

      // Adjust x/y to give illusion of 'staticness' as width/height is increased
      // when polarity is inversed.
      var newX = evData.cropStartX;
      var newY = evData.cropStartY;

      if (evData.xCrossOver) {
        newX = nextCrop.x + (nextCrop.width - newSize.width);
      }

      if (evData.yCrossOver) {
        // This not only removes the little "shake" when inverting at a diagonal, but for some
        // reason y was way off at fast speeds moving sw->ne with fixed aspect only, I couldn't
        // figure out why.
        if (evData.lastYCrossover === false) {
          newY = nextCrop.y - newSize.height;
        } else {
          newY = nextCrop.y + (nextCrop.height - newSize.height);
        }
      }

      var _mediaDimensions4 = this.mediaDimensions,
          width = _mediaDimensions4.width,
          height = _mediaDimensions4.height;

      var containedCrop = containCrop(this.props.crop, {
        unit: nextCrop.unit,
        x: newX,
        y: newY,
        width: newSize.width,
        height: newSize.height,
        aspect: nextCrop.aspect
      }, width, height);

      // Apply x/y/width/height changes depending on ordinate (fixed aspect always applies both).
      if (nextCrop.aspect || Cropper.xyOrds.indexOf(ord) > -1) {
        nextCrop.x = containedCrop.x;
        nextCrop.y = containedCrop.y;
        nextCrop.width = containedCrop.width;
        nextCrop.height = containedCrop.height;
      } else if (Cropper.xOrds.indexOf(ord) > -1) {
        nextCrop.x = containedCrop.x;
        nextCrop.width = containedCrop.width;
      } else if (Cropper.yOrds.indexOf(ord) > -1) {
        nextCrop.y = containedCrop.y;
        nextCrop.height = containedCrop.height;
      }

      evData.lastYCrossover = evData.yCrossOver;
      this.crossOverCheck();

      return nextCrop;
    }
  }, {
    key: "straightenYPath",
    value: function straightenYPath(clientX) {
      var evData = this.evData;
      var ord = evData.ord;
      var cropOffset = evData.cropOffset,
          cropStartWidth = evData.cropStartWidth,
          cropStartHeight = evData.cropStartHeight;

      var k = void 0;
      var d = void 0;

      if (ord === "nw" || ord === "se") {
        k = cropStartHeight / cropStartWidth;
        d = cropOffset.top - cropOffset.left * k;
      } else {
        k = -cropStartHeight / cropStartWidth;
        d = cropOffset.top + (cropStartHeight - cropOffset.left * k);
      }

      return k * clientX + d;
    }
  }, {
    key: "createCropSelection",
    value: function createCropSelection() {
      var _this3 = this;

      var _props3 = this.props,
          disabled = _props3.disabled,
          locked = _props3.locked,
          renderSelectionAddon = _props3.renderSelectionAddon,
          myRules = _props3.myRules;

      var style = this.getCropStyle();

      return _react2.default.createElement(
        "div",
        {
          ref: function ref(r) {
            return _this3.cropSelectRef = r;
          },
          style: style,
          className: "Cropper__crop-selection",
          onMouseDown: this.onCropMouseTouchDown,
          onTouchStart: this.onCropMouseTouchDown,
          tabIndex: "0"
        },
        !disabled && !locked && _react2.default.createElement(
          "div",
          { className: "Cropper__drag-elements" },
          _react2.default.createElement("div", { className: "Cropper__drag-bar ord-n", "data-ord": "n" }),
          _react2.default.createElement("div", { className: "Cropper__drag-bar ord-e", "data-ord": "e" }),
          _react2.default.createElement("div", { className: "Cropper__drag-bar ord-s", "data-ord": "s" }),
          _react2.default.createElement("div", { className: "Cropper__drag-bar ord-w", "data-ord": "w" }),
          _react2.default.createElement("div", { className: "Cropper__drag-handle ord-nw", "data-ord": "nw" }),
          _react2.default.createElement("div", { className: "Cropper__drag-handle ord-n", "data-ord": "n" }),
          _react2.default.createElement("div", { className: "Cropper__drag-handle ord-ne", "data-ord": "ne" }),
          _react2.default.createElement("div", { className: "Cropper__drag-handle ord-e", "data-ord": "e" }),
          _react2.default.createElement("div", { className: "Cropper__drag-handle ord-se", "data-ord": "se" }),
          _react2.default.createElement("div", { className: "Cropper__drag-handle ord-s", "data-ord": "s" }),
          _react2.default.createElement("div", { className: "Cropper__drag-handle ord-sw", "data-ord": "sw" }),
          _react2.default.createElement("div", { className: "Cropper__drag-handle ord-w", "data-ord": "w" })
        ),
        renderSelectionAddon && _react2.default.createElement(
          "div",
          {
            className: "Cropper__selection-addon",
            onMouseDown: function onMouseDown(e) {
              return e.stopPropagation();
            }
          },
          renderSelectionAddon(this.state)
        ),
        myRules && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement("div", { className: "Cropper__rule-of-thirds-hz" }),
          _react2.default.createElement("div", { className: "Cropper__rule-of-thirds-vt" })
        )
      );
    }
  }, {
    key: "makeNewCrop",
    value: function makeNewCrop() {
      var unit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "px";

      var crop = _extends({}, Cropper.defaultCrop, this.props.crop);
      var _mediaDimensions5 = this.mediaDimensions,
          width = _mediaDimensions5.width,
          height = _mediaDimensions5.height;


      return unit === "px" ? convertToPixelCrop(crop, width, height) : convertToPercentCrop(crop, width, height);
    }
  }, {
    key: "crossOverCheck",
    value: function crossOverCheck() {
      var evData = this.evData;
      var _props4 = this.props,
          minWidth = _props4.minWidth,
          minHeight = _props4.minHeight;


      if (!minWidth && (!evData.xCrossOver && -Math.abs(evData.cropStartWidth) - evData.xDiff >= 0 || evData.xCrossOver && -Math.abs(evData.cropStartWidth) - evData.xDiff <= 0)) {
        evData.xCrossOver = !evData.xCrossOver;
      }

      if (!minHeight && (!evData.yCrossOver && -Math.abs(evData.cropStartHeight) - evData.yDiff >= 0 || evData.yCrossOver && -Math.abs(evData.cropStartHeight) - evData.yDiff <= 0)) {
        evData.yCrossOver = !evData.yCrossOver;
      }

      var swapXOrd = evData.xCrossOver !== evData.startXCrossOver;
      var swapYOrd = evData.yCrossOver !== evData.startYCrossOver;

      evData.inversedXOrd = swapXOrd ? inverseOrd(evData.ord) : false;
      evData.inversedYOrd = swapYOrd ? inverseOrd(evData.ord) : false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props5 = this.props,
          children = _props5.children,
          circularCrop = _props5.circularCrop,
          className = _props5.className,
          crossorigin = _props5.crossorigin,
          crop = _props5.crop,
          disabled = _props5.disabled,
          locked = _props5.locked,
          imageAlt = _props5.imageAlt,
          onImageError = _props5.onImageError,
          renderComponent = _props5.renderComponent,
          src = _props5.src,
          style = _props5.style,
          imageStyle = _props5.imageStyle,
          myRules = _props5.myRules;
      var _state = this.state,
          cropIsActive = _state.cropIsActive,
          newCropIsBeingDrawn = _state.newCropIsBeingDrawn;


      var cropSelection = isCropValid(crop) && this.componentRef ? this.createCropSelection() : null;

      var componentClasses = (0, _clsx2.default)("Cropper", className, {
        "Cropper--active": cropIsActive,
        "Cropper--disabled": disabled,
        "Cropper--locked": locked,
        "Cropper--new-crop": newCropIsBeingDrawn,
        "Cropper--fixed-aspect": crop && crop.aspect,
        // In this case we have to shadow the image, since the box-shadow on the crop won't work.
        "Cropper--crop-invisible": crop && cropIsActive && (!crop.width || !crop.height),
        "Cropper--circular-crop": crop && circularCrop,
        "Cropper--rule-of-thirds": crop && myRules
      });

      return _react2.default.createElement(
        "div",
        {
          ref: function ref(n) {
            _this4.componentRef = n;
          },
          className: componentClasses,
          style: style,
          onTouchStart: this.onComponentMouseTouchDown,
          onMouseDown: this.onComponentMouseTouchDown,
          tabIndex: "0",
          onKeyDown: this.onComponentKeyDown
        },
        _react2.default.createElement(
          "div",
          {
            ref: function ref(n) {
              _this4.mediaWrapperRef = n;
            }
          },
          renderComponent || _react2.default.createElement("img", {
            ref: function ref(r) {
              return _this4.imageRef = r;
            },
            crossOrigin: crossorigin,
            className: "Cropper__image",
            style: imageStyle,
            src: src,
            onLoad: function onLoad(e) {
              return _this4.onImageLoad(e.target);
            },
            onError: onImageError,
            alt: imageAlt
          })
        ),
        children,
        cropSelection
      );
    }
  }, {
    key: "mediaDimensions",
    get: function get() {
      var _mediaWrapperRef = this.mediaWrapperRef,
          clientWidth = _mediaWrapperRef.clientWidth,
          clientHeight = _mediaWrapperRef.clientHeight;

      return { width: clientWidth, height: clientHeight };
    }
  }]);

  return Cropper;
}(_react.PureComponent);

Cropper.xOrds = ["e", "w"];
Cropper.yOrds = ["n", "s"];
Cropper.xyOrds = ["nw", "ne", "se", "sw"];

Cropper.nudgeStep = 0.2;
Cropper.nudgeStepLarge = 2;

Cropper.defaultCrop = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: "px"
};

Cropper.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
  circularCrop: _propTypes2.default.bool,
  crop: _propTypes2.default.shape({
    aspect: _propTypes2.default.number,
    x: _propTypes2.default.number,
    y: _propTypes2.default.number,
    width: _propTypes2.default.number,
    height: _propTypes2.default.number,
    unit: _propTypes2.default.oneOf(["px", "%"])
  }),
  crossorigin: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  locked: _propTypes2.default.bool,
  imageAlt: _propTypes2.default.string,
  imageStyle: _propTypes2.default.shape({}),
  keepSelection: _propTypes2.default.bool,
  minWidth: _propTypes2.default.number,
  minHeight: _propTypes2.default.number,
  maxWidth: _propTypes2.default.number,
  maxHeight: _propTypes2.default.number,
  onChange: _propTypes2.default.func.isRequired,
  onImageError: _propTypes2.default.func,
  onComplete: _propTypes2.default.func,
  onImageLoaded: _propTypes2.default.func,
  onDragStart: _propTypes2.default.func,
  onDragEnd: _propTypes2.default.func,
  src: _propTypes2.default.string.isRequired,
  style: _propTypes2.default.shape({}),
  renderComponent: _propTypes2.default.node,
  renderSelectionAddon: _propTypes2.default.func,
  myRules: _propTypes2.default.bool
};

Cropper.defaultProps = {
  circularCrop: false,
  className: undefined,
  crop: undefined,
  crossorigin: undefined,
  disabled: false,
  locked: false,
  imageAlt: "",
  maxWidth: undefined,
  maxHeight: undefined,
  minWidth: 0,
  minHeight: 0,
  keepSelection: false,
  onComplete: function onComplete() {},
  onImageError: function onImageError() {},
  onImageLoaded: function onImageLoaded() {},
  onDragStart: function onDragStart() {},
  onDragEnd: function onDragEnd() {},
  children: undefined,
  style: undefined,
  renderComponent: undefined,
  imageStyle: undefined,
  renderSelectionAddon: undefined,
  myRules: false
};

exports.default = Cropper;
exports.Component = Cropper;
exports.makeAspectCrop = makeAspectCrop;
exports.containCrop = containCrop;