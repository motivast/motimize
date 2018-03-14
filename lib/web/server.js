import config from "nconf";
import logger from "winston";

import express from "express";
import bodyParser from "body-parser";

import optimizeRoutes from "./routes/optimize.js";
import imageRoutes from "./routes/image.js";
import notfoundRoutes from "./routes/notfound.js";

/**
 * Init web server.
 *
 * @returns {void} Returns nothing.
 */
function web() {
  let app = express();
  let port = config.get("port");

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(express.static(config.get("public")));

  optimizeRoutes(app);
  imageRoutes(app);
  notfoundRoutes(app);

  app.use(errors);

  logger.info(`Starting Motimize web REST API server on ${port} port.`);

  app.listen(port);
}

/**
 * Error handler.
 *
 * @param {Object}   err  - Error object.
 * @param {Object}   req  - Express request object.
 * @param {Object}   res  - Express response object.
 * @param {Function} next - Express next function.
 *
 * @returns {void} Returns nothing.
 */
function errors(err, req, res, next) {
  /* Log error internaly */
  logger.error(err);

  /**
   * Remove Error's `stack` property. We don't want
   * users to see this at the production env
   */
  if (
    process.env.NODE_ENV !== "development" ||
    process.env.NODE_ENV !== "test"
  ) {
    delete err.stack;
  }

  /* Finaly respond to the request */
  res
    .status(err.output.statusCode || 500)
    .json({ success: false, message: err.output.payload.message });
}

export default web;
