import fs from 'fs';

import readChunk from 'read-chunk';
import fileType from 'file-type';

export default class File {

    resolveSize() {

        let stats  = fs.statSync(this.path);

        return stats.size;
    }

    resolveMimeType() {

        let buffer = readChunk.sync(this.path, 0, 4100);
        let type   = fileType(buffer);

        return type.mime;
    }
}