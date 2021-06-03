import React from "react";
import { NavLink } from "react-router-dom";

const SignOutLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/signIn">Login</NavLink>
      </li>
      <li>
        <NavLink to="/signUp">Sign Up</NavLink>
      </li>
    </ul>
  );
};

export default SignOutLinks;
