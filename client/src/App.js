import React, { Component } from 'react';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import propTypes from 'prop-types'
import { Input, TextField, Paper } from '@material-ui/core';

const styles = theme => ({
  paper: {
    width: '85%',
    marginTop: '5%',
    overflow: 'auto',
  }
})

const GuestTable = ({guestList}) => {
  const classes = styles()

  return (
    <Paper className={classes.paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Guests</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">+1?</TableCell>
            <TableCell align="right">Lock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guestList.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.plusOne}</TableCell>
              <TableCell align="right">{row.isLocked}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  ) 
}
GuestTable.propTypes = {guestList:propTypes.array.isRequired}

const TextInput = (label, input) => {
  return (
    <Input
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

class App extends Component {
  state = {
    response: 'Default response',
    firstName: '',
    lastName: '',
    responseToPost: '',
    guestList: []
  };
  
  componentDidMount() {
    this.callApi()
      .then(guestList => {this.setState({guestList})})
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
      body: JSON.stringify({firstName: this.state.firstName, lastName: this.state.lastName}),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  render() {
    return (
      <div>
        <div>          
          <GuestTable 
            guestList={this.state.guestList}
          />
        </div>
        <div className='App'>
          <p>Guest Information</p>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              onChange={this.handleChange}
            />
            <TextField
              label="Last Name"
              name="lastName"
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{this.state.responseToPost}</p>
        </div>
      </div>
    );
  }
}

export default App;