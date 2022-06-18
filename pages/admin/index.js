import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { FiYoutube } from 'react-icons/fi';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';

const Dashboard = () => (
  <Backend>
    <PaginatedContent
      addNewUrl="/admin/badges/new"
      endpoint="applicants"
      pageName="Badge"
      pluralPageName="Badges"
      DataComponent={BadgesRowList}
      PageIcon={<FiYoutube />}
    />
  </Backend>
);

const BadgesRowList = ({ results, offset }) => {
  console.log('resussss', results);
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
                <BadgesRow
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

const BadgesRow = ({ number, fullName }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{fullName}</td>
    </tr>
  );
};

export default Dashboard;
