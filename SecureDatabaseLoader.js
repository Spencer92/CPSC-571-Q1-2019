const sqlite3 = require('sqlite3').verbose();


var decoder = [];
var position = [];
var values = [];
var max;


let securedb = new sqlite3.Database('./securedb.db', (err) => {
  if(err)
  {
    return console.error(err.message);
  }

  values.push(req.securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT max(data1) FROM securedb)`));
  max = req.securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT max(data1) FROM securedb)`);
  for(var i = 0;
    max != req.securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT min(data1) FROM securedb)`);
  i++)
  {
    position.push(i);
    decoder.push(Math.random());
    max = req.securedb.get(SQL `SELECT data1, data2 FROM securedb WHERE data1 = (SELECT max(data1) FROM securedb WHERE data1 < (SELECT ${req.session.max}))`);
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
