import React from 'react';
import "../Styles/toast.css";

const Toast = ({ message }) => {
  return (
    <div className="toast success-toast">
      <span>{message}</span>
    </div>
  );
};

export default Toast;