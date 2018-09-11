import boom from "boom";

import { image as ImageRepository } from "./../../respositories";
import { ImageService, StorageService } from "./../../services";

/**
 * Image action.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {void} Returns nothing.
 */
async function image(req, res) {
  let image;

  image = await ImageRepository.findById(req.params.id);

  if (image === null) {
    throw boom.notFound(`No image found for id ${req.params.id}`);
  }

  res.status(200);
  res.json(Object.assign({}, { success: true }, image.json));
}

/**
 * Image update action.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {void} Returns nothing.
 */
async function patch(req, res) {
  let file;
  let image;
  let schema;
  let key;

  image = await ImageRepository.findById(req.params.id);
  schema = image.dataValues;

  if (image === null) {
    throw boom.notFound(`No image found for id ${req.params.id}`);
  }

  /**
   * Iterate over all request body params, check if they exist in
   * image schema and update image model.
   */
  for (key in req.body) {

    if (req.body.hasOwnProperty(key) && schema.hasOwnProperty(key)) {
      image[key] = req.body[key];

      if (key === "image" || key === "optimized_image") {
        file = await StorageService.write(req[key].path);

        if (key === "image") {
          image.size = file.resolveSize();
        }

        if (key === "optimized_image") {
          image.optimized_size = file.resolveSize();
        }

        if (
          key === "optimized_image" &&
          image.mime_type !== file.resolveMimeType()
        ) {
          throw boom.badRequest(
            `Optimized image has different mime type "${file.resolveMimeType()}" then original "${
              image.mime_type
            }".`
          );
        }

        image[key] = file.reference;
      }
    }
  }

  ImageService.save(image);

  res.status(200);
  res.json(Object.assign({}, { success: true }, image.json));
}

/**
 * Download action.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {void} Returns nothing.
 */
async function download(req, res) {
  let image;
  let buffer;

  let reference = req.query.which === "optimized" ? "optimized_image" : "image";

  image = await ImageRepository.findById(req.params.id);

  if (image === null) {
    throw boom.notFound(`No image found for id ${req.params.id}`);
  }

  buffer = await StorageService.read(image[reference]);

  res.status(200);

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + image.filename
  );
  res.setHeader("Content-Type", image.mime_type);

  res.end(buffer);
}

export { image, patch, download };
