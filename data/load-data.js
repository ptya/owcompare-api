const fs = require('fs');
const mongoose = require('mongoose');
const configs = require('../configs');

mongoose.connect(
  configs.db.host,
  { useNewUrlParser: true }
);

// import models
const Hero = require('../models/Hero');
const Score = require('../models/Score');

// import files

const file1 = JSON.parse(fs.readFileSync(`${__dirname}/file1.json`, 'utf-8')); // TODO:
const file2 = JSON.parse(fs.readFileSync(`${__dirname}/file2.json`, 'utf-8')); // TODO:

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Hero.remove();
  await Score.remove();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample\n\n'); // TODO: create script
  process.exit();
}

async function loadData() {
  try {
    await Hero.insertMany(file1); // TODO:
    await Score.insertMany(file2); // TODO:
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch (e) {
    console.log(
      '\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n'
    ); // TODO:
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
