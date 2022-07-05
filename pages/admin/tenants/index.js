import React from 'react';
import PaginatedContent from '@/components/admin/PaginatedContent';
import { Card } from 'react-bootstrap';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import { LocalImage } from '@/components/common/Image';
import Button from '@/components/forms/Button';
import { TENANT_STATUS_COLOR } from '@/utils/constants';

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

export const TenantsRowList = ({ results, offset, attachment }) => {
  return (
    <div className="container-fluid">
      <Card className="mt-2">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                {!attachment && <th>Apartment</th>}
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
                  attachment={attachment}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export const TenantsSingleRow = ({ number, attachment, ...props }) => {
  const { id, apartment, title, tenantFullName, tenantProfileImage, status } =
    props;
  return (
    <tr>
      <td>{number}</td>
      <td>
        <LocalImage
          src={tenantProfileImage}
          name={`${tenantFullName}-${number}`}
          className="img-md2 me-2"
          rounded
        />
        {title} {tenantFullName}
      </td>
      {!attachment && (
        <td>
          {apartment?.data?.attributes.name} -{' '}
          {apartment?.data?.attributes.type}
        </td>
      )}
      <td>
        <span className={`badge badge-dot bg-${TENANT_STATUS_COLOR[status]}`}>
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
          Manage Tenant
        </Button>
      </td>
    </tr>
  );
};

export default Tenants;
