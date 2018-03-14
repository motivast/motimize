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
  app.route("/image/:id").get(imageAction);
}

export default image;
