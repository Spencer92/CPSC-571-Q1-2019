const promise = require('bluebird');
const InsecureData = require('./attributeDecoder');
const DataRepository = require('./Parser');
const Constants = require('./Constant Values');


//from https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js/32599033
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('MOCK_DATA.csv')
});


async function main()
{
  const secure = new Parser('./SecureDB.sqlite3');
  const encrypted = new Parser('./Encrypted.sqlite3');
  const secureRepo = new AttributeDecoder(secure);
  const encryptedRepo = new AttributeDecoder(encrypted);




}
main();
