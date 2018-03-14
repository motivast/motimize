import path from "path";
import fs from "fs";

import url from "url";

import tempfile from "tempfile";
import download from "download";

import Image from "./../../../entities/image.js";

/**
 * Image handler middleware.
 *
 * Image can be sent in two ways. By url or by base64 string. This
 * middleware will detect in which way user want to send files, convert
 * image to Image entity class and assing it to request image property.
 *
 * @param {Object}   req  - Express request object.
 * @param {Object}   res  - Express response object.
 * @param {Function} next - Express next function.
 *
 * @returns {void} Returns nothing.
 */
function handler(req, res, next) {
  if (req.body.type === "url") {
    return handleUrl(req.body.image).then(image => {
      req.image = image;
      next();
    });
  }

  if (req.body.type === "base64") {
    return handleBase64(req.body.image).then(image => {
      req.image = image;
      next();
    });
  }

  throw new Error(
    'Unsupported upload method "' +
      req.body.type +
      '". You can upload image using "url" or "base64" method.'
  );
}

/**
 * URL image handler.
 *
 * @param {string} imageUrl - Image url to download.
 *
 * @returns {Image} Image entity class.
 */
function handleUrl(imageUrl) {
  let image;
  let tmp = tempfile();

  let parsed = url.parse(imageUrl);

  return new Promise((resolve, reject) => {
    download(imageUrl)
      .then(downloaded => {
        fs.writeFileSync(tmp, downloaded);

        image = new Image();
        image.path = tmp;
        image.filename = path.basename(parsed.pathname);
        image.size = image.resolveSize();
        image.mime_type = image.resolveMimeType();

        return resolve(image);
      })
      .catch(reject);
  });
}

/**
 * Base64 image handler.
 *
 * @param {string} imageBase64 - Image base64 string.
 *
 * @returns {Image} Image entity class.
 */
function handleBase64(imageBase64) {
  let image;
  let tmp = tempfile();

  return new Promise((resolve, reject) => {
    fs.writeFileSync(tmp, imageBase64, "base64");

    image = new Image();
    image.path = tmp;

    image.resolveSize();
    image.resolveMimeType();

    return resolve(image);
  });
}

export default handler;
