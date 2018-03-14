import Joi from 'joi';

function validate(schema) {

    return function(req, res, next) {

        const { error, value } = Joi.validate(req.body, schema);

        if( error !== null ) {

            res.json({
                success: false,
                data: {
                    error: error.details[0].message
                },
            });

            res.status(400);
            res.send();

            return;
        }
        
        // Joi validate method will also fill params with defaults.
        req.body = value;

        next();
    };
}

export default validate;