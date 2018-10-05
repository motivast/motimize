import boom from "boom";

/**
 * Error middleware.
 *
 * Error middleware will catch any error throwed in controllers
 * and pass it to express next function.
 *
 * @param {Function} fn - Express route controller action.
 *
 * @returns {Function} Express middleware function.
 */
function error(fn) {

  return function(req, res, next) {

    Promise.resolve(fn(req, res, next)).catch(err => {
      return next(err);
    });
  };
}

export default error;
