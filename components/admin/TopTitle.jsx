import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/forms/Button';
import { FiPlus } from 'react-icons/fi';

const TopTitle = ({ children, buttonText, to }) => {
  return (
    <div className="container-fluid mb-4">
      <h4 className="text-secondary">
        {children}
        {buttonText && to && (
          <div className="text-end">
            <Button color="secondary" href={to}>
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
