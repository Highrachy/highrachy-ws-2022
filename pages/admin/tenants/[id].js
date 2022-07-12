import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { camelToSentence, processData } from '@/utils/helpers';
import { LocalImage } from '@/components/common/Image';
import { Tab } from 'react-bootstrap';
import Link from 'next/link';
import { MdEmail, MdLocalPhone } from 'react-icons/md';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from 'react-icons/fa';
import { RiCommunityFill } from 'react-icons/ri';
import classNames from 'classnames';
import Humanize from 'humanize-plus';
import { TENANT_STATUS, TENANT_STATUS_COLOR } from '@/utils/constants';
import ProcessButton from '@/components/utils/ProcessButton';

const pageOptions = {
  key: 'tenant',
  pageName: 'Tenant',
};

const SingleTenant = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentTab, setCurrentTab] = React.useState(allTenantTabs[0].key);

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/tenants/${id}`,
    axiosOptions: {
      params: {
        populate: '*',
      },
    },
    showResult: true,
  });

  return (
    <Backend title="Tenant">
      <ContentLoader
        Icon={adminMenu['Tenants']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <TenantHeader
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          {...result?.attributes}
          id={id}
          query={query}
        />
        <Tab.Container
          activeKey={currentTab}
          id="single-tenant-profile"
          className="mb-3"
        >
          <Tab.Content>
            {allTenantTabs.map(({ key, title, fields }) => (
              <Tab.Pane eventKey={key} key={key}>
                <TabInformation
                  title={title}
                  tenant={{ id, ...result?.attributes }}
                  data={fields}
                  setCurrentTab={setCurrentTab}
                />
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </ContentLoader>
    </Backend>
  );
};

const TenantHeader = ({
  currentTab,
  setCurrentTab,
  apartment,
  tenantProfileImage,
  tenantFullName,
  mobileTelephone,
  personalEmail,
  status,
  id,
  query,
}) => {
  const nextStatus = getNextTenantStatus(status);
  return (
    <section>
      <section className="card mb-5">
        <div className="card-body pb-0">
          <div className="d-flex flex-wrap flex-sm-nowrap">
            <div className="mb-4">
              <div className="d-block me-3 position-relative">
                <LocalImage
                  src={tenantProfileImage}
                  name={tenantFullName}
                  className="img-xl img-cover"
                  rounded
                />
              </div>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
                <div className="d-flex flex-column">
                  {/* Tenant Name */}
                  <h4 className="d-flex align-items-center mb-2">
                    {tenantFullName}
                  </h4>
                  {/* Email and Phone */}
                  <div className="d-flex flex-wrap fs-6 mb-2 pe-2">
                    <span className="d-flex align-items-center text-muted small me-3">
                      <MdLocalPhone /> &nbsp;{mobileTelephone}
                    </span>
                    <span className="d-flex align-items-center text-muted small me-3">
                      <MdEmail /> &nbsp;{personalEmail}
                    </span>
                  </div>
                  {/* Apartment */}
                  <div className="d-flex flex-wrap fs-6 mb-2">
                    <Link
                      href={{
                        pathname: '/admin/apartments/[id]',
                        query: { id: apartment.data.id },
                      }}
                      passHref
                    >
                      <a className="d-flex align-items-center text-muted-link">
                        <RiCommunityFill /> &nbsp;
                        {apartment.data.attributes.name} -{' '}
                        <strong>&nbsp;{apartment.data.attributes.type}</strong>
                      </a>
                    </Link>
                  </div>
                  {/* Social Media */}
                  <div className="d-flex flex-wrap fs-6 mb-2">
                    <span
                      className={`badge badge-dot bg-${
                        TENANT_STATUS_COLOR[status] || 'danger'
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                </div>
                {/* Action */}
                <div className="d-flex my-2">
                  {nextStatus === TENANT_STATUS.CONFIRMED && (
                    <ProcessButton
                      afterSuccess={() => query.mutate()}
                      api={`tenants/${id}`}
                      buttonClassName="me-3"
                      buttonSizeClassName="btn-sm"
                      data={{ status: TENANT_STATUS.REJECTED }}
                      modalContent={`Are you sure you want to reject this tenant's application`}
                      modalTitle={`Reject Application`}
                      successMessage={`The apartment has been successfully rejected`}
                    >
                      Reject Application
                    </ProcessButton>
                  )}

                  {status !== TENANT_STATUS.MOVED_OUT &&
                    status !== TENANT_STATUS.REJECTED && (
                      <ProcessButton
                        afterSuccess={() => query.mutate()}
                        api={`tenants/${id}`}
                        buttonColor={TENANT_STATUS_COLOR[nextStatus]}
                        buttonSizeClassName="btn-xs"
                        data={{ status: nextStatus }}
                        modalContent={`Are you sure you want to update this tenant's application to ${nextStatus}`}
                        modalTitle={`Mark as ${nextStatus}`}
                        successMessage={`The apartment has been successfully updated to ${nextStatus}`}
                      >
                        Mark as {nextStatus}
                      </ProcessButton>
                    )}
                </div>
              </div>
            </div>
          </div>

          <ul className="nav fs-5 pt-5 fw-bolder">
            {allTenantTabs.map(({ key }) => (
              <li
                key={key}
                className="nav-item"
                onClick={() => setCurrentTab(key)}
              >
                <span
                  className={classNames('nav-link', {
                    active: currentTab === key,
                  })}
                >
                  {key}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
};

// Add pending documents

const getNextTenantStatus = (status) => {
  switch (status) {
    case TENANT_STATUS.WAITING_LIST:
    case TENANT_STATUS.APPLIED:
      return TENANT_STATUS.CONFIRMED;
    case TENANT_STATUS.CONFIRMED:
      return TENANT_STATUS.LEAVING_SOON;
    case TENANT_STATUS.LEAVING_SOON:
      return TENANT_STATUS.MOVED_OUT;
    default:
      return null;
  }
  return null;
};

const TabInformation = ({ tenant, title, data, setCurrentTab }) => {
  return (
    <section>
      {title === allTenantTabs[0].title ? (
        <TenantOverview tenant={tenant} setCurrentTab={setCurrentTab} />
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-border">
              <thead>
                <tr>
                  <th colSpan="2">
                    <h5 className="my-3">{title}</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <th width="300">{camelToSentence(item)}</th>
                    <td>{processData(tenant[item])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

const TenantOverview = ({ tenant, setCurrentTab }) => {
  const getDependantCount = () => {
    const dependants = [];
    for (let i = 1; i <= 5; i++) {
      if (tenant[`dependantName${i}`]) {
        dependants.push(tenant[`dependantName${i}`]);
      }
    }
    return dependants.length;
  };
  const dependantCount = getDependantCount();
  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table table-border">
          <thead>
            <tr>
              <th colSpan="2">
                <h5 className="my-3">Overview</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Social Media</th>
              <td>
                {tenant.facebook && (
                  <Link href={tenant.facebook} passHref>
                    <a className="facebook-color icon-md me-2">
                      <FaFacebookSquare />
                    </a>
                  </Link>
                )}
                {tenant.twitter && (
                  <Link href={tenant.twitter} passHref>
                    <a className="twitter-color icon-md me-2">
                      <FaTwitterSquare />
                    </a>
                  </Link>
                )}
                {tenant.linkedin && (
                  <Link href={tenant.linkedin} passHref>
                    <a className="linkedin-color icon-md me-2">
                      <FaLinkedin />
                    </a>
                  </Link>
                )}
                {tenant.instagram && (
                  <Link href={tenant.instagram} passHref>
                    <a className="instagram-color icon-md me-2">
                      <FaInstagramSquare />
                    </a>
                  </Link>
                )}
              </td>
            </tr>
            <tr>
              <th>Emergency Contact</th>
              <td className="td-block">
                <div
                  onClick={() => setCurrentTab(allTenantTabs[2].key)}
                  className="text-link"
                >
                  {tenant.emergencyFullName} ({tenant.emergencyRelationship})
                  <span>
                    {tenant.emergencyTelephone1} - {tenant.emergencyEmail}
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <th>Last Apartment</th>
              <td>
                <span
                  onClick={() => setCurrentTab(allTenantTabs[3].key)}
                  className="text-link"
                >
                  {tenant.ownLastProperty
                    ? 'Owns Last Apartment'
                    : tenant.neverRentedBefore
                    ? 'Never Rented Before'
                    : 'Has a previous Landlord'}
                </span>
              </td>
            </tr>
            <tr>
              <th>Employment Details</th>
              <td>
                <span
                  onClick={() => setCurrentTab(allTenantTabs[4].key)}
                  className="text-link"
                >
                  <strong>{tenant.employmentPositionTitle}</strong>&nbsp;at{' '}
                  <em>{tenant.employmentCompanyName}</em>
                </span>
              </td>
            </tr>
            <tr>
              <th>Company Social Media</th>
              <td>
                {tenant.companyFacebook && (
                  <Link href={tenant.companyFacebook} passHref>
                    <a className="facebook-color icon-md me-2">
                      <FaFacebookSquare />
                    </a>
                  </Link>
                )}
                {tenant.companyTwitter && (
                  <Link href={tenant.companyTwitter} passHref>
                    <a className="twitter-color icon-md me-2">
                      <FaTwitterSquare />
                    </a>
                  </Link>
                )}
                {tenant.companyLinkedin && (
                  <Link href={tenant.companyLinkedin} passHref>
                    <a className="linkedin-color icon-md me-2">
                      <FaLinkedin />
                    </a>
                  </Link>
                )}
                {tenant.companyInstagram && (
                  <Link href={tenant.companyInstagram} passHref>
                    <a className="instagram-color icon-md me-2">
                      <FaInstagramSquare />
                    </a>
                  </Link>
                )}
              </td>
            </tr>
            <tr>
              <th>Has Dependants</th>
              <td>
                <span
                  onClick={() => setCurrentTab(allTenantTabs[5].key)}
                  className="text-link"
                >
                  {dependantCount > 0
                    ? `${processData(
                        true
                      )} (${dependantCount} ${Humanize.pluralize(
                        dependantCount,
                        'dependant'
                      )})`
                    : processData(false)}
                </span>
              </td>
            </tr>
            <tr>
              <th>Has persons with Special Needs</th>
              <td>
                <span
                  onClick={() => setCurrentTab(allTenantTabs[5].key)}
                  className="text-link"
                >
                  {processData(tenant.hasPersonsWithSpecialNeed)}
                </span>
              </td>
            </tr>
            <tr>
              <th>Has Pets</th>
              <td>
                <span
                  onClick={() => setCurrentTab(allTenantTabs[5].key)}
                  className="text-link"
                >
                  {processData(!!tenant.pets)}
                  {!!tenant.pets && ` - ${tenant.pets}`}
                </span>
              </td>
            </tr>
            <tr>
              <th>Pending Documents</th>
              <td>
                <ul className="list">
                  {tenant.ownLastProperty && !tenant.propertyEvidenceURL && (
                    <li>
                      <strong>Owns Last Property</strong> - need to provide a
                      copy of last mortgage statement or any other document
                      confirming ownership
                    </li>
                  )}
                  {tenant.neverRentedBefore && !tenant.propertyEvidenceURL && (
                    <li>
                      <strong>Never Rented Before</strong> - need to provide
                      proof of address e.g. utility bill, bank statement, etc.
                    </li>
                  )}
                  {tenant.isSelfEmployed && (
                    <li>
                      <strong>Self employed </strong>- need to provide last 3
                      years’ tax returns or a letter from accountant confirming
                      last 3 years of income
                    </li>
                  )}
                  {tenant.changeEmployerSoon && !tenant.offerLetterURL && (
                    <li>
                      <strong>Changing Employer soon</strong> - need to provide
                      offer letter
                    </li>
                  )}
                </ul>
              </td>
            </tr>
            <tr>
              <th>Created At</th>
              <td>{processData(tenant.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated At</th>
              <td>{processData(tenant.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleTenant;

const personalInformation = [
  'title',
  'firstName',
  'middleName',
  'lastName',
  'mobileTelephone',
  'homeTelephone',
  'personalEmail',
  'workEmail',
  'dateOfBirth',
  'tenantFullName',
  'identificationType',
  'identificationNumber',
  'currentAddress',
  'postCode',
  'timeAtCurrentAddress',
  'stateOfOrigin',
  'maritalStatus',
  'previousEmployment',
  'facebook',
  'twitter',
  'instagram',
  'linkedin',
];

const emergencyInfo = [
  'emergencyFullName',
  'emergencyEmail',
  'emergencyRelationship',
  'emergencyTelephone1',
  'emergencyTelephone2',
  'emergencyAddress',
];

const landlordInfo = [
  'ownLastProperty',
  'landlordFullName',
  'landlordEmail',
  'landlordTelephone',
  'landlordAddress',
  'landlordPostcode',
  'neverRentedBefore',
  'propertyEvidenceURL',
];

const employmentInfo = [
  'isSelfEmployed',
  'employmentCompanyName',
  'employmentPositionTitle',
  'employmentContractType',
  'employmentAddress',
  'employmentPostcode',
  'employmentStartDate',
  'employmentManagerName',
  'employmentManagerPosition',
  'employmentManagerEmail',
  'employmentManagerTelephone',
  'companyFacebook',
  'companyTwitter',
  'companyInstagram',
  'companyLinkedin',
  'employmentMoreDetails',
  'changeEmployerSoon',
  'offerLetterURL',
];

const dependantInfo = [
  'dependantName1',
  'dependantAge1',
  'dependantRelationship1',
  'dependantOccupation1',
  'dependantIdentification1',
  'dependantName2',
  'dependantAge2',
  'dependantRelationship2',
  'dependantOccupation2',
  'dependantIdentification2',
  'dependantName3',
  'dependantAge3',
  'dependantRelationship3',
  'dependantOccupation3',
  'dependantIdentification3',
  'dependantName4',
  'dependantAge4',
  'dependantRelationship4',
  'dependantOccupation4',
  'dependantIdentification4',
  'dependantName5',
  'dependantAge5',
  'dependantRelationship5',
  'dependantOccupation5',
  'dependantIdentification5',
  'hasPersonsWithSpecialNeed',
  'specialNeedDetails',
  'pets',
];

export const allTenantTabs = [
  {
    key: 'Overview',
    title: 'Overview',
    fields: [],
  },
  {
    key: 'Profile',
    title: 'Profile',
    fields: personalInformation,
  },
  {
    key: 'Emergency',
    title: 'Emergency Contact',
    fields: emergencyInfo,
  },
  {
    key: 'LandLord',
    title: 'LandLord Info',
    fields: landlordInfo,
  },
  {
    key: 'Employment',
    title: 'Employment Details',
    fields: employmentInfo,
  },
  {
    key: 'Dependant',
    title: 'Dependants Information',
    fields: dependantInfo,
  },
];
