import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function PersonalInfo({ UserDetails, onPasswordChangeButton }) {
  const [isChangedPasswordClicked, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [tempPass, setTemp] = useState("");
  const [eqalMessage, setEqalMessage] = useState("");
  const [notEqalMessage, setnotEqalMessage] = useState("");
  const [isValid, setValid] = useState("false");
  const [isNotValid, setIsNotValid] = useState("false");
  useEffect(() => {
    if (newPassword !== "") {
      if (currentPassword === UserDetails.password) {
        setEqalMessage("Valid");
        setValid(true);
        setIsNotValid(false);
      } else {
        if (newPassword === UserDetails.password) {
          setChangePassword(false);
          setNewPassword("");
          setCurrentPassword("");
        } else {
          setnotEqalMessage("Inavlid Current Password");
          setValid(false);
          setIsNotValid(true);
        }
      }
    } else {
      setValid(false);
      setIsNotValid(false);
    }
  });
  const classes = useStyles();

  const handleOnChangePassword = () => {
    setChangePassword(true);
  };

  const handleInputCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };
  const handleNewPassword = (event) => {
    setNewPassword(event.currentTarget.value);
    setTemp(newPassword);
  };

  const handleSaveChanePassword = () => onPasswordChangeButton(newPassword);

  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">User Email</InputLabel>
        <Input
          id="input-with-icon-adornment"
          value={UserDetails.email}
          disabled={true}
          style={{ width: "300px" }}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="User Password"
        value={UserDetails.password}
        disabled={true}
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VisibilityIcon></VisibilityIcon>
            </InputAdornment>
          ),
        }}
      />
      <div
        style={{
          marginLeft: "50%",
          display: !isChangedPasswordClicked ? "block" : "none",
        }}
      >
        <div
          style={{
            display: "inline-block",
            marginRight: "10px",
            fontWeight: "bold",
          }}
        >
          Change Password
        </div>
        <div style={{ display: "inline-block" }}>
          <Fab
            color="primary"
            aria-label="edit"
            onClick={handleOnChangePassword}
          >
            <EditIcon />
          </Fab>
        </div>
      </div>
      <div
        style={{
          display: !isChangedPasswordClicked ? "none" : "block",
          marginTop: "30px",
        }}
      >
        <Divider variant="middle" />
        <div style={{ marginTop: "20px" }}>
          <TextField
            id="outlined-name"
            label="Current Password"
            value={currentPassword}
            type="password"
            onChange={handleInputCurrentPassword}
            variant="outlined"
          />
        </div>
        <div style={{ marginTop: "13px" }}>
          <TextField
            id="outlined-name"
            label="New Password"
            value={newPassword}
            type="password"
            onChange={handleNewPassword}
            variant="outlined"
          />
        </div>
        <div
          style={{
            display: isValid ? "block" : "none",
            color: "green",
            marginTop: "10px",
          }}
        >
          <img
            style={{ width: "20px", height: "20px" }}
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUwNy4yIDUwNy4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDcuMiA1MDcuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGNpcmNsZSBzdHlsZT0iZmlsbDojMzJCQTdDOyIgY3g9IjI1My42IiBjeT0iMjUzLjYiIHI9IjI1My42Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMEFBMDZFOyIgZD0iTTE4OC44LDM2OGwxMzAuNCwxMzAuNGMxMDgtMjguOCwxODgtMTI3LjIsMTg4LTI0NC44YzAtMi40LDAtNC44LDAtNy4yTDQwNC44LDE1MkwxODguOCwzNjh6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTI2MCwzMTAuNGMxMS4yLDExLjIsMTEuMiwzMC40LDAsNDEuNmwtMjMuMiwyMy4yYy0xMS4yLDExLjItMzAuNCwxMS4yLTQxLjYsMEw5My42LDI3Mi44DQoJCWMtMTEuMi0xMS4yLTExLjItMzAuNCwwLTQxLjZsMjMuMi0yMy4yYzExLjItMTEuMiwzMC40LTExLjIsNDEuNiwwTDI2MCwzMTAuNHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM0OC44LDEzMy42YzExLjItMTEuMiwzMC40LTExLjIsNDEuNiwwbDIzLjIsMjMuMmMxMS4yLDExLjIsMTEuMiwzMC40LDAsNDEuNmwtMTc2LDE3NS4yDQoJCWMtMTEuMiwxMS4yLTMwLjQsMTEuMi00MS42LDBsLTIzLjItMjMuMmMtMTEuMi0xMS4yLTExLjItMzAuNCwwLTQxLjZMMzQ4LjgsMTMzLjZ6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg=="
          />{" "}
          {eqalMessage}
        </div>
        <div
          style={{
            display: isNotValid ? "block" : "none",
            color: "red",
            marginTop: "10px",
          }}
        >
          <img
            style={{ width: "20px", height: "20px" }}
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDU1LjExMSA0NTUuMTExIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTUuMTExIDQ1NS4xMTE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxjaXJjbGUgc3R5bGU9ImZpbGw6I0UyNEM0QjsiIGN4PSIyMjcuNTU2IiBjeT0iMjI3LjU1NiIgcj0iMjI3LjU1NiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0QxNDAzRjsiIGQ9Ik00NTUuMTExLDIyNy41NTZjMCwxMjUuMTU2LTEwMi40LDIyNy41NTYtMjI3LjU1NiwyMjcuNTU2Yy03Mi41MzMsMC0xMzYuNTMzLTMyLjcxMS0xNzcuNzc4LTg1LjMzMw0KCWMzOC40LDMxLjI4OSw4OC4xNzgsNDkuNzc4LDE0Mi4yMjIsNDkuNzc4YzEyNS4xNTYsMCwyMjcuNTU2LTEwMi40LDIyNy41NTYtMjI3LjU1NmMwLTU0LjA0NC0xOC40ODktMTAzLjgyMi00OS43NzgtMTQyLjIyMg0KCUM0MjIuNCw5MS4wMjIsNDU1LjExMSwxNTUuMDIyLDQ1NS4xMTEsMjI3LjU1NnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMzMxLjM3OCwzMzEuMzc4Yy04LjUzMyw4LjUzMy0yMi43NTYsOC41MzMtMzEuMjg5LDBsLTcyLjUzMy03Mi41MzNsLTcyLjUzMyw3Mi41MzMNCgljLTguNTMzLDguNTMzLTIyLjc1Niw4LjUzMy0zMS4yODksMGMtOC41MzMtOC41MzMtOC41MzMtMjIuNzU2LDAtMzEuMjg5bDcyLjUzMy03Mi41MzNsLTcyLjUzMy03Mi41MzMNCgljLTguNTMzLTguNTMzLTguNTMzLTIyLjc1NiwwLTMxLjI4OWM4LjUzMy04LjUzMywyMi43NTYtOC41MzMsMzEuMjg5LDBsNzIuNTMzLDcyLjUzM2w3Mi41MzMtNzIuNTMzDQoJYzguNTMzLTguNTMzLDIyLjc1Ni04LjUzMywzMS4yODksMGM4LjUzMyw4LjUzMyw4LjUzMywyMi43NTYsMCwzMS4yODlsLTcyLjUzMyw3Mi41MzNsNzIuNTMzLDcyLjUzMw0KCUMzMzkuOTExLDMwOC42MjIsMzM5LjkxMSwzMjIuODQ0LDMzMS4zNzgsMzMxLjM3OHoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"
          />{" "}
          {notEqalMessage}
        </div>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.margin}
          onClick={handleSaveChanePassword}
          disabled={isValid ? false : true}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
