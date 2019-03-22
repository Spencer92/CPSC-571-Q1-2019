const sqlite3 = require('sqlite3').verbose();

let securedb = new sqlite3.Database('./insecure.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});




securedb.close((err) => {
  {
    if(err)
    {
      return console.error(err.message);
    }
    console.log('Closed insecure database');
  }

});
//http://www.sqlitetutorial.net/sqlite-nodejs/
/*
async function main() {
  const port = process.env.PORT || 3000;
  db = await sqlite.open('./db.sqlite', { cached: true, Promise }).then(db => db.migrate());
  app.listen(port);

  // This query activates foreign constraints
  await db.run(SQL`PRAGMA foreign_keys = ON`);

  console.log(`Listening on port ${port}: http://localhost:${port}`);
}*/
