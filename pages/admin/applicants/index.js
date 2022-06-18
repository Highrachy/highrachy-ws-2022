import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';

const Applicants = () => (
  <Backend>
    <PaginatedContent
      endpoint={'api/applicants'}
      pageName="Applicant"
      DataComponent={ApplicantsRowList}
      PageIcon={adminMenu['Applicants']}
      sort="createdAt:asc"
    />
  </Backend>
);

const ApplicantsRowList = ({ results, offset }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <ApplicantsSingleRow
                  key={index}
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

const ApplicantsSingleRow = ({ number, fullName, email, phoneNumber }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{fullName}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
    </tr>
  );
};

export default Applicants;
