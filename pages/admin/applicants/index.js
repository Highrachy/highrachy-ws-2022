import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import Button from '@/components/forms/Button';
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri';
import { GrStatusCriticalSmall } from 'react-icons/gr';

const Applicants = () => (
  <Backend>
    <PaginatedContent
      endpoint={'api/applicants'}
      pageName="Applicant"
      DataComponent={ApplicantsRowList}
      PageIcon={adminMenu['Applicants']}
      sort="createdAt:desc"
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
                <th className="text-center">Status</th>
                <th></th>
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

export const getStatus = ({ reviewed, rejected }) => {
  let status = '';
  if (reviewed && !rejected) status = 'active';
  else if (reviewed && rejected) status = 'rejected';
  else status = 'review';

  const statusList = {
    [applicantStatus.IS_ACTIVE]: {
      text: 'Still Active',
      color: 'success',
      icon: <RiCheckboxCircleFill />,
    },
    [applicantStatus.AWAITING_REVIEW]: {
      text: 'Awaiting Review',
      color: 'info',
      icon: <GrStatusCriticalSmall />,
    },
    [applicantStatus.REJECTED]: {
      text: 'Rejected',
      color: 'danger',
      icon: <RiCloseCircleFill />,
    },
  };
  return statusList[status];
};

export const ApplicantsSingleRow = ({
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
      <td className="td-block">
        {fullName}
        <span>{email}</span>
      </td>
      <td>{phoneNumber}</td>
      <td className="text-center">
        <span className={`badge  badge-dot bg-${status.color}`}>
          {status.text}
        </span>
      </td>
      <td></td>
      <td>
        <Button color="none" className="btn-xs btn-outline-dark" href={resume}>
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
  );
};

export default Applicants;
