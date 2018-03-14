import config from "nconf";
import { URL } from "url";

let env, mongodburl;

/**
 * Some cloud services provide single environment variable to connect
 * mongodb instance. We do not want to hard code this variable so it
 * is configurable.
 */
env = config.get("mongodb:env");

if (typeof env !== "undefined") {
  mongodburl = config.get(env.toLowerCase());
}

/**
 * If there is no provided environment variable build url with config
 */
if (typeof mongodburl === "undefined") {
  mongodburl = new URL("mongodb://localhost");

  if (typeof config.get("mongodb:host") !== "undefined") {
    mongodburl.hostname = config.get("mongodb:host");
  }

  if (typeof config.get("mongodb:username") !== "undefined") {
    mongodburl.username = config.get("mongodb:username");
  }

  if (typeof config.get("mongodb:password") !== "undefined") {
    mongodburl.password = config.get("mongodb:password");
  }

  if (typeof config.get("mongodb:port") !== "undefined") {
    mongodburl.port = config.get("mongodb:port");
  }

  if (typeof config.get("mongodb:name") !== "undefined") {
    mongodburl.pathname = config.get("mongodb:name");
  }

  mongodburl = mongodburl.toString();
}

export default mongodburl;
