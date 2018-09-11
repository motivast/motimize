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
  app.route("*").all(
    error(function(req, res) {
      throw boom.badRequest(
        `Requested URL "${req.originalUrl}" in combination with method "${req.method}" is invalid.`
      );
    })
  );
}

export default notfound;
