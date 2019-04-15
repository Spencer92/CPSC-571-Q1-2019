//made with help from https://stackabuse.com/a-sqlite-tutorial-with-node-js/
//Needed for creating the database
const sqlite3 = require('sqlite3').verbose();
const promise = require('bluebird');


var theCounter = 0;



class SecureData
{
  constructor(dbFilePath)
  {
    this.db = new sqlite3.Database(dbFilePath, (err) =>
    {
      if(!err)
      {
        console.log('Creating secure database');
      }
      else
      {
        console.log('Could not create secure database');
      }
    });
  }

  run(sql, params = [])
  {

      return new promise((resolve, reject) =>
      {
        var newSql = sql;
        this.db.run(newSql, params, function (err)
        {
          newSql = sql;
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
    return new promise((resolve, reject) =>
    {
      this.db.get(sql, params, (err, result) =>
      {
        if(!err)
        {
          resolve(result);
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

  all(sql, params = [])
  {
    return new promise((resolve, reject) =>
    {
      this.db.all(sql, params, (err, rows) =>
      {
        if(!err)
        {
          console.log('rows is', rows);
          resolve(rows);
        }
        else
        {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        }
      })
    });
  }

}
module.exports = SecureData;
