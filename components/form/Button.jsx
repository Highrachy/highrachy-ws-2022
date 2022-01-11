import React from 'react';

const Button = ({ children, color, className }) => {
  return (
    <button type="button" className={`btn btn-${color} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
