import config from 'nconf';
import logger from 'winston';

import express from 'express';
import bodyParser from 'body-parser';

import optimizeRoutes from './routes/optimize.js';
import imageRoutes from './routes/image.js';

function web() {

    let app = express();
    let port = config.get('port');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(express.static(config.get('public')));

    optimizeRoutes(app);
    imageRoutes(app);

    logger.info(`Starting Motimize web REST API server on ${port} port.`);

    app.listen(port);
}

export default web;