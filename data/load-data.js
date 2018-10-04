const fs = require('fs');
const mongoose = require('mongoose');
const configs = require('../configs');

mongoose.connect(
  configs.db.host,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

// import models
const Hero = require('../models/Hero');
const Score = require('../models/Score');

// import files

const heroes = JSON.parse(fs.readFileSync(`${__dirname}/heroes.json`, 'utf-8'));
const scores = JSON.parse(fs.readFileSync(`${__dirname}/scores.json`, 'utf-8'));

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Hero.deleteMany({});
  await Score.deleteMany({});
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample\n\n'); // TODO: create script
  process.exit();
}

async function loadData() {
  try {
    await Hero.insertMany(heroes);
    await Score.insertMany(scores);
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
