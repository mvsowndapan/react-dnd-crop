import React from "react";
import PropTypes from "prop-types";

const Button = ({
  text = false,
  style,
  value,
  children,
  disabled = false,
  onClick
}) => {
  if (text) {
    return (
      <div onClick={onClick} style={style}>
        {children || value}
      </div>
    );
  }
  const styles = {
    width: "200px",
    height: "30px",
    borderRadius: "10px",
    background: "white",
    color: "black"
  };
  return (
    <button style={style || styles} onClick={onClick} disabled={disabled}>
      {children || value}
    </button>
  );
};
Button.prototype = {
  style: PropTypes.object,
  secondary: PropTypes.bool,
  text: PropTypes.bool,
  value: PropTypes.string,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  onClick: PropTypes.func
};
export default Button;
