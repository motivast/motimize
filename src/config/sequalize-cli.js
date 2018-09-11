/**
 * Config provided only for sequelize cli module
 * to populate migrations and seeds.
 */

import dbConfig from "./db.js";

// Sequelize CLI do not properly handle es6 export leave old way
module.exports = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig
};
