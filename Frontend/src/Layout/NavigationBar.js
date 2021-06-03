import React from "react";
import { Link } from "react-router-dom";
import SignInLinks from "./signedInLink";
import SignOutLinks from "./signedOutLink";
import { connect } from "react-redux";
import { Component } from "react";
import "./styleNavBar.css";

class NavBar1 extends Component {
  render() {
    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to={this.props.user.isLoggedIn ? "/Home":"/"} className="brand-logo">
            LTD Comminication
          </Link>
          <ul className="right">
            {this.props.user.isLoggedIn ? <SignInLinks /> : <SignOutLinks />}
          </ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  return { user: state.user };
};

function mapDispatchToProps() {
  return {};
}

const NavBar = connect(mapStateToProps, mapDispatchToProps)(NavBar1);

export default connect()(NavBar);
