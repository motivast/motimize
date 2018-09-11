import Fs from "./../storage/fs.js";

let instance;

/**
 * Storage service singletone class provided for common tasks
 * on Storage model.
 */
class StorageService {
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
   * Write to storage.
   *
   * @param {Buffer|string} data - Buffer or file path.
   *
   * @returns {Object} Storage file object.
   */
  write(data) {
    return Fs.write(data);
  }

  /**
   * Read from storage.
   *
   * @param {string} file - File reference.
   *
   * @returns {Buffer} File buffer.
   */
  read(file) {
    return Fs.read(file);
  }

  /**
   * Remove from storage.
   *
   * @param {string} file - File reference.
   *
   * @returns {void} Returns nothing.
   */
  remove(file) {
    return Fs.remove(file);
  }
}

export default new StorageService();
