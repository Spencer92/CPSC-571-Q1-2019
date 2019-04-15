//made with help from https://stackabuse.com/a-sqlite-tutorial-with-node-js/
const promise = require('bluebird');
const SecureData = require('./SecureData');
const DataRepository = require('./DataRepository');


//from https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js/32599033
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('MOCK_DATA.csv')
});


async function main()
{
  const secure = new SecureData('./SecureDB.sqlite3');
  const encrypted = new SecureData('./Encrypted.sqlite3');
  const secureRepo = new DataRepository(secure);
  const encryptedRepo = new DataRepository(encrypted);
  const upperLimit = 10000; //Needed as javascript random function is a number between 0 and 1


  lineReader.on('line', function (line)
  {
    var theData = line.split(",")

    let userID;
    var users;
    //this creates the database
    var numberUsedToEncrypt = Array.apply(null, Array(15)).map(function () {});
    secureRepo.createTable(`userData`)
      .then(() => encryptedRepo.createTable(`encryptedData`))
      .then(() =>
      {
          for(var i = 0; i < numberUsedToEncrypt.length; i++)
          {
            numberUsedToEncrypt[i] = Math.random();
          }
      })
      //Encrypt the row
      .then((userData) => {
        userID = theData[0];
        users = [
          {
            userID,//id: theData[0]
            first_name: theData[1] ^ Math.floor(numberUsedToEncrypt[0]*upperLimit),
            last_name: theData[2] ^ Math.floor(numberUsedToEncrypt[1]*upperLimit),
            Age: theData[3] ^ Math.floor(numberUsedToEncrypt[2]*upperLimit),
            gender: theData[4] ^ Math.floor(numberUsedToEncrypt[3]*upperLimit),
            Phone: theData[5] ^ Math.floor(numberUsedToEncrypt[4]*upperLimit),
            email: theData[6] ^ Math.floor(numberUsedToEncrypt[5]*upperLimit),
            City: theData[7] ^ Math.floor(numberUsedToEncrypt[6]*upperLimit),
            Username: theData[8] ^ Math.floor(numberUsedToEncrypt[7]*upperLimit),
            ip_address: theData[9] ^ Math.floor(numberUsedToEncrypt[8]*upperLimit),
            Language: theData[10] ^ Math.floor(numberUsedToEncrypt[9]*upperLimit),
            CreditCardType: theData[11] ^ Math.floor(numberUsedToEncrypt[10]*upperLimit),
            CreditCardNumber: theData[12] ^ Math.floor(numberUsedToEncrypt[11]*upperLimit),
            OrdersPerMonths: theData[13] ^ Math.floor(numberUsedToEncrypt[12]*upperLimit),
            CustomerLifetimeSpending: theData[14] ^ Math.floor(numberUsedToEncrypt[13]*upperLimit),
            PercentProbabilityOfBuyingOnVisit: theData[15] ^ Math.floor(numberUsedToEncrypt[14]*upperLimit)
          }
        ]
        return promise.all(users.map((user) => {
          const { id,
              first_name,
              last_name,
              Age,
              gender,
              Phone,
              email,
              City,
              Username,
              ip_address,
              Language,
              CreditCardType,
              CreditCardNumber,
              OrdersPerMonths,
              CustomerLifetimeSpending,
              PercentProbabilityOfBuyingOnVisit } = user;

          return secureRepo.create(`userData`,
            id,
            first_name,
            last_name,
            Age,
            gender,
            Phone,
            email,
            City,
            Username,
            ip_address,
            Language,
            CreditCardType,
            CreditCardNumber,
            OrdersPerMonths,
            CustomerLifetimeSpending,
            PercentProbabilityOfBuyingOnVisit );
        }))
      })
      .then(() => secureRepo.getByID(`userData`, userID))
      //Store the data used for encryption
      .then((encryptedData) => {
        userID = theData[0];
        encrypts = [
          {
            userID,//id: theData[0]
            first_name: Math.floor(numberUsedToEncrypt[0]*upperLimit).toString(),
            last_name: Math.floor(numberUsedToEncrypt[1]*upperLimit).toString(),
            Age: Math.floor(numberUsedToEncrypt[2]*upperLimit).toString(),
            gender: Math.floor(numberUsedToEncrypt[3]*upperLimit).toString(),
            Phone: Math.floor(numberUsedToEncrypt[4]*upperLimit).toString(),
            email: Math.floor(numberUsedToEncrypt[5]*upperLimit).toString(),
            City: Math.floor(numberUsedToEncrypt[6]*upperLimit).toString(),
            Username: Math.floor(numberUsedToEncrypt[7]*upperLimit).toString(),
            ip_address: Math.floor(numberUsedToEncrypt[8]*upperLimit).toString(),
            Language: Math.floor(numberUsedToEncrypt[9]*upperLimit).toString(),
            CreditCardType: Math.floor(numberUsedToEncrypt[10]*upperLimit).toString(),
            CreditCardNumber: Math.floor(numberUsedToEncrypt[11]*upperLimit).toString(),
            OrdersPerMonths: Math.floor(numberUsedToEncrypt[12]*upperLimit),
            CustomerLifetimeSpending: Math.floor(numberUsedToEncrypt[13]*upperLimit),
            PercentProbabilityOfBuyingOnVisit: Math.floor(numberUsedToEncrypt[14]*upperLimit)
          }
        ]
        return promise.all(encrypts.map((encrypt) => {
          const { id,
              first_name,
              last_name,
              Age,
              gender,
              Phone,
              email,
              City,
              Username,
              ip_address,
              Language,
              CreditCardType,
              CreditCardNumber,
              OrdersPerMonths,
              CustomerLifetimeSpending,
              PercentProbabilityOfBuyingOnVisit } = encrypt;
          return encryptedRepo.create(`encryptedData`,
            id,
            first_name,
            last_name,
            Age,
            gender,
            Phone,
            email,
            City,
            Username,
            ip_address,
            Language,
            CreditCardType,
            CreditCardNumber,
            OrdersPerMonths,
            CustomerLifetimeSpending,
            PercentProbabilityOfBuyingOnVisit );
        }))
      })
      .then(() => encryptedRepo.getByID(`encryptedData`, userID));


  });
}
main();
