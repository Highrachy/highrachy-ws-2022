import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Button from '@/components/forms/Button';
import ReactMarkdown from 'react-markdown';
import { SectionHeader } from '@/components/common/Section';
import { ApplicantInfo } from 'pages/careers';
import { ApplicantsRowList, getStatus } from '../applicants';
import Modal from '@/components/ui/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import { RichTextSection } from '../jobs/[id]';
import ProcessButton from '@/components/utils/ProcessButton';

const pageOptions = {
  key: 'applicant',
  pageName: 'Applicant',
};

const SingleApplicant = () => {
  const router = useRouter();
  const { id } = router.query;

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
        <ApplicantDetail {...result?.attributes} id={id} query={query} />
      </ContentLoader>
    </Backend>
  );
};

const ApplicantDetail = ({
  id,
  fullName,
  // email,
  // phoneNumber,
  // resume,
  reviewed,
  rejected,
  query,
  notes,
}) => {
  const status = getStatus({ reviewed, rejected });
  const currentState = !reviewed ? 'reviewed' : 'rejected';
  return (
    <div className="container-fluid">
      <section className="pb-4 border-bottom">
        <h3 className="text-gray">
          {fullName} &nbsp;
          <span className={`badge rounded-pill bg-${status.color}`}>
            {status.text}
          </span>
        </h3>

        <section className="mt-3">
          {!rejected && (
            <ProcessButton
              afterSuccess={() => query.mutate()}
              api={`applicants/${id}`}
              buttonColor={status.color}
              data={{ [currentState]: true }}
              modalContent={`Are you sure you want to mark this applicant as ${currentState}`}
              modalTitle={`Mark as ${currentState}`}
              successMessage={`The applicant has been successfully ${currentState}`}
            >
              Mark as {currentState}
            </ProcessButton>
          )}
          <Button
            color="none"
            className="btn-xs btn-outline-primary"
            href={{
              pathname: '/admin/applicants/new',
              query: { id, action: 'edit' },
            }}
          >
            Add Notes
          </Button>
          &nbsp;&nbsp;&nbsp;
          {/* <ProcessApplicant id={id} available={available} query={query} /> */}
        </section>
      </section>

      {/* <section className="py-6 border-bottom">
      <h3>Total applicants: {applicants.data.length}</h3>
      {applicants.data.length > 0 && (
        <ApplicantsRowList results={applicants.data} query={query} offset={0} />
      )}
    </section> */}

      {notes && (
        <section className="mt-5">
          <RichTextSection title="Notes" text={notes} />
        </section>
      )}
    </div>
  );
};

export default SingleApplicant;
