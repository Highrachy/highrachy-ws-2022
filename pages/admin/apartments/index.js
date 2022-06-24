import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import Button from '@/components/forms/Button';

const Apartments = () => (
  <Backend>
    <PaginatedContent
      addNewUrl={'/admin/apartments/new'}
      endpoint={'api/apartments'}
      pageName="Apartment"
      DataComponent={ApartmentsRowList}
      PageIcon={adminMenu['Apartments']}
    />
  </Backend>
);

const ApartmentsRowList = ({ results, offset }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <ApartmentsSingleRow
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

const ApartmentsSingleRow = ({ id, slug, number, name, type }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>
        {name} - <strong>{type}</strong>
      </td>
      <td>
        <Button
          color="none"
          className="btn-xs btn-outline-dark"
          href={{
            pathname: '/apartments/[slug]',
            query: { property: slug },
          }}
        >
          Website
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          color="primary"
          className="btn-xs"
          href={{
            pathname: '/admin/apartments/[id]',
            query: { id },
          }}
        >
          Manage Aparment
        </Button>
      </td>
    </tr>
  );
};

export default Apartments;
