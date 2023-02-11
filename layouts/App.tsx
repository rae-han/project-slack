import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';

// import Workspace from '@layouts/Workspace';
const Workspace = loadable(() => import('@layouts/Workspace'));

// import LogIn from '@pages/LogIn';
// import SignUp from '@pages/SignUp';
const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
// 코드 스플리팅 기준 쉽게 잡으려면 페이지와 서버사이드렌더링 안되야 할 애들로 하면 좋다.
// 에디터 같은건 서버에서 렌더링 할 필요 없다. 서버에서 렌더링 안되게 코드스플리팅 해둔다.
// const SignUp = React.lazy(() => import('@pages/SignUp'));
const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));
const Test = loadable(() => import('@pages/Test'));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<Navigate replace to="/login" />} />
      {/*<Route path="/" element="/login" />*/}
      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/workspace/:workspace/*" element={<Workspace />} />
      {/*<Route path="/workspace/channel" element={<Channel />} />*/}
      {/*<Route path="/workspace/dm" element={<DirectMessage />} />*/}
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default App;
