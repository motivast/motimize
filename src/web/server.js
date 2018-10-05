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
  app.use(
    bodyParser.json({
      limit: config.get("body_parser_limit")
    })
  );

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
  if (err.isBoom) {
    /* Log error internaly */
    logger.warn(err.output.payload.message);

    /* Respond to the request */
    res
      .status(err.output.statusCode || 500)
      .json({ success: false, error: err.output.payload.message });
  } else {
    /* Log error internaly */
    logger.error(err);

    /* Respond to the request */
    res.status(500).json({ success: false, error: err.message });
  }
}

export default web;
