import fs from "fs";

import logger from "winston";
import tempfile from "tempfile";
import rp from "request-promise";
import request from "request";
import errors from "request-promise/errors";

import Queue from "bull";

import config, { redisurl } from "./../../config/";

import { OptimizeService } from "./../../services";

/**
 * Init optimize worker.
 *
 * @returns {void} Returns nothing.
 */
function optimize() {
  logger.info("Starting Motimize optimizer worker.");

  let queue;

  queue = new Queue(config.get("queue:key"), redisurl);
  queue.process(process);
}

/**
 * Single job handler.
 *
 * @param {Object}    job - Job object.
 * @param {Function} done - Done callback indicating when job is done.
 *
 * @returns {void} Returns nothing.
 */
async function process(job, done) {
  logger.info("Optimize job.");

  let image;
  let buffer;
  let response;

  try {
    logger.info("Optimize job: Download image.");
    image = await downloadImage(job.data.image);

    logger.info("Optimize job: Read image.");
    buffer = fs.readFileSync(image);

    logger.info("Optimize job: Optimize image.");
    buffer = await OptimizeService.optimize(buffer, job.data.image.quality);

    logger.info("Optimize job: Send patch request.");
    response = await sendPatch(job.data.image, buffer);

    if (response.success !== true) {
      throw new Error(
        "Can not send patch request. Response:" + JSON.stringify(response)
      );
    }

    delete response.success;

    logger.info("Optimize job: Send callback request.");
    await sendCallback(job.data.image, response);
  } catch (err) {
    if (err instanceof errors.StatusCodeError) {
      logger.warn("Optimize job: Can not send request to callback_url.");
      logger.warn(err.message);
    } else {
      /* Log error internaly */
      logger.error(err);

      if (
        config.get("node_env") !== "development" &&
        config.get("node_env") !== "test"
      ) {
        done(err);
      }
    }
  }

  done();
}

/**
 * Download image request.
 *
 * @param {Object} image - Image object.
 *
 * @returns {Promise} Returns promise.
 */
function downloadImage(image) {
  let url = config.get("url");
  let tmp = tempfile();
  let stream = fs.createWriteStream(tmp);

  let getParams = {
    uri: url + "/image/" + image.id + "/download"
  };

  return new Promise((resolve, reject) => {
    request
      .get(getParams)
      .on("error", err => reject(err))
      .pipe(stream)
      .on("finish", () => resolve(tmp));
  });
}

/**
 * Send patch request.
 *
 * @param {Object} image  - Image object.
 * @param {Buffer} buffer - Image buffer.
 *
 * @returns {Promise} Returns promise.
 */
function sendPatch(image, buffer) {
  let url = config.get("url");

  let patchParams = {
    uri: url + "/image/" + image.id,
    json: {
      type: "base64",
      optimized: true,
      optimized_image: buffer.toString("base64"),
      optimized_size: buffer.byteLength
    }
  };

  return rp.patch(patchParams);
}

/**
 * Send callback request.
 *
 * @param {Object} image - Image object.
 * @param {Object} data  - Image data.
 *
 * @returns {Promise} Returns promise.
 */
function sendCallback(image, data) {
  let callbackParams = Object.assign(
    {},
    { uri: image.callback_url, json: data },
    config.get("callback:params")
  );

  return rp.post(callbackParams);
}

export default optimize;
