import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Login extends Component {
  constructor(props) {
    super(props);
    props.logout();
    this.state = {
      emailError: "",
      passwordError: "",
      email: "",
      password: "",
    };
  }

  handleErrors = () => {
    let formValid = true;
    if (!this.state.email) {
      this.setState({ emailError: "Email is required" });
      formValid = false;
    } else if (!this.state.password) {
      this.setState({ passwordError: "Password is required" });
      formValid = false;
    } else {
      formValid = true;
    }
    return formValid;
  };

  handleEmail = (event) => {
    event.preventDefault();
    this.setState({ email: event.target.value });
    this.setState({ emailError: "" });
  };

  handlePassword = (event) => {
    event.preventDefault();
    this.setState({ password: event.target.value });
    this.setState({ passwordError: "" });
  };

  authenticateUser = (event) => {
    event.preventDefault();
    if (this.handleErrors()) {
      const model = {};
      model.email = this.state.email;
      model.password = this.state.password;
      this.props.login(model).then((data) => {
        this.props.history.push("/");
      });
    }
  };

  render() {
    return (
      <div className="form-container modal">
        <div className="authentication-form">
          <div className="authentication-title">
            <h3>Login For Play Game</h3>
          </div>
          {this.props.error !== undefined && (
            <p className="error">{this.props.error}</p>
          )}
          <form id="form" onSubmit={this.authenticateUser} className="modal-content">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                className="form-input"
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.handleEmail}
                autoComplete="on"
              />
              <small style={{ color: "red" }}>{this.state.emailError}</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-input"
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handlePassword}
                autoComplete="on"
              />
              <small style={{ color: "red" }}>{this.state.passwordError}</small>
            </div>
            <div className="btn-auth">
              <button className="btn" id="ids" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="authentication-footer">
            <small>Dont have an account?</small>
            <Link to="/register">
              <br /> Register
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
