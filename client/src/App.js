import React, { Component } from 'react';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Input, TextField, Paper, Checkbox, Button, Select, MenuItem } from '@material-ui/core';

// All the material-ui styling
const useStyles = makeStyles({
  root: {
    width: '90%',   
    margin: 'auto', 
    marginTop: '5%',
    height: '75%',
    overflow: 'auto',
  },
  button: {
    width: 50,
    height: 35,
    margin: '2%',
    marginTop: 10
  },
});

// Table formatting
const GuestTable = ({guestList, firstName, onChangeFirstName, lastName, onChangeLastName, statusDrop, onChangeStatus, status, isLocked, onChangeLock, plusOne, onChangePlusOne}) => {
  //console.log(guestList)
  const classes = useStyles()


  return (
    <Paper className={classes.root}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Guest</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Plus One?</TableCell>
            <TableCell align="center">Locked</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* table row */}
          {guestList.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">
                <Checkbox
                  name='plusOne'
                  checked={plusOne}
                  onClick={onChangePlusOne}
                />
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  name='isLocked'
                  icon={<LockIconOpen/>}
                  checkedIcon={<LockIconSolid/>}
                  checked={isLocked}
                  onClick={onChangeLock}
                />
                {/* {row.isLocked} */}
              </TableCell>
            </TableRow>
          ))}
          {/* input row */}
          <TableRow>
            <TableCell>
              <SubmitButton/>
            </TableCell>
            <TableCell align="right">
              <TextField
                label="First Name"
                name="firstName"
                onChange={onChangeFirstName}
                style={{width: 100}}
                value={firstName}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                label="Last Name"
                name="lastName"
                onChange={onChangeLastName}
                style={{width: 100}}
                value={lastName}
              />
            </TableCell>
            <TableCell align="right">
              <Select
                style={{marginTop: 15}}
                value={status}
                onChange={onChangeStatus}
                inputProps={{
                  label: 'Status',
                  name: 'status',
                  id: 'inviteStatus'
                }}
              >
                {statusDrop.map(row => (
                  <MenuItem 
                    key={row.id}
                    value={row.id}
                  >
                    {row.status}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell align="center">
              <Checkbox
                name='plusOne'
                checked={plusOne}
                onClick={onChangePlusOne}
              />
            </TableCell>
            <TableCell align="right">
              <Checkbox
                name='isLocked'
                icon={<LockIconOpen/>}
                checkedIcon={<LockIconSolid/>}
                checked={isLocked}
                onClick={onChangeLock}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  ) 
}
GuestTable.propTypes = {
  guestList:propTypes.array.isRequired,
  firstName: propTypes.string.isRequired,
  onChangeFirstName: propTypes.func.isRequired,
  lastName: propTypes.string.isRequired,
  onChangeLastName: propTypes.func.isRequired,
  statusDrop: propTypes.array.isRequired,
  status: propTypes.number.isRequired,
  onChangeStatus: propTypes.func.isRequired,
  isLocked: propTypes.bool.isRequired,
  onChangeLock: propTypes.func.isRequired,
  plusOne: propTypes.bool.isRequired,
  onChangePlusOne: propTypes.func.isRequired,
}

// Solid lock icon?
const LockIconSolid = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
  )
}

// Open lock Icon?
const LockIconOpen = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"/></svg>
  )
}

//Submit button
const SubmitButton = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Button 
      variant='contained'
      className={classes.button}
      type='submit'
      >
        Submit
      </Button>
    </React.Fragment>
  )
}

// Template for text input fields
const TextInput = (label, input) => {
  const classes = useStyles()
  
  return (
    <Input
      className={classes.textField}
      placeholder={label}
      label={label}
      inputProps={{
        'aria-label': 'description',
      }}
      {...input}
    />
  )
}
TextInput.propTypes = {}


// Main
class App extends Component {
  state = {
    response: 'Default response',
    firstName: '',
    lastName: '',
    status: 1,
    isLocked: true,
    plusOne: true,
    responseToPost: '',
    guestList: [],
    statusDrop: []
  };
  
  componentDidMount() {
    this.callApi()
      .then(body => {
        console.log(body[1])
        this.setState({guestList:body[0], statusDrop:body[1]});
      })
      .catch(err => console.log(err));  
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  
  handleSubmit = async e => {
    // e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: this.state.firstName, 
        lastName: this.state.lastName,
        inviteStatus: this.state.status,
      }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };

  handleChangeFirstName = (e) => {
    this.setState({
      firstName: e.target.value
    })
  }

  handleChangeLastName = (e) => {
    this.setState({
      lastName: e.target.value
    })
  }

  handleChangeStatus = (e) => {
    this.setState({
      status: e.target.value
    })
  }

  handleChangeLock = () => {
    this.setState(
      {isLocked: !this.state.isLocked}
    )
  }

  handleChangePlusOne = () => {
    this.setState({
      plusOne: !this.state.plusOne
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  render() {
    console.log(this.state.firstName)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>          
          <GuestTable 
            guestList={this.state.guestList}
            onChangeFirstName={this.handleChangeFirstName}
            firstName={this.state.firstName}
            onChangeLastName={this.handleChangeLastName}
            lastName={this.state.lastName}
            statusDrop={this.state.statusDrop}
            status={this.state.status}
            onChangeStatus={this.handleChangeStatus}
            isLocked={this.state.isLocked}
            onChangeLock={this.handleChangeLock}
            plusOne={this.state.plusOne}
            onChangePlusOne={this.handleChangePlusOne}
          />
        </form>
      </div>
    );
  }
}

export default App;