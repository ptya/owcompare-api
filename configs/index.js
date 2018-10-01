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
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    migrationStorageTableName: 'sequelize_meta',
    operatorsAliases: false,
    define: {
      underscored: true,
    },
  },
};

module.exports = configs;
