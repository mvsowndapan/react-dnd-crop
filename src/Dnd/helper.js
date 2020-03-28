export const validateImage = (file, callback, cropRatio) => {
  var _URL = window.URL || window.webkitURL;
  console.log(cropRatio);
  const imageRatio = cropRatio.aspect;
  var img = new Image();
  if (file) {
    img = new Image();
    var objectUrl = _URL.createObjectURL(file);
    img.src = objectUrl;
    img.onload = function() {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (imageRatio === this.width / this.height) return callback(true, reader.result);
        else return callback(false, reader.result);
      };
    };
  }
};
export const validateImageMimeType = (file, mimeType) => {
  let name = file.type.split("/")[1];
  let mimeTypeString = mimeType.split("/").join("");
  return mimeTypeString.includes(name);
};
export const swap = (data, x, y) => {
  if (y >= data.length) {
    var k = y - data.length + 1;
    while (k--) {
      data.push(undefined);
    }
  }
  data.splice(y, 0, data.splice(x, 1)[0]);
  return data;
};

export const filterWithIndex = (array, index) => {
  let newArray = array.filter((item, i) => index !== i);
  return newArray;
};

export const filterWithItem = (array, item) => {
  let newArray = array.filter(i => item !== i);
  return newArray;
};
export const findWithIndex = (array, item) => {};
export const replaceWithIndex = (array, index, replaceWith) => {
  array[index] = replaceWith;
  return array;
};

export function base64StringtoFile(base64String, filename) {
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
export function extractImageFileExtensionFromBase64(base64Data) {
  return base64Data.substring("data:image/".length, base64Data.indexOf(";base64"));
}
// Base64 Image to Canvas with a Crop
export function image64toCanvasRef(canvasRef, image64, pixelCrop) {
  console.info(pixelCrop);
  const canvas = canvasRef.canvas; // document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = image64;
  image.onload = function() {
    ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
  };
}
