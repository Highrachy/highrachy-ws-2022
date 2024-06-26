import React from 'react';
import Backend from '@/components/admin/Backend';
import axios from 'axios';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import FormikButton from '@/components/forms/FormikButton';
import { jobSchema } from '@/components/forms/schemas/admin-schema';
import MdEditor from '@/components/forms/MdEditor';
import Switch from '@/components/forms/Switch';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Humanize from 'humanize-plus';

const pageOptions = {
  key: 'job',
};

const New = () => {
  const router = useRouter();
  const { id, action } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/jobs/${id}`,
  });

  return (
    <Backend>
      <ProcessJobForm job={result} action={action} id={id} />
    </Backend>
  );
};

const ProcessJobForm = ({ action, id, job }) => {
  const testInitialValues = {
    title: '',
    location: 'Lagos',
    remote: true,
    contract: false,
    desiredSkills: '- Qualifications 1 test \n- Qualifications 2',
    minimumRequirements: '- Job Summary \n\n###Duties and Responsibilities',
    softwareProficiency: '- Google Docs \n-Google Sheets',
  };
  const currentAction = action ? Humanize.capitalize(action) : 'New';
  const initialValues = job ? job.attributes : { ...testInitialValues };
  const isEdit = currentAction === 'Edit';

  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      remote: !!values.remote,
      contract: !!values.contract,
      available: !!values.available,
    };

    try {
      axios({
        method: isEdit ? 'put' : 'post',
        url: isEdit
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            Router.push('/admin/jobs');
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
    <Section title={`${currentAction} Job`} noPaddingTop>
      <JobForm
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        isEdit={isEdit}
      />
    </Section>
  );
};

const JobForm = ({ handleSubmit, initialValues, isEdit }) => (
  <div className="container">
    <div className="row">
      <div className="col-12 col-sm-11 col-lg-10 col-xl-9">
        <FormikForm
          schema={jobSchema}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          name={`new-job-form`}
          showFormikState
          showAllFormikState
        >
          <Input label="Job Title" name="title" />

          <Input label="Location" name="location" />

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

          <MdEditor label="Job Summary" name="minimumRequirements" />
          <MdEditor label="Qualifications" name="desiredSkills" />
          <MdEditor
            label="Skills and Competencies"
            name="softwareProficiency"
          />
          <MdEditor label="Note" name="note" optional height="10rem" />

          <Switch
            formGroupClassName="col-md-6"
            label="Show Job on Website"
            name="available"
            optional
          />

          <FormikButton color="primary">
            {isEdit ? 'Edit' : 'Save'} Job
          </FormikButton>
        </FormikForm>
      </div>
    </div>
  </div>
);

export default New;
