import React from "react";
import { render } from "react-dom";
import Dnd from "../src";

const App = () => {
  const callback = payload => {
    if (payload.error) return console.log(payload.error);
    console.log(payload);
  };
  const cropRatio = {
    unit: "%",
    width: 30
    // aspect: 5 / 3
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
      width: "101px",
      height: "80px",
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
    // labelIcon: <WallpaperIcon />,
    // // cancelIcon: <CancelPresentationIcon />,
    // cropIcon: <CropFreeIcon />
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
      // freeCrop={true}
      cropRatio={cropRatio}
      icons={icons}
      buttonvalue={buttonvalue}
      style={style}
    />
  );
};

export default App;
render(<App />, document.getElementById("root"));
