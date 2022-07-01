import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import Link from 'next/link';
import ProcessButton from '@/components/utils/ProcessButton';

const Applicants = () => (
  <Backend>
    <PaginatedContent
      endpoint={'api/applicants'}
      pageName="Applicant"
      DataComponent={ApplicantsRowList}
      PageIcon={adminMenu['Applicants']}
      sort="createdAt:asc"
      showLogs
    />
  </Backend>
);

export const ApplicantsRowList = ({ results, offset, query }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Resume</th>
                <th className="text-center">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <ApplicantsSingleRow
                  key={index}
                  query={query}
                  number={offset + index + 1}
                  id={id}
                  {...attributes}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const applicantStatus = {
  IS_ACTIVE: 'active',
  AWAITING_REVIEW: 'review',
  REJECTED: 'rejected',
};

const getStatus = ({ reviewed, rejected }) => {
  let status = '';
  if (reviewed && !rejected) status = 'active';
  else if (reviewed && rejected) status = 'rejected';
  else status = 'review';

  const statusList = {
    [applicantStatus.IS_ACTIVE]: {
      text: 'Still Active',
      color: 'danger',
    },
    [applicantStatus.AWAITING_REVIEW]: {
      text: 'Awaiting Review',
      color: 'secondary',
    },
    [applicantStatus.REJECTED]: {
      text: 'Rejected',
      color: 'info',
    },
  };
  return statusList[status];
};

const ApplicantsSingleRow = ({
  number,
  id,
  fullName,
  email,
  phoneNumber,
  resume,
  reviewed,
  rejected,
  query,
}) => {
  const status = getStatus({ reviewed, rejected });
  // either set reviewed to true or set rejected to true
  const currentState = !reviewed ? 'reviewed' : 'rejected';
  return (
    <tr>
      <td>{number}</td>
      <td className="text-block">
        {fullName}
        <span>{email}</span>
      </td>
      <td>{phoneNumber}</td>
      <td>
        <Link href={resume} passHref>
          <a className="text-danger">View CV</a>
        </Link>
      </td>
      <td className="text-center">
        <span className={`badge bg-${status.color}`}>{status.text}</span>
      </td>
      <td>
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
      </td>
    </tr>
  );
};

export default Applicants;
