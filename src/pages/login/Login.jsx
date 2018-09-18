import React, { Component } from 'react';

class Login extends Component {
  componentWillUnmount(){
    clearTimeout(this.timer)
  }
  render() {
    return (
      <div className="login">
       Login Page
      </div>
    );
  }
}

export default Login;
