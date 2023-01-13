import React, { FC } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import LogIn from '@pages/LogIn';
import SignUp from '@pages/SignUp';

const App: FC = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  )
}

export default App;