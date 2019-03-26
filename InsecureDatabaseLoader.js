//help from https://stackabuse.com/a-sqlite-tutorial-with-node-js/
const sqlite3 = require('sqlite3').verbose();
const bluebird = require('bluebird');


class dataRepository
{
  constructor(theData)
  {
    this.theData = theData;
  }

  createTable()
  {
    const sql = `CREATE TABLE IF NOT EXISTS userData (
    id INTEGER PRIMARY KEY )`;//,
/*    first_name TEXT;
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
    BuyingFrequency TEXT )
    `;*/
    return this.theData.run(sql);
  }

  create(id/*, first_name, last_name, Age, gender, Phone,
  email, City, Username, ip_address, Language,
  CreditCardType, CreditCardNumber, BuyingFrequency*/)
  {
//    this.createTable();
    return this.theData.run(
      `INSERT INTO userData (id) VALUES (?)`/*, first_name, last_name, Age,
      gender, Phone, email, City, Username, ip_address,
    Language, CreditCardType, CreditCardNumber, BuyingFrequency)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,*/
    [id]/*, first_name, last_name, Age,
    gender, Phone, email, City, Username, ip_address,
  Language, CreditCardType, CreditCardNumber, BuyingFrequency]*/
    )
  }

  update(userData)
  {
    const { id, first_name, last_name, Age,
    gender, Phone, email, City, Username, ip_address,
  Language, CreditCardType, CreditCardNumber, BuyingFrequency } = userData;
  return this.theData.run(
    `UPDATE userData
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
    BuyingFrequency = ?
    WHERE id = ? `,
    [ id, first_name, last_name, Age,
    gender, Phone, email, City, Username, ip_address,
  Language, CreditCardType, CreditCardNumber, BuyingFrequency ]
  );
  }

  delete(id)
  {
    return this.theData.Run(
      `DELETE FROM userData WHERE id = ?`,
      [id]
    );
  }

  getByID(id)
  {
    return this.theData.get(
      `SELECT * FROM userData WHERE id = ?`
      [id]
      );
  }

}
module.exports = dataRepository;
