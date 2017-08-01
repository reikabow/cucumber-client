import React, { Component } from 'react';

class App extends Component {
  goTo = (route) => {
    this.props.history.replace(`${route}`);
  }

  login = () => {
    console.log('Logging in');
    this.props.auth.login();
  }

  logout = () => {
    console.log('Logging out');
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <nav>
          {
            !isAuthenticated()
            ? <button onClick={ this.login }>Log in</button>
            : <button onClick={ this.logout }>Logout</button>
          }
        </nav>
      </div>
    )
  }
}

export default App;
