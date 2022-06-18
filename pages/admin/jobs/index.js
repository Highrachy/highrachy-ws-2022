import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';

const Jobs = () => (
  <Backend>
    <PaginatedContent
      addNewUrl={'/admin/jobs/new'}
      endpoint={'api/jobs'}
      pageName="Job"
      DataComponent={JobsRowList}
      PageIcon={adminMenu['Jobs']}
      sort="title"
    />
  </Backend>
);

const JobsRowList = ({ results, offset }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <JobsSingleRow
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

const JobsSingleRow = ({ number, title }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{title}</td>
    </tr>
  );
};

export default Jobs;
