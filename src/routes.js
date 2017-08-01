import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Auth from './auth/Auth';
import history from './history';

import App from './pages/App';
import Callback from './pages/Callback'
import Profile from './pages/Profile';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <BrowserRouter history={ history } component={ App }>
      <div>
        <Route path="/" render={ (props) =>
          <App auth={ auth } {...props}/>
        }/>
        <Route path="/callback" render={ (props) => {
          handleAuthentication(props);
          return <Callback {...props} />;
        } }/>
        <Route path="/profile" render={ (props) =>
          <Profile auth={ auth } {...props}/>
        }/>
      </div>
    </BrowserRouter>
  );
}
