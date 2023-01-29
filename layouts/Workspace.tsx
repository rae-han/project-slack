import React, { useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@typings/db';
import fetcher from '@utils/fetcher';

type Props = {
  children?: React.ReactNode;
};
const Workspace: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient(); // 빠른 import 추가 opt + shift + enter
  const { data: userData } = useQuery<User | false>(['user'], () => fetcher({ queryKey: '/api/users' }), {});
  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        queryClient.setQueryData(['user'], () => null);
      });
  }, [queryClient]);

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <button onClick={onLogout}>logout</button>
      {children}
    </div>
  );
};

export default Workspace;
