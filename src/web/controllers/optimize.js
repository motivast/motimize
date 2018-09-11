import logger from "winston";

import config from "./../../config";
import { ImageService, StorageService } from "./../../services";

import Image from "./../../models/image.js";

/**
 * Optimize action.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {void} Returns nothing.
 */
async function optimize(req, res) {
  logger.info("Optimize request.");

  let status;
  let data;
  let file = req.image;
  let params = req.body;

  if (params.wait === true) {
    logger.info("Optimize request: Optimize synchronous.");
    status = 200;
    data = await optimizeSync(file, params);
  }

  if (params.wait === false && params.callback_url !== null) {
    logger.info("Optimize request: Optimize asynchronous.");
    status = 202;
    data = await optimizeAsync(file, params);
  }

  logger.info("Optimize request: Return response.");
  res.status(status);
  res.json(Object.assign({}, { success: true }, data));
}

/**
 * Synchronous image optimization.
 *
 * @param {string} tmp    - Temporary file path.
 * @param {Object} params - Express request params object.
 *
 * @returns {Object} Image json representation.
 */
async function optimizeSync(tmp, params) {
  logger.info("Optimize sync request: Create image.");

  let image = new Image();
  let file = await StorageService.write(tmp.path);

  image = await ImageService.create({
    image: file.reference,
    filename: tmp.filename,
    size: file.size,
    mime_type: file.mime_type,
  });

  logger.info("Optimize sync request: Optimize image.");
  image = await ImageService.optimize(image);
  await ImageService.save(image);

  return image.json;
}

/**
 * Asynchronous image optimization.
 *
 * @param {Object} tmp    - Image entity to optimize.
 * @param {Object} params - Express request params object.
 *
 * @returns {Object} Image json representation.
 */
async function optimizeAsync(tmp, params) {
  logger.info("Optimize async request: Create image.");

  let url = config.get("url");
  let image = new Image();
  let file = await StorageService.write(tmp.path);

  image = await ImageService.create({
    image: file.reference,
    filename: tmp.filename,
    size: file.size,
    mime_type: file.mime_type,
    callback_url: params.callback_url
  });

  logger.info("Optimize async request: Add image to queue.");
  await ImageService.queue(image);

  return { resource: url + "/image/" + image.id };
}

export { optimize };
