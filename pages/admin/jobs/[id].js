import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Button from '@/components/forms/Button';
import ReactMarkdown from 'react-markdown';
import { SectionHeader } from '@/components/common/Section';
import { JobInfo } from 'pages/careers';
import { ApplicantsSingleRow } from '../applicants';
import { GoPrimitiveDot } from 'react-icons/go';
import classNames from 'classnames';
import ProcessButton from '@/components/utils/ProcessButton';
import { Tab } from 'react-bootstrap';
import { APPLICANT_STAGE } from '@/utils/constants';

const pageOptions = {
  key: 'job',
  pageName: 'Job',
};

const STAGE = {
  NEW_APPLICANTS: 'New Applicants',
  REVIEWED_APPLICANTS: 'Reviewed Applicants',
  REJECTED_APPLICANTS: 'Rejected Applicants',
};

const allJobTabs = [
  {
    key: 'Job Details',
    title: 'Job Details',
    fields: [],
  },
  {
    key: STAGE.NEW_APPLICANTS,
    title: STAGE.NEW_APPLICANTS,
    fields: [],
  },
  {
    key: STAGE.REVIEWED_APPLICANTS,
    title: STAGE.REVIEWED_APPLICANTS,
    fields: [],
  },
  {
    key: STAGE.REJECTED_APPLICANTS,
    title: STAGE.REJECTED_APPLICANTS,
    fields: [],
  },
];

