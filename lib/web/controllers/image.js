import Image from "./../../models/image";

/**
 * Image action.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {void} Returns nothing.
 */
async function image(req, res) {
  let image = await Image.findById(req.params.id);
  let response = Object.assign({}, { success: true }, image.toJSON());

  res.status(200);
  res.json(response);
}

export { image };
