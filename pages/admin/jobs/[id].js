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

const pageOptions = {
  key: 'job',
  pageName: 'Job',
};

const allJobTabs = [
  {
    key: 'Applicants',
    title: 'Applicants',
    fields: [],
  },
  {
    key: 'Job Details',
    title: 'Job Details',
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
          {allJobTabs.map(({ key }) => (
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

const JobDetail = ({
  minimumRequirements,
  softwareProficiency,
  desiredSkills,
  note,
}) => {
  return (
    <div className="container-fluid">
      <section className="mt-5">
        <RichTextSection
          title="Minimum Requirements"
          text={minimumRequirements}
        />
        <RichTextSection title="Desired Skills" text={desiredSkills} />
        <RichTextSection
          title="Software Proficiency"
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

const TabInformation = ({ job, title }) => {
  const { applicants } = job;
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
            {title === allJobTabs[0].title ? (
              <tbody>
                {!applicants?.data || applicants?.data === 0 ? (
                  <td colSpan="5">
                    <h5 className="text-muted text-center py-6">
                      No Applications Yet
                    </h5>
                  </td>
                ) : (
                  applicants?.data.map(({ id, attributes }, index) => (
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
            ) : (
              <JobDetail {...job} />
            )}
          </table>
        </div>
      </div>
    </section>
  );
};
