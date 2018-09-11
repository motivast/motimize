#! /usr/bin/env node

import logger from "winston";
import config from "./config/";

import web from "./web/";
import { optimize } from "./worker/";

let type = config.get("type");

logger.info(`Starting '${type}' process`, { pid: process.pid });

if (type === "web") {
  web();
} else if (type === "worker") {
  optimize();
} else {
  throw new Error(
    `"${type}" is an unsupported process type. Use one of: "web", "worker"!`
  );
}
