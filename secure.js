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

  var theResult = query(null, 30, 50, `Age`, secure, encrypted, `userData`, `encryptedData`)
  .then(() => console.log(theResult));

}


function query(theStatement, lowerValue, higherValue, attribute, databaseOne, databaseTwo, databaseOneName, databaseTwoName)
{
  const idSql = theStatement;
//  var sqlDecode = idSql.split("$");
//    phraseOne = sqlDecode[0].toString() + sqlDecode[1].toString() + sqlDecode[3].toString();
//    phraseTwo = sqlDecode[0].toString() + sqlDecode[2].toString() + sqlDecode[3].toString();
  var counter;
  var SQLStatementOne; //for the raw that needs to be decrypted
  var SQLStatementTwo; //for the data that will decrypt
  var valueOfAttForID;
  var decryptForID;
  var fitsParameters = 0; //how much values fall between the numbers given
  for(theID = 0; theID < 100; theID++)``
  {
    SQLStatementOne = `SELECT ` + attribute + ` FROM ` + databaseOneName + ` WHERE id = ?`
    SQLStatementTwo = `SELECT ` + attribute + ` FROM ` + databaseTwoName + ` WHERE id = ?`
    valueOfAttForID = databaseOne.get(SQLStatementOne, [theID]);
    decryptForID = databaseTwo.get(SQLStatementTwo, [theID]);
    if(valueOfAttForID != null && decryptForID != null)
    {
      valueOfAttForID = decode(valueOfAttForID, decryptForID);
      if(valueOfAttForID != null && valueOfAttForID <= higherValue && valueOfAttForID >= lowerValue)
      {
        fitsParameters++;
      }
    }
  }
  return fitsParameters;
//    return this.theData.run(theStatement);
}

function decode(encryptedData, decrypter)
  {
    var decryptSave = decrypter;
    var encryptSave = encryptedData;

    decryptSave = encryptSave ^ decryptSave;
    return decryptSave;

  }

main();
