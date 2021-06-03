import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomizedSnackbarsError from "../Style/ErrorAlert";
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}


function ZipCodeMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function BasicTextFields({ isUpdate }) {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [zipCode, setZipCode] = useState('0123456');
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [homeNumber, setHomeNumber] = useState(0);
  const [choice, setChoice] = useState(50);
  const [isValid, setValid] = useState(false);
  const [isSubmited, setSubmited] = useState(false);
  const [defaultChoice, setDefault] = useState("50 GB")
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userDetails, setDetails] = useState({});

  useEffect(() => {

    if (userName !== "" && phoneNumber.length >= 10 && zipCode.length === 7 && city !== "" && homeNumber > 0) {
      setValid(true)
    } else {
      setValid(false)
    }
  })

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setUserName(e.target.value)
  }

  const handleCityChange = (e) => {
    console.log(e.target.value);
    setCity(e.target.value)
  }
  const handleStreetChange = (e) => {
    console.log(e.target.value);
    setStreet(e.target.value)
  }

  const handleHomeNumber = (e) => {
    setHomeNumber(e.target.value);
  }

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  }

  const cleanFields = () => {
    setUserName("");
    setCity("");
    setStreet("");
    setHomeNumber(0);
    setChoice(50);
  }

  const handleAddCustomer = async () => {
    const user = {
      userName: userName,
      phone: phoneNumber,
      city: city,
      street: street,
      homeNumber: homeNumber,
      zipCode: zipCode,
      internetGB: choice
    };

    const dataJson = JSON.stringify(user);
    await fetch("https://localhost:8443/acs/createCustomer", {
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
            console.log("200ok")
            setErrorMessage("");
            setError(false);
            setSubmited(true);
            setDetails(d);
          });
        } else {
          response.json().then((x) => {
            console.log("not 200ok")
            setErrorMessage(x.message);
            setError(true);
          });
        }
      },
      (error) => {
        console.log(error);
        console.log("in error");
      }
    );

    cleanFields();
  }

  const handleUpdateCustomer = async () => {
    const user = {
      userName: userName,
      phone: phoneNumber,
      city: city,
      street: street,
      homeNumber: homeNumber,
      zipCode: zipCode,
      internetGB: choice
    };

    const dataJson = JSON.stringify(user);
    await fetch("https://localhost:8443/acs/customers/" + phoneNumber, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: dataJson,
    }).then(
      (response) => {
        if (response.status === 200) {
          console.log("200ok")
          setErrorMessage("");
          setError(false);

        } else {
          response.json().then((x) => {
            setErrorMessage(x.message);
            setError(true);

          });
        }
      },
      (error) => {
        console.log(error);
        console.log("in error");
      }
    );


    cleanFields();

  }

  const handleInternetGBChange = (e) => {
    setChoice(e.target.value);
  }
  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    console.log(phoneNumber);
  }
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div style={{
          display: isError ? "block" : "none",
          textAlign: "center",
        }}
        >
          <CustomizedSnackbarsError
            errorMessage={errorMessage}
          ></CustomizedSnackbarsError>
        </div>
        <div style={{ marginLeft: "30%", display: "inline-block" }}>
          <TextField id="outlined-basic" label="Customer's full name" variant="outlined" value={userName} onChange={handleNameChange} />
        </div>
        <div style={{ display: "inline-block" }}>
          <TextField id="outlined-basic" label="Customer's city" variant="outlined" value={city} onChange={handleCityChange} />
        </div>
        <br></br>
        <div style={{ marginLeft: "30%", display: "inline-block" }}>
          <FormControl>
            <InputLabel htmlFor="formatted-text-mask-input">Customer's phone number</InputLabel>
            <Input
              onChange={handlePhoneChange}
              name="textmask"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom}
            />
          </FormControl>
        </div>
        <div style={{ display: "inline-block" }}>
          <TextField id="outlined-basic" label="Customer's street" variant="outlined" value={street} onChange={handleStreetChange} />
        </div>
        <br></br>
        <div style={{ marginLeft: "30%", display: "inline-block" }}>
          <FormControl>
            <InputLabel htmlFor="formatted-text-mask-input">Customer's zip code</InputLabel>
            <Input
              onChange={handleZipCodeChange}
              name="textmask"
              id="formatted-text-mask-input"
              inputComponent={ZipCodeMaskCustom}
            />
          </FormControl>
        </div>
        <div style={{ display: "inline-block" }}>
          <TextField id="outlined-basic" label="Customer's home number" variant="outlined" type="number" onChange={handleHomeNumber} />
        </div>
        <div style={{ marginLeft: "50%" }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Internet GB</FormLabel>
            <RadioGroup aria-label="Internet-gb" name="InternetGB" defaultValue="50" onChange={handleInternetGBChange}>
              <FormControlLabel value="50" control={<Radio />} label="50 GB" />
              <FormControlLabel value="100" control={<Radio />} label="100 GB" />
              <FormControlLabel value="500" control={<Radio />} label="500 GB" />
              <FormControlLabel value="1000" control={<Radio />} label="1000GB" />
            </RadioGroup>
          </FormControl>
        </div>
        <br></br>
        <div style={{ display: isUpdate ? "none" : "block", marginLeft: "42%" }}>
          <Button variant="contained" color="primary" size="medium" className={classes.margin} onClick={handleAddCustomer} disabled={isValid ? false : true}>
            Add Customer
        </Button>
        </div>
        <div style={{ display: isUpdate ? "block" : "none", marginLeft: "42%" }}>
          <Button variant="contained" color="primary" size="medium" className={classes.margin} onClick={handleUpdateCustomer} disabled={isValid ? false : true}>
            Update Customer
         </Button>

        </div>
      </form>
      {/**xss Attack */}
      <div style={{ marginLeft: "30%", display: isSubmited && userDetails != {} ? "block" : "none" }}>
        <div style={{ color: "blue", fontSize: "22", fontWeight: "bold", textDecoration: "underline" }}>Customer Name:</div>
        <span dangerouslySetInnerHTML={{ __html: userDetails.userName }}></span>
        <div style={{ color: "blue", fontSize: "22", fontWeight: "bold", textDecoration: "underline" }}>Customer phone:</div>
        <span dangerouslySetInnerHTML={{ __html: userDetails.phone }}></span>
        <div style={{ color: "blue", fontSize: "22", fontWeight: "bold", textDecoration: "underline" }}>Customer Address:</div>
        <div><div style={{ display: "inline-block", fontWeight: "bold" }}>City.</div><span dangerouslySetInnerHTML={{ __html: userDetails.city }}></span> &nbsp; <div style={{ display: "inline-block", fontWeight: "bold" }}>Street.</div><span dangerouslySetInnerHTML={{ __html: userDetails.street }}></span> &nbsp; <div style={{ display: "inline-block", fontWeight: "bold" }}>Home Number.</div><span dangerouslySetInnerHTML={{ __html: userDetails.homeNumber }}></span> &nbsp; <div style={{ display: "inline-block", fontWeight: "bold" }}>Zip Code.</div><span dangerouslySetInnerHTML={{ __html: userDetails.zipCode }}></span></div>
        <div style={{ color: "blue", fontSize: "22", fontWeight: "bold", textDecoration: "underline" }}>Customer internetGB Pakcage:</div>
        <span dangerouslySetInnerHTML={{ __html: userDetails.internetGB }}></span>
      </div>
      {/**xss Attack solution*/}
      {/* <div style={{ marginLeft: "30%", display: isSubmited && userDetails != {} ? "block" : "none" }}>
        <div style={{ color: "blue", fontSize: "22", fontWeight: "bold", textDecoration: "underline" }}>Customer Name:</div>
        <div>{userDetails.userName}</div>
        <div style={{ color: "blue", fontSize: "22", fontWeight: "bold", textDecoration: "underline" }}>Customer phone:</div>
        <div>{userDetails.phone}</div>
        <div style={{ color: "blue", fontSize: "22", fontWeight: "bold", textDecoration: "underline" }}>Customer Address:</div>
        <div><div style={{ display: "inline-block", fontWeight: "bold" }}>City.</div>{userDetails.city} &nbsp; <div style={{ display: "inline-block", fontWeight: "bold" }}>Street.</div>{userDetails.street}  &nbsp; <div style={{ display: "inline-block", fontWeight: "bold" }}>Home Number.</div>{userDetails.homeNumber} &nbsp; <div style={{ display: "inline-block", fontWeight: "bold" }}>Zip Code.</div>{userDetails.zipCode} </div>
        <div style={{ color: "blue", fontSize: "22", fontWeight: "bold", textDecoration: "underline" }}>Customer internetGB Pakcage:</div>
        <div>{userDetails.internetGB}</div>
      </div>*/}
    </div>
  );
}
