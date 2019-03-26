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
    console.log('sql is ', sql, 'before return new bluebird');
    return new bluebird((resolve, reject) =>
    {
      var newSql = sql;
      console.log('sql is', newSql, 'before this.db.run');
      this.db.run(newSql, params, function (err)
      {
        console.log('sql is', newSql);
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


}
module.exports = InsecureData;
