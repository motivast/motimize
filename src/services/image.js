import logger from "winston";

import Queue from "bull";

import config, { redisurl } from "./../config";

import OptimizeService from "./optimize.js";
import StorageService from "./storage.js";

import Image from "./../models/image";

let instance;

/**
 * Image service singletone class provided for common tasks
 * on image model.
 */
class ImageService {
  /**
   * Image service constructor.
   *
   * @returns {ImageService} ImageService instance.
   */
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  /**
   * Create image.
   *
   * @param {Image} image - Image model.
   *
   * @returns {Promise} Promise.
   */
  create(image) {
    return Image.create(image);
  }

  /**
   * Update image.
   *
   * @param {Image} image - Image model.
   *
   * @returns {Promise} Promise.
   */
  save(image) {
    return image.save();
  }

  /**
   * Add image to processing queue.
   *
   * @param {Image} image - Image model.
   *
   * @returns {void} Returns nothing.
   */
  async queue(image) {
    let queue = new Queue(config.get("queue:key"), redisurl);

    await queue.add({ image: image });
    queue.close();
  }

  /**
   * Optimize image.
   *
   * @param {Image} image - Image model.
   *
   * @returns {Promise} Promise.
   */
  async optimize(image) {
    logger.info("Image optimization.");

    let buffer;
    let file;

    buffer = await StorageService.read(image.image);

    logger.info("Image optimization: Start image optimization.");
    buffer = await OptimizeService.optimize(buffer);

    logger.info("Image optimization: Save optimized image.");
    file = await StorageService.write(buffer);

    logger.info("Image optimization: Update image model.");
    image.optimized = true;
    image.optimized_image = file.reference;
    image.optimized_size = file.size;

    return image;
  }
}

export default new ImageService();
