import Joi from "joi";

// POST /optimize validation
export default Joi.object()
  .keys({
    // Allow only "base64" or "url" type
    type: Joi.valid(["base64", "url"]),

    // Allow images in url or base64 format depending on the type
    image: Joi.alternatives().when("type", {
      is: "base64",
      then: Joi.string().base64(),
      otherwise: Joi.string().uri({
        scheme: ["https", "http"]
      })
    }),

    filename: Joi.string(),

    mime_type: Joi.string(),

    size: Joi.number(),

    optimized: Joi.boolean(),

    // Allow optimized images in url or base64 format depending on the type
    optimized_image: Joi.when("type", {
      is: "base64",
      then: Joi.string().base64(),
      otherwise: Joi.string().uri({
        scheme: ["https", "http"]
      })
    }),

    optimized_size: Joi.number(),

    callback_url: Joi.string().uri({
      scheme: ["https", "http"]
    })
  })
  .with("image", "type") // Require "type" when "image" is provided.
  .with("optimized_image", "type"); // Require "type" when "optimized_image" is provided.
