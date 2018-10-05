import config from "./config.js";
import url from "url";

let env;
let dbUrl, parsedDbUrl, auth;
let connectionConfig = {};
let connectionConfigDefaults = {
  operatorsAliases: false
};

/**
 * Some cloud services provide single environment variable to connect
 * db instance. We do not want to hard code this variable so it
 * is configurable.
 */
env = config.get("db:env");

if (typeof env !== "undefined") {
  dbUrl = config.get(env.toLowerCase());
}

/**
 * If there is provided environment variable build connection from url
 */
if (typeof dbUrl !== "undefined") {
  parsedDbUrl = url.parse(dbUrl);

  connectionConfig.dialect = parsedDbUrl.protocol.slice(0, -1);

  connectionConfig.host = parsedDbUrl.hostname;
  connectionConfig.port = parsedDbUrl.port;

  connectionConfig.database = parsedDbUrl.pathname.slice(
    1,
    parsedDbUrl.pathname.length
  );

  if (typeof parsedDbUrl.auth !== "undefined") {
    auth = parsedDbUrl.auth.split(":");

    if (typeof auth[0] !== "undefined") {
      connectionConfig.username = auth[0];
    }

    if (typeof auth[1] !== "undefined") {
      connectionConfig.password = auth[1];
    }
  }
} else {
  connectionConfig.dialect = config.get("db:dialect");

  connectionConfig.host = config.get("db:hostname");
  connectionConfig.port = config.get("db:port");

  connectionConfig.username = config.get("db:username");
  connectionConfig.password = config.get("db:password");

  connectionConfig.database = config.get("db:database");
}

connectionConfig = Object.assign(
  {},
  connectionConfig,
  connectionConfigDefaults
);

export default connectionConfig;
