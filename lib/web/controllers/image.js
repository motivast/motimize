import path from 'path';

import Image from './../../models/image';

async function image(req, res, next) {

    let image    = await Image.findById(req.params.id);
    let response = Object.assign({}, { "success": true }, image.toJSON());

    res.status(200);
    res.json(response);
}

export { image };