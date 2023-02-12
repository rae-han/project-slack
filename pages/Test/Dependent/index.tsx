import React from 'react';
import axios from 'axios';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface User {
  nickname: string;
  email: string;
  postId: number;
}

const getPost = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get<Post>(`http://localhost:3096/posts/${queryKey[1]}`);
  return data;
};

const getUser = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get<User>(`http://localhost:3096/users/${queryKey[1]}`);
  return data;
};

const Dependent = () => {
  const { data: user } = useQuery(['user', 'kkiri@example.com'], getUser);
  const { data: post } = useQuery(['post', user?.postId], getPost, {
    enabled: !!user?.postId,
  });

  return (
    <>
      <h1>Dependent Query</h1>
    </>
  );
};

export default Dependent;
