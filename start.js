const bluebird = require('bluebird');
const InsecureData = require('./databaseMaker');
const dataRepository = require('./InsecureDatabaseLoader');



function main()
{

  const insecure = new InsecureData('./InsecureDB.sqlite3');
  const insecureRepo = new dataRepository(insecure);

  let projectID;

  insecureRepo.createTable();


}
main();
