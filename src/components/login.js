import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div class="login-form">
        <form>
          <label>Email</label>
          <input name="email" />
          <span class="error"></span>

          <label>Password</label>
          <input name="password" type="password" autocomplete="chrome-off" />
          <span class="error"></span>

          <button class="button-registration" type="submit">Login</button>
        </form>
      </div>
    );
  }
}
