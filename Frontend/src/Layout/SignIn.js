import React, { Component } from "react";
import SignInForm from "../SignInWithMaterialUI/SignInForm";
import { saveUser } from "../Actions/saveUser";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import CustomizedSnackbarsError from "../Style/ErrorAlert";
import FacebookCircularProgress from "../Style/ProgressBar";
import "./form.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginSucces: false,
      errorMessage: "",
      isInProgress: false,
      isFailedAlert: false,
      numberOfFaild:0,
      first:false
    };
    this.props.saveUser({
      isLoggedIn: false,
      user: {
        email: this.props.user.user.email,
        password: this.props.user.user.password,
        isBlocked: this.props.user.user.isBlocked,
        isResetChanged: this.props.user.user.isResetChanged,
        history: this.props.user.user.history,
      },
    });
  }

  isRedirectToHome(){
    if(this.props.user.isLoggedIn){
      return <Redirect to="/Home"></Redirect>
    }
  }

  render() {
    const handleButtonClick = async (Email, Password) => {

      if(this.state.numberOfFaild < 3){
        console.log("in if of != 3");
      console.log(Email);
      console.log(Password);

      this.setState({
        isInProgress: true,
      });

      const main = "https://localhost:8443";
      const Login = main + "/acs/users/login/" + Email;

      const user = {
        email: Email,
        password: Password,
        isBlocked: this.props.user.user.isBlocked,
        isResetChanged: this.props.user.user.isResetChanged,
        history: this.props.user.user.history,
      };

      const dataJson = JSON.stringify(user);
      await fetch(Login, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: dataJson,
      }).then(
        (response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              console.log("200ok");
              if(!d.isBlocked){
              this.props.saveUser({
                isLoggedIn: true,
                user: {
                  email: d.email,
                  password: Password,
                  isBlocked: d.isBlocked,
                  isResetChanged: d.isResetChanged,
                  history: d.history,
                  numberOfFaild:0
                },
              });

              this.setState({
                isLoginSucces: true,
                errorMessage: "",
                isInProgress: false,
                isFailedAlert: false,
              });
            }else{
              this.setState({
                isLoginSucces: false,
                errorMessage: "User Blocked,Please contact our support center",
                isInProgress: false,
                isFailedAlert: true, 
            })
            }
            });
          } else {
            response.json().then((x) => {
              var countFaild = this.state.numberOfFaild+1;
              console.log(this.state.numberOfFaild);
              this.setState({
                isLoginSucces: false,
                errorMessage: x.message,
                isInProgress: false,
                isFailedAlert: true,
                numberOfFaild:countFaild
              });
            });
          }
        },
        (error) => {
          console.log(error);
          console.log("in error");
        }
      );
      }else{

        if(!this.state.first){
          console.log("in if of first");
          const main = "https://localhost:8443";
          const blockUser = main + "/acs/usersBlocks/" + Email;

          const user = {
            email: Email,
            password: Password,
            isBlocked: true,
            isResetChanged: this.props.user.user.isResetChanged,
            history: this.props.user.user.history,
          };



          const dataJson = JSON.stringify(user);
          await fetch(blockUser, {
            method: "PUT", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
              credentials: "include",
            },
            body: dataJson,
          }).then(
            (response) => {
              if (response.status === 200) {
                response.json().then((d) => {
                  console.log("200ok");
                  this.props.saveUser({
                    isLoggedIn: false,
                    user: {
                      email: d.email,
                      password: d.password,
                      isBlocked: d.isBlocked,
                      isResetChanged: d.isResetChanged,
                      history: d.history,
                    },
                  });
    
                  this.setState({
                    isLoginSucces: false,
                    errorMessage: "User Blocked,Please contact our support center",
                    isInProgress: false,
                    isFailedAlert: true,
                    numberOfFaild:3,
                    first:true
                  });
                });
              } else {
                response.json().then((x) => {
                  this.setState({
                    isLoginSucces: false,
                    errorMessage: x.message,
                    isInProgress: false,
                    isFailedAlert: true,
                  });
                });
              }
            },
            (error) => {
              console.log(error);
              console.log("in error");
            }
          );

        }

      }
    };
    return (
      <div>
        <div
          style={{
            display: this.state.isFailedAlert ? "block" : "none",
            textAlign: "center",
          }}
        >
          <CustomizedSnackbarsError
            errorMessage={this.state.errorMessage}
          ></CustomizedSnackbarsError>
        </div>
        <div
          className="div-header"
          style={{
            textAlign: "center",
            marginTop: "30px",
            fontSize: "35px",
            color: "white",
          }}
        >
          {" "}
          Welcome To LTD Communication
        </div>
        <div
          style={{
            background: "rgb(255, 255, 255, 0.8)",
            marginRight: "38%",
            marginLeft: "38%",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
              color: "black",
              marginTop: "60px",
            }}
          >
            Sign In
          </div>
          <SignInForm onButtonClick={handleButtonClick}></SignInForm>
          <div
            style={{ color: "gray", textAlign: "center", marginTop: "15px" }}
          >
            Forgot Password?
            <Link
              to="/forgotPassword"
              style={{
                color: "blue",
                textDecoration: "underline",
              }}
            >
              {" "}
              Click here!
            </Link>
          </div>
        </div>
        <div style={{ display: this.state.isInProgress ? "block" : "none" }}>
          <FacebookCircularProgress></FacebookCircularProgress>
        </div>
        {this.isRedirectToHome()}
      </div>
    );
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

const SignIn1 = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignIn1;
