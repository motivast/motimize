import Joi from "joi";

// GET /image/:id/download validation
let params = {};

// GET /image/:id/download validation
let query = {
  // Allow only "normal" or "optimized" type
  which: Joi.string()
    .valid("normal", "optimized")
    .default("normal")
};

export { params, query };
