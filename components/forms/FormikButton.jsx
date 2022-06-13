import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import Button from './Button';

const FormikButton = ({ children, ...props }) => {
  const formikProps = useFormikContext();

  return (
    <Button
      {...props}
      onClick={formikProps.handleSubmit}
      loading={formikProps.isSubmitting}
    >
      {children}
    </Button>
  );
};

FormikButton.propTypes = {
  children: PropTypes.any,
};

FormikButton.defaultProps = {
  children: 'Submit',
};

export default FormikButton;
