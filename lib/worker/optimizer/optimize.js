import path from 'path';

import logger from 'winston';
import rp from 'request-promise';
import errors from 'request-promise/errors';

import Queue from 'bull';

import config, { redisurl } from './../../config/';

import { image as ImageService } from './../../services';

function optimize() {

    logger.info("Starting Motimize optimizer worker.");

    let queue;

    queue = new Queue(config.get('queue:key'), redisurl);
    queue.process(process);
}

async function process(job, done) {

    logger.info("Optimize job.");

    let image, params;

    try {

        logger.info("Optimize job: Optimize image.");
        image = await ImageService.optimize(job.data.image);

        logger.info("Optimize job: Send request to callback_url.");
        params = Object.assign({}, { uri: image.callback_url, json: image.toJSON() }, config.get('callback:params'));

        await rp.post(params);

    } catch(err) {

        if (err instanceof errors.StatusCodeError) {
            logger.warn("Optimize job: Can not send request to callback_url.");
            logger.warn(err.message);
        } else {
            done(err);
        }
    }

    done();
}

export default optimize;