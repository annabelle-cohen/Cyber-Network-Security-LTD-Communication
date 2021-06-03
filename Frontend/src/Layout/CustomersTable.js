import React,{useState,useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomersTables() {
  const classes = useStyles();
  const [customerArray,setCustomersArray]=useState([]);
  const [isFirst,setFirst]=useState(false);

  useEffect(async () => {

    if(!isFirst){

      
        await fetch("https://localhost:8443/acs/admin/customer")
        .then((response) => {
          if (response.status === 200) {
            response.json().then((d) => {
              const Customers = d;
              console.log(Customers);
              setCustomersArray(Customers);     
            });
          } else {
            console.log("Error:", response);
            response.json().then((d) => {
              console.log("Errordata", d);
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error.data);
        });

        setFirst(true);
    }
   
  })

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell align="left">Phone Number</StyledTableCell>
            <StyledTableCell align="left">City</StyledTableCell>
            <StyledTableCell align="left">Street</StyledTableCell>
            <StyledTableCell align="left">Home Number</StyledTableCell>
            <StyledTableCell align="left">Zip Code</StyledTableCell>
            <StyledTableCell align="left">Internet GB</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customerArray.length === 0?<div>
              No Customers In LTD Communication
          </div>:customerArray.map((row) => (
            <StyledTableRow key={row.userName}>
              <StyledTableCell component="th" scope="row">
                {row.userName}
              </StyledTableCell>
              <StyledTableCell align="left">{row.phone}</StyledTableCell>
              <StyledTableCell align="left">{row.city}</StyledTableCell>
              <StyledTableCell align="left">{row.street}</StyledTableCell>
              <StyledTableCell align="left">{row.homeNumber}</StyledTableCell>
              <StyledTableCell align="left">{row.zipCode}</StyledTableCell>
              <StyledTableCell align="left">{row.internetGB}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
