import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';

const pageOptions = {
  key: 'job',
  pageName: 'Job',
};

const SingleJob = () => {
  const router = useRouter();
  const { id } = router.query;

  const [query, result] = useSWRQuery({
    name: [pageOptions.key, id],
    endpoint: `api/jobs/${id}`,
    processRequest: !!id,
  });

  return (
    <Backend>
      <ContentLoader
        Icon={adminMenu['Jobs']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <JobDetail {...result?.attributes} id={id} />
      </ContentLoader>
    </Backend>
  );
};

const JobDetail = ({ title }) => (
  <div className="container-fluid">
    <div className="mt-5 mb-3">
      <h3>{title}</h3>
    </div>
  </div>
);

export default SingleJob;
