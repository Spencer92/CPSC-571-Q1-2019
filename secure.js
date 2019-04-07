const promise = require('bluebird');
const InsecureData = require('./databaseMaker');
const DataRepository = require('./InsecureDatabaseLoader');
const Constants = require('./Constant Values');


//from https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js/32599033
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('MOCK_DATA.csv')
});


async function main()
{
  const secure = new InsecureData('./SecureDB.sqlite3');
  const encrypted = new InsecureData('./Encrypted.sqlite3');
  const secureRepo = new DataRepository(secure);
  const encryptedRepo = new DataRepository(encrypted);




}
main();
