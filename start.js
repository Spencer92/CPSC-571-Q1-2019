const bluebird = require('bluebird');
const InsecureData = require('./databaseMaker');
const dataRepository = require('./InsecureDatabaseLoader');

//from https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js/32599033
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('MOCK_DATA.csv')
});


function main()
{
  const insecure = new InsecureData('./InsecureDB.sqlite3');
  const insecureRepo = new dataRepository(insecure);
  var theData
  let userID;

//  insecureRepo.createTable()
//  .then(() insecureRepo.create())
//  console.log('got after insecureRepo.createTable in main fn');
  var numTimes = 0;

  lineReader.on('line', function (line)
  {
    theData = line.split(",")

    console.log('looped in lineReader ', numTimes, 'times');
    numTimes++;
//    console.log(theData[0]);
//    console.log(theData[1]);
    console.log('the data in linereader is', theData[0], '\n');
    insecureRepo.createTable()
      .then((userData) => {
        projectId = userData.id;
        const info = [
          {
            id: theData[0]
          }
        ]
        return bluebird.all(info.map((info) => {
          const { id } = info;
          return insecureRepo.create(id);
        }))
      })
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
    console.log('Before testDataSet \n');
    var testData = insecureRepo.getByID(theData[0]);
    console.log('After testdataSet \n');
    console.log('testData', testData);
    console.log('after displaying testData');
    testData = insecureRepo.getByID(theData[0])
    console.log('testData', testData);
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
