const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const error = require('./middlewares/error');
const routes = require('./routes');
const { logs } = require('./configs');

const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// parse cookie
app.use(cookieParser());

// gzip compression
app.use(compression());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
const whitelist = ['http://localhost', 'http://127.0.0.1'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET,
//     cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
//     store: new MongoStore({
//       url: process.env.MONGODB_URI,
//       autoReconnect: true,
//     }),
//   })
// );

// mount api routes
app.use('/', routes);

// error handler
app.use(error.handler);

module.exports = app;
