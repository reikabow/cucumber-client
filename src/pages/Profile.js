import React, { Component } from 'react';

class Profile extends Component {
  

  render() {
    const { profile } = this.state;
    return(
      <div>
        <h1>{ profile.name }</h1>
        <img src={ profile.picture } alt="profile"/>
      </div>
    );
  }
}

export default Profile;
