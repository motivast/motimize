import path from "path";
import fs from "fs";

import url from "url";

import tempfile from "tempfile";
import download from "download";

import readChunk from "read-chunk";
import fileType from "file-type";

import boom from "boom";

import config from "./../../../config";

/**
 * Image handler middleware.
 *
 * Image can be sent in two ways. By url or by base64 string. This
 * middleware will detect in which way user want to send files, convert
 * image to Image entity class and assing it to request image property.
 *
 * @param {string[]} names - Names of parameters through which files are sent.
 *
 * @returns {void} Returns nothing.
 */
function handler(...names) {
  /**
   * Express middleware callback.
   *
   * @param {Object}   req  - Express request object.
   * @param {Object}   res  - Express response object.
   * @param {Function} next - Express next function.
   *
   * @returns {Promise} Returns promise.
   */
  return async (req, res, next) => {
    let name;

    /**
     * If upload type is not provided do nothing
     */
    if (typeof req.body.type === "undefined") {
      next();
      return;
    }

    if (req.body.type !== "url" && req.body.type !== "base64") {
      throw new Error(
        'Unsupported upload method "' +
          req.body.type +
          '". You can upload image using "url" or "base64" method.'
      );
    }

    if (req.body.type === "url") {
      for (name of names) {
        if (typeof req.body[name] !== "undefined") {
          req[name] = await handleUrl(req.body[name]);
        }
      }
    }

    if (req.body.type === "base64") {
      for (name of names) {
        if (typeof req.body[name] !== "undefined") {
          req[name] = await handleBase64(req.body[name]);
        }
      }
    }

    next();
  };
}

/**
 * URL file handler.
 *
 * @param {string} fileUrl - File url to download.
 *
 * @returns {string} File path.
 */
async function handleUrl(fileUrl) {
  let tmp = tempfile();

  let parsed = url.parse(fileUrl);
  let filename = path.basename(parsed.pathname);

  let downloaded = await download(fileUrl);

  fs.writeFileSync(tmp, downloaded);

  checkMimeType(tmp);

  return { filename: filename, path: tmp };
}

/**
 * Base64 file handler.
 *
 * @param {string} fileBase64 - File base64 string.
 *
 * @returns {string} File path.
 */
function handleBase64(fileBase64) {
  let tmp = tempfile();

  fs.writeFileSync(tmp, fileBase64, "base64");

  checkMimeType(tmp);

  return { filename: "", path: tmp };
}

/**
 * Check if we support given file mime type
 *
 * @param {string} path File path.
 *
 * @returns void
 */
function checkMimeType(path) {

  let supportedMimTypes = config.get("mime_types");

  let buffer = readChunk.sync(path, 0, 4100);
  let type = fileType(buffer);

  if (!supportedMimTypes.includes(type.mime)) {
    throw boom.badRequest(
      `Uploaded image has unsupported mime type "${type.mime}". Supported mime types are "${supportedMimTypes.join('","')}".`
    );
  }

  return;
}

export default handler;
