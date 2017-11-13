'use strict';
const util = require('src/util.es6');

const url = require('url');

const dbParams = url.parse(process.env.DATABASE_URL, true);
const dbAuth = dbParams.auth.split(':');

const dbConfig = {
  database: dbParams.pathname.split('/')[1],
  username: dbAuth[0],
  password: dbAuth[1],
  host: dbParams.hostname,
  port: dbParams.port,
  dialect: dbParams.protocol.split(':')[0],
  seederStorage: 'sequelize',
  logging: console.log
};

if (dbParams.hostname !== 'localhost' && dbParams.hostname !== 'fs-intake-postgres') {
  if (util.isLocalOrCI) {
    dbConfig.ssl = false;
  } else {
    dbConfig.ssl = true;
  }
  dbConfig.dialectOptions = {
    ssl: {
      require: dbConfig.ssl
    }
  };
}

module.exports = dbConfig;
