import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
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

class AppBar extends Component {
  state = { profile: {} };
  login = () => this.props.auth.login();
  logout = () => this.props.auth.logout();

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.profile === nextState.profile) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    const props = this.props;
    const { profile } = this.state;
    const { isAuthenticated, userProfile, getProfile } = props.auth;

    if (isAuthenticated() && !userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }

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
            ? <Button color="contrast" onClick={ this.logout }>Logout</Button>
            : <Button color="contrast" onClick={ this.login }>Login</Button>
          }
          {
            profile
            && <Avatar src={ profile.picture }/>
          }
        </Toolbar>
      </MaterialAppBar>
    );
  }
};

export default withStyles(styleSheet)(AppBar);
