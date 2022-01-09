import React from 'react';

const Button = ({ children, type }) => {
  return (
    <button type="button" className={`btn btn-${type}`}>
      {children}
    </button>
  );
};

export default Button;
