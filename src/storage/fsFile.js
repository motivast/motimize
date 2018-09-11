import fs from "fs";

import readChunk from "read-chunk";
import fileType from "file-type";

/**
 * Storage service singletone class provided for common tasks
 * on Storage model.
 */
export default class FsFile {
  /**
   * Get path as reference.
   *
   * @returns {string} File path.
   */
  get reference() {
    return this.path;
  }

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
