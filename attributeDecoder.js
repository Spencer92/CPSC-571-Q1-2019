//made with help from https://stackabuse.com/a-sqlite-tutorial-with-node-js/

const sqlite3 = require('sqlite3').verbose();
const promise = require('bluebird');


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
        console.log('Connected to database');
      }
      else
      {
        console.log('Could not connect to database');
      }
    });
  }

  run(sql, params = [])
  {
//    console.log('Entered InsecureData fn run ', theCounter, ' times');
//    theCounter++;


//      console.log('sql is ', sql, 'before return new promise');
      return new promise((resolve, reject) =>
      {
        var newSql = sql;
//        console.log('resolve is', resolve);
        this.db.run(newSql, params, function (err)
        {
          newSql = sql;
//          console.log('sql in databaseMaker is', newSql, theCounter);
          if(!err)
          {
            for(var i = 0; i < 10; i++)
            {
//              console.log('Deciding to resolve', newSql);
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
//    console.log('get(sql, params) in databaseMaker sql 1 is ', sql);
    return new promise((resolve, reject) =>
    {
//      console.log('get(sql, params) in databaseMaker sql 2 is ', sql);
      this.db.get(sql, params, (err, result) =>
      {
//        console.log('get(sql, params) in databaseMaker sql 3 is ', sql);
//        console.log('result is', result);
        if(!err)
        {
//          console.log('get(sql, params) in databaseMaker sql 4 is ', sql);
//          console.log('result is', result);
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
//    console.log('get(sql, params) in databaseMaker sql 1 is ', sql);
    return new promise((resolve, reject) =>
    {
//      console.log('get(sql, params) in databaseMaker sql 2 is ', sql);
      this.db.all(sql, params, (err, rows) =>
      {
//        console.log('get(sql, params) in databaseMaker sql 2 is ', sql);
        if(!err)
        {
//          console.log('get(sql, params) in databaseMaker sql 4 is ', sql);
          console.log('rows is', rows);
//          resolve(rows);
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
