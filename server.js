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
  const query = `select id, firstName, lastName, inviteStatus, if(plusOne, 'true','false') plusOne, if(isLocked, 'true','false') isLocked from tblguest`;
  db.query(query,(err, result) => {
    if (err) {
      console.log('dun goof')
      res.send({bad:'error'});
      return 
    }
    console.log(result)
    res.send(result);
  })
});

app.post('/api/submit', ({body}, res) => {
  console.log(body)
  const query = `insert into tblguest (firstName,lastName,plusOne,inviteStatus,isLocked) values ("${body.firstName}","${body.lastName}",1,${body.inviteStatus},1)`;
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
  const query = `insert into tblguest (firstName,lastName,plusOne,inviteStatus,isLocked) values ("${body.firstName}","${body.lastName}",1,${body.inviteStatus},1)`;
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