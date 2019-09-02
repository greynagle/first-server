import React, { Component } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import propTypes from 'prop-types'

// const useStyles = makeStyles(theme => ({
//     root: {
//       width: '100%',
//     },
//     paper: {
//       marginTop: theme.spacing(3),
//       width: '100%',
//       overflowX: 'auto',
//       marginBottom: theme.spacing(2),
//     },
//     table: {
//       minWidth: 650,
//     },
//   }));

const TblTemplate = (props) => {
  console.log("props")
  console.log(props.tblGuest)
  console.log(Object.values(props)[0])
  // const classes = useStyles();

  return (
    <div >
      {/* error */}
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
            {props.tblGuest.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.inviteStatus}</TableCell>
                <TableCell align="right">{row.plusOne}</TableCell>
                <TableCell align="right">{row.isLocked}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

    </div>
  ) 
}
TblTemplate.propTypes = {tblGuest:propTypes.array.isRequired}

class App extends Component {
  state = {
    response: 'Default response',
    post: '',
    responseToPost: '',
    tblGuest: []
  };
  
  
  componentDidMount() {
    this.callApi()
      .then(res => {
        const tblGuestByID = res.reduce((acc, cur) => {
          return [
            ...acc, {
              id: cur.id,
              firstName: cur.firstName,
              lastName: cur.lastName,
              inviteStatus: cur.status,
              plusOne:cur.plusOne,
              isLocked:cur.isLocked,
            }
          ]
        }, []);
        console.log("tblGuestByID")
        console.log(tblGuestByID)
        this.setState({tblGuest: tblGuestByID});
      })
      .catch(err => console.log(err));  
  }
  
  callApi = async () => {
    // return new Promise((resolve, reject) => {
    //   fetch('/api/hello')
    //   .then(res => resolve(res))
    //   .catch(e => reject(e))
    // });
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body)
    
    return body;
  };
  
  handleSubmit = async e => {
    e.preventDefault();
    console.log('submitted')
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstName: this.state.post, lastName: "test", plusOne: 1, isInvited: 1}),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <div>
        <div>
          <TblTemplate tblGuest={this.state.tblGuest}/>
        </div>
        <div className='App'>
          <p>Input Guest information</p>
          <form onSubmit={this.handleSubmit}>
            <p>
              <strong>Post to Server:</strong>
            </p>
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ post: e.target.value })}
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