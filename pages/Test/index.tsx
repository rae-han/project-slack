import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useQuery, QueryFunctionContext, useQueries } from '@tanstack/react-query';

const fetcher = async ({ queryKey }: { queryKey: string }) => {
  const response = await axios.get(queryKey, {
    withCredentials: true,
  });

  return response.data;
};

const getPost = async (query: QueryFunctionContext) => {
  // console.log(query);
  const { data } = await axios.get<Post>(`http://localhost:3096/posts/${query.queryKey[1]}`);
  return data;
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
  } = useQuery<Post[], Error>(['posts'], () => fetcher({ queryKey: 'http://localhost:3096/posts' }), {
    staleTime: 5 * 1_000,
  });
  // fresh - 데이터를 교체할 필요가 없는 상태
  // stale - 재요청을 하여 데이터를 교체해야 하는 상태
  // fetching - fetch가 진행 중인 상태
  // inactive - 캐싱된 상태

  const { data: post1 } = useQuery(['post', 1], getPost);
  const { data: post2 } = useQuery(['post', 2], getPost);
  const { data: post3 } = useQuery(['post', 3], getPost);

  const result = useQueries({
    queries: [
      { queryKey: ['post', 1], queryFn: getPost },
      { queryKey: ['post', 2], queryFn: getPost },
      { queryKey: ['post', 3], queryFn: getPost },
    ],
  });

  useEffect(() => {
    if (result) {
      console.log(result);
    }
  }, [result]);

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
