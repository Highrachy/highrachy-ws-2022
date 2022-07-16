import React from 'react';
import Backend from '@/components/admin/Backend';
import axios from 'axios';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Input from '@/components/forms/Input';
import FormikButton from '@/components/forms/FormikButton';
import { teamSchema } from '@/components/forms/schemas/admin-schema';
import Upload from '@/components/forms/Upload';
import { getTokenFromStore } from '@/utils/localStorage';
import {
  generateNumOptions,
  getError,
  statusIsSuccessful,
} from '@/utils/helpers';
import { toast } from 'react-toastify';
import Router, { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Humanize from 'humanize-plus';
import Select from '@/components/forms/Select';

const pageOptions = {
  key: 'team',
};

const New = () => {
  const router = useRouter();
  const { id, action } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/teams/${id}`,
  });

  return (
    <Backend>
      <ProcessTeamForm team={result} action={action} id={id} />
    </Backend>
  );
};

const ProcessTeamForm = ({ action, id, team }) => {
  const testInitialValues = {
    fullName: '',
    position: '',
    image: '',
  };
  const currentAction = action ? Humanize.capitalize(action) : 'New';
  const initialValues = team ? team.attributes : { ...testInitialValues };
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
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/teams/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/api/teams`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            Router.push('/admin/team');
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
    <Section title={`${currentAction} Team`} noPaddingTop>
      <TeamForm
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        isEdit={isEdit}
      />
    </Section>
  );
};

const TeamForm = ({ handleSubmit, initialValues, isEdit }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-11 col-lg-10 col-xl-9">
          <FormikForm
            schema={teamSchema}
            handleSubmit={handleSubmit}
            initialValues={initialValues}
            name={`new-team-form`}
            showFormikState
            showAllFormikState
          >
            <Input label="Full Name" name="fullName" />

            <div className="row">
              <Input
                label="Position"
                name="position"
                formGroupClassName="col-md-6"
              />

              <Select
                label="Priority"
                name="priority"
                options={generateNumOptions(20, '', {
                  startFrom: 1,
                  firstOptionText: 'Select Priority',
                  pluralizeText: false,
                })}
                formGroupClassName="col-md-6"
              />
            </div>

            <Upload
              changeText="Update Picture"
              defaultImage="/assets/img/placeholder/image.png"
              imgOptions={{
                className: 'mb-3 icon-md',
                width: 200,
                height: 300,
              }}
              name="image"
              uploadText={`Upload Picture`}
              folder={`team/picture`}
            />

            <FormikButton color="primary">
              {isEdit ? 'Edit' : 'Save'} Team
            </FormikButton>
          </FormikForm>
        </div>
      </div>
    </div>
  );
};

export default New;
