import React, { Component } from 'react';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Input, TextField, Paper, Checkbox, Button, Select, MenuItem, InputBase } from '@material-ui/core';

// All the material-ui styling
const useStyles = makeStyles({
  root: {
    width: '85%',   
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
const GuestTable = ({guestList, onSub, onUpdate, onChangeTable, firstName, onChangeFirstName, lastName, onChangeLastName, statusDrop, onChangeStatus, inviteStatus, isLocked, onChangeLock, plusOne, onChangePlusOne}) => {
  //console.log(guestList)
  const classes = useStyles()


  return (
    <Paper className={classes.root}>
      <Table size='small'>
        
        {/* head row */}
        
        <TableHead>
          <TableRow>
            <TableCell>Guest</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="center">Invited?</TableCell>
            <TableCell align="center">Plus One?</TableCell>
            <TableCell align="center" onClick = {onUpdate}>  
              <UpdateButton/>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {/* table row */}
          
          {guestList.map(row => (
            <TableRow 
            hover={true}
            key={row.id}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">
                <InputBase
                  align="right"
                  defaultValue={row.firstName}
                  inputProps={{ 'aria-label':'naked'}}
                  onChange={onChangeTable}
                  id={row.id.toString()}
                  name='firstName'
                />
              </TableCell>
              <TableCell align="left">
                <InputBase
                  align="right"
                  defaultValue={row.lastName}
                  inputProps={{ 'aria-label':'naked'}}
                  onChange={onChangeTable}
                  id={row.id.toString()}
                  name='lastName'
                />
              </TableCell>
              <TableCell align="center">
                <Select
                  style={{marginTop: 15}}
                  value={row.inviteStatus}
                  onChange={onChangeTable}
                  name='inviteStatus'
                >
                  {statusDrop.map(row => (
                    <MenuItem 
                      key={row}
                      value={row}
                    >
                      {row}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  name='plusOne'
                  id={row.id.toString()}
                  checked={row.plusOne == '1' ? true : false}
                  onClick={onChangeTable}
                />
              </TableCell>
              <TableCell align="right">
                <Checkbox
                  name='isLocked'
                  id={row.id.toString()}
                  icon={<LockIconOpen/>}
                  checkedIcon={<LockIconSolid/>}
                  checked={row.isLocked == '1' ? true : false}
                  onClick={onChangeTable}
                />
              </TableCell>
            </TableRow>
          ))}
          
          {/* input row */}
          
          <TableRow>
            <TableCell onClick = {onSub}>
              <SubmitButton/>
            </TableCell>
            <TableCell align="left">
              <TextField
                label="First Name"
                name="firstName"
                onChange={onChangeFirstName}
                style={{width: 100}}
                value={firstName}
              />
            </TableCell>
            <TableCell align="left">
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
                value={inviteStatus}
                onChange={onChangeStatus}
                inputProps={{
                  label: 'Status',
                  name: 'inviteStatus',
                  id: 'inviteStatus'
                }}
              >
                {statusDrop.map(row => (
                  <MenuItem 
                    key={row}
                    value={row}
                  >
                    {row}
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
              <CSVButton
                // onSubmit
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  ) 
}
GuestTable.propTypes = {
  guestList: propTypes.array.isRequired,
  onSub: propTypes.func.isRequired,
  onUpdate: propTypes.func.isRequired,
  onChangeTable: propTypes.func.isRequired,
  firstName: propTypes.string.isRequired,
  onChangeFirstName: propTypes.func.isRequired,
  lastName: propTypes.string.isRequired,
  onChangeLastName: propTypes.func.isRequired,
  statusDrop: propTypes.array.isRequired,
  inviteStatus: propTypes.string.isRequired,
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

// Update Button
const UpdateButton = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Button 
      variant='contained'
      className={classes.button}
      type='submit'
      >
        Update
      </Button>
    </React.Fragment>
  )
}

const CSVButton = () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Button 
      variant='contained'
      className={classes.button}
      type='submit'
      >
        CSV
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
    inviteStatus: 'Yes',
    isLocked: true,
    plusOne: true,
    responseToPost: '',
    guestList: [],
    statusDrop: ["Yes", "No", "Maybe"],
    guestListUpdate: {},
  };
  
  componentDidMount() {
    this.callApi()
      .then(body => {
        //console.log(body)
        this.setState({
          guestList:body
          // statusDrop:body[1]
        });
      })
      .catch(err => console.log(err));  
  }
  
  callApi = async () => {
    const response = await fetch('/api/load');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  
  handleSubmit = async e => {
    console.log("Made it to submit")
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: this.state.firstName, 
        lastName: this.state.lastName,
        inviteStatus: this.state.inviteStatus,
        plusOne: this.state.plusOne,
        isLocked: this.state.isLocked
      }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };

  handleUpdate = async e => {
    const response = await fetch('/api/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...this.state.guestListUpdate
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
      inviteStatus: e.target.value
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

  handleChangeTable = (e) => {
    e.preventDefault()
    e.persist()
    let guestListChange = {}
    if (e.target.name === "plusOne") {
      guestListChange = this.state.guestList.map(x => {
        return (
          e.target.id == x.id ? 
            x.plusOne == '1' ?  
              {...x, plusOne:'0'} : 
                x.plusOne == '0' ? 
                  {...x, plusOne:'1'} : 
            x : 
          x
        )
      })
    }
    if (e.target.name === "isLocked") {
      guestListChange = this.state.guestList.map(x => {
        return (
          e.target.id == x.id ? 
            x.isLocked == '1' ?  
              {...x, isLocked:'0'} : 
                x.isLocked == '0' ? 
                  {...x, isLocked:'1'} : 
            x : 
          x
        )
      })
    }
    if (e.target.name === "inviteStatus") {
      guestListChange = this.state.guestList.map(x => {
        return (
          e.target.id == x.id ? x.inviteStatus = e.target.value : x
        )
      })
    }
    console.log(guestListChange)
    this.setState(prevState => (
      (e.target.name === 'plusOne' || e.target.name ==='isLocked' || e.target.name === 'inviteStatus') ? 
      {guestList: guestListChange,
        guestListUpdate: {
        ...prevState.guestListUpdate, 
          [e.target.id]: {
            ...prevState.guestListUpdate[e.target.id],
            [e.target.name]: e.target.name === 'inviteStatus' ? e.target.value: e.target.checked == true ? '1' : e.target.checked == false ? '0' : e.target.value
          }
        }
      }: 
      {guestListUpdate: {
        ...prevState.guestListUpdate, 
          [e.target.id]: {
          ...prevState.guestListUpdate[e.target.id],
            [e.target.name]: e.target.value
          }
        }
      }
    ))
    console.log(this.state.guestListUpdate)
  }
  
  render() {
    // console.log(this.state.guestList)
    return (
      <div>
        <form>          
          <GuestTable 
            guestList={this.state.guestList}
            onSub = {this.handleSubmit}
            onUpdate= {this.handleUpdate}
            onChangeTable={this.handleChangeTable}
            onChangeFirstName={this.handleChangeFirstName}
            firstName={this.state.firstName}
            onChangeLastName={this.handleChangeLastName}
            lastName={this.state.lastName}
            statusDrop={this.state.statusDrop}
            inviteStatus={this.state.inviteStatus}
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