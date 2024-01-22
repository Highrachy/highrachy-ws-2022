import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Button from '@/components/forms/Button';
import { camelToSentence, processData } from '@/utils/helpers';
import { LocationIcon } from '@/components/common/Icons';
import { TenantsRowList, TenantsSingleRow } from '../tenants';
import { Tab } from 'react-bootstrap';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import Humanize from 'humanize-plus';
import { GoDotFill } from 'react-icons/go';
import ProcessButton from '@/components/utils/ProcessButton';
import { getRoleStateFromStore } from '@/utils/localStorage';
import { USER_ROLE } from '@/utils/constants';

const pageOptions = {
  key: 'apartment',
  pageName: 'Apartment',
};

const allApartmentTabs = [
  {
    key: 'Overview',
    title: 'Overview',
    fields: [
      'name',
      'type',
      'location',
      'address',
      'description',
      'totalUnits',
      'availableUnits',
      'baths',
      'beds',
      'toilets',
      'availableSoon',
    ],
  },
  {
    key: 'Tenants Applications',
    title: 'Tenant Applications',
    fields: [],
  },
];

const SingleApartment = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentTab, setCurrentTab] = React.useState(allApartmentTabs[0].key);

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/apartments/${id}`,
    axiosOptions: {
      params: {
        populate: '*',
      },
    },
  });

  const currentRole = getRoleStateFromStore();
  const currentApartmentTab =
    currentRole === USER_ROLE.ADMIN
      ? allApartmentTabs
      : allApartmentTabs.slice(0, 1);
  return (
    <Backend title="Single Apartment">
      <ContentLoader
        Icon={adminMenu['Apartments']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <ApartmentHeader
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          allApartmentTabs={currentApartmentTab}
          {...result?.attributes}
          id={id}
          query={query}
        />
        <Tab.Container
          activeKey={currentTab}
          id="single-apartment-profile"
          className="mb-3"
        >
          <Tab.Content>
            {currentApartmentTab.map(({ key, title, fields }) => (
              <Tab.Pane eventKey={key} key={key}>
                <TabInformation
                  id={id}
                  title={title}
                  apartment={{ id, ...result?.attributes }}
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

const ApartmentHeader = ({
  currentTab,
  setCurrentTab,
  allApartmentTabs,
  id,
  slug,
  name,
  query,
  type,
  address,
  availableSoon,
  availableUnits,
  totalUnits,
}) => {
  const currentState = availableSoon ? 'Fully Booked' : 'Available Soon';
  const currentStateButton = availableSoon ? 'primary' : 'dark';
  const currentRole = getRoleStateFromStore();
  const isAdminRole = currentRole === USER_ROLE.ADMIN;

  return (
    <section className="card mb-5">
      <div className="card-body p-5 pb-0">
        <div className="d-flex flex-wrap flex-sm-nowrap">
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
              <div className="d-flex flex-column">
                <h4 className="d-flex align-items-center mb-2">
                  {type} - {name}
                </h4>
                <div className="d-flex text-muted flex-wrap align-items-center fs-6 mb-2 pe-2">
                  <LocationIcon /> {address}
                </div>
                <div className="d-flex text-muted flex-wrap align-items-center fs-6 mb-3 pe-2">
                  {availableUnits > 0 ? (
                    <span className="d-flex align-items-center fw-bold text-success">
                      <GoDotFill /> {availableUnits}{' '}
                      {Humanize.pluralize(totalUnits, 'unit')} available
                    </span>
                  ) : availableSoon ? (
                    <span className="d-flex align-items-center fw-bold text-info">
                      <GoDotFill /> Apartment is Available Soon
                    </span>
                  ) : (
                    <span className="d-flex align-items-center fw-bold text-danger">
                      <GoDotFill /> Apartment is fully booked
                    </span>
                  )}
                </div>
                <div className="d-flex flex-wrap fs-6 mb-2">
                  <Button
                    color="none"
                    className="btn-xs btn-outline-dark"
                    href={{
                      pathname: '/apartments/[slug]',
                      query: { slug },
                    }}
                  >
                    View on Website
                  </Button>
                  {isAdminRole && (
                    <>
                      &nbsp;&nbsp;&nbsp;
                      <Button
                        color="none"
                        className="btn-xs btn-outline-primary"
                        href={{
                          pathname: '/admin/apartments/new',
                          query: { id, action: 'edit' },
                        }}
                      >
                        Edit Apartment
                      </Button>
                      &nbsp;&nbsp;&nbsp;
                      <Button
                        color="info"
                        className="btn-xs"
                        href={{
                          pathname: '/admin/apartments/new',
                          query: { id, action: 'duplicate' },
                        }}
                      >
                        Duplicate Apartment
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {/* Action */}
              {isAdminRole && (
                <div className="d-flex my-2">
                  {availableUnits === 0 && (
                    <ProcessButton
                      afterSuccess={() => query.mutate()}
                      api={`apartments/${id}`}
                      buttonColor={currentStateButton}
                      buttonSizeClassName="btn-sm"
                      data={{ availableSoon: !availableSoon }}
                      modalContent={`Are you sure you want to mark this aparment as ${currentState}`}
                      modalTitle={`Mark as ${currentState}`}
                      successMessage={`The applicant has been successfully updated to  ${currentState}`}
                    >
                      Mark as {currentState}
                    </ProcessButton>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <ul className="nav fs-5 pt-5 fw-bolder">
          {allApartmentTabs.map(({ key }) => (
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
  );
};

const TabInformation = ({ apartment, title, data }) => {
  const { tenants } = apartment;
  return (
    <section>
      <div className="card">
        <div className="table-responsive">
          <table className="table table-border">
            <thead>
              <tr>
                <th colSpan="5">
                  <h5 className="my-3">{title}</h5>
                </th>
              </tr>
            </thead>
            {!data || data.length === 0 ? (
              // tenants?.data?.length > 0 && (
              <tbody>
                {tenants?.data.map(({ id, attributes }, index) => (
                  <TenantsSingleRow
                    key={index}
                    number={index + 1}
                    id={id}
                    {...attributes}
                    attachment={true}
                  />
                ))}
              </tbody>
            ) : (
              // )
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <th width="250">{camelToSentence(item)}</th>
                    <td>
                      {item === 'description' ? (
                        <ReactMarkdown>{apartment[item]}</ReactMarkdown>
                      ) : (
                        processData(apartment[item])
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </section>
  );
};

export default SingleApartment;
