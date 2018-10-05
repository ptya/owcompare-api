const path = require('path');

require('dotenv-safe').load({
  path: path.resolve(process.cwd(), '.env'),
  example: path.resolve(process.cwd(), '.env.example'),
  allowEmptyValues: true,
});

const configs = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  logs: process.env.NODE_ENV === 'development' ? 'dev' : 'combined',
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
  },
};

module.exports = configs;
