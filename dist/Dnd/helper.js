"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64StringtoFile = base64StringtoFile;
exports.extractImageFileExtensionFromBase64 = extractImageFileExtensionFromBase64;
exports.image64toCanvasRef = image64toCanvasRef;
var validateImage = exports.validateImage = function validateImage(file, callback) {
  var _URL = window.URL || window.webkitURL;
  var imageRatio = 4 / 3;
  var img = new Image();
  if (file) {
    img = new Image();
    var objectUrl = _URL.createObjectURL(file);
    img.src = objectUrl;
    img.onload = function () {
      var _this = this;

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if (imageRatio === _this.width / _this.height) return callback(true, reader.result);else return callback(false, reader.result);
      };
    };
  }
};
var validateImageMimeType = exports.validateImageMimeType = function validateImageMimeType(file, mimeType) {
  var name = file.type.split("/")[1];
  var mimeTypeString = mimeType.split("/").join("");
  return mimeTypeString.includes(name);
};
var swap = exports.swap = function swap(data, x, y) {
  if (y >= data.length) {
    var k = y - data.length + 1;
    while (k--) {
      data.push(undefined);
    }
  }
  data.splice(y, 0, data.splice(x, 1)[0]);
  return data;
};

var filterWithIndex = exports.filterWithIndex = function filterWithIndex(array, index) {
  var newArray = array.filter(function (item, i) {
    return index !== i;
  });
  return newArray;
};

var filterWithItem = exports.filterWithItem = function filterWithItem(array, item) {
  var newArray = array.filter(function (i) {
    return item !== i;
  });
  return newArray;
};
var findWithIndex = exports.findWithIndex = function findWithIndex(array, item) {};
var replaceWithIndex = exports.replaceWithIndex = function replaceWithIndex(array, index, replaceWith) {
  array[index] = replaceWith;
  return array;
};

function base64StringtoFile(base64String, filename) {
  var arr = base64String.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
function extractImageFileExtensionFromBase64(base64Data) {
  return base64Data.substring("data:image/".length, base64Data.indexOf(";base64"));
}
// Base64 Image to Canvas with a Crop
function image64toCanvasRef(canvasRef, image64, pixelCrop) {
  console.info(pixelCrop);
  var canvas = canvasRef.canvas; // document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  var ctx = canvas.getContext("2d");
  var image = new Image();
  image.src = image64;
  image.onload = function () {
    ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
  };
}