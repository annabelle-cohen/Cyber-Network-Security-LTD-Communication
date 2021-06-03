import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function SignInForm({ onButtonClick }) {
  const classes = useStyles();
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [isDisabled, setDiabled] = React.useState(true);
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleButtonClick = () => onButtonClick(Email, Password);
  useEffect(() => {
    if (Email !== "" && Password !== "") {
      setDiabled(false);
    } else {
      setDiabled(true);
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
        <div>
          <TextField
            id="outlined-name"
            label="Email"
            value={Email}
            onChange={handleChange}
            variant="outlined"
          />
        </div>
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
          <Button
            variant="outlined"
            style={{ marginTop: "20px" }}
            onClick={handleButtonClick}
            disabled={isDisabled ? true : false}
          >
            Sign In
          </Button>
        </div>
      </div>
    </form>
  );
}
