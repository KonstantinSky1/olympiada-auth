import React from "react";

import './ErrorMessage.css';

function ErrorMessage({ errorMessage, style }) {
  return (
    <span
      style={style}
      className="errorMessage"
    >
      {errorMessage}
    </span> 
  );
}

export default ErrorMessage;