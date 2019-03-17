const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const SQL = require('sql-template-strings');
const bodyParser = require('body-parser');

var decoder = [];
var position = [];
var values = [];
var max;

const app = express();
/*
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(
    Object.assign(
      {
        resave: false,
        saveUninitialized: true,
      },
    ),
);*/

let securedb;





app.use(function(req, res, next) {
  req.securedb = securedb;
  next();
});


//function main() {
  const port = process.env.PORT || 3000;
//  window.alert("Hi");
  securedb = new sqlite3.Database('./securedb.db', (err) => {

    if(err)
    {
      return console.error(err.message);
    }

/*    securedb.run("CREATE TABLE dummy (data1 INT, data2 TEXT)");

    var statement = ("INSERT INTO dummy VALUES(?,?)");

    //format taken from https://www.w3resource.com/node.js/nodejs-sqlite.php
    for(var j = 0; j < 10; j++)
    {
      var random = Math.random() * 1000;
      var randomString = Math.random().tostring();

      statement.run(random,randomString);
    }
    statement.finalize();

    values.push(req.securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT max(data1) FROM securedb)`));
    max = req.securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT max(data1) FROM securedb)`);
    for(var i = 0;
      max != req.securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT min(data1) FROM securedb)`);
    i++)
    {
      position.push(i);
      decoder.push(Math.random());
      max = req.securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT max(data1) FROM securedb WHERE data1 < (SELECT ${req.session.max}))`);
    }*/

    console.log('Connected to secure SQL Database');
  });

/*  securedb.run("CREATE TABLE dummy (data1 INT, data2 TEXT)");

  var statement = securedb.prepare("INSERT INTO dummy VALUES(?,?)");

  //format taken from https://www.w3resource.com/node.js/nodejs-sqlite.php
  for(var j = 0; j < 10; j++)
  {
    var random = Math.random() * 1000;
    var randomString = Math.random().toString();

    statement.run(random,randomString);
  }
  statement.finalize();*/

app.get(async (req, res, err) => {

  if(err)
  {
    return console.error(err.message);
  }

  req.securedb.run("CREATE TABLE dummy (data1 INT, data2 TEXT)");

  var statement = req.securedb.prepare("INSERT INTO dummy VALUES(?,?)");

  //format taken from https://www.w3resource.com/node.js/nodejs-sqlite.php
  for(var j = 0; j < 10; j++)
  {
    var random = Math.random() * 1000;
    var randomString = Math.random().toString();

    statement.run(random,randomString);
  }
  statement.finalize();

  values.push(req.securedb.get(SQL`SELECT data1, data2 FROM securedb WHERE data1 = (SELECT max(data1) FROM securedb)`));
  max = req.securedb.get(SQL`SELECT data1, data2 FROM securedb WHERE data1 = (SELECT max(data1) FROM securedb)`);
  for(var i = 0;
    max != req.securedb.get(SQL`SELECT data1, data2 FROM securedb WHERE data1 = (SELECT min(data1) FROM securedb)`);
  i++)
  {
    position.push(i);
    decoder.push(Math.random());
    max = req.securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT max(data1) FROM securedb WHERE data1 < (SELECT ${req.session.max}))`);
  }
});
/*  securedb = await sqlite.open('./db.sqlite', { cached: true, Promise }).then(securedb => securedb.migrate());
  app.listen(port);

  // This query activates foreign constraints
  await securedb.run(SQL`PRAGMA foreign_keys = ON`);

  console.log(`Listening on port ${port}: http://localhost:${port}`);*/
//}









/*
let securedb = new sqlite3.Database('./securedb.db', (err) => {

  if(err)
  {
    return console.error(err.message);
  }

  values.push(securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT max(data1) FROM securedb)`));
  max = securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT max(data1) FROM securedb)`);
  for(var i = 0;
    max != securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT min(data1) FROM securedb)`);
  i++)
  {
    position.push(i);
    decoder.push(Math.random());
    max = securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT max(data1) FROM securedb WHERE data1 < (SELECT ${session.max}))`);
  }

  console.log('Connected to secure SQL Database');
});




securedb.close((err) => {
  {
    if(err)
    {
      return console.error(err.message);
    }
    console.log('Closed secure SQL database');
  }

});
*/

/*
async function main() {-
  const port = process.env.PORT || 3000;
  db = await sqlite.open('./db.sqlite', { cached: true, Promise }).then(db => db.migrate());
  app.listen(port);

  // This query activates foreign constraints
  await db.run(SQL`PRAGMA foreign_keys = ON`);

  console.log(`Listening on port ${port}: http://localhost:${port}`);
}*/

//recieve single bit of information
//use key _i_ to identify information
//generate random number r_i
//send (i,x(bar)_i = x_i (xor) r_i) to one site
//send (i,r_i) to another site
