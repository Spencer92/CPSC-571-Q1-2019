const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const SQL = require('sql-template-strings');
const bodyParser = require('body-parser');
const bluebird = require('bluebird');

var decoder = [];
var position = [];
var values = [];
var max;

const app = express();
/*
for(var i = 0; i < 10 ;i++){
      process.stdout.write("hello\r\n");
}
*/

class InitialLoader
{
  constructor(dbFilePath)
  {
    this.db = new sqlite3.Database(dbFilePath, (err) =>
    {
    if(!err)
    {
      console.log('Connected to database')
    }
    else
    {
      console.log('Could not connect to database', err);
    }
  }
  )
  }
}

module.exports = InitialLoader

//recieve single bit of information
//use key _i_ to identify information
//generate random number r_i
//send (i,x(bar)_i = x_i (xor) r_i) to one site
//send (i,r_i) to another site
