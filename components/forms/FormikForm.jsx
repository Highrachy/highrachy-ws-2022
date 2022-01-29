import React from 'react';
import { Formik, Form } from 'formik';
import { isDevEnvironment } from '@/utils/helpers';
import Button from './Button';
import { DisplayFormikState, setInitialValues } from './form-helper';
import { createSchema } from './schemas/schema-helpers';
import { Persist } from 'formik-persist';

const FormikForm = ({
  buttonText,
  children,
  handleSubmit,
  name,
  schema,
  showFormikState,
  persistForm,
  showAllFormikState,
}) => {
  return (
    <Formik
      initialValues={setInitialValues(schema)}
      onSubmit={handleSubmit}
      validationSchema={createSchema(schema)}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          {children}

          <Button color="danger" loading={isSubmitting} onClick={handleSubmit}>
            {buttonText}
          </Button>
          {persistForm && <Persist name={name} />}
          {isDevEnvironment() && showFormikState && (
            <DisplayFormikState {...props} showAll={showAllFormikState} />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
