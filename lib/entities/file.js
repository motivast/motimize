import fs from "fs";

import readChunk from "read-chunk";
import fileType from "file-type";

/**
 * Entity class used for mongoose model
 */
export default class File {
  /**
   * Resolve size from file path.
   *
   * @returns {number} File size.
   */
  resolveSize() {
    let stats = fs.statSync(this.path);

    return stats.size;
  }

  /**
   * Resolve mime type from file chunk.
   *
   * @returns {string} File mime type.
   */
  resolveMimeType() {
    let buffer = readChunk.sync(this.path, 0, 4100);
    let type = fileType(buffer);

    return type.mime;
  }
}
