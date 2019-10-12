const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5000;

const db = mysql.createConnection ( {
  port: '3306',
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'wedding',
  multipleStatements: true
});
db.connect( (err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database :)");
});
global.db = db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/load', (req, res) => {
  const query = `select id, firstName, lastName, inviteStatus, plusOne, isLocked from tblguest`;
  db.query(query,(err, result) => {
    if (err) {
      console.log('dun goof')
      res.send({bad:'error'});
      return 
    }
    // console.log(result)
    res.send(result);
  })
});

app.post('/api/submit', ({body}, res) => {
  console.log("submit")
  const query = `insert into tblguest (firstName, lastName, inviteStatus, plusOne, isLocked) values ("${body.firstName}", "${body.lastName}", ${body.inviteStatus}, ${body.plusOne === true ? 1 : 0},1)`;
  db.query(query,(err, result) => {
    if (err) {
      console.log('bad')
      res.send({bad:'error'});
      return 
    }
    res.send({result});
  })
});

app.post('/api/update', ({body}, res) => {
  console.log(body)
  let query = ""
  // console.log(Object.values(body))
  for (i=0; i < Object.keys(body).length; i++) {
    let querySeedList = "";
    let nestedChange = Object.values(body)[i];
    console.log(Object.keys(nestedChange).length)
    for (j=0; j < Object.keys(nestedChange).length; j++) {
      querySeedList = `${querySeedList} ${Object.keys(nestedChange)[j]} = '${(Object.keys(nestedChange)[j] === 'plusOne' || Object.keys(nestedChange)[j] === 'isLocked') ? Object.values(nestedChange)[j] == '1' ? 1 : 0 : Object.values(nestedChange)[j]}',`;
      // console.log (querySeedList)
    }
    querySeedList = querySeedList.substring(0, querySeedList.length - 1)
    // console.log (querySeedList)
    let querySeed = `UPDATE tblguest SET ${querySeedList} WHERE id = '${Object.keys(body)[i]}';`;
    // console.log(querySeed)
    query = `${query} ${querySeed}`
    console.log(query)
  }
  // console.log(query)
  db.query(query,(err, result) => {
      if (err) {
        console.log('bad')
        res.send({bad:'error'});
        return 
      }
      res.send({result});
    })  
});

app.listen(port, () => console.log(`Listening on port ${port}`));