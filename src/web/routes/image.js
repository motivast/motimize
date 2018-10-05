import error from "./../middlewares/error.js";
import validate from "./../middlewares/validator.js";
import imageHandler from "./../middlewares/handlers/image.js";

import imagePatchValidator from "./../validators/imagePatchValidator.js";
import {
  params as paramsDownloadValidator,
  query as queryDownloadValidator
} from "./../validators/imageDownloadValidator.js";

import {
  image as imageAction,
  patch as patchAction,
  download as downloadAction
} from "./../controllers/image.js";

/**
 * Image routes.
 *
 * @param {Object} app - Express app.
 *
 * @returns {void} Returns nothing.
 */
function image(app) {
  // UUIDv4 regex to match routes with image id
  let uuidv4Regex =
    "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}";

  // Get image route
  app.route("/image/:id(" + uuidv4Regex + ")").get(error(imageAction));

  // Patch image route
  app
    .route("/image/:id(" + uuidv4Regex + ")")
    .patch(
      error(validate(imagePatchValidator)),
      error(imageHandler("image", "optimized_image")),
      error(patchAction)
    );

  // Download image route
  app
    .route("/image/:id(" + uuidv4Regex + ")/download")
    .get(
      error(validate(paramsDownloadValidator, queryDownloadValidator)),
      error(downloadAction)
    );
}

export default image;
