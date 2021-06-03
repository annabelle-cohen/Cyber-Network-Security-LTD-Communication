import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { saveUser } from "../Actions/saveUser";

class SignInLinks extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.saveUser({ user: {}, isLoggedIn: false });
  }

  renderUserPage() {
    const user = this.props.user;
    return (
      <li>
        <NavLink onClick={this.onClick} to="/signin">
          Log Out
        </NavLink>
      </li>
    );
  }

  loggedIn() {
    if (this.props.user.isLoggedIn) {
      return (
        <ul className="right">
          {/* <li><NavLink to='/' className='btn btn-floating green lighten-1'>{this.createIconLetters()}</NavLink></li> */}
          <li>{this.renderUserPage()}</li>
        </ul>
      );
    }
    return "";
  }

  render() {
    return this.loggedIn();
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    saveUser: (user) => dispatch(saveUser(user)),
  };
}

const SignInLink1 = connect(mapStateToProps, mapDispatchToProps)(SignInLinks);

export default SignInLink1;
