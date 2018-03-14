import config from "nconf";
import { URL } from "url";

let env, redisurl;

/**
 * Some cloud services provide single environment variable to connect
 * redis instance. We do not want to hard code this variable so it
 * is configurable.
 */
env = config.get("redis:env");

if (typeof env !== "undefined") {
  redisurl = config.get(env.toLowerCase());
}

/**
 * If there is no provided environment variable build url with config
 */
if (typeof redisurl === "undefined") {
  redisurl = new URL("redis://localhost");

  if (typeof config.get("redis:host") !== "undefined") {
    redisurl.hostname = config.get("redis:host");
  }

  if (typeof config.get("redis:username") !== "undefined") {
    redisurl.username = config.get("redis:username");
  }

  if (typeof config.get("redis:password") !== "undefined") {
    redisurl.password = config.get("redis:password");
  }

  if (typeof config.get("redis:port") !== "undefined") {
    redisurl.port = config.get("redis:port");
  }

  redisurl = redisurl.toString();
}

export default redisurl;
