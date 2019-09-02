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

console.log(port);

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
    console.log(result);
    res.send(result);
  })
  
  // res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  const query = `insert into tblguest (firstName,lastName,plusOne,isLocked) values ("${req.body.firstName}","${req.body.lastName}",${req.body.plusOne},${req.body.isInvited}) `;
  console.log(query);
  db.query(query,(err, result) => {
    if (err) {
      console.log('bad')
      res.send({bad:'error'});
      return 
    }
    console.log(result);
    res.send({result});
  })
  // res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));