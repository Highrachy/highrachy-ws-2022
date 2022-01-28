import Button from '@/components/forms/Button';
import CheckboxGroup from '@/components/forms/CheckboxGroup';
import DatePicker from '@/components/forms/DatePicker';
import {
  DisplayFormikState,
  setInitialValues,
} from '@/components/forms/form-helper';
import Input from '@/components/forms/Input';
import InputFormat from '@/components/forms/InputFormat';
import RadioSelect from '@/components/forms/RadioSelect';
import {
  createSchema,
  stringValidation,
} from '@/components/forms/schemas/schema-helpers';
import Select from '@/components/forms/Select';
import Switch from '@/components/forms/Switch';
import Textarea from '@/components/forms/Textarea';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import { about } from '@/data/navigation';
import { generateNumOptions } from '@/utils/helpers';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

const registerSchema = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
};

export default function Forms() {
  return (
    <>
      <Navigation parentPage={about.url} />
      <div className="container">
        <FormComponents />
      </div>
      <Footer />
    </>
  );
}

const options = [
  { value: '', label: 'Not Applicable' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const FormComponents = () => {
  return (
    <Formik
      initialValues={setInitialValues(registerSchema)}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 4000);
      }}
      render={({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <div className="row">
            <Input
              formGroupClassName="col-md-6"
              label="First Name"
              name="firstName"
              placeholder="First Name"
            />
            <Input
              formGroupClassName="col-md-6"
              label="Last Name"
              name="lastName"
              tooltipText="Here is the Last Name"
            />
          </div>
          <div className="row">
            <Input
              formGroupClassName="col-md-6"
              label="Email"
              name="email"
              placeholder="Valid Email"
              tooltipText="A valid email address, needed for login"
            />

            <InputFormat
              formGroupClassName="col-md-6"
              label="Price"
              name="price"
              optional
            />
          </div>
          <div className="row">
            <Input
              formGroupClassName="col-md-6"
              label="Phone Number 2"
              name="phoneNumber2"
              optional
            />
            <Input
              formGroupClassName="col-md-6"
              label="Phone Number 2"
              name="phoneNumber3"
              optional
            />
          </div>
          <Input
            label="Password"
            name="password"
            placeholder="Password"
            type="password"
            tooltipText={<p className="text-danger">Your Password :-)</p>}
          />
          <div className="row">
            <Select
              formGroupClassName="col-md-6"
              label="State"
              name="state"
              isMulti
              placeholder="Select State"
              options={options}
              tooltipText="A valid email address, needed for login"
            />
            <Select
              formGroupClassName="col-md-6"
              label="Hand Over Date"
              name="handOverDate"
              placeholder="Select Hand Over Date"
              options={generateNumOptions(61, 'Month', {
                startFrom: 0,
                firstOptionText: 'Immediately',
              })}
              tooltipText="Hand over date in months. For example, selecting 7 Months will display
                      Seven (7) Months from date of initial deposit payment. (i.e. 6
                        months payment period plus 1 month to finish and inspect)"
            />
          </div>

          <div className="row">
            <div className="col-12">
              <RadioSelect
                label="Testing 123"
                name="sex"
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                ]}
                tooltipText="Testing Radio"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <CheckboxGroup
                inline
                label="Preference"
                name="pref"
                options={[
                  { label: 'Receive Newsletter' },
                  { value: 'Love Newsletter' },
                ]}
                // options can contain either value or label
              />
            </div>
          </div>

          <div className="row">
            <Switch
              formGroupClassName="col-md-6"
              label="Switch"
              name="switch1"
            />

            <Switch
              formGroupClassName="col-md-6"
              label="This is the switch class, it is awesome"
              name="switch2"
              optional
            />
          </div>

          <div className="row">
            <DatePicker
              formGroupClassName="col-md-6"
              label="Event Date"
              name="eventDate"
              placeholder="Event Date"
            />
            <DatePicker
              label="Event Time"
              formGroupClassName="col-md-6"
              dateFormat="h:mm aa"
              name="event-time"
              showTimeSelect
              showTimeSelectOnly
              timeCaption="Start Time"
              timeIntervals={30}
            />
          </div>

          <Textarea
            label="Message"
            name="message"
            placeholder="Your Message..."
            tooltipText={<p className="text-danger">Enter your content</p>}
          />

          <Button
            className="btn-danger"
            loading={isSubmitting}
            onClick={handleSubmit}
            showLoadingText={false}
          >
            Register
          </Button>

          <Button
            className="mx-4"
            onClick={() => toast.info('This is an error')}
          >
            Show Error Toast
          </Button>
          <Button onClick={() => toast.success('It is a success')}>
            Show Success
          </Button>
          <DisplayFormikState {...props} showAll />
        </Form>
      )}
      validationSchema={createSchema(registerSchema)}
    />
  );
};
