import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { Router, useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Button from '@/components/forms/Button';
import {
  camelToSentence,
  getError,
  processData,
  statusIsSuccessful,
  valuesToOptions,
} from '@/utils/helpers';
import ProcessButton from '@/components/utils/ProcessButton';
import { GoBriefcase, GoPrimitiveDot } from 'react-icons/go';
import { Tab } from 'react-bootstrap';
import classNames from 'classnames';
import Link from 'next/link';
import { getShortDate } from '@/utils/date-helpers';
import { APPLICANT_STAGE, APPLICANT_STAGE_INFO } from '@/utils/constants';
import FormikModalButton from '@/components/utils/FormikModalButton';
import Input from '@/components/forms/Input';
import FormikButton from '@/components/forms/FormikButton';
import Textarea from '@/components/forms/Textarea';
import Switch from '@/components/forms/Switch';
import DatePicker from '@/components/forms/DatePicker';
import Select from '@/components/forms/Select';
import { useFormikContext } from 'formik';
import { interviewSchema } from '@/components/forms/schemas/admin-schema';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getTokenFromStore } from '@/utils/localStorage';

const pageOptions = {
  key: 'applicant',
  pageName: 'Applicant',
};

const allApplicantTabs = [
  {
    key: 'Overview',
    title: 'Overview',
    fields: ['fullName', 'email', 'phoneNumber', 'resume', 'status'],
  },
  {
    key: 'Other Applications',
    title: 'Other Applications',
    fields: [],
  },
];

const getApplicantNextStage = (status) => {
  switch (status) {
    case APPLICANT_STAGE.APPLIED:
      return APPLICANT_STAGE.REVIEWED;
    case APPLICANT_STAGE.REVIEWED:
      return APPLICANT_STAGE.INTERVIEW_STAGE;
    case APPLICANT_STAGE.INTERVIEW_STAGE:
      return APPLICANT_STAGE.OFFER_STAGE;
    case APPLICANT_STAGE.OFFER_STAGE:
      return APPLICANT_STAGE.ACCEPTED;
    default:
      return null;
  }
  return null;
};

