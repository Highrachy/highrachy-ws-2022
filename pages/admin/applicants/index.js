import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import Button from '@/components/forms/Button';
import { APPLICANT_STAGE_INFO } from '@/utils/constants';
import { filterApplicants } from '@/utils/filters';

const Applicants = () => (
  <Backend>
    <PaginatedContent
      endpoint={'api/applicants'}
      pageName="Applicant"
      DataComponent={ApplicantsRowList}
      PageIcon={adminMenu['Applicants']}
      populate="*"
      sort="createdAt:desc"
      filterFields={filterApplicants}
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
                <th>Status</th>
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

export const ApplicantsSingleRow = ({
  number,
  id,
  fullName,
  email,
  job,
  phoneNumber,
  resume,
  status,
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td className="td-block">
        {fullName}
        <span>{email}</span>
      </td>
      <td>{phoneNumber}</td>
      <td>
        {job?.data?.attributes?.title}
        <span
          className={`badge badge-icon d-flex align-items-center ps-0 bg-${APPLICANT_STAGE_INFO[status].color}`}
        >
          {APPLICANT_STAGE_INFO[status].icon} &nbsp; {status}
        </span>
      </td>
      <td></td>
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
          color="secondary"
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
