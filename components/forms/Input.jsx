import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { connect } from 'formik';
import classNames from 'classnames';
import {
  getValidityClass,
  FeedbackMessage,
  feedback,
} from 'components/forms/form-helper';
import Label from './Label';

const Input = ({
  autoComplete,
  formGroupClassName,
  formik,
  floatingLabel,
  helpText,
  inline,
  inputClassName,
  isValidMessage,
  label,
  labelLink,
  labelClassName,
  name,
  optional,
  placeholder,
  showFeedback,
  tooltipHeader,
  tooltipText,
  tooltipPosition,
  type,
  ...props
}) => {
  const inputLabel = (
    <Label
      className={labelClassName}
      labelLink={labelLink}
      floatingLabel={floatingLabel}
      name={name}
      optional={optional}
      text={label}
      tooltipHeader={tooltipHeader}
      tooltipPosition={tooltipPosition}
      tooltipText={tooltipText}
    />
  );
  return (
    <div
      className={classNames('mb-4', formGroupClassName, {
        'form-floating': floatingLabel,
      })}
    >
      {!floatingLabel && inputLabel}
      <Field
        aria-describedby={`${name}-help-block`}
        autoComplete={autoComplete}
        className={classNames(
          'form-control',
          inputClassName,
          getValidityClass(formik, name, showFeedback)
        )}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || label}
        {...props}
      />
      {floatingLabel && inputLabel}
      <FeedbackMessage
        helpText={helpText}
        name={name}
        showFeedback={showFeedback}
        validMessage={isValidMessage}
      />
    </div>
  );
};

// NB: Wrap multiple fields in .form-row and give formGroupClassname the size e.g form-group col-md-6

Input.defaultProps = {
  autoComplete: 'off',
  formGroupClassName: 'mb-4',
  floatingLabel: false,
  helpText: null,
  inline: false,
  inputClassName: null,
  isValidMessage: '',
  label: null,
  labelClassName: null,
  labelLink: null,
  optional: false,
  placeholder: null,
  showFeedback: feedback.ALL,
  tooltipHeader: null,
  tooltipText: null,
  tooltipPosition: 'right',
  type: null,
};

Input.propTypes = {
  autoComplete: PropTypes.string,
  formGroupClassName: PropTypes.string,
  floatingLabel: PropTypes.bool,
  formik: PropTypes.object.isRequired,
  helpText: PropTypes.string,
  inline: PropTypes.bool,
  inputClassName: PropTypes.string,
  isValidMessage: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelLink: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
  }),
  name: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  placeholder: PropTypes.string,
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  tooltipHeader: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.any,
  type: PropTypes.string,
};

export default connect(Input);
