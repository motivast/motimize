import error from "./../middlewares/error.js";
import { image as imageAction } from "./../controllers/image.js";

/**
 * Image routes.
 *
 * @param {Object} app - Express app.
 *
 * @returns {void} Returns nothing.
 */
function image(app) {
  // Get image route
  app.route("/image/:id([a-f\\d]{24})").get(error(imageAction));
}

export default image;
