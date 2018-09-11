import Joi from "joi";
import boom from "boom";

/**
 * Validate middleware.
 *
 * @param {Object} params - Params schema to validate.
 * @param {Object} query - Query schema to validate.
 *
 * @returns {Function} Express middleware function.
 */
function validate(params = {}, query = {}) {

  return function(req, res, next) {

    const validationParams = Joi.validate(req.body, params);
    const validationQuery = Joi.validate(req.query, query);

    if (validationParams.error !== null) {
      throw boom.badRequest(validationParams.error.details[0].message);
    }

    if (validationQuery.error !== null) {
      throw boom.badRequest(validationQuery.error.details[0].message);
    }

    /**
     * Joi validation method is also filling params with defaults so
     * we will replace default body params with joi.
     */
    req.body = validationParams.value;
    req.query = validationQuery.value;

    next();
  };
}

export default validate;
