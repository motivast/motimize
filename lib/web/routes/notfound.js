import boom from "boom";

import error from "./../middlewares/error.js";

/**
 * Not found route.
 *
 * Throw not found error if any routes get here.
 *
 * @param {Object} app - Express app.
 *
 * @returns {void} Returns nothing.
 */
function notfound(app) {
  // Match all routes
  app.route("*").get(
    error(function(req, res) {
      throw boom.notFound(
        "The URI requested is invalid or the resource requested does not exist."
      );
    })
  );
}

export default notfound;
