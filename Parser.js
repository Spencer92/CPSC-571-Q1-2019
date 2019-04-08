//help from https://stackabuse.com/a-sqlite-tutorial-with-node-js/
//https://stackoverflow.com/questions/34202307/node-js-and-sqlite-sqlite-range-bind-or-column-index-out-of-range
const sqlite3 = require('sqlite3').verbose();
const promise = require('bluebird');


class Parser
{
  constructor(theData)
  {
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

  query(theStatement)
  {
    const idSql = theStatement;
    return this.theData.run(theStatement);
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
