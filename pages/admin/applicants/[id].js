import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Button from '@/components/forms/Button';
import { getStatus } from '../applicants';
import { camelToSentence, processData } from '@/utils/helpers';
import ProcessButton from '@/components/utils/ProcessButton';
import { GoBriefcase, GoPrimitiveDot } from 'react-icons/go';
import { Tab } from 'react-bootstrap';
import classNames from 'classnames';
import Link from 'next/link';
import { getShortDate } from '@/utils/date-helpers';

const pageOptions = {
  key: 'applicant',
  pageName: 'Applicant',
};

const allApplicantTabs = [
  {
    key: 'Overview',
    title: 'Overview',
    fields: ['fullName', 'email', 'phoneNumber', 'resume', 'reviewed'],
  },
  {
    key: 'Other Applications',
    title: 'Other Applications',
    fields: [],
  },
];

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
  reviewed,
  rejected,
  prevJobs,
  query,
}) => {
  const status = getStatus({ reviewed, rejected });
  const currentState = !reviewed ? 'reviewed' : 'rejected';
  const hasPrevApplication = prevJobs?.length > 0;

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
                  className={`d-flex align-items-center text-${status.color} flex-wrap align-items-center fs-6 mb-2 pe-2`}
                >
                  {status.icon} &nbsp; {status.text}
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
                  >
                    View Resume
                  </Button>
                </div>
              </div>
              {/* Action */}
              <div className="d-flex my-2">
                {!rejected && (
                  <ProcessButton
                    afterSuccess={() => query.mutate()}
                    api={`applicants/${id}`}
                    buttonColor={!rejected ? 'danger' : 'info'}
                    data={{ [currentState]: true }}
                    modalContent={`Are you sure you want to mark this applicant as ${currentState}`}
                    modalTitle={`Mark as ${currentState}`}
                    successMessage={`The applicant has been successfully ${currentState}`}
                  >
                    Mark as {currentState}
                  </ProcessButton>
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
                    <td colSpan="5">
                      <h5 className="text-muted text-center py-6">
                        No Other Applications
                      </h5>
                    </td>
                  ) : (
                    prevJobs?.map(({ id, createdAt, resume, job }, index) => (
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
                        <td>
                          <Button
                            color="none"
                            className="btn-xs btn-outline-dark"
                            href={resume}
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
                    ))
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

export default SingleApplicant;
