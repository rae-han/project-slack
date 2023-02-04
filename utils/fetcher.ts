import axios from 'axios';

interface QueryOptions {
  queryKey: string;
}
type CustomFetcher = (queryKey: string | QueryOptions) => void;

// const fetcher: CustomFetcher = async (query) => {
const fetcher = async ({ queryKey }: { queryKey: string }) => {
  // let url = queryKey;

  console.log('QK', queryKey);

  const response = await axios.get(queryKey, {
    withCredentials: true,
  });
  return response.data;
};

export default fetcher;
