const fetch = require('node-fetch');
const Creditor = require('./server/models/creditorModel');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://SFUser:SFPassword@cluster0.sllcc.mongodb.net/cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
let testData;

// fetches test data, calls resetData once data received
fetch(
  'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
)
  .then((response) => response.json())
  .then((data) => (testData = data))
  .then(() => resetData());

// clears any changes from the test database by erasing all data then inputs entries from data.json file into db
async function resetData() {
  await clearDatabase();
  testData.forEach(async (entry) => {
    createEntry(entry);
  });
  console.log('Database has been reset');
}

// helper func to clear database, asyc await ensures order of operations e.g. not erasing new data we are about to put in
async function clearDatabase() {
  await Creditor.deleteMany({ id: { $gte: 0 } })
    .then(() => console.log('Prior data cleared'))
    .catch((error) => console.error(error.message));
}

// helper func to put new entries into the database
function createEntry(newEntry) {
  Creditor.create(newEntry, (err, entry) => {
    if (entry === undefined) return false; // need to change to status code 500
    if (err) {
      console.error(error.message);
    }
  });
}

module.exports = createEntry;
