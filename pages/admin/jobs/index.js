import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import Button from '@/components/forms/Button';
import Link from 'next/link';

const Jobs = () => {
  return (
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
};

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
                <th>Status</th>
                <th className="text-center">Applicants</th>
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

const JobsSingleRow = ({ number, applicants, slug, title, id, available }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>
        <Link
          href={{
            pathname: '/careers/[slug]',
            query: { slug },
          }}
          passHref
        >
          <a className="text-reset text-decoration-none">{title}</a>
        </Link>
      </td>
      <td>
        <span className={`badge bg-${available ? 'success' : 'dark'}`}>
          {available ? 'Open' : 'Closed'}
        </span>
      </td>
      <td className="text-center">
        <strong>{applicants.data.length}</strong>
      </td>
      <td>
        <Button
          color="none"
          className="btn-xs btn-outline-dark"
          href={{
            pathname: '/careers/[slug]',
            query: { slug },
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
