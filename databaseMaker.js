//made with help from https://stackabuse.com/a-sqlite-tutorial-with-node-js/

const sqlite3 = require('sqlite3');
const bluebird = require('bluebird');

class InsecureData
{
  constructor(dbFilePath)
  {
    this.db = new sqlite3.Database(dbFilePath, (err) =>
    {
      if(!err)
      {
        console.log('Connected to insecure database');
      }
      else
      {
        console.log('Could not connect to insecure database');
      }
    });
  }

  run(sql, params = [])
  {
    return new bluebird((resolve, reject) =>
    {
      this.db.run(sql, params, function (err)
      {
        if(!err)
        {
          resolve({ id: this.lastID });
        }
        else
        {
            console.log('Error running sql ' + sql);
            console.log(err);
            reject(err);
        }
      })
    })
  }

  get(sql, params = [])
  {
    return new bluebird((resolve, reject) =>
    {
      this.db.all(sql, params, (err, rows) =>
      {
        if(!err)
        {
          resolve(rows)
        }
        else
        {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        }
      })
    })



}
module.exports = InsecureData;
