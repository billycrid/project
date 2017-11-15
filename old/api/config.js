var connectionString = 'postgres://billy:bcrid91@localhost:5432/application';
var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var db = pgp(connectionString);

module.exports = db;