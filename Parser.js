//help from https://stackabuse.com/a-sqlite-tutorial-with-node-js/
//https://stackoverflow.com/questions/34202307/node-js-and-sqlite-sqlite-range-bind-or-column-index-out-of-range
//https://stackoverflow.com/questions/45644532/nodejs-how-to-make-foreach-and-for-loop-functions-sequential

const sqlite3 = require('sqlite3').verbose();
const promise = require('bluebird');
const async = require('async');


class Parser
{
  constructor(secureData, encryptedData)
  {
    console.log('secureData is', secureData);
    this.secureData = secureData;
    this.encryptedData = encryptedData;
  }

  createTable(tableName)
  {
    const sql = `CREATE TABLE IF NOT EXISTS ` + tableName + ` (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    Age INTEGER,
    gender TEXT,
    Phone TEXT,
    email TEXT,
    City TEXT,
    Username TEXT,
    ip_address TEXT,
    Language TEXT,
    CreditCardType TEXT,
    CreditCardNumber TEXT,
    OrdersPerMonths INTEGER,
    CustomerLifetimeSpending FLOAT,
    PercentProbabilityOfBuyingOnVisit FLOAT)`;
    return this.secureData.run(sql);
  }

  /*Currently, what is supposed to parse the data
    currently works with age only*/

  query(theStatement, lowerValue, higherValue, attribute, databaseOne, databaseTwo, databaseOneName, databaseTwoName)
  {
    const idSql = theStatement;
//    var sqlDecode = idSql.split("$");
//    phraseOne = sqlDecode[0].toString() + sqlDecode[1].toString() + sqlDecode[3].toString();
//    phraseTwo = sqlDecode[0].toString() + sqlDecode[2].toString() + sqlDecode[3].toString();
    var counter;
    var SQLStatementOne; //for the raw that needs to be decrypted
    var SQLStatementTwo; //for the data that will decrypt
    var valueOfAttForID;
    var decryptForID;
    var fitsParameters = 0; //how much values fall between the numbers given
    var decrypterNum;
    var toBeDecryptedNum;
    var theID = 0;
    var end = 2;



    while(theID < end)
    {

/*      SQLStatementOne = `SELECT ` + attribute + ` FROM ` + databaseOneName + ` WHERE id = ?`
      SQLStatementTwo = `SELECT ` + attribute + ` FROM ` + databaseTwoName + ` WHERE id = ?`
      console.log('SQLStatementOne is', SQLStatementOne);
      console.log('SQLStatementTwo is', SQLStatementTwo);*/

      Array.from(this.getByAttribute(this.secureData,`userData`,`Age`));

      valueOfAttForID = this.getByAge(`userData`, 0, this.secureData)
      .then(() => valueOfAttForID = this.getByAge(`userData`, theID, this.secureData))
      .then(() => decryptForID = this.getByAge(`encryptedData`, theID, this.encryptedData))
//      .then(() => decryptForID = databaseTwo.get(SQLStatementTwo, [theID]))
      .then(() => console.log('theId is', theID))
      .then(() =>
      {
        console.log('New valueOfAttForID is ', valueOfAttForID._rejectionHandler0.Age);
        toBeDecryptedNum = valueOfAttForID._rejectionHandler0.Age;
        decrypterNum = decryptForID._rejectionHandler0.Age;
        console.log('New decryptForID is ', decryptForID);
        if(valueOfAttForID != null && decryptForID != null)
        {
          toBeDecryptedNum = this.secureData.decode(toBeDecryptedNum, decrypterNum);
          if(toBeDecryptedNum != null && toBeDecryptedNum <= higherValue && toBeDecryptedNum >= lowerValue)
          {
            fitsParameters++;
          }
          else
          {

            console.log("this is the value that got rejected:", toBeDecryptedNum);
          }
        }

      })
      .then(() => console.log(fitsParameters))
      theID++;
    }

    return fitsParameters;
  }

  update(table, userData) //currently not in use
  {
    const { id, first_name, last_name, Age,
    gender, Phone, email, City, Username, ip_address,
  Language, CreditCardType, CreditCardNumber, BuyingFrequency } = userData;
  return this.secureData.run(
    `UPDATE ` + table + `
    first_name = ?,
    last_name = ?,
    Age = ?,
    gender = ?,
    Phone = ?,
    email = ?,
    City = ?,
    Username = ?,
    ip_address = ?,
    Language = ?,
    CreditCardType = ?,
    CreditCardNumber = ?,
    OrdersPerMonths = ?,
    CustomerLifetimeSpending = ?,
    PercentProbabilityOfBuyingOnVisit = ?
    WHERE id = ? `,
    [ id, first_name, last_name, Age,
    gender, Phone, email, City, Username, ip_address,
  Language, CreditCardType, CreditCardNumber, BuyingFrequency ]
  );
  }

  delete(table, id) //currently not in use
  {
    const idSql = `DELETE FROM ` + table + ` WHERE id = ?`;
    return this.secureData.Run(idSql,[id]);
  }

  getByAge(table, id, database)
  {
    const ageSql = `SELECT Age FROM ` + table + ` WHERE id = ?`
    return database.get(ageSql, [id]);
  }

  getByID(table, id)
  {
//    console.log('id in getByID is', id);
    const idSql = `SELECT * FROM ` + table + ` WHERE id = ?`
//    console.log('Before this.secureData.get in fn getByID');
    return this.secureData.get(idSql,[id]);
  }

}
module.exports = Parser;
