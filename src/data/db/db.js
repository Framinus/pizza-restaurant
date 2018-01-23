const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  database: 'pizza',
  port: 5432,
});

module.exports = db;
