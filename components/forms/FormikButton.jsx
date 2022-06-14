import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import Button from './Button';
import { toast } from 'react-toastify';

const FormikButton = ({ children, ...props }) => {
  const formikProps = useFormikContext();

  const handleClick = () => {
    formikProps.handleSubmit();
    const errors = formikProps.errors;
    errors && toast.error(Object.values(errors)[0]);
  };

  return (
    <Button {...props} onClick={handleClick} loading={formikProps.isSubmitting}>
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
