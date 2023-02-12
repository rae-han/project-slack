import React from 'react';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TestLayout from '@layouts/Test';

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

const getPost = async (query: QueryFunctionContext) => {
  // console.log(query);
  const { data } = await axios.get<Post>(`http://localhost:3096/posts/${query.queryKey[1]}`);
  return data;
};

const ParallelQuery = () => {
  const { data: post1, isLoading: loading1 } = useQuery<Post>(['post', 1], getPost);
  const { data: post2, isLoading: loading2 } = useQuery<Post>(['post', 2], getPost);
  const { data: post3, isLoading: loading3 } = useQuery<Post>(['post', 3], getPost);

  return (
    <>
      {loading1 || loading2 || loading3 ? (
        <div>loading...</div>
      ) : (
        <div>
          <h1>Parallel Query with useQuery</h1>
          <div key={post1?.id}>{post1?.title}</div>
          <div key={post2?.id}>{post2?.title}</div>
          <div key={post3?.id}>{post3?.title}</div>
        </div>
      )}
    </>
  );
};

export default ParallelQuery;
