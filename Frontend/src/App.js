import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./Layout/NavigationBar";
import SignIn from "./Layout/SignIn";
import SignUp from "./Layout/SignUp";
import ForgotPassword from "./Layout/ForgotPassword";
import HomePage from "./Layout/GeneralHomePage"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signIn" component={SignIn} />
          <Route exact path="/signUp" component={SignUp} />
          <Route
            exact
            path="/forgotPassword"
            component={ForgotPassword}
          ></Route>
          <Route exact path="/Home" component={HomePage}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
