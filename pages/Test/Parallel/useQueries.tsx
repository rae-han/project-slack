import React, { useEffect } from 'react';
import { QueryFunctionContext, useQueries } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

const getPost = async (query: QueryFunctionContext) => {
  const { data } = await axios.get<Post>(`http://localhost:3096/posts/${query.queryKey[1]}`);
  return data;
};

const ParallelQueries = () => {
  const result = useQueries({
    queries: [
      { queryKey: ['post', 1], queryFn: getPost },
      { queryKey: ['post', 2], queryFn: getPost },
      { queryKey: ['post', 3], queryFn: getPost },
    ],
  });

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <>
      <h1>useQuries</h1>
    </>
  );
};

export default ParallelQueries;
