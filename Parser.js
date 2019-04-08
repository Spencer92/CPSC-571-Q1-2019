//help from https://stackabuse.com/a-sqlite-tutorial-with-node-js/
//https://stackoverflow.com/questions/34202307/node-js-and-sqlite-sqlite-range-bind-or-column-index-out-of-range
const sqlite3 = require('sqlite3').verbose();
const promise = require('bluebird');


class Parser
{
  constructor(theData)
  {
    console.log('theData is', theData);
    this.theData = theData;
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
    return this.theData.run(sql);
  }

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
    for(var theID = 1; theID < 2; theID++)
    {
      console.log('theId is', theID);
      SQLStatementOne = `SELECT ` + attribute + ` FROM ` + databaseOneName + ` WHERE id = ?`
      SQLStatementTwo = `SELECT ` + attribute + ` FROM ` + databaseTwoName + ` WHERE id = ?`
      console.log('SQLStatementOne is', SQLStatementOne);
      console.log('SQLStatementTwo is', SQLStatementTwo);

      valueOfAttForID = databaseOne.get(SQLStatementOne, [theID])
      .then(() => decryptForID = databaseTwo.get(SQLStatementTwo, [theID]))
      .then(() =>
      {
        console.log('New valueOfAttForID is ', valueOfAttForID);
        console.log('New decryptForID is ', decryptForID);
        if(valueOfAttForID != null && decryptForID != null)
        {
          valueOfAttForID = this.theData.decode(valueOfAttForID, decryptForID);
          if(valueOfAttForID != null && valueOfAttForID <= higherValue && valueOfAttForID >= lowerValue)
          {
            fitsParameters++;
          }
          else
          {

            console.log("this is the value that got rejected", valueOfAttForID);
          }
        }
      });
    }
    return fitsParameters;
//    return this.theData.run(theStatement);
  }

  update(table, userData)
  {
    const { id, first_name, last_name, Age,
    gender, Phone, email, City, Username, ip_address,
  Language, CreditCardType, CreditCardNumber, BuyingFrequency } = userData;
  return this.theData.run(
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

  delete(table, id)
  {
    const idSql = `DELETE FROM ` + table + ` WHERE id = ?`;
    return this.theData.Run(idSql,[id]);
  }

  getByID(table, id)
  {
//    console.log('id in getByID is', id);
    const idSql = `SELECT * FROM ` + table + ` WHERE id = ?`
//    console.log('Before this.theData.get in fn getByID');
    return this.theData.get(idSql,[id]);
  }

}
module.exports = Parser;
