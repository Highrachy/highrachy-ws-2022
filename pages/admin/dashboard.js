import React from 'react';
import Backend from '@/components/admin/Backend';
import Link from 'next/link';
import Humanize from 'humanize-plus';
import { adminMenu } from '@/data/adminMenu';
import { TenantsRowList } from './tenants';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import { ApplicantsRowList } from './applicants';
import TopTitle from '@/components/admin/TopTitle';

const Dashboard = () => {
  const pageOptions = {
    key: 'dashboard',
    pageName: 'Dashboard',
  };
  const [query, result] = useSWRQuery({
    name: [pageOptions.key],
    endpoint: `api/dashboard`,
  });
  return (
    <Backend>
      <div className="row">
        <TopTitle>Dashboard</TopTitle>
      </div>
      <ContentLoader
        Icon={adminMenu['Dashboard']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <div className="row">
          {allWidgets.map((name, index) => (
            <Widget
              key={index}
              result={result}
              name={name}
              color={widgetColors[index]}
            />
          ))}
        </div>
        <div className="row">
          <h5 className="text-secondary fw-normal mt-5 mb-0">Recent Tenants</h5>
          <TenantsRowList
            results={result?.['tenants'].data}
            offset={0}
            attachment
          />

          <div className="text-end my-4">
            <Link href="/admin/tenants" passHref>
              <a className="btn btn-xs btn-outline-warning">View All Tenants</a>
            </Link>
          </div>

          <h5 className="text-secondary fw-normal mt-6 mb-0">
            Recent Applicants
          </h5>
          <ApplicantsRowList results={result?.['applicants'].data} offset={0} />
          {/* <div className="text-end my-4">
            <Link href="/admin/applicants" passHref>
              <a className="btn btn-xs btn-outline-info">View All Applicants</a>
            </Link>
          </div> */}
        </div>
      </ContentLoader>
    </Backend>
  );
};

export const widgetColors = ['primary', 'warning', 'info', 'success'];
export const allWidgets = ['apartment', 'tenant', 'applicant', 'job'];

const Widget = ({ name, color, result }) => {
  const pluralizeName = Humanize.pluralize(2, name);
  const capitalizedName = Humanize.capitalize(pluralizeName);
  const link = `/admin/${pluralizeName}`;

  return (
    <section className="widget mb-4 col-sm-6 col-lg-3 mb-4">
      <Link href={link} passHref>
        <a className="text-reset">
          <div className="card h-100">
            <div className="card-body px-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="py-3">
                  <h5 className={`fw-normal m-0 text-${color}`}>
                    {result[pluralizeName].total}
                  </h5>
                  <p className="subtitle mb-0">
                    {Humanize.pluralize(
                      result[pluralizeName].total,
                      name
                    ).toUpperCase()}
                  </p>
                </div>
                <div
                  className={`flex-shrink-0 ms-3 icon-md2 text-${color}-light`}
                >
                  {adminMenu[capitalizedName]}
                </div>
              </div>
            </div>
            <div
              className={`card-footer border-top-0 py-3 px-4 text-${color} bg-${color}-light`}
            >
              <div className="row align-items-center text-red">
                <div className="col-12">
                  <small className="fw-bold">
                    {result[pluralizeName].text}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </section>
  );
};

export default Dashboard;
