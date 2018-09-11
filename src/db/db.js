import Sequelize from "sequelize";

import dbConfig from "../config/db";

export default new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);
