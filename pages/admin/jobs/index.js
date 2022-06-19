import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import Link from 'next/link';
import Button from '@/components/forms/Button';

const Jobs = () => (
  <Backend>
    <PaginatedContent
      addNewUrl={'/admin/jobs/new'}
      endpoint={'api/jobs'}
      pageName="Job"
      DataComponent={JobsRowList}
      PageIcon={adminMenu['Jobs']}
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
                <th>Applicants</th>
                <th></th>
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

const JobsSingleRow = ({ number, applicants, slug, title, id }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{title}</td>
      <td>{applicants.data.length}</td>
      <td>
        <Button
          color="none"
          className="btn-xs btn-outline-dark"
          href={{
            pathname: '/careers/[job]',
            query: { job: slug },
          }}
        >
          Website
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          color="primary"
          className="btn-xs"
          href={{
            pathname: '/admin/jobs/[id]',
            query: { id },
          }}
        >
          Manage Job
        </Button>
      </td>
    </tr>
  );
};

export default Jobs;
