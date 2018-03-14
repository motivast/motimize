import path from "path";
import fs from "fs";

import dotenv from "dotenv";
import config from "nconf";

dotenv.config();

config
  .argv() // Load config from command line
  .env({ lowerCase: true, separator: "__" }); // Load config from enviromental variables and dotenv

let defaultConfig = path.resolve(path.dirname(__filename), "config.json");
let enviromentalConfig = path.resolve(
  path.dirname(__filename),
  config.get("NODE_ENV") + ".json"
);

// Load enviromental config from file. Enviromental config must be loaded before default config.
if (fs.existsSync(enviromentalConfig)) {
  config.file("enviromental", { file: enviromentalConfig });
}

// Load default config from file. Default config must be loaded last to not overwrite enviromental config.
if (fs.existsSync(defaultConfig)) {
  config.file("default", { file: defaultConfig });
}

export default config;
