const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

const db = mysql.createConnection ( {
  port: '3306',
  host: 'localhost',
  user: 'root',
  password: 'EcwTfna7835',
  database: 'wedding'
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

app.get('/api/hello', (req, res) => {
  const query = 'select tblguest.id, tblguest.firstName, tblguest.lastName, tblidinvitestatus.status, tblguest.plusOne, tblguest.isLocked from tblidinvitestatus inner join tblguest on tblguest.inviteStatus=tblidinvitestatus.id';
  db.query(query,(err, result) => {
    if (err) {
      console.log('dun goof')
      res.send({bad:'error'});
      return 
    }
    res.send(result);
  })
});

app.post('/api/world', ({body}, res) => {
  console.log(body)
  const query = `insert into tblguest (firstName,lastName,plusOne,isLocked) values ("${body.firstName}","${body.lastName}",1,1)`;
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