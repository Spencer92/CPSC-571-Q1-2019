//made with help from https://stackabuse.com/a-sqlite-tutorial-with-node-js/

const sqlite3 = require('sqlite3');
const bluebird = require('bluebird');
var theCounter = 0;


class InsecureData
{
  constructor(dbFilePath)
  {
//    console.log('Entered insecureData Constructor')
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
//    console.log('Entered InsecureData fn run ', theCounter, ' times');
//    theCounter++;


      console.log('sql is ', sql, 'before return new bluebird');
      return new bluebird((resolve, reject) =>
      {
        var newSql = sql;
        console.log('sql is', newSql, 'before this.db.run');
        this.db.run(newSql, params, function (err)
        {
          newSql = sql;
          console.log('sql is', newSql, theCounter);
          if(!err)
          {
            for(var i = 0; i < 10; i++)
            {
              console.log('Deciding to resolve', newSql);
            }
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
    console.log('get(sql, params) in databaseMaker sql is ', sql);
    return new bluebird((resolve, reject) =>
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
    return new bluebird((resolve, reject) =>
    {
      this.db.all(sql, params, (err, rows) =>
      {
        if(!err)
        {
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
module.exports = InsecureData;
