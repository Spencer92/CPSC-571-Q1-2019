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


//  insecureRepo.createTable()
//  .then(() insecureRepo.create())
//  console.log('got after insecureRepo.createTable in main fn');
  var numTimes = 0;

  lineReader.on('line', function (line)
  {
    var theData = line.split(",")


    numTimes++;
//    console.log(theData[0]);
//    console.log(theData[1]);
//    console.log('the data in linereader is', theData[0], theData[1], '\n');
    let userID;
    var users;
    var theEncrypt = Array.apply(null, Array(15)).map(function () {});
    secureRepo.createTable(`userData`)
      .then(() => encryptedRepo.createTable(`encryptedData`))
      .then(() =>
      {
          for(var i = 0; i < theEncrypt.length; i++)
          {
            theEncrypt[i] = Math.random();
          }
      })
      .then((userData) => {
        console.log('looped in lineReader ', numTimes, 'times');
        userID = theData[0];
        users = [
          {
            userID,//id: theData[0]
            first_name: theData[1] ^ Math.floor(theEncrypt[0]*10000),
            last_name: theData[2] ^ Math.floor(theEncrypt[1]*10000),
            Age: theData[3] ^ Math.floor(theEncrypt[2]*10000),
            gender: theData[4] ^ Math.floor(theEncrypt[3]*10000),
            Phone: theData[5] ^ Math.floor(theEncrypt[4]*10000),
            email: theData[6] ^ Math.floor(theEncrypt[5]*10000),
            City: theData[7] ^ Math.floor(theEncrypt[6]*10000),
            Username: theData[8] ^ Math.floor(theEncrypt[7]*10000),
            ip_address: theData[9] ^ Math.floor(theEncrypt[8]*10000),
            Language: theData[10] ^ Math.floor(theEncrypt[9]*10000),
            CreditCardType: theData[11] ^ Math.floor(theEncrypt[10]*10000),
            CreditCardNumber: theData[12] ^ Math.floor(theEncrypt[11]*10000),
            OrdersPerMonths: theData[13] ^ Math.floor(theEncrypt[12]*10000),
            CustomerLifetimeSpending: theData[14] ^ Math.floor(theEncrypt[13]*10000),
            PercentProbabilityOfBuyingOnVisit: theData[15] ^ Math.floor(theEncrypt[14]*10000)
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
//          console.log('first_name after const{id,first_name} is ', first_name);
//          console.log('just about to exit .then userData');
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
      .then((encryptedData) => {
        userID = theData[0];
        encrypts = [
          {
            userID,//id: theData[0]
            first_name: Math.floor(theEncrypt[0]*10000).toString(),
            last_name: Math.floor(theEncrypt[1]*10000).toString(),
            Age: Math.floor(theEncrypt[2]*10000).toString(),
            gender: Math.floor(theEncrypt[3]*10000).toString(),
            Phone: Math.floor(theEncrypt[4]*10000).toString(),
            email: Math.floor(theEncrypt[5]*10000).toString(),
            City: Math.floor(theEncrypt[6]*10000).toString(),
            Username: Math.floor(theEncrypt[7]*10000).toString(),
            ip_address: Math.floor(theEncrypt[8]*10000).toString(),
            Language: Math.floor(theEncrypt[9]*10000).toString(),
            CreditCardType: Math.floor(theEncrypt[10]*10000).toString(),
            CreditCardNumber: Math.floor(theEncrypt[11]*10000).toString(),
            OrdersPerMonths: Math.floor(theEncrypt[12]*10000),
            CustomerLifetimeSpending: Math.floor(theEncrypt[13]*10000),
            PercentProbabilityOfBuyingOnVisit: Math.floor(theEncrypt[14]*10000)
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
//          console.log('first_name after const{id,first_name} is ', first_name);
//          console.log('just about to exit .then userData');
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
/*      .then((theUser) =>
      {
        console.log(`\nRetreived user from database`);
        console.log(`user id = ${theUser.id}`);
        console.log(`user first name = ${theUser.first_name}`);
        console.log(`user last name = ${theUser.last_name}`);
        console.log(`user Age = ${theUser.Age}`);
        console.log(`user gender = ${theUser.gender}`);
        console.log(`user Phone = ${theUser.Phone}`);
        console.log(`user email = ${theUser.email}`);
        console.log(`user City = ${theUser.City}`);
        console.log(`user Username = ${theUser.Username}`);
        console.log(`user ip_address = ${theUser.ip_address}`);
        console.log(`user Language = ${theUser.Language}`);
        console.log(`user CreditCardType = ${theUser.CreditCardType}`);
        console.log(`user CreditCardNumber = ${theUser.CreditCardNumber}`);
        console.log(`user OrdersPerMonths = ${theUser.OrdersPerMonths}`);
        console.log(`user CustomerLifetimeSpending = ${theUser.CustomerLifetimeSpending}`);
        console.log(`user PercentProbabilityOfBuyingOnVisit = ${theUser.PercentProbabilityOfBuyingOnVisit}`);
      }

    )*/
/*      .then((testData) =>
      {
        console.log('Before testDataSet \n');
        var testData = insecureRepo.getByID(theData[0]);
        console.log('After testdataSet \n');
        console.log('testData', testData);
        console.log('after displaying testData');
        testData = insecureRepo.getByID(theData[0])
        console.log('testData', testData);
    })*/
//    insecureRepo.create(parseInt(theData[0])); //id

/*      theData[1].toString(), //first_name
      theData[2].toString(), //last_name
      parseInt(theData[3]), //Age
      theData[4].toString(), //gender
      theData[5].toString(), //Phone
      theData[6].toString(), //email
      theData[7].toString(), //City
      theData[8].toString(), //Username
      theData[9].toString(), //ip_address
      theData[10].toString(), //Language
      theData[11].toString(), //CreditCardType
      theData[12].toString(), //CreditCardNumber
      theData[13].toString()); //BuyingFrequency*/
//      setTimeout(function(){}, 500);

  });
//  var testData = insecureRepo.getByID(1);
//  console.log(testData);
/*  for(var i = 0; i < 10; i++)
  {
    console.log('testData');
    console.log(testData);
    console.log(testData);
    console.log(testData);
    console.log(testData);
  }*/
/*
  while(!lineReader.AtEndOfStream)
  {
    //wait
  }

  while(0==0)
  {
    if(lineReader.AtEndOfStream)
    {
      console.log('Before testDataSet \n');
      var testData = insecureRepo.getByID(1);
      console.log('After testdataSet \n');
      console.log('testData', testData);
      console.log('after displaying testData');
      break;
    }
  }
*/
}
main();
