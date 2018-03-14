import Joi from 'joi';

// POST /optimize validation
export const optimize = {

  // Allow only "base64" or "url" type
  type: Joi.any().valid(['base64', 'url']).required(),

  // Allow images in url or base64 format depending on the type 
  image:        Joi.alternatives()
    .when( 'type', {
         is : 'base64',
         then: Joi.string().base64(),
         otherwise: Joi.string().uri({
             scheme: [ 'https', 'http' ]
         })
    })
    .required(),
  
  // If wait is set to false require callback_url.
  // Allow callback in uri format with http or https scheme.
  callback_url: Joi.string()
    .uri({
         scheme: [ 'https', 'http' ]
    })
    .when('wait', {
         is: false, then: Joi.required() 
    })
    .default(null)
    .options({
    
        language: {
            any: {
                required: 'or "wait" set to true are required"',
            }
        }
    }),
  
  // Default false
  wait: Joi.boolean().default(false),

  // Default true
  lossy: Joi.boolean().default(true),

  // Allow for integer between 0 - 100 or 'default' string
  quality: Joi.alternatives().try(Joi.number().integer().min(0).max(100), Joi.string().regex(/^default$/)).default('default'),
};
