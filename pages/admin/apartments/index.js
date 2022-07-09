import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import Button from '@/components/forms/Button';
import { BathIcon, BedIcon, ToiletIcon } from '@/components/common/Icons';
import Humanize from 'humanize-plus';
import { filterApartments } from '@/utils/filters';

const Apartments = () => (
  <Backend>
    <PaginatedContent
      addNewUrl={'/admin/apartments/new'}
      endpoint={'api/apartments'}
      pageName="Apartment"
      DataComponent={ApartmentsRowList}
      PageIcon={adminMenu['Apartments']}
      filterFields={filterApartments}
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
                <th>Total Units</th>
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

const ApartmentsSingleRow = ({
  id,
  slug,
  number,
  name,
  type,
  beds,
  baths,
  toilets,
  totalUnits,
  availableUnits,
  availableSoon,
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td className="td-block">
        {name} - <strong>{type}</strong>
        <span>
          <ul className="list-inline text-muted mb-0">
            <li className="list-inline-item pe-3">
              <BedIcon /> Bed: {beds}
            </li>
            <li className="list-inline-item pe-3">
              <BathIcon /> Baths: {baths}
            </li>
            <li className="list-inline-item pe-3">
              <ToiletIcon /> Toilets: {toilets}
            </li>
          </ul>
        </span>
      </td>
      <td className="td-block">
        {totalUnits} {Humanize.pluralize(totalUnits, 'unit')}
        {availableUnits > 0 ? (
          <span className="fw-bold text-success">
            {availableUnits} {Humanize.pluralize(totalUnits, 'unit')} available
          </span>
        ) : availableSoon ? (
          <span className="fw-bold text-info">Available Soon</span>
        ) : (
          <span className="fw-bold text-danger">Not Available</span>
        )}
      </td>
      <td>
        <Button
          color="none"
          className="btn-xs btn-outline-dark"
          href={{
            pathname: '/apartments/[slug]',
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
