import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import PersonalInfo from "./Personalnfo"
import CustomersTables from "./CustomersTable"
import AddCustomerToLtd from "./AddCustomer"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HomeMenuBar({userDetails,onPasswordChangeButton,newPassword}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          style={{marginLeft:"3.5%"}}
        >
          <Tab label="My Profile" icon={<AccountCircleIcon />} {...a11yProps(0)} style={{width:"550px"}}/>
          <Tab label="LTD Customers" icon={<SupervisorAccountIcon />} {...a11yProps(1)} style={{width:"550px"}}/>
          <Tab label="Add New Customer" icon={<PersonAddIcon />} {...a11yProps(2)} style={{width:"550px"}}/>
          <Tab label="Upgrade Customer Package" icon={<EditIcon />} {...a11yProps(3)} style={{width:"550px"}} />
    
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <div style={{textAlign:"center"}}>
        <PersonalInfo UserDetails={userDetails} onPasswordChangeButton={onPasswordChangeButton} ></PersonalInfo>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomersTables></CustomersTables>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AddCustomerToLtd isUpdate={false}></AddCustomerToLtd>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <AddCustomerToLtd isUpdate={true}></AddCustomerToLtd>
      </TabPanel>

    </div>
  );
}
