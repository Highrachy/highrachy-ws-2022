import React from 'react';
import Humanize from 'humanize-plus';
// import { usePaginationQuery } from 'hooks/useQuery';
import { ContentLoader } from 'components/utils/LoadingItems';
import TopTitle from './TopTitle';
import { FiUser } from 'react-icons/fi';
import Pagination from '../utils/Pagination';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const PaginatedContent = ({
  addNewUrl,
  childrenKey,
  DataComponent,
  initialFilter = {},
  filter,
  FilterComponent,
  limit,
  PageIcon,
  pageName,
  pluralPageName,
  endpoint,
  hidePagination,
  hideNoContent,
  hideTitle,
  showFetching,
  ...props
}) => {
  // const [filters, setFilters] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);
  // const [toast, setToast] = useToast();

  const pluralizePageName = pluralPageName || Humanize.pluralize(2, pageName);
  const Icon = PageIcon || <FiUser />;

  const { data: response, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!response) return <div>loading...</div>;

  const { data: results, meta } = response;

  // const [query, results] = usePaginationQuery({
  //   axiosOptions: {
  //     params: { limit, page: currentPage, ...filters, ...initialFilter },
  //   },
  //   key: 'result',
  //   name: queryName || pageName.toLowerCase(),
  //   setToast,
  //   endpoint,
  //   childrenKey: childrenKey || queryName,
  //   refresh: true,
  // });

  const pagination = meta?.pagination;
  //   page: 1
  // pageCount: 1
  // pageSize: 25
  // total: 3

  const showTitle = !hideTitle && !(hideNoContent && results?.length === 0);

  return (
    <>
      {showTitle && (
        <TopTitle buttonText={`New ${pageName}`} to={addNewUrl}>
          {pagination?.total}{' '}
          {Humanize.pluralize(pagination?.total, pageName, pluralizePageName)}
        </TopTitle>
      )}

      {/* {FilterComponent && (
        <TopFilter
          FilterComponent={FilterComponent}
          filters={filters}
          setFilters={setFilters}
        />
      )} */}

      <ContentLoader
        hasContent={results?.length > 0}
        Icon={Icon}
        name={pageName}
        noContentText={`No ${pluralizePageName} found`}
        hideNoContent={hideNoContent}
        results={results}
        // showFetching={showFetching || Object.keys(filters)?.length > 0}
      >
        <DataComponent
          results={results || []}
          offset={pagination?.offset || 0}
          {...props}
        />

        {!hidePagination && (
          <Pagination
            currentPage={pagination?.currentPage}
            lastPage={pagination?.totalPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </ContentLoader>
    </>
  );
};

export default PaginatedContent;
