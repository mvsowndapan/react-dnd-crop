import Modal from "react-modal";
import React, { Component } from "react";
import Crop from "../Crop/Crop";
import "../Crop/Crop.css";
import Button from "../Button/Button";
import "./Modal.css";
Modal.setAppElement("body");
class Cropper extends Component {
  constructor(props) {
    super(props);
    let cropRatio = props.cropRatio
      ? props.cropRatio
      : {
          unit: "%",
          width: 30,
          aspect: 4 / 3
        };
    this.state = {
      crop: cropRatio
    };
  }
  helperfunc = () => this.props.getcropImage(this.state.croppedImageUrl);
  cancelFunc = () => this.props.cancelCrop();
  onImageLoaded = image => (this.imageRef = image);
  onCropComplete = crop => this.makeClientCrop(crop);
  onCropChange = crop => this.setState({ crop });
  makeClientCrop = async crop => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop);
      this.setState({ croppedImageUrl });
    }
  };
  getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return canvas.toDataURL();
  };

  render() {
    const { crop } = this.state;
    return (
      <div className="CropperModalOuterContainer">
        <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onRequestClose}
          className="CropperModal"
        >
          <div className="CropperImage">
            {this.props.imageSrc && (
              <Crop
                className="Cropper"
                style={{
                  maxHeight: "100px !important",
                  maxWidth: "100px !important"
                }}
                src={this.props.imageSrc}
                crop={crop}
                err={false}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            )}
          </div>
          <div id="CROPPER_BUTTON_CONTAINER">
            <Button
              value={
                this.props.buttonvalue && this.props.buttonvalue.cropButton
                  ? this.props.buttonvalue.cropButton
                  : "Crop"
              }
              style={
                this.props.style && this.props.style.CROP_BUTTON
                  ? this.props.style.CROP_BUTTON
                  : null
              }
              onClick={this.helperfunc}
            ></Button>
            {this.props.buttonvalue && this.props.buttonvalue.cancelButton ? (
              <Button
                value={
                  this.props.buttonvalue && this.props.buttonvalue.cancelButton
                    ? this.props.buttonvalue.cancelButton
                    : "Cancel"
                }
                style={
                  this.props.style && this.props.style.CANCEL_BUTTON
                    ? this.props.style.CANCEL_BUTTON
                    : null
                }
                onClick={this.cancelFunc}
              ></Button>
            ) : (
              ""
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

export default Cropper;
