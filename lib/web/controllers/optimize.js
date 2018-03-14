import logger from 'winston';

import { image as ImageService } from './../../services';

async function optimize(req, res, next) {

    logger.info("Optimize request.");

    let status, data, image  = req.image, params = req.body;

    if(params.wait === true) {

        logger.info("Optimize request: Optimize synchronous.");
        status = 200;
        data   = await optimizeSync(image, params);
    }

    if(params.wait === false && typeof params.callback_url !== null) {

        logger.info("Optimize request: Optimize asynchronous.");
        status = 202;
        data   = await optimizeAsync(image, params);
    }

    logger.info("Optimize request: Return response.");
    res.status(status);
    res.json(Object.assign({}, { "success": true }, data));

    next();
}

async function optimizeSync(image, params) {

    logger.info("Optimize sync request: Create image.");
    image = await ImageService.create(image);


    logger.info("Optimize sync request: Optimize image.");
    image = await ImageService.optimize(image);

    return image.toJSON();
}   

async function optimizeAsync(image, params) {

    logger.info("Optimize async request: Create image.");
    image.callback_url = params.callback_url;
    image = await ImageService.create(image);


    logger.info("Optimize async request: Add image to queue.");
    await ImageService.queue(image);

    return { "resource": "/image/" + image.id, };
}

export { optimize };