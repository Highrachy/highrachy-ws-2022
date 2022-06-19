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
import { ApplicantsRowList } from '../applicants';
import Modal from '@/components/ui/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful } from '@/utils/helpers';

const pageOptions = {
  key: 'job',
  pageName: 'Job',
};

const SingleJob = () => {
  const router = useRouter();
  const { id } = router.query;

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
    <Backend>
      <ContentLoader
        Icon={adminMenu['Jobs']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <JobDetail {...result?.attributes} id={id} query={query} />
      </ContentLoader>
    </Backend>
  );
};

const JobDetail = ({
  applicants,
  available,
  id,
  slug,
  title,
  location,
  remote,
  contract,
  minimumRequirements,
  softwareProficiency,
  desiredSkills,
  query,
}) => (
  <div className="container-fluid">
    <section className="pb-4 border-bottom">
      <h3 className="text-gray">
        {title} &nbsp;
        <span
          className={`badge rounded-pill bg-${available ? 'success' : 'dark'}`}
        >
          {available ? 'Open' : 'Closed'}
        </span>
      </h3>
      <JobInfo location={location} remote={remote} contract={contract} />

      <section className="mt-3">
        <Button
          color="none"
          className="btn-xs btn-outline-dark"
          href={{
            pathname: '/careers/[job]',
            query: { job: slug },
          }}
        >
          View on Website
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          color="none"
          className="btn-xs btn-outline-primary"
          href={{
            pathname: '/admin/jobs/[id]',
            query: { id },
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
        &nbsp;&nbsp;&nbsp;
        <ProcessJob id={id} available={available} query={query} />
      </section>
    </section>

    <section className="py-6 border-bottom">
      <h3>Total applicants: {applicants.data.length}</h3>
      {applicants.data.length > 0 && (
        <ApplicantsRowList results={applicants.data} offset={0} />
      )}
    </section>

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
    </section>
  </div>
);

export default SingleJob;

export const ProcessJob = ({ available, id, query }) => {
  const [loading, setLoading] = React.useState(false);
  const [showApprovalModal, setShowApprovalModal] = React.useState(false);
  const currentData = query?.data?.data;

  const processJob = () => {
    setLoading(true);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`,
        { data: { available: !available } },
        {
          headers: { Authorization: getTokenFromStore() },
        }
      )
      .then(function (response) {
        const { status, data } = response;
        console.log('data', data);
        if (statusIsSuccessful(status)) {
          toast.success('The job has been successfully closed');
          setLoading(false);
          setShowApprovalModal(false);
          query.mutate({ ...currentData, available: !available });
        }
      })
      .catch(function (error) {
        toast.error(getError(error));
        setLoading(false);
      });
  };

  const currentState = available ? 'Close' : 'Open';
  const currentStateButton = available ? 'primary' : 'success';

  return (
    <>
      <Button
        color={currentStateButton}
        className="btn-xs"
        onClick={() => setShowApprovalModal(true)}
      >
        {currentState} Job
      </Button>

      {/* Close Job  Modals */}
      <Modal
        title={`${currentState} Job`}
        show={showApprovalModal}
        onHide={() => setShowApprovalModal(false)}
        showFooter={false}
      >
        <section className="row">
          <div className="col-md-12 my-3 text-center">
            <h5 className="my-2 confirmation-text">
              Are you sure you want to {currentState} this job?
            </h5>
            <Button
              color={currentStateButton}
              onClick={processJob}
              loading={loading}
            >
              {currentState} Job
            </Button>
          </div>
        </section>
      </Modal>
    </>
  );
};
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
