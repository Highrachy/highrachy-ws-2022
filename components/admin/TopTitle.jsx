import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/forms/Button';
import { FiPlus } from 'react-icons/fi';

const TopTitle = ({ children, buttonText, to }) => {
  return (
    <div className="container-fluid">
      <h4>
        {children}
        {buttonText && to && (
          <div className="text-end">
            <Button color="secondary" to={to}>
              {<FiPlus />} {buttonText}
            </Button>
          </div>
        )}
      </h4>
    </div>
  );
};

TopTitle.propTypes = {
  buttonText: PropTypes.string,
  children: PropTypes.node.isRequired,
  to: PropTypes.any,
};

TopTitle.defaultProps = {
  buttonText: null,
  to: null,
};

export default TopTitle;
