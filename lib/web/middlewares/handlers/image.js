import path from 'path';
import fs from 'fs';

import url from 'url';

import tempfile from 'tempfile';
import download from 'download';

import Image from './../../../entities/image.js';

function handler(req, res, next) {

    if( req.body.type === 'url' ) {
        return handleUrl(req.body.image).then((image) => {
            req.image = image;
            next();
        });
    }

    if( req.body.type === 'base64' ) {
        return handleBase64(req.body.image).then((image) => {
            req.image = image;
            next();
        });
    }

    throw new Error('Unsupported upload method "' + req.body.type + '". You can upload image using "url" or "base64" method.');
}

function handleUrl(imageUrl) {

    let image;
    let tmp = tempfile();

    let parsed = url.parse(imageUrl);

    return new Promise((resolve, reject) => {

        download(imageUrl)
            .then((downloaded) => {

                fs.writeFileSync(tmp, downloaded);

                image = new Image();
                image.path      = tmp;
                image.filename  = path.basename(parsed.pathname);
                image.size      = image.resolveSize();
                image.mime_type = image.resolveMimeType();

                return resolve(image);
            })
            .catch(reject);
    });
}

function handleBase64(imageBase64) {

    let image;
    let tmp = tempfile();

    return new Promise((resolve, reject) => {

        fs.writeFileSync(tmp, imageBase64, 'base64');

        image = new Image();
        image.path = tmp;

        image.resolveSize();
        image.resolveMimeType();

        return resolve(image);
    });

    
}

export default handler;