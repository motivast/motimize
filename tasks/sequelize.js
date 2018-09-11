/**
 * Gulp task provider for manage tasks related with sequelize
 */
import fs from 'fs';
import path from 'path';
import gulp from 'gulp';

import config from './config';
import appConfig from "./../lib/config";

/**
 * Generate config for sequelize-cli
 */
gulp.task('sequelize:config', function (done) {

  let configPath = path.join(__dirname, './../config');

  let json = {
    "production": appConfig.get("db"),
    "development": appConfig.get("db"),
    "test": appConfig.get("db")
  };

  if (!fs.existsSync(configPath)) {
    fs.mkdirSync(configPath);
  }

  fs.writeFile(configPath + '/config.js', JSON.stringify(json), 'utf8', done);
});
