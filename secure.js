const promise = require('bluebird');
const AttributeDecoder = require('./attributeDecoder');
const Parser = require('./Parser');


//from https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js/32599033
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('MOCK_DATA.csv')
});


function main() //not much happens currently just looks at the
{
  const secure = new AttributeDecoder('./SecureDB.sqlite3'); 
  const encrypted = new AttributeDecoder('./Encrypted.sqlite3');
  const secureRepo = new Parser(secure, encrypted);
  var theResult = 0;
  theResult = secureRepo.query(null, 30, 60, `Age`, secure, encrypted, `userData`, `encryptedData`);

  console.log(theResult);

}


main();
