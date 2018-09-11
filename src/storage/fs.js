import path from "path";
import fs from "fs";

import uuid from "node-uuid";

import config from "./../config";

import FsFile from "./fsFile.js";

let instance;

/**
 * Storage service singletone class provided for common tasks
 * on Storage model.
 */
class Fs {
  /**
   * Storage service constructor.
   *
   * @returns {StorageService} StorageService instance.
   */
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  /**
   * Write file to file object or file path.
   *
   * @param {(Buffer|string)} data - Buffer or file path.
   *
   * @returns {FsFile} Storage file object.
   */
  write(data) {
    let buffer = data;
    let uploadPath;
    let filePath;
    let file;

    if (!(data instanceof Buffer)) {
      if (!fs.existsSync(data)) {
        throw new Error(
          'Provided file data to write is neither buffer nor file path but "' +
            typeof data +
            '".'
        );
      }

      buffer = fs.readFileSync(data);
    }

    uploadPath = path.resolve(config.get("uploads_dir"));

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    filePath = path.resolve(uploadPath, uuid.v4());

    fs.writeFileSync(filePath, buffer);

    file = new FsFile();
    file.path = filePath;
    file.size = file.resolveSize();
    file.mime_type = file.resolveMimeType();

    return file;
  }

  /**
   * Read file from file object or file path.
   *
   * @param {(FsFile|string)} file - File object or file path.
   *
   * @returns {Buffer} File buffer.
   */
  read(file) {
    if (!(file instanceof FsFile) && !fs.existsSync(file)) {
      throw new Error(
        'Provided file to read is neither FsFile instance nor file path but "' +
          typeof file +
          '".'
      );
    }

    if (file instanceof FsFile) {
      file = file.path;
    }

    return fs.readFileSync(file);
  }

  /**
   * Remove file from storage.
   *
   * @param {(FsFile|string)} file - File object or file path.
   *
   * @returns {void} Returns nothing.
   */
  remove(file) {
    if (!(file instanceof FsFile) && !fs.existsSync(file)) {
      throw new Error(
        'Provided file to remove is neither FsFile instance nor file path but "' +
          typeof file +
          '".'
      );
    }

    if (file instanceof FsFile) {
      file = file.path;
    }

    fs.unlinkSync(file.path);
  }
}

export default new Fs();
