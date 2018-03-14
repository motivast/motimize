import boom from "boom";

import { image as ImageRepository } from "./../../respositories";

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
  let response;

  image = await ImageRepository.findById(req.params.id);

  if (image === null) {
    throw boom.notFound(`No image found for id ${req.params.id}`);
  }

  response = Object.assign({}, { success: true }, image.toJSON());

  res.status(200);
  res.json(response);
}

export { image };
