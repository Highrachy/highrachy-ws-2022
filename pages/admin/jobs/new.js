import React from 'react';
import Backend from '@/components/admin/Backend';
import axios from 'axios';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import FormikButton from '@/components/forms/FormikButton';
import { newJobSchema } from '@/components/forms/schemas/admin-schema';
import MdEditor from '@/components/forms/MdEditor';
import Switch from '@/components/forms/Switch';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import { toast } from 'react-toastify';

const New = () => (
  <Backend>
    <NewJobForm />
  </Backend>
);

const NewJobForm = ({ job }) => {
  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      remote: !!values.remote,
      contract: !!values.contract,
      available: !!values.available,
    };

    try {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
          { data: payload },
          {
            headers: {
              Authorization: getTokenFromStore(),
            },
          }
        )
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            toast.success('Information sent successfully');
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
        });

      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <Section title="Add a New Job" noPaddingTop>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-11 col-lg-10 col-xl-9">
            <FormikForm
              schema={newJobSchema}
              handleSubmit={handleSubmit}
              initialValues={{
                title: 'Testing 123',
                location: 'Lagos',
                remote: true,
                contract: false,
                desiredSkills: '- desired Skills test \n-testing 2',
                minimumRequirements: '- testing minimum requirements',
                softwareProficiency: '- Software Skills test \n-testing 2',
              }}
              name={`new-job-form`}
              showFormikState
              showAllFormikState
            >
              <Input floatingLabel label="Job Title" name="title" />

              <div className="row">
                <Switch
                  formGroupClassName="col-md-6"
                  label="Remote Work"
                  name="remote"
                  optional
                />

                <Switch
                  formGroupClassName="col-md-6"
                  label="Contract Job"
                  name="contract"
                  optional
                />
              </div>

              <Input floatingLabel label="Location" name="location" />

              <MdEditor
                label="Minimum Requirements"
                name="minimumRequirements"
              />
              <MdEditor label="Desired Skills" name="desiredSkills" />
              <MdEditor
                label="Software Proficiency"
                name="softwareProficiency"
              />
              <MdEditor label="Note" name="note" optional height="10rem" />

              <Switch
                formGroupClassName="col-md-6"
                label="Show Job on Website"
                name="available"
                optional
              />

              <FormikButton color="primary">Save Job</FormikButton>
            </FormikForm>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default New;
