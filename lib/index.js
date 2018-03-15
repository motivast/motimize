#! /usr/bin/env node

import config from "./config/";
import "./db/";

import web from "./web/";
import { optimize } from "./worker/";

import logger from "winston";

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
