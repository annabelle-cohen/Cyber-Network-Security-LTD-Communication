import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function ForgotPasswordForm({
  onButtonClick,
  onButtonChangePassClick,
  resetPassword,
  isSuccess,
}) {
  const classes = useStyles();
  const [Email, setEmail] = React.useState("");
  const [RecieveCode, setRecieveCode] = React.useState("");
  const [ConfirmCode, setConfirmCode] = React.useState("");
  const [isEmailSent, setEmailSent] = React.useState(false);
  const [isDiabled, setDiabled] = React.useState(false);
  const [isMatchCode, setMatchCode] = React.useState(false);
  const [Password, setPassword] = React.useState("");
  const [ConfirmPassword, setConfirmPassword] = React.useState("");
  const [eqalMessage, setEqalMessage] = React.useState("");
  const [notEqalMessage, setnotEqalMessage] = React.useState("");
  const [isValid, setValid] = React.useState("false");
  const [isNotValid, setIsNotValid] = React.useState("false");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const handleConfirmCode = (event) => {
    setConfirmCode(event.target.value);
  };
  const handleRecieveCode = (event) => {
    setRecieveCode(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleButtonClick = () => onButtonClick(Email);
  const handleButtonPassClick = () => onButtonChangePassClick(Email, Password);

  useEffect(() => {
    if (Email !== "") {
      setDiabled(false);
    } else {
      setDiabled(true);
    }

    if (resetPassword !== "") {
      setEmailSent(true);
    }

    if (
      ConfirmCode === RecieveCode &&
      ConfirmCode !== "" &&
      RecieveCode !== "" &&
      ConfirmCode === resetPassword
    ) {
      setMatchCode(true);
    } else {
      setMatchCode(false);
    }

    if (ConfirmPassword !== "") {
      if (ConfirmPassword === Password) {
        setEqalMessage("Conifirmation Succeeded");
        setValid(true);
        setIsNotValid(false);
      } else {
        setnotEqalMessage("Conifirmation Failed");
        setValid(false);
        setIsNotValid(true);
      }
    } else {
      setValid(false);
      setIsNotValid(false);
    }
  });

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      style={{ textAlign: "center", marginTop: "15px" }}
    >
      <div>
        <div
          style={{
            display: isEmailSent ? "none" : "block",
            paddingTop: "15px",
          }}
        >
          <div>
            <TextField
              id="outlined-name"
              label="Email"
              value={Email}
              onChange={handleChange}
              variant="outlined"
              style={{ display: "inline-block" }}
            />
          </div>
          <div style={{ fontSize: "13px", fontWeight: "bold" }}>
            Please enter your email for recieve reset password
          </div>
          <div>
            <Button
              variant="outlined"
              style={{ marginTop: "20px" }}
              onClick={handleButtonClick}
              disabled={isDiabled}
            >
              Send Email
            </Button>
          </div>
        </div>
        <div style={{ display: isEmailSent ? "block" : "none" }}>
          <div
            style={{ fontSize: "13px", fontWeight: "bold", paddingTop: "15px" }}
          >
            Please enter confirmation code
          </div>
          <div>
            <TextField
              id="outlined-name"
              label="Recieve Code"
              value={RecieveCode}
              type="text"
              onChange={handleRecieveCode}
              variant="outlined"
              disabled={isMatchCode}
            />
          </div>
          <div>
            <TextField
              id="outlined-name"
              label="Confirm Code"
              value={ConfirmCode}
              type="text"
              onChange={handleConfirmCode}
              disabled={isMatchCode}
              variant="outlined"
            />
          </div>
          <div style={{ display: isMatchCode ? "block" : "none" }}>
            <div>
              <TextField
                id="outlined-name"
                label="Password"
                value={Password}
                type="password"
                onChange={handleChangePassword}
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                id="outlined-name"
                label="Confirm Password"
                value={ConfirmPassword}
                type="password"
                onChange={handleConfirmPassword}
                variant="outlined"
              />
            </div>
            <div
              style={{ display: isValid ? "block" : "none", color: "green" }}
            >
              <img
                style={{ width: "20px", height: "20px" }}
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUwNy4yIDUwNy4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDcuMiA1MDcuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGNpcmNsZSBzdHlsZT0iZmlsbDojMzJCQTdDOyIgY3g9IjI1My42IiBjeT0iMjUzLjYiIHI9IjI1My42Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMEFBMDZFOyIgZD0iTTE4OC44LDM2OGwxMzAuNCwxMzAuNGMxMDgtMjguOCwxODgtMTI3LjIsMTg4LTI0NC44YzAtMi40LDAtNC44LDAtNy4yTDQwNC44LDE1MkwxODguOCwzNjh6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTI2MCwzMTAuNGMxMS4yLDExLjIsMTEuMiwzMC40LDAsNDEuNmwtMjMuMiwyMy4yYy0xMS4yLDExLjItMzAuNCwxMS4yLTQxLjYsMEw5My42LDI3Mi44DQoJCWMtMTEuMi0xMS4yLTExLjItMzAuNCwwLTQxLjZsMjMuMi0yMy4yYzExLjItMTEuMiwzMC40LTExLjIsNDEuNiwwTDI2MCwzMTAuNHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM0OC44LDEzMy42YzExLjItMTEuMiwzMC40LTExLjIsNDEuNiwwbDIzLjIsMjMuMmMxMS4yLDExLjIsMTEuMiwzMC40LDAsNDEuNmwtMTc2LDE3NS4yDQoJCWMtMTEuMiwxMS4yLTMwLjQsMTEuMi00MS42LDBsLTIzLjItMjMuMmMtMTEuMi0xMS4yLTExLjItMzAuNCwwLTQxLjZMMzQ4LjgsMTMzLjZ6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
              />{" "}
              {eqalMessage}
            </div>
            <div
              style={{ display: isNotValid ? "block" : "none", color: "red" }}
            >
              <img
                style={{ width: "20px", height: "20px" }}
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDU1LjExMSA0NTUuMTExIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTUuMTExIDQ1NS4xMTE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0UyNEM0QjsiIGN4PSIyMjcuNTU2IiBjeT0iMjI3LjU1NiIgcj0iMjI3LjU1NiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0QxNDAzRjsiIGQ9Ik00NTUuMTExLDIyNy41NTZjMCwxMjUuMTU2LTEwMi40LDIyNy41NTYtMjI3LjU1NiwyMjcuNTU2Yy03Mi41MzMsMC0xMzYuNTMzLTMyLjcxMS0xNzcuNzc4LTg1LjMzMw0KCWMzOC40LDMxLjI4OSw4OC4xNzgsNDkuNzc4LDE0Mi4yMjIsNDkuNzc4YzEyNS4xNTYsMCwyMjcuNTU2LTEwMi40LDIyNy41NTYtMjI3LjU1NmMwLTU0LjA0NC0xOC40ODktMTAzLjgyMi00OS43NzgtMTQyLjIyMg0KCUM0MjIuNCw5MS4wMjIsNDU1LjExMSwxNTUuMDIyLDQ1NS4xMTEsMjI3LjU1NnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzMxLjM3OCwzMzEuMzc4Yy04LjUzMyw4LjUzMy0yMi43NTYsOC41MzMtMzEuMjg5LDBsLTcyLjUzMy03Mi41MzNsLTcyLjUzMyw3Mi41MzMNCgljLTguNTMzLDguNTMzLTIyLjc1Niw4LjUzMy0zMS4yODksMGMtOC41MzMtOC41MzMtOC41MzMtMjIuNzU2LDAtMzEuMjg5bDcyLjUzMy03Mi41MzNsLTcyLjUzMy03Mi41MzMNCgljLTguNTMzLTguNTMzLTguNTMzLTIyLjc1NiwwLTMxLjI4OWM4LjUzMy04LjUzMywyMi43NTYtOC41MzMsMzEuMjg5LDBsNzIuNTMzLDcyLjUzM2w3Mi41MzMtNzIuNTMzDQoJYzguNTMzLTguNTMzLDIyLjc1Ni04LjUzMywzMS4yODksMGM4LjUzMyw4LjUzMyw4LjUzMywyMi43NTYsMCwzMS4yODlsLTcyLjUzMyw3Mi41MzNsNzIuNTMzLDcyLjUzMw0KCUMzMzkuOTExLDMwOC42MjIsMzM5LjkxMSwzMjIuODQ0LDMzMS4zNzgsMzMxLjM3OHoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
              />{" "}
              {notEqalMessage}
            </div>
            <div>
              <Button
                variant="outlined"
                style={{ marginTop: "20px" }}
                disabled={isValid && !isSuccess ? false : true}
                onClick={handleButtonPassClick}
              >
                Change Password
              </Button>
            </div>
          </div>
          <div style={{ display: isMatchCode ? "none" : "block" }}>
            <div style={{ color: "gray" }}>
              Didn't recieve any email?
              <div>
                <Link style={{ color: "blue", textDecoration: "underline" }}>
                  Click here!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
