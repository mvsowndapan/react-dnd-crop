# React Drag And Drop With Cropper

## npm 1.0.0

<!-- [![React Image Crop on NPM](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/https://img.shields.io/npm/v/react-image-crop.svg)](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/https://www.npmjs.com/package/react-custom-dnd) -->

## Demo

![Demo](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/demo.gif)

## Tabel of Contents

1. Features
2. Installation
3. Usage
4. Example
5. Props
6. Quick Example

## Features

1. Responsive (you can use pixels or percentages).
2. Touch enabled.
3. Crop with custom crop size.
4. No Document Manipulation.
5. Standard image formats are accepted.
6. Images with Errors are highlighted with different color.
7. Crop Option can be disabled

## Installation

```js
npm i react-custom-dnd --save
```

## Usage

```js
import Dnd from "react-custom-dnd";
```

## Example

```js
function DndDemo() {
  const callback = payload => {
    if (payload.error) return console.log(payload.error);
    console.log(payload);
  };
  return <Dnd callback={callback} />;
}
```

## Props

Except Callback all the props are optional

### Callback

Callback is invoked when `onMouseLeave` occur on the Dnd.

```js
const callback = payload => {
  if (payload.error) return console.log(payload.error);
  console.log(payload);
};
```

#### Normal Response

After all the required validation (like crop ratio,image type etc,.) are done the payload will contain

```js
payload: {
  fileObject: [],//contains file object of the images uploaded,
  imageUrls:[],//contains the data url of the image uploaded
}
```

#### Error Response

```js
payload: {
  error: ""; // Error like crop ratio,image type, etc,.
}
```

#### CallBack Demo

![CallBack Demo](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/callback_example.gif)

### Maximum Image Uploads

Maximum images that can be uploaded. Default value is 12.

```js
<Dnd maxImageUpload = 12 />
```

### MimeType

The MimeTypes can be mentioned with seperator `/` like `jpeg/png`.
By default it supports `jpeg/jpg/gif/png`

```js
<Dnd mimeType="png/jpeg/jpg/gif" />
```

#### MimeType Example

```js
<Dnd mimeType="png" />               //If you want to upload only png
<Dnd mimeType="png/jpg" />           //If you want to upload png and jpg
//like so...
```

### Label and Sub Label

Default Label is `Drag and drop images here`.

```js
<Dnd label="Drag and drop images here" subLabel="or click to upload" />
```

#### Label Preview

![Label Preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/label_preview.png)

### Message

Default Message is `Hold and Drag to rearrange the order`.

```js
<Dnd message="Hold and Drag to rearrange the order" />
```

#### Message Preview

![Message Preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/message_preview.png)

#### Error Messages

Error Messages includes

```js
const errorMessages = {
  maxImageUpload: "You Cant Upload More than 3 images",
  imageFormat: "This image Format is not Supported",
  aspectRatio: "Image is not in  the proper aspect ratio"
};
/*
Default Error Messages
  maxImageUpload: "You Cant Upload More than 12 Files"
  imageFormat: "Only Jpeg/Jpg/Png/Gif Allowed"
  aspectRatio: "Image is not in  the proper aspect ratio"
*/
<Dnd errorMessages={errorMessages} />;
```

these messages will return in payload.

### Crop

To enable Crop use crop props, by default `false`

```js
<Dnd crop />
```

or

```js
<Dnd crop = true />
```

you can disable it by passing props `crop = false`

```js
<Dnd crop = false />
```

or

```js
<Dnd />
```

#### Crop Ratio

Crop ratio helps to crop the image in a required aspect ratio.

```js
const cropRatio = {
  unit: "%",
  width: 30,
  aspect: 5 / 3 //aspect ratio is 5/3
};

/*
Default value involves
  unit: "%"
  width: 30
  aspect: 4 / 3
*/

<Dnd cropRatio={cropRatio} />;
```

It works fine even unit and width is not mentioned.

#### Crop preview

##### Mentioning unit and width (By Default)

![Crop preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/crop/with_aspect_ratio.png)

By default Crop is initiated

##### Without mentioning unit and width

![Crop preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/crop/without_aspect_ratio.png)

You have to initiate the crop here.

### Icons

You can change label,cancel and crop icons

```js
const icons = {
  labelIcon: , // Your icon goes here
  cancelIcon: , // Your icon goes here
  cropIcon:  // Your icon goes here
};

<Dnd icons={icons} />;
```

#### Icons preview (By Default)

![Crop preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/icons/labelIcon.png)
![Crop preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/icons/cancel_crop_icons.png)

### Button Value

Button values includes `Crop` and `Cancel` by default.You can change that by using `buttonvalues` props.

```js
const buttonvalue = {
  cancelButton: "Cancel", //optionl
  cropButton: "Confrim" // required
};
/*
  cancelButton: "Cancel",
  cropButton: "Crop"
*/

<Dnd buttonvalue={buttonvalue} />;
```

#### Button preview 1

![Button preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/cancel_crop_button.png);

```js
const buttonvalue = {
  cropButton: "Confrim"
};
/*
  cancelButton: "Cancel",
  cropButton: "Crop"
*/

<Dnd buttonvalue={buttonvalue} />;
```

#### Button preview 2

![Button preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/single_button_demo.png);

### Styles

```js
const style = {
  //styles
}

<Dnd style={style} />
```

### Styles you can change

#### Drag and Drop Area Styles

You can only change width and height

```js
 DRAG_AND_DROP_AREA: {
    width: "60%", // width of the drag and drop area
    height: "300px" // height of the drag and drop area
  }
```

#### Drag and Drop Area preview

![Drag and Drop Area  preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/dnd.png)

#### Message Styles

You can only change top, fontsize, color

```js
  DRAG_AND_DROP_MESSAGE: {
    top: "400px",
    fontSize: "small", //font size of the message
    color: "grey" // color of the message
  }
```

#### Message preview

![Message Preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/message_preview.png)

#### Crop and Cancel Button Styles

You can add any styles, they are not fixed

Note : The styles you provide here may affect the Crop Modal

```js
 CROP_BUTTON: {
    background: "green", // background of the crop button
    color: "white", // color of the crop button
    width: "200px" //  width of the crop button
  },
  CANCEL_BUTTON: {
    background: "red", //background of the cancel button
    color: "white", //color of the cancel button
    width: "200px" //width of the cancel button
  },
```

#### Crop and Cancel Button preview

![Message Preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/crop/crop_and_cancel_style.png)

#### Crop and Cancel Icon Styles

You can only change these properties.

```js
  DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON: {
    color: "grey",
    float: " right",
    top: "",
    bottom: "",
    left: "",
    right: "",
    cursor: "pointer",
    position:"relative"
  },
  DRAG_AND_DROP_AREA_ITEM_CROP_ICON: {
    color: "red",
    float: " right",
    top: "50px",
    bottom: "",
    left: "23px",
    right: "",
    cursor: "pointer",
    position:"relative"
  },
```

#### Crop and Cancel Icon preview

![Message Preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/icons/cancel_crop_icons.png)

#### Drag And Drop Area Item Styles

You can only change these properties. The red border around it refers that the image is not in the proper aspect ratio

```js
  DRAG_AND_DROP_AREA_ITEM: {
      width: "200px",
      height: "100px",
      margin: "8px",
      textAlign: "center",
      borderRadius: "6px"
  }
  DRAG_AND_DROP_AREA_ITEM_ERROR: {
    border: "3px solid red" // If image is not in the proper aspect ratio the border will change to given color
  }
```

#### Drag And Drop Area Item preview

![Drag And Drop Area Item Preview](https://github.com/mvsowndapan/react-dnd-cropper/blob/master/asset/crop/crop_and_Cancel_demo.png)

### Entire Style Object

You can change the styles, otherwise the default styles will appear.

```js
const style = {
  DRAG_AND_DROP_AREA: {
    width: "90%", // width of the drag and drop area
    height: "450px" // height of the drag and drop area
  },
  DRAG_AND_DROP_MESSAGE: {
    top: "400px",
    fontSize: "small", //font size of the message
    color: "grey" // color of the message
  },
  CROP_BUTTON: {
    background: "green", // background of the crop button
    color: "white", // color of the crop button
    width: "200px" //  width of the crop button
  },
  CANCEL_BUTTON: {
    background: "red", //background of the cancel button
    color: "white", //color of the cancel button
    width: "200px" //width of the cancel button
  },
  DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON: {
    color: "grey",
    float: " right",
    top: "",
    bottom: "",
    left: "",
    right: "",
    cursor: "pointer"
  },
  DRAG_AND_DROP_AREA_ITEM_CROP_ICON: {
    color: "red",
    float: " right",
    top: "50px",
    bottom: "",
    left: "23px",
    right: "",
    cursor: "pointer"
  },
  DRAG_AND_DROP_AREA_ITEM: {
    width: "103px",
    height: "77px",
    margin: "8px",
    textAlign: "center",
    borderRadius: "6px"
  },
  DRAG_AND_DROP_AREA_ITEM_ERROR: {
    border: "3px solid red" // If image is not in the proper aspect ratio the border will change to given color
  }
};
```

## Quick Example

In the following Example, Material UI Icons are used.

```js
import React from "react";
import { render } from "react-dom";
import Dnd from "../src";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import CropFreeIcon from "@material-ui/icons/CropFree";

const DemoComponent = () => {
  const callback = payload => {
    if (payload.error) return console.log(payload.error);
    console.log(payload);
  };
  const cropRatio = {
    unit: "%",
    width: 30,
    aspect: 4 / 3
  };
  const maxImageUpload = 20;
  const buttonvalue = {
    cancelButton: "Cancel",
    cropButton: "Crop"
  };
  const style = {
    DRAG_AND_DROP_AREA: {
      width: "60%",
      height: "300px"
    },
    DRAG_AND_DROP_MESSAGE: {
      top: "250px",
      fontSize: "small",
      color: "grey"
    },
    CROP_BUTTON: {
      background: "green",
      color: "white",
      width: "200px"
    },
    CANCEL_BUTTON: {
      background: "red",
      color: "white",
      width: "200px"
    },
    DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON: {
      color: "grey",
      float: " right",
      top: "",
      bottom: "",
      left: "",
      right: "",
      cursor: "pointer"
    },
    DRAG_AND_DROP_AREA_ITEM_CROP_ICON: {
      color: "red",
      float: " right",
      top: "50px",
      bottom: "",
      left: "23px",
      right: "",
      cursor: "pointer"
    },
    DRAG_AND_DROP_AREA_ITEM: {
      width: "200px",
      height: "100px",
      margin: "8px",
      textAlign: "center",
      borderRadius: "6px"
    },
    DRAG_AND_DROP_AREA_ITEM_ERROR: {
      border: "3px solid red"
    }
  };
  const errorMessage = {
    maxImageUpload: "You Cant Upload More than 3 images",
    imageFormat: "This image Format is not Supported",
    aspectRatio: "Image is not in  the proper aspect ratio"
  };
  const icons = {
    labelIcon: <WallpaperIcon />,
    cancelIcon: <CancelPresentationIcon />,
    cropIcon: <CropFreeIcon />
  };
  return (
    <Dnd
      callback={callback}
      maxImageUpload={maxImageUpload}
      mimeType="png/jpeg/jpg/gif"
      label="Drag and drop images here"
      subLabel="or click to upload"
      message="Hold and Drag to rearrange the order"
      errorMessages={errorMessage}
      crop
      cropRatio={cropRatio}
      icons={icons}
      buttonvalue={buttonvalue}
      style={style}
    />
  );
};

export default DemoComponent;
```
