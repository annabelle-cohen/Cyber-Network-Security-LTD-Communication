import React, { Component } from "react";
import { saveUser } from "../Actions/saveUser";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CustomizedSnackbarsError from "../Style/ErrorAlert";
import ForgotPasswordForm from "../SignInWithMaterialUI/ForgotPasswordForm";
import CustomizedSnackbars from "../Style/SuccessAlert";
import FacebookCircularProgress from "../Style/ProgressBar";
import "./form.css";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFailedAlert: false,
      isSuccessAlert: false,
      isInProgress: false,
      errorMessage: "",
      email: "",
      resetPassword: "",
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

  render() {
    const handleButtonClick = async (Email) => {
      console.log(Email);
      await fetch("https://localhost:8443/acs/users/forgotPassword/" + Email)
        .then((response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const user = d;
              this.setState({
                resetPassword: user.password,
                errorMessage: "",
                isInProgress: false,
                isSuccessAlert: false,
                isFailedAlert: false,
              });
              console.log(d);
              this.props.saveUser({
                isLoggedIn: false,
                user: {
                  email: user.email,
                  password: user.password,
                  isBlocked: user.isBlocked,
                  isResetChanged: user.isResetChanged,
                  history: user.history,
                },
              });
            });
          } else {
            console.log("Error:", response);
            response.json().then((x) => {
              this.setState({
                errorMessage: x.message,
                isInProgress: false,
                isSuccessAlert: false,
                isFailedAlert: true,
              });
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error.data);
        });
    };

    const handleButtonPassClick = async (Email, Password) => {
      console.log(Email);
      console.log(Password);

      this.setState({
        isInProgress: true,
      });

      const user = {
        email: Email,
        password: Password,
        isBlocked: false,
        isResetChanged: true,
        history: {},
      };
      if(!this.props.user.user.isBlocked){
      const dataJson = JSON.stringify(user);
      await fetch("https://localhost:8443/acs/users/" + Email, {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: dataJson,
      }).then(
        (response) => {
          if (response.status === 200) {
            console.log("200ok");
            this.setState({
              isFailedAlert: false,
              isSuccessAlert: true,
              isInProgress: false,
              errorMessage: "",
              email: Email,
            });
          } else {
            response.json().then((x) => {
              this.setState({
                isFailedAlert: true,
                isSuccessAlert: false,
                isInProgress: false,
                errorMessage: x.message,
                email: Email,
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
        this.setState({
          isFailedAlert: true,
          isSuccessAlert: false,
          isInProgress: false,
          errorMessage: "User is blocked for some reason, Please contact our support center",
          email: Email,
        });  
      }
    };

    return (
      <div>
        {" "}
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
          style={{
            display: this.state.isSuccessAlert ? "block" : "none",
            textAlign: "center",
          }}
        >
          <CustomizedSnackbars></CustomizedSnackbars>
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
          Forgot Password
        </div>
        <div
          style={{
            background: "rgb(255, 255, 255, 0.8)",
            marginRight: "38%",
            marginLeft: "38%",
            paddingBottom: "20px",
          }}
        >
          <ForgotPasswordForm
            onButtonClick={handleButtonClick}
            onButtonChangePassClick={handleButtonPassClick}
            resetPassword={this.state.resetPassword}
            isSuccess={this.state.isSuccessAlert}
          ></ForgotPasswordForm>
        </div>
        <div style={{ display: this.state.isInProgress ? "block" : "none" }}>
          <FacebookCircularProgress></FacebookCircularProgress>
        </div>
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

const ForgotPassword1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

export default ForgotPassword1;
