import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import App from './pages/App';
import Callback from './pages/Callback';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

import AppBar from './components/AppBar';

import auth from './auth/Auth';
import history from './history';

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <BrowserRouter history={ history }>
      <div>
        <AppBar auth={ auth }/>
        <Route exact path="/" render={ (props) =>
          <App auth={ auth } {...props}/>
        }/>
        <Route path="/callback" render={ (props) => {
          handleAuthentication(props);
          return <Callback {...props} />;
        } }/>
        <Route path="/cart" render={ (props) =>
          <Cart auth={ auth } {...props}/>
        }/>
        <Route path="/profile" render={ (props) =>
          <Profile auth={ auth } {...props}/>
        }/>

      </div>
    </BrowserRouter>
  );
}
