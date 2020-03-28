"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var style = exports.style = function style(props) {
  var DRAG_AND_DROP_AREA = props.style && props.style.DRAG_AND_DROP_AREA,
      DRAG_AND_DROP_MESSAGE = props.style && props.style.DRAG_AND_DROP_MESSAGE,
      Hold_And_Drag_Error = props.style && props.style.Hold_And_Drag_Error,
      DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON = props.style && props.style.DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON,
      DRAG_AND_DROP_AREA_ITEM_CROP_ICON = props.style && props.style.DRAG_AND_DROP_AREA_ITEM_CROP_ICON,
      DRAG_AND_DROP_AREA_ITEM = props.style && props.style.DRAG_AND_DROP_AREA_ITEM,
      DRAG_AND_DROP_AREA_ITEM_ERROR = props.style && props.style.DRAG_AND_DROP_AREA_ITEM_ERROR;
  return {
    DRAG_AND_DROP_AREA: {
      width: DRAG_AND_DROP_AREA ? props.style.DRAG_AND_DROP_AREA.width : "500px",
      height: DRAG_AND_DROP_AREA ? props.style.DRAG_AND_DROP_AREA.height : "450px"
    },
    DRAG_AND_DROP_MESSAGE: {
      top: DRAG_AND_DROP_MESSAGE ? props.style.DRAG_AND_DROP_MESSAGE.top : "410px",
      fontSize: DRAG_AND_DROP_MESSAGE ? props.style.DRAG_AND_DROP_MESSAGE.fontSize : "small",
      color: DRAG_AND_DROP_MESSAGE ? props.style.DRAG_AND_DROP_MESSAGE.color : "black"
    },
    Hold_And_Drag_Error: {
      top: Hold_And_Drag_Error ? props.style.Hold_And_Drag_Error.top : "410px",
      fontSize: Hold_And_Drag_Error ? props.style.Hold_And_Drag_Error.fontSize : "small",
      color: Hold_And_Drag_Error ? props.style.Hold_And_Drag_Error.color : "red"
    },
    DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON: {
      color: DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON.color : "grey",
      float: DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON.float : "right",
      top: DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON.top : "",
      bottom: DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON.bottom : "",
      left: DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON.left : "",
      right: DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON.right : "",
      cursor: DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON.cursor : "pointer",
      position: DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON.position : "relative"
    },
    DRAG_AND_DROP_AREA_ITEM_CROP_ICON: {
      color: DRAG_AND_DROP_AREA_ITEM_CROP_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CROP_ICON.color : "grey",
      float: DRAG_AND_DROP_AREA_ITEM_CROP_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CROP_ICON.float : "right",
      top: DRAG_AND_DROP_AREA_ITEM_CROP_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CROP_ICON.top : "60px",
      bottom: DRAG_AND_DROP_AREA_ITEM_CROP_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CROP_ICON.bottom : "",
      left: DRAG_AND_DROP_AREA_ITEM_CROP_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CROP_ICON.left : "10px",
      right: DRAG_AND_DROP_AREA_ITEM_CROP_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CROP_ICON.right : "",
      cursor: DRAG_AND_DROP_AREA_ITEM_CROP_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CROP_ICON.cursor : "pointer",
      position: DRAG_AND_DROP_AREA_ITEM_CROP_ICON ? props.style.DRAG_AND_DROP_AREA_ITEM_CROP_ICON.position : "relative"
    },
    DRAG_AND_DROP_AREA_ITEM: {
      width: DRAG_AND_DROP_AREA_ITEM ? props.style.DRAG_AND_DROP_AREA_ITEM.width : "103px",
      height: DRAG_AND_DROP_AREA_ITEM ? props.style.DRAG_AND_DROP_AREA_ITEM.height : "77px",
      margin: DRAG_AND_DROP_AREA_ITEM ? props.style.DRAG_AND_DROP_AREA_ITEM.margin : "8px",
      textAlign: DRAG_AND_DROP_AREA_ITEM ? props.style.DRAG_AND_DROP_AREA_ITEM.textAlign : "center",
      borderRadius: DRAG_AND_DROP_AREA_ITEM ? props.style.DRAG_AND_DROP_AREA_ITEM.borderRadius : "6px"
    },
    DRAG_AND_DROP_AREA_ITEM_ERROR: {
      width: DRAG_AND_DROP_AREA_ITEM ? props.style.DRAG_AND_DROP_AREA_ITEM.width : "103px",
      height: DRAG_AND_DROP_AREA_ITEM ? props.style.DRAG_AND_DROP_AREA_ITEM.height : "77px",
      margin: DRAG_AND_DROP_AREA_ITEM ? props.style.DRAG_AND_DROP_AREA_ITEM.margin : "8px",
      textAlign: DRAG_AND_DROP_AREA_ITEM ? props.style.DRAG_AND_DROP_AREA_ITEM.textAlign : "center",
      borderRadius: DRAG_AND_DROP_AREA_ITEM ? props.style.DRAG_AND_DROP_AREA_ITEM.borderRadius : "6px",
      border: DRAG_AND_DROP_AREA_ITEM_ERROR ? props.style.DRAG_AND_DROP_AREA_ITEM_ERROR.border : "3px solid red"
    }
  };
};