const mongoose = require('mongoose');

// import environmental variables from our variables.env file
const configs = require('./configs');

// Connect to our Database and handle any bad connections
mongoose.connect(
  configs.db.host,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// import all of our models
require('./models/Hero');
require('./models/Score');

// Start our app!
const app = require('./app');

// Start Express server.
app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%s in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
