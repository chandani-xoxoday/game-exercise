import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Register extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("accKeySession");
    this.state = {
      emailError: "",
      passwordError: "",
      userNameError: "",
      userName: "",
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
    } else if (!this.state.userName) {
      this.setState({ userNameError: "User Name is required" });
      formValid = false;
    } else {
      formValid = true;
    }
    return formValid;
  };

  handleUserName = (event) => {
    this.setState({ userName: event.target.value });
    this.setState({ userNameError: "" });
  };

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
    this.setState({ emailError: "" });
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
    this.setState({ passwordError: "" });
  };

  authenticateUser = (event) => {
    event.preventDefault();
    if (this.handleErrors()) {
      const model = {};
      model.email = this.state.email;
      model.userName = this.state.userName;
      model.password = this.state.password;

      this.props.register(model).then((data) => {
        this.props.history.push("/game");
      });
    }
  };

  render() {
    return (
      <div className="form-container modal">
        <div className="authentication-form">
          <div className="authentication-title">
            <h3>Register For Play Game</h3>
          </div>
          {this.props.error !== undefined && (
            <p className="error">{this.props.error}</p>
          )}
          <form id="form" onSubmit={this.authenticateUser} className="modal-content">
            <div className="form-group">
              <label htmlFor="name">User Name</label>
              <input
                className="form-input"
                type="name"
                id="name"
                autoComplete="on"
                value={this.state.userName}
                onChange={this.handleUserName}
              />
              <small style={{ color: "red" }}>{this.state.userNameError}</small>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                className="form-input"
                type="email"
                id="email"
                value={this.state.email}
                autoComplete="on"
                onChange={this.handleEmail}
              />
              <small style={{ color: "red" }}>{this.state.emailError}</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-input"
                type="password"
                id="password"
                autoComplete="on"
                value={this.state.password}
                onChange={this.handlePassword}
              />
              <small style={{ color: "red" }}>{this.state.passwordError}</small>
            </div>
            <div className="btn-auth">
              <button className="btn" id="ids" type="submit">
                Register 
              </button>
            </div>
          </form>
          <div className="authentication-footer">
            <small>Already have an account? </small>
            <Link to="/Login">
              <br /> <span style={{cursor:'pointer'}}>Login</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
