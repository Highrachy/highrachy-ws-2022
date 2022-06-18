import React from 'react';
import Axios, { CancelToken } from 'axios';
import { getError, statusIsSuccessful } from 'utils/helpers';
import { getTokenFromStore } from 'utils/localStorage';
import { toast } from 'react-toastify';
import useSWR, { useSWRConfig } from 'swr';

const fetchQuery =
  ({ currentEndpoint, key, setResult, axiosOptions }) =>
  async () => {
    const source = CancelToken.source();

    // await new Promise((resolve) => setTimeout(resolve, 10_000));
    const promise = Axios.get(currentEndpoint, {
      cancelToken: source.token,
      headers: {
        Authorization: getTokenFromStore(),
      },
      ...axiosOptions,
    })
      .then((res) => {
        if (statusIsSuccessful(res.status)) {
          setResult && setResult(res?.data?.[key]);
          return res?.data;
        }
        toast.error('Request was not successful. Please try again later');
      })
      .catch((error) => {
        toast.error({
          message: getError(error),
        });
        throw new Error(getError(error));
      });

    promise.cancel = () => {
      toast.error('Query was cancelled');
      source.cancel('Query was cancelled');
    };
    return promise;
  };

const getQueryOptions = (queryOptions = {}) => ({
  revalidateIfStale: true, // automatically revalidate even if there is stale data
  revalidateOnFocus: true, // automatically revalidate when window gets focused
  revalidateOnReconnect: true, // automatically revalidate when the browser regains a network connection
  refreshInterval: 0, // disable refresh
  onError: (error, key) => {
    if (error.status !== 403 && error.status !== 404) {
      // We can send the error to Sentry,
      // or show a notification UI.
      toast.error(getError(error));
    }
  },
  ...queryOptions,
});

export const useSWRQuery = ({
  name,
  endpoint,
  key = 'data',
  // childrenKey,
  queryOptions = {},
  axiosOptions = {},
}) => {
  const [result, setResult] = React.useState(null);
  const currentEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/${
    endpoint || `api/${name}`
  }`;

  const queryResult = useSWR(
    name,
    fetchQuery({
      currentEndpoint,
      key,
      setResult,
      axiosOptions,
    }),
    getQueryOptions(queryOptions)
  );

  const output = result || queryResult?.[key];

  console.log(`[${name}] Query: `, queryResult);
  console.log(`[${name}] Result: `, output);

  // // if (childrenKey && output?.length > 0) {
  // //   output.forEach((item) =>
  // //     setQueryCache([name, item._id], { [childrenKey]: item })
  // //   );
  // // }

  return [queryResult, output, setResult];
};
