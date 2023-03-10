import useInput from '@hooks/useInput';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import { User } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios, { AxiosError } from 'axios';
import React, {
  FormEvent,
  FormEventHandler,
  MouseEventHandler,
  UIEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// npm i @tanstack/react-query

const LogIn = () => {
  const queryClient = useQueryClient();
  const { isLoading, isSuccess, status, isError, data, error } = useQuery(['user'], () =>
    fetcher({ queryKey: '/api/users' }),
  );
  const mutation = useMutation<User, AxiosError, { email: string; password: string }>(
    ['user'],
    (data) =>
      axios
        .post('/api/users/login', data, {
          withCredentials: true,
        })
        .then((response) => response.data),
    {
      onMutate() {
        setLogInError(false);
      },
      onSuccess() {
        queryClient.refetchQueries(['user']);
      },
      onError(error) {
        setLogInError(error.response?.data?.code === 401);
      },
    },
  );
  const users = useRef([
    { email: 'qwer@qwer.qwer', password: 'qwer' },
    { email: 'asdf@asdf.asdf', password: 'asdf' },
  ]);

  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const onSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      mutation.mutate({ email, password });
    },
    [email, password, mutation],
  );

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (data) {
    return <Navigate to="/workspace/sleact/channel/일반" />;
  }

  // console.log(error, userData);
  // if (!error && userData) {
  //   console.log('로그인됨', userData);
  //   return <Navigate to="/workspace/channel/일반" />;
  // }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <div>
        <ul>
          {users.current.map((user) => (
            <li
              key={user.email}
              onClick={() => {
                setEmail(user.email);
                setPassword(user.password);
              }}
            >
              {user.email}
            </li>
          ))}
        </ul>
      </div>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
