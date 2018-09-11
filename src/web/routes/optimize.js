import error from "./../middlewares/error.js";
import validate from "./../middlewares/validator.js";
import imageHandler from "./../middlewares/handlers/image.js";

import { optimize as optimizeValidator } from "./../validators/optimize.js";
import { optimize as optimizeAction } from "./../controllers/optimize.js";

/**
 * Optimize routes.
 *
 * @param {Object} app - Express app.
 *
 * @returns {void} Returns nothing.
 */
function optimize(app) {
  // Optimize image route
  app
    .route("/optimize")
    .post(
      error(validate(optimizeValidator)),
      error(imageHandler("image")),
      error(optimizeAction)
    );
}

export default optimize;
