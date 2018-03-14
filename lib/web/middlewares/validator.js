import Joi from "joi";

/**
 * Validate middleware.
 *
 * @param {Object} schema - Schema to validate.
 *
 * @returns {Function} Express middleware function.
 */
function validate(schema) {
  return function(req, res, next) {
    const { error, value } = Joi.validate(req.body, schema);

    if (error !== null) {
      res.json({
        success: false,
        data: {
          error: error.details[0].message
        }
      });

      res.status(400);
      res.send();

      return;
    }

    /**
     * Joi validation method is also filling params with defaults so
     * we will replace default body params with joi.
     */
    req.body = value;

    next();
  };
}

export default validate;
