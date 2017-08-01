import React from 'react';

import MaterialAppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet({
  root: {
    marginTop: 30,
    width: '100%'
  },
  flex: {
    flex: 1
  }
});

const AppBar = props => {
  const { isAuthenticated } = props.auth;
  const login = () => props.auth.login();
  const logout = () => props.auth.logout();

  return (
    <MaterialAppBar position="static">
      <Toolbar>
        <Typography
          type="title"
          color="inherit"
          className={ props.classes.flex }
        >
          Cucumber
        </Typography>
        {
          isAuthenticated()
          ? <Button color="contrast" onClick={ logout }>Logout</Button>
          : <Button color="contrast" onClick={ login }>Login</Button>
        }
      </Toolbar>
    </MaterialAppBar>
  );
};

export default withStyles(styleSheet)(AppBar);
