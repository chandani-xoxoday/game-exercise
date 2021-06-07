import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
  render() {
    return (
      <div className="header">
        {localStorage.APDsession !== undefined && (
          <div className="logout" onClick={() => this.props.logout(this.props)}>
            <h5>Logout</h5>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
