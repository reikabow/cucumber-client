import React, { Component } from 'react';

class Transactions extends Component {
  componentWillMount() {
    const { isAuthenticated } = this.props.auth;
    let getIdToken = () => {};
    if (isAuthenticated())
      getIdToken = this.props.auth.getIdToken;
    const headers = { 'Authorization': `Bearer ${getIdToken()}` };
    console.log('mount');
    fetch('http://localhost:3001/api/transactions', { headers })
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Not validated');
        }
        console.log('Success private');
      })
      .catch(error => {
        console.log('Error private');
      });

    fetch('http://localhost:3001/public', { headers })
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Not validated');
        }
        console.log('Success public');
      })
      .catch(error => {
        console.log('Error public');
      });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated()) {
      return (
        <div>Login</div>
      );
    }
    return (
      <div>
        Something
      </div>
    );
  }
}

export default Transactions;
