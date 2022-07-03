import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import Image, { LocalImage } from '@/components/common/Image';
import Button from '@/components/forms/Button';

const Tenants = () => (
  <Backend>
    <PaginatedContent
      endpoint={'api/tenants'}
      pageName="Tenant"
      DataComponent={TenantsRowList}
      PageIcon={adminMenu['Tenants']}
      populate="*"
    />
  </Backend>
);

export const TenantsRowList = ({ results, offset, hideApartments }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                {!hideApartments && <th>Apartment</th>}
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map(({ id, attributes }, index) => (
                <TenantsSingleRow
                  key={index}
                  number={offset + index + 1}
                  id={id}
                  {...attributes}
                  hideApartments={hideApartments}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const TenantsSingleRow = ({ number, hideApartments, ...props }) => {
  const { id, apartment, title, tenantFullName, tenantProfileImage, status } =
    props;

  const applied = status === 'APPLIED';
  return (
    <tr>
      <td>{number}</td>
      <td>
        <LocalImage
          src={tenantProfileImage}
          name={`${tenantFullName}-${number}`}
          className="icon-md me-2"
          width="32"
          rounded
          height="32"
        />
        {title} {tenantFullName}
      </td>
      {!hideApartments && (
        <td>
          {apartment?.data?.attributes.name} -{' '}
          {apartment?.data?.attributes.type}
        </td>
      )}
      <td>
        <span className={`badge badge-dot bg-${applied ? 'success' : 'dark'}`}>
          {status}
        </span>
      </td>
      <td>
        <Button
          color="primary"
          className="btn-xs"
          href={{
            pathname: '/admin/tenants/[id]',
            query: { id },
          }}
        >
          View Tenant
        </Button>
      </td>
    </tr>
  );
};

export default Tenants;
