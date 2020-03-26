import React, { Component } from "react";
import {
  swap,
  filterWithIndex,
  validateImage,
  base64StringtoFile,
  replaceWithIndex,
  validateImageMimeType
} from "./helper";
import { style } from "./style";
import Modal from "../Modal/Modal";
import CancelIcon from "../icons/cancel.svg";
import CropIcon from "../icons/crop.svg";
import ImageIcon from "../icons/image.svg";
import "./Dnd.css";

class Dnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.INPUT_REF = React.createRef();
    this.onImageBrowse = this.onImageBrowse.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.callback = this.callback.bind(this);
    this.getImageDataUrl = this.getImageDataUrl.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.checkValidImages = this.checkValidImages.bind(this);
    this.convertImageForupload = this.convertImageForupload.bind(this);
    this.getcropImage = this.getcropImage.bind(this);
    this.cancelCrop = this.cancelCrop.bind(this);
    this.handleClearToDefault = this.handleClearToDefault.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  openModal(index) {
    let { fixedDataUrl } = this.state;
    let cropImgSrc = fixedDataUrl.find((_, i) => i === index);
    this.setState({
      cropImgSrc: cropImgSrc,
      open: true,
      currentCropImageIndex: index
    });
  }
  handleClearToDefault() {
    this.setState({ open: false });
  }
  async onDrop(e, index) {
    e.stopPropagation();
    let { draggingElmIndex, files, imageUrls, fixedDataUrl } = this.state;
    files = swap(files, draggingElmIndex, index);
    imageUrls = swap(imageUrls, draggingElmIndex, index);
    fixedDataUrl = swap(fixedDataUrl, draggingElmIndex, index);
    await this.setState({
      files: files,
      imageUrls,
      fixedDataUrl,
      draggingElmIndex: null
    });
  }
  onDragStart(_, index) {
    this.setState({ draggingElmIndex: index });
  }

  // image Events
  onImageBrowse() {
    let DRAG_AND_DROP_AREA_INPUT = this.INPUT_REF.current;
    if (DRAG_AND_DROP_AREA_INPUT && document.createEvent) {
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", true, false);
      DRAG_AND_DROP_AREA_INPUT.dispatchEvent(evt);
    }
  }
  callback(payload) {
    if (this.props.callback) return this.props.callback(payload);
    console.log("Provide a callback");
  }
  onImageDrop(e) {
    this.preventDefaults(e);
    let { files, imageUrls, mimeType, errorMessage } = this.state,
      validUpload = true;
    let newFiles = e.dataTransfer.files;
    if (imageUrls.length + newFiles.length > (this.props.maxImageUpload || 12))
      return this.callback({
        error:
          errorMessage.maxImageUpload ||
          `You Cant Upload More than ${this.props.maxImageUpload || 12} Files`
      });
    [...newFiles].forEach(file => {
      if (!validateImageMimeType(file, mimeType)) {
        validUpload = false;
        this.callback({
          error: errorMessage.imageFormat || "Only Jpeg/Jpg/Png/Gif Allowed"
        });
        return false;
      }
    });
    if (validUpload) {
      this.setState({ files: [...files, ...newFiles] });
      [...newFiles].forEach(file => validateImage(file, this.getImageDataUrl));
    }
  }
  getImageDataUrl(isValid, url) {
    if (!this.props.crop) isValid = true;
    let { imageUrls, fixedDataUrl, errorMessage } = this.state;
    if (imageUrls.length + 1 > (this.props.maxImageUpload || 12))
      return this.callback({
        error:
          errorMessage.maxImageUpload ||
          `You Cant Upload More than ${this.props.maxImageUpload || 12} Files`
      });
    this.setState({
      fixedDataUrl: [...fixedDataUrl, url],
      imageUrls: [...imageUrls, { url: url, isValid }]
    });
  }
  async onInputChange(e) {
    let { files, imageUrls, mimeType, errorMessage } = this.state;
    let file = e.target.files[0];
    if (!file) return;
    files = [...files, file];
    if (!validateImageMimeType(file, mimeType))
      return this.callback({
        error: errorMessage.imageFormat || "Only Jpeg/Jpg/Png/Gif Allowed"
      });
    if (imageUrls.length + 1 > this.props.maxImageUpload)
      return this.callback({
        error:
          errorMessage.maxImageUpload ||
          `You Cant Upload More than ${this.props.maxImageUpload} Files`
      });
    this.setState({ files }, () => {
      validateImage(file, this.getImageDataUrl);
    });
    this.convertImageForupload();
  }
  async removeImage(index) {
    let { files, imageUrls, fixedDataUrl } = this.state;
    files = filterWithIndex(files, index);
    fixedDataUrl = filterWithIndex(fixedDataUrl, index);
    imageUrls = filterWithIndex(imageUrls, index);
    await this.setState({ files, imageUrls, fixedDataUrl });
  }
  checkValidImages() {
    let { imageUrls } = this.state;
    for (let i = 0; i < imageUrls.length; i++)
      if (!imageUrls[i].isValid) return false;
    return true;
  }
  convertImageForupload() {
    let { imageUrls, files, errorMessage } = this.state;
    let fileObject = [];
    imageUrls.forEach((url, index) => {
      let file = base64StringtoFile(url.url, files[index].name);
      fileObject.push(file);
    });
    let isUploadValid = this.checkValidImages();
    if (!isUploadValid)
      return this.callback({
        error:
          errorMessage.aspectRatio || "Image is not in the proper Aspect Ratio"
      });
    return this.callback({ fileObject, imageUrls });
  }
  getcropImage(url) {
    let { currentCropImageIndex, imageUrls, files } = this.state;
    let file = base64StringtoFile(url, files[currentCropImageIndex].name);
    imageUrls = replaceWithIndex(imageUrls, currentCropImageIndex, {
      url: url,
      isValid: true
    });
    files = replaceWithIndex(files, currentCropImageIndex, file);
    this.setState({
      files,
      imageUrls,
      currentCropImageIndex: null,
      open: false
    });
    this.convertImageForupload();
  }
  cancelCrop() {
    this.setState({ open: false });
  }

  render() {
    let { imageUrls, open, cropImgSrc } = this.state;
    let styles = style(this.props);
    return (
      <div onMouseLeave={this.convertImageForupload}>
        <input
          ref={this.INPUT_REF}
          type="file"
          id="DRAG_AND_DROP_AREA_INPUT"
          onChange={this.onInputChange}
        />
        <div
          id="DRAG_AND_DROP_AREA"
          style={styles.DRAG_AND_DROP_AREA}
          onDragOver={e => this.preventDefaults(e)}
          onDrop={this.onImageDrop}
          onClick={this.onImageBrowse}
        >
          {imageUrls.length === 0 ? null : (
            <span
              id="DRAG_AND_DROP_MESSAGE"
              style={styles.DRAG_AND_DROP_MESSAGE}
            >
              {this.props.message || "Hold and Drag to rearrange the order"}
            </span>
          )}
          {imageUrls.length === 0 ? (
            <div id="DRAG_AND_DROP_PLACEHOLDER">
              {this.props.icons && this.props.icons.labelIcon ? (
                this.props.icons.labelIcon
              ) : (
                <img src={ImageIcon} width="30" height="30" />
              )}
              <h1>{this.props.label || "Drag and drop images here"}</h1>
              <p>{this.props.subLabel || "or click to upload"}</p>
            </div>
          ) : (
            <div>
              <div id="DRAG_AND_DROP_ZONE">
                {imageUrls.map((item, index) => (
                  <div
                    id="DRAG_AND_DROP_AREA_ITEM"
                    key={index}
                    draggable
                    onClick={e => this.preventDefaults(e)}
                    onDragStart={e => this.onDragStart(e, index)}
                    onDragOver={e => this.preventDefaults(e)}
                    onDrop={e => this.onDrop(e, index)}
                    style={
                      item.isValid
                        ? styles.DRAG_AND_DROP_AREA_ITEM
                        : styles.DRAG_AND_DROP_AREA_ITEM_ERROR
                    }
                  >
                    <div
                      id="DRAG_AND_DROP_AREA_ITEM_IMAGE_CONTAINER"
                      onDragOver={e => this.preventDefaults(e)}
                      style={{ backgroundImage: `url(${item.url})` }}
                    >
                      <span
                        id="DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON"
                        style={styles.DRAG_AND_DROP_AREA_ITEM_CANCEL_ICON}
                        onClick={() => this.removeImage(index)}
                      >
                        {this.props.icons && this.props.icons.cancelIcon ? (
                          this.props.icons.cancelIcon
                        ) : (
                          <img src={CancelIcon} width="15" height="15" />
                        )}
                      </span>
                      {this.props.crop ? (
                        <span
                          id="DRAG_AND_DROP_AREA_ITEM_CROP_ICON"
                          style={styles.DRAG_AND_DROP_AREA_ITEM_CROP_ICON}
                          onClick={() => this.openModal(index)}
                        >
                          {this.props.icons && this.props.icons.cropIcon ? (
                            this.props.icons.cropIcon
                          ) : (
                            <img src={CropIcon} width="15" height="15" />
                          )}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Modal
          isOpen={open}
          {...this.props}
          onRequestClose={this.handleClearToDefault}
          getcropImage={this.getcropImage}
          cancelCrop={this.cancelCrop}
          imageSrc={cropImgSrc}
        />
      </div>
    );
  }
}

export default Dnd;
