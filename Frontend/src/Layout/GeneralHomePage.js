import React, { Component } from "react";
import CustomizedSnackbarsError from "../Style/ErrorAlert";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import HomeMenuBar from "./HomeMenu"
import { saveUser } from "../Actions/saveUser";
import { connect } from "react-redux";

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
          newPassword:"",
          isFailedAlert: false,
          errorMessage: "",
        }
        
    this.props.saveUser({
      isLoggedIn: this.props.user.isLoggedIn,
      user: {
        email: this.props.user.user.email,
        password: this.props.user.user.password,
        isBlocked: this.props.user.user.isBlocked,
        isResetChanged: this.props.user.user.isResetChanged,
        history: this.props.user.user.history,
      },
    });
    }

    render(){

      const handleSaveChanePassword = async (Password) => {    

    const user = {
      email: this.props.user.user.email,
      password: Password,
      isBlocked: false,
      isResetChanged: false,
      history: {},
    };

    const dataJson = JSON.stringify(user);
    await fetch("https://localhost:8443/acs/users/" + this.props.user.user.email, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: dataJson,
    }).then(
      (response) => {
        if (response.status === 200) {
          console.log("in 200 ok")
          this.props.saveUser({
            isLoggedIn: this.props.user.isLoggedIn,
            user: {
              email: this.props.user.user.email,
              password: Password,
              isBlocked: this.props.user.user.isBlocked,
              isResetChanged: this.props.user.user.isResetChanged,
              history: this.props.user.user.history,
            },
          });

          this.setState({
            newPassword:"",
            isFailedAlert: false,
            errorMessage: "",
          })
      
        } else {
          response.json().then((x) => {
            this.setState({
              newPassword:"",
              isFailedAlert: true,
              errorMessage: x.message,
            })
          });
        }
      },
      (error) => {
        console.log(error);
        console.log("in error");
      }
    );
    }

        return(
            <React.Fragment>
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
            <CssBaseline />
            <Container maxWidth="lg">
              <Typography component="div" style={{ backgroundColor: '#ffff', height: '100vh' }} >
              <HomeMenuBar userDetails={this.props.user.user} onPasswordChangeButton={handleSaveChanePassword} ></HomeMenuBar>
              </Typography>

            </Container>
          </React.Fragment>
        )
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

const HomePage1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);


export default HomePage1;