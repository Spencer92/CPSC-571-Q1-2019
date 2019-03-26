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
  let projectID;

  insecureRepo.createTable();


  lineReader.on('line', function (line)
  {
    theData = line.split(",")
//    console.log(theData[0]);
//    console.log(theData[1]);
    insecureRepo.create(parseInt(theData[0])); //id
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

  console.log('Before testDataSet \n');
  var testData = insecureRepo.getByID(1);
  console.log('After testdataSet \n');
  console.log(testData);
}
main();
