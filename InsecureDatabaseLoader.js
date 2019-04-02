//help from https://stackabuse.com/a-sqlite-tutorial-with-node-js/
//https://stackoverflow.com/questions/34202307/node-js-and-sqlite-sqlite-range-bind-or-column-index-out-of-range
const sqlite3 = require('sqlite3').verbose();
const promise = require('bluebird');


class dataRepository
{
  constructor(theData)
  {
    this.theData = theData;
  }

  createTable()
  {
    const sql = `CREATE TABLE IF NOT EXISTS userData (
    id INTEGER PRIMARY KEY)`;//,
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
    const idSql = `INSERT INTO userData (id) VALUES (?)`;
    console.log('id is ', id, ' in InsecureDatabaseLoader create fn');
//    this.createTable();
    return this.theData.run(idSql, [id]
      /*`INSERT INTO userData (id) VALUES (?)`/*, first_name, last_name, Age,
      gender, Phone, email, City, Username, ip_address,
    Language, CreditCardType, CreditCardNumber, BuyingFrequency)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,*/
    /*[id]/*, first_name, last_name, Age,
    gender, Phone, email, City, Username, ip_address,
  Language, CreditCardType, CreditCardNumber, BuyingFrequency]*/
);
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
    const idSql = `DELETE FROM userData WHERE id = ?`;
    return this.theData.Run(idSql,[id]);
  }

  getByID(id)
  {
    console.log('id in getByID is', id);
    const idSql = `SELECT * FROM userData WHERE id = ?`
    console.log('Before this.theData.get in fn getByID');
    return this.theData.get(idSql,[id]);
  }

}
module.exports = dataRepository;
