import React, { Component } from "react";
import { saveUser } from "../Actions/saveUser";
import { connect } from "react-redux";
import SignInUp from "../SignInWithMaterialUI/SignUpForm";
import FacebookCircularProgress from "../Style/ProgressBar";
import CustomizedSnackbarsError from "../Style/ErrorAlert";
import CustomizedSnackbars from "../Style/SuccessAlert";
import "./form.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      isInProgress: false,
      isSuccessAlert: false,
      isFailedAlert: false,
      loginFaild: 0,
    };
  }

  render() {
    const handleButtonClick = async (Email, Password) => {
      console.log(Email);
      console.log(Password);
      this.setState({
        isInProgress: true,
      });

      const user = {
        email: Email,
        password: Password,
        isBlocked: false,
        isResetChanged: false,
        history: {},
      };

      const dataJson = JSON.stringify(user);
      await fetch("https://localhost:8443/acs/createUser", {
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
              console.log(d);
              this.setState({
                errorMessage: "",
                isInProgress: false,
                isSuccessAlert: true,
                isFailedAlert: false,
              });
            });
          } else {
            response.json().then((x) => {
              this.setState({
                errorMessage: x.message,
                isInProgress: false,
                isSuccessAlert: false,
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
              marginTop: "30px",
            }}
          >
            Sign Up
          </div>
          <SignInUp
            onButtonClick={handleButtonClick}
            isSuccess={this.state.isSuccessAlert}
          ></SignInUp>
          <div style={{ display: this.state.isInProgress ? "block" : "none" }}>
            <FacebookCircularProgress></FacebookCircularProgress>
          </div>
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

const SignUp1 = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUp1;