const SingleJob = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentTab, setCurrentTab] = React.useState(allJobTabs[0].key);

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/jobs/${id}`,
    axiosOptions: {
      params: {
        populate: '*',
      },
    },
  });

  const { applicants } = result?.attributes || {};
  // Initialize an empty object to store applicants for each stage
  const applicantsByStage = {};

  // Iterate over the data array and group applicants based on their stage
  applicants?.data.forEach((applicant) => {
    const { id, attributes } = applicant;
    const { status } = attributes;

    // Determine the stage based on the status
    const stage =
      status === APPLICANT_STAGE.REJECTED
        ? STAGE.REJECTED_APPLICANTS
        : status === APPLICANT_STAGE.APPLIED
        ? STAGE.NEW_APPLICANTS
        : STAGE.REVIEWED_APPLICANTS;

    // Initialize the array for the stage if it doesn't exist
    if (!applicantsByStage[stage]) {
      applicantsByStage[stage] = [];
    }

    // Add applicant to the array for the corresponding stage
    applicantsByStage[stage].push({ id, attributes });
  });

  return (
    <Backend title="Single Job">
      <ContentLoader
        Icon={adminMenu['Jobs']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <JobHeader
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          {...result?.attributes}
          id={id}
          query={query}
          applicantsByStage={applicantsByStage}
        />
        <Tab.Container
          activeKey={currentTab}
          id="single-job-profile"
          className="mb-3"
        >
          <Tab.Content>
            {allJobTabs.map(({ key, title, fields }) => (
              <Tab.Pane eventKey={key} key={key}>
                <TabInformation
                  id={id}
                  title={title}
                  job={{ id, ...result?.attributes }}
                  data={fields}
                  setCurrentTab={setCurrentTab}
                  stage={key}
                  applicantsByStage={applicantsByStage}
                />
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </ContentLoader>
    </Backend>
  );
};

const JobHeader = ({
  applicantsByStage,
  currentTab,
  setCurrentTab,
  available,
  id,
  slug,
  title,
  location,
  remote,
  contract,
  query,
}) => {
  const currentState = available ? 'Close' : 'Open';
  const currentStateButton = available ? 'primary' : 'success';

  return (
    <section className="card mb-5">
      <div className="card-body p-5 pb-0">
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
              <div className="d-flex flex-column">
                <h4 className="d-flex align-items-center mb-2">{title}</h4>
                <div className="d-flex text-muted flex-wrap align-items-center fs-6 mb-2 pe-2">
                  <JobInfo
                    location={location}
                    remote={remote}
                    contract={contract}
                  />
                </div>
                <div className="d-flex text-muted flex-wrap align-items-center fs-6 mb-3 pe-2">
                  <span
                    className={`d-flex align-items-center fw-bold text-${
                      available ? 'success' : 'danger'
                    }`}
                  >
                    <GoPrimitiveDot />{' '}
                    {available ? 'Live on Website' : 'Currently Closed'}
                  </span>
                </div>
                <div className="d-flex flex-wrap fs-6 mb-2">
                  <Button
                    color="none"
                    className="btn-xs btn-outline-dark"
                    href={{
                      pathname: '/careers/[slug]',
                      query: { slug },
                    }}
                  >
                    View on Website
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    color="none"
                    className="btn-xs btn-outline-primary"
                    href={{
                      pathname: '/admin/jobs/new',
                      query: { id, action: 'edit' },
                    }}
                  >
                    Edit Job
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    color="dark"
                    className="btn-xs"
                    href={{
                      pathname: '/admin/jobs/new',
                      query: { id, action: 'duplicate' },
                    }}
                  >
                    Duplicate Job
                  </Button>
                </div>
              </div>
              {/* Action */}
              <div className="d-flex my-2">
                <ProcessButton
                  afterSuccess={() => query.mutate()}
                  api={`jobs/${id}`}
                  buttonColor={currentStateButton}
                  buttonSizeClassName="btn-sm"
                  data={{ available: !available }}
                  modalContent={`Are you sure you want to ${currentState} this job`}
                  modalTitle={`Mark as ${currentState}`}
                  successMessage={`The applicant has been successfully updated to  ${currentState}`}
                >
                  {currentState} Job
                </ProcessButton>
              </div>
            </div>
          </div>
        </div>

        <ul className="nav fs-5 pt-5 fw-bolder">
          {allJobTabs.map(({ key }) => {
            const isJobDetails = key === 'Job Details';
            return (
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
                  {!isJobDetails && (
                    <span>
                      {' '}
                      (
                      {applicantsByStage[key]
                        ? applicantsByStage[key].length
                        : '0'}
                      )
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

const JobDetail = ({
  minimumRequirements,
  softwareProficiency,
  desiredSkills,
  note,
}) => {
  return (
    <div className="container-fluid">
      <section className="mt-5">
        <RichTextSection title="Job Summary" text={minimumRequirements} />
        <RichTextSection title="Qualifications" text={desiredSkills} />
        <RichTextSection
          title="Skills and Competencies"
          text={softwareProficiency}
        />
        <RichTextSection title="Note" text={note} />
      </section>
    </div>
  );
};

export default SingleJob;

export const RichTextSection = ({ title, text }) => (
  <PaddedSection title={title}>
    <ReactMarkdown>{text}</ReactMarkdown>
  </PaddedSection>
);

const PaddedSection = ({ children, title }) => (
  <section className="pb-5">
    <div className="row">
      <div className="col-sm-12">
        {title && <SectionHeader small>{title}</SectionHeader>}
        {children}
      </div>
    </div>
  </section>
);

const TabInformation = ({ applicantsByStage, job, title, stage }) => {
  const isJobDetails = title === 'Job Details';
  const currentApplicants = applicantsByStage?.[stage];
  return (
    <section>
      <div className="card">
        <div className="table-responsive">
          <table className="table table-border">
            <thead>
              <tr>
                <th colSpan="8">
                  <h5 className="my-3">{title}</h5>
                </th>
              </tr>
            </thead>
            {isJobDetails ? (
              <JobDetail {...job} />
            ) : (
              <tbody>
                {!currentApplicants || currentApplicants === 0 ? (
                  <td colSpan="5">
                    <h5 className="text-muted text-center py-6">
                      You have no {stage}
                    </h5>
                  </td>
                ) : (
                  currentApplicants.map(({ id, attributes }, index) => (
                    <ApplicantsSingleRow
                      key={index}
                      number={index + 1}
                      id={id}
                      {...attributes}
                      attachment={true}
                    />
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </section>
  );
};
