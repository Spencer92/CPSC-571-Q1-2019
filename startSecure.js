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
  const encryped = new InsecureData('./Encryped.sqlite3');
  const secureRepo = new DataRepository(secure);
  const encrypedRepo = new DataRepository(encryped);


//  insecureRepo.createTable()
//  .then(() insecureRepo.create())
//  console.log('got after insecureRepo.createTable in main fn');
  var numTimes = 0;

  lineReader.on('line', function (line)
  {
    var theData = line.split(",")

    console.log('looped in lineReader ', numTimes, 'times');
    numTimes++;
//    console.log(theData[0]);
//    console.log(theData[1]);
//    console.log('the data in linereader is', theData[0], theData[1], '\n');
    let userID;
    var users;
    insecureRepo.createTable()
      .then((userData) => {
        userID = theData[0];
        users = [
          {
            userID,//id: theData[0]
            first_name: theData[1],
            last_name: theData[2],
            Age: theData[3],
            gender: theData[4],
            Phone: theData[5],
            email: theData[6],
            City: theData[7],
            Username: theData[8],
            ip_address: theData[9],
            Language: theData[10],
            CreditCardType: theData[11],
            CreditCardNumber: theData[12],
            OrdersPerMonths: theData[13],
            CustomerLifetimeSpending: theData[14],
            PercentProbabilityOfBuyingOnVisit: theData[15]
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
          return insecureRepo.create(id,
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
      .then(() => insecureRepo.getByID(userID))
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
