import React, { Component } from 'react';

import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';

class AppBar extends Component {
  state = { profile: {} };
  login = () => this.props.auth.login();
  logout = () => this.props.auth.logout();

  async componentDidMount() {
    const { isAuthenticated, getProfile } = this.props.auth;
    if (isAuthenticated()) {
      const profile = await getProfile();
      this.setState({ profile });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.profile !== nextState.profile;
  }

  render() {
    const props = this.props;
    const { profile } = this.state;
    const { isAuthenticated } = props.auth;

    return (
      <div>
        <h1>Cucumber</h1>
        { isAuthenticated()
          ? <Button onClick={ this.logout }>Logout</Button>
          : <Button onClick={ this.login }>Login</Button> }
        { profile && <Avatar src={ profile.picture }/> }
      </div>
    );
  }
};

export default AppBar;
