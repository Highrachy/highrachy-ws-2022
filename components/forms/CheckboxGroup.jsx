import React from 'react';
import PropTypes from 'prop-types';
import { connect, Field } from 'formik';
import classNames from 'classnames';
import { FeedbackMessage, feedback } from 'components/forms/form-helper';
import Humanize from 'humanize-plus';
import { dashedLowerCase } from 'utils/helpers';
import Label from './Label';

const genId = (name, value) => `${name}-${value}`.replace(/\./g, '-');

const Checkbox = ({
  formGroupLabelClassName,
  inline,
  inputClassName,
  name,
  label,
  value,
}) => {
  const checkBoxId = genId(name, value);
  return (
    <div className={classNames('form-check', { 'form-check-inline': inline })}>
      <Field name={name}>
        {({ field, form }) => {
          const fieldValue = field.value || [];
          return (
            <input
              checked={fieldValue.includes(value)}
              className={classNames('form-check-input', inputClassName)}
              id={checkBoxId}
              name={name}
              onChange={() => {
                if (fieldValue.includes(value)) {
                  const nextValue = fieldValue.filter((val) => val !== value);
                  form.setFieldValue(name, nextValue);
                } else {
                  const nextValue = fieldValue.concat(value);
                  form.setFieldValue(name, nextValue);
                }
              }}
              type="checkbox"
              value={value}
            />
          );
        }}
      </Field>
      <label
        className={classNames(formGroupLabelClassName, 'form-check-label')}
        htmlFor={checkBoxId}
        id={`${checkBoxId}-label `}
      >
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  formGroupLabelClassName: PropTypes.string.isRequired,
  inline: PropTypes.bool.isRequired,
  inputClassName: PropTypes.string.isRequired,
  label: PropTypes.node,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
};

Checkbox.defaultProps = {
  label: null,
  value: null,
};

const CheckboxGroup = ({
  formGroupLabelClassName,
  formik,
  helpText,
  inline,
  inputClassName,
  isValidMessage,
  label,
  labelClassName,
  labelSizeClassName,
  name,
  optional,
  options,
  checkboxSizeClassName,
  showFeedback,
  tooltipHeader,
  tooltipPosition,
  tooltipText,
}) => {
  const checkedGroup = options.map(({ label, value }) => {
    if (!(label || value)) return null;
    const optionValue = value || dashedLowerCase(label);
    const optionLabel =
      label || Humanize.capitalize(typeof value === 'string' ? value : '');
    return (
      <Checkbox
        formGroupLabelClassName={formGroupLabelClassName}
        formik={formik}
        inline={inline}
        inputClassName={inputClassName}
        key={optionValue}
        label={optionLabel}
        name={name}
        showFeedback={showFeedback}
        value={optionValue}
      />
    );
  });

  return (
    <>
      {label ? (
        <CheckboxGroupWithLabel
          checkboxSizeClassName={checkboxSizeClassName}
          label={label}
          labelClassName={labelClassName}
          labelSizeClassName={labelSizeClassName}
          name={name}
          optional={optional}
          tooltipHeader={tooltipHeader}
          tooltipPosition={tooltipPosition}
          tooltipText={tooltipText}
        >
          {checkedGroup}
        </CheckboxGroupWithLabel>
      ) : (
        checkedGroup
      )}
      <FeedbackMessage
        formik={formik}
        helpText={helpText}
        name={name}
        showFeedback={showFeedback}
        validMessage={isValidMessage}
      />
    </>
  );
};

CheckboxGroup.propTypes = {
  checkboxSizeClassName: PropTypes.string,
  formGroupLabelClassName: PropTypes.string,
  formik: PropTypes.object.isRequired,
  helpText: PropTypes.string,
  inline: PropTypes.bool,
  inputClassName: PropTypes.string,
  isValidMessage: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  labelSizeClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  options: PropTypes.array.isRequired,
  showFeedback: PropTypes.oneOf(Object.keys(feedback)),
  tooltipHeader: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string,
};

CheckboxGroup.defaultProps = {
  formGroupLabelClassName: '',
  helpText: null,
  inline: false,
  inputClassName: '',
  isValidMessage: null,
  label: null,
  labelClassName: null,
  labelSizeClassName: 'col-sm-2',
  checkboxSizeClassName: 'col-sm-10',
  showFeedback: feedback.ALL,
  tooltipHeader: null,
  tooltipPosition: 'right',
  tooltipText: null,
};

const CheckboxGroupWithLabel = ({
  children,
  label,
  labelClassName,
  labelSizeClassName,
  name,
  optional,
  checkboxSizeClassName,
  tooltipHeader,
  tooltipText,
  tooltipPosition,
}) => {
  return (
    <fieldset className="form-group">
      <div className="row">
        <legend className={`col-form-label ${labelSizeClassName} pt-0`}>
          <Label
            className={`label-radio ${labelClassName}`}
            name={name}
            text={label}
            optional={optional}
            tooltipHeader={tooltipHeader}
            tooltipPosition={tooltipPosition}
            tooltipText={tooltipText}
          />
        </legend>
        <div className={checkboxSizeClassName}>{children}</div>
      </div>
    </fieldset>
  );
};

CheckboxGroupWithLabel.propTypes = {
  checkboxSizeClassName: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  label: PropTypes.node.isRequired,
  labelClassName: PropTypes.string,
  labelSizeClassName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  tooltipHeader: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.string,
};

CheckboxGroupWithLabel.defaultProps = {
  labelClassName: null,
  tooltipText: null,
  tooltipHeader: null,
  tooltipPosition: 'right',
  optional: false,
};

export default connect(CheckboxGroup);
