import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { FiYoutube } from 'react-icons/fi';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';

const Dashboard = () => (
  <Backend>
    <PaginatedContent
      addNewUrl="/admin/dashboard/new"
      endpoint="api/applicants"
      pageName="Badge"
      pluralPageName="Dashboard"
      DataComponent={DashboardRowList}
      PageIcon={<FiYoutube />}
    />
  </Backend>
);

const DashboardRowList = ({ results, offset }) => {
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
                <DashboardRow
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

const DashboardRow = ({ number, title }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{title}</td>
    </tr>
  );
};

export default Dashboard;