const SingleApplicant = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentTab, setCurrentTab] = React.useState(allApplicantTabs[0].key);

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/applicants/${id}`,
    axiosOptions: {
      params: {
        populate: '*',
      },
    },
    showResult: true,
  });

  return (
    <Backend>
      <ContentLoader
        Icon={adminMenu['Applicants']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <ApplicantHeader
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          {...result?.attributes}
          prevJobs={result?.previousApplications}
          id={id}
          query={query}
        />
        <Tab.Container
          activeKey={currentTab}
          id="single-applicant-profile"
          className="mb-3"
        >
          <Tab.Content>
            {allApplicantTabs.map(({ key, title, fields }) => (
              <Tab.Pane eventKey={key} key={key}>
                <TabInformation
                  id={id}
                  title={title}
                  applicant={{ id, ...result?.attributes }}
                  data={fields}
                  setCurrentTab={setCurrentTab}
                  prevJobs={result?.previousApplications}
                />
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </ContentLoader>
    </Backend>
  );
};

const ApplicantHeader = ({
  currentTab,
  setCurrentTab,
  id,
  fullName,
  resume,
  job,
  status,
  prevJobs,
  query,
}) => {
  const router = useRouter();
  const hasPrevApplication = prevJobs?.length > 0;
  const nextStage = getApplicantNextStage(status);

  const handleSubmitInterview = (values, actions) => {
    const interviewDate = values.date.date;
    const isOnline = !!values.isOnline;

    const payload = { id, ...values, date: interviewDate, isOnline };

    try {
      axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/send-interview-email`,
        data: { data: payload },
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            router.push('/admin/applicants');
            toast.success('Interview details has been sent successfully');
            actions.resetForm({ values: {} });
            actions.setSubmitting(false);
          }
        })
        .catch(function (error) {
          toast.error(getError(error));
          actions.setSubmitting(false);
        });
    } catch (error) {
      toast.error(getError(error));
      actions.setSubmitting(false);
    }
  };

  const initialValues = {
    interviewContent:
      'We were impressed by your background and would like to invite you to an interview to tell you a little more about the position and get to know you better.',
  };

  return (
    <section className="card mb-5">
      <div className="card-body p-5 pb-0">
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
              <div className="d-flex flex-column">
                <h4 className="d-flex align-items-center mb-2">{fullName}</h4>
                <div className="d-flex flex-wrap align-items-center fs-6 mb-2 pe-2">
                  <Link href={`/admin/jobs/${job?.data?.id}`} passHref>
                    <a className="fw-bold text-reset d-flex align-items-center ">
                      <GoBriefcase /> &nbsp; {job.data.attributes.title}
                    </a>
                  </Link>
                </div>
                <div
                  className={`d-flex align-items-center text-${APPLICANT_STAGE_INFO[status].color} flex-wrap align-items-center fs-6 mb-2 pe-2`}
                >
                  {APPLICANT_STAGE_INFO[status].icon} &nbsp; {status}
                </div>
                {hasPrevApplication && (
                  <div className="d-flex flex-wrap align-items-center fs-6 mb-3 pe-2">
                    <span
                      className={`d-flex align-items-center fw-bold text-danger`}
                    >
                      <GoPrimitiveDot /> Has {prevJobs.length} Other Application
                    </span>
                  </div>
                )}

                <div className="d-flex flex-wrap fs-6 mb-2">
                  <Button
                    color="none"
                    className="btn-xs btn-outline-dark"
                    href={resume}
                    newTab
                  >
                    View Resume
                  </Button>
                  &nbsp;&nbsp;
                  <>
                    {status === APPLICANT_STAGE.INTERVIEW_STAGE && (
                      <FormikModalButton
                        color="info"
                        className="btn-xs"
                        name="send-interview-email"
                        schema={interviewSchema}
                        initialValues={initialValues}
                        modalContent={<InterviewForm />}
                        handleSubmit={handleSubmitInterview}
                      >
                        Send Interview Email
                      </FormikModalButton>
                    )}
                  </>
                </div>
              </div>
              {/* Action */}
              <div className="d-flex my-2">
                {status !== APPLICANT_STAGE.REJECTED &&
                  status !== APPLICANT_STAGE.ACCEPTED && (
                    <>
                      <ProcessButton
                        afterSuccess={() => query.mutate()}
                        api={`applicants/${id}`}
                        buttonClassName="me-3"
                        buttonSizeClassName="btn-sm"
                        data={{ status: APPLICANT_STAGE.REJECTED }}
                        modalContent={`Are you sure you want to reject this application`}
                        modalTitle={`Reject Application`}
                        successMessage={`This application has been successfully rejected`}
                      >
                        Reject Application
                      </ProcessButton>
                      <ProcessButton
                        afterSuccess={() => query.mutate()}
                        api={`applicants/${id}`}
                        buttonColor={APPLICANT_STAGE_INFO[nextStage].color}
                        data={{ status: nextStage }}
                        modalContent={`Are you sure you want to proceed this application to ${nextStage}`}
                        modalTitle={`Process to ${nextStage}`}
                        successMessage={`The applicant has been successfully updated to ${nextStage}`}
                      >
                        Proceed to {nextStage}
                      </ProcessButton>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>

        <ul className="nav fs-5 pt-5 fw-bolder">
          {allApplicantTabs.map(({ key }) => (
            <li
              key={key}
              className="nav-item"
              onClick={() => setCurrentTab(key)}
            >
              <span
                className={classNames('nav-link', {
                  active: currentTab === key,
                })}
              >
                {key}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const TabInformation = ({ applicant, title, data, prevJobs }) => {
  return (
    <section>
      <div className="card">
        <div className="table-responsive">
          <table className="table table-border">
            <thead>
              <tr>
                <th colSpan="5">
                  <h5 className="my-3">{title}</h5>
                </th>
              </tr>
            </thead>
            {!data || data.length === 0 ? (
              <>
                <tbody>
                  {prevJobs.length === 0 ? (
                    <tr>
                      <td colSpan="5">
                        <h5 className="text-muted text-center py-6">
                          No Other Applications
                        </h5>
                      </td>
                    </tr>
                  ) : (
                    prevJobs?.map(
                      ({ id, createdAt, status, resume, job }, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <Link href={`/admin/jobs/${job.id}`} passHref>
                              <a className="fw-bold text-reset d-flex align-items-center ">
                                {job.title}
                              </a>
                            </Link>
                          </td>
                          <td>on {getShortDate(createdAt)}</td>
                          <td className="text-center">
                            <span
                              className={`badge badge-icon d-flex align-items-center bg-${APPLICANT_STAGE_INFO[status].color}`}
                            >
                              {APPLICANT_STAGE_INFO[status].icon} &nbsp;{' '}
                              {status}
                            </span>
                          </td>
                          <td>
                            <Button
                              color="none"
                              className="btn-xs btn-outline-dark"
                              href={resume}
                              newTab
                            >
                              View Resume
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                              color="primary"
                              className="btn-xs"
                              href={{
                                pathname: '/admin/applicants/[id]',
                                query: { id },
                              }}
                            >
                              Manage Applicant
                            </Button>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </>
            ) : (
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <th width="250">{camelToSentence(item)}</th>
                    <td>{processData(applicant[item])}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </section>
  );
};

const InterviewForm = () => {
  const { values } = useFormikContext();

  const isOnline = !!values?.['isOnline'];
  return (
    <>
      <div className="row">
        <DatePicker
          label="Date of the Interview"
          name="date"
          placeholder="YYYY-MM-DD"
          helpText="Format: YYYY-MM-DD"
          formGroupClassName="col-sm-6"
        />
        <Select
          name="time"
          label="Time of Interview"
          options={valuesToOptions(
            [
              '8:00 AM',
              '9:00 AM',
              '10:00 AM',
              '11:00 AM',
              '12:00 PM',
              '1:00 PM',
              '2:00 PM',
              '3:00 PM',
              '4:00 PM',
              '5:00 PM',
            ],
            'Select One...'
          )}
          formGroupClassName="col-sm-6"
        />
      </div>

      <Switch
        formGroupClassName="col-md-6"
        label="Online Interview?"
        name="isOnline"
        optional
      />

      {isOnline ? (
        <Input label="Meeting Link" name="meetingLink" />
      ) : (
        <Textarea label="Location" name="location" />
      )}
      <Textarea label="Interview Content" name="interviewContent" rows={6} />

      <FormikButton color="info" className="mt-5">
        Send Interview Email
      </FormikButton>
    </>
  );
};

export default SingleApplicant;
