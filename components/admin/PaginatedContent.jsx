import React from 'react';
import Humanize from 'humanize-plus';
import { ContentLoader } from 'components/utils/LoadingItems';
import TopTitle from './TopTitle';
import { FiUser } from 'react-icons/fi';
import Pagination from '../utils/Pagination';
import { useSWRQuery } from '@/hooks/useSWRQuery';

const PaginatedContent = ({
  addNewUrl,
  axiosOptions,
  childrenKey,
  DataComponent,
  initialFilter = {},
  filter,
  FilterComponent,
  limit,
  PageIcon,
  pageName,
  pluralPageName,
  populate,
  sort,
  endpoint,
  hidePagination,
  hideNoContent,
  hideTitle,
  showFetching,
  ...props
}) => {
  // const [filters, setFilters] = React.useState({});
  const [currentPage, setCurrentPage] = React.useState(1);

  const pluralizePageName = pluralPageName || Humanize.pluralize(2, pageName);
  const Icon = PageIcon || <FiUser />;

  const [query, results] = useSWRQuery({
    name: ['paginated', pageName.toLowerCase(), currentPage],
    endpoint,
    axiosOptions: {
      params: {
        'pagination[page]': currentPage,
        'pagination[pageSize]': limit || 10,
        sort: sort || 'createdAt:desc',
        populate: populate || '*',
      },
      ...axiosOptions,
    },
  });

  const pagination = query?.data?.meta?.pagination;
  const offset = (currentPage - 1) * (pagination?.pageSize || 0);

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
        Icon={Icon}
        name={pageName}
        noContentText={`No ${pluralizePageName} found`}
        hideNoContent={hideNoContent}
        query={query}
        results={results}
        showFetching={showFetching}
      >
        <DataComponent results={results || []} offset={offset} {...props} />

        {!hidePagination && (
          <Pagination
            currentPage={pagination?.page}
            lastPage={pagination?.pageCount}
            setCurrentPage={setCurrentPage}
          />
        )}
      </ContentLoader>
    </>
  );
};

export default PaginatedContent;
