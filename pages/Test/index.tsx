import React, { Fragment } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetcher = async ({ queryKey }: { queryKey: string }) => {
  const response = await axios.get(queryKey, {
    withCredentials: true,
  });

  return response.data;
};

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

const Test = () => {
  const {
    data: postsData,
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>(['posts'], () => fetcher({ queryKey: 'http://localhost:3096/posts' }));

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          {postsData?.map((post) => (
            <Fragment key={post.id}>
              <div>{post.title}</div>
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default Test;
