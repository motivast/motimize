import path from "path";
import fs from "fs";

import logger from "winston";

import Queue from "bull";

import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminJpegoptim from "imagemin-jpegoptim";

import config, { redisurl } from "./../config";

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
  async create(image) {
    return Image.create(image);
  }

  /**
   * Update image.
   *
   * @param {Image} image - Image model.
   *
   * @returns {Promise} Promise.
   */
  async save(image) {
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

    let buffer, publicPath, basePath, filePath;

    logger.info("Image optimization: Find image.");

    image = await Image.findById(image.id);

    logger.info("Image optimization: Start image optimization.");

    buffer = await imagemin.buffer(fs.readFileSync(image.path), {
      plugins: [imageminMozjpeg(), imageminJpegoptim(), imageminPngquant()]
    });

    logger.info("Image optimization: Save optimized image to public path.");

    publicPath = config.get("public");

    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath);
    }

    basePath = path.resolve(config.get("public"), path.basename(image.path));
    filePath = path.resolve(basePath, image.filename);

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }

    fs.writeFileSync(filePath, buffer);

    logger.info("Image optimization: Update image model.");

    image.optimized = true;
    image.optimized_path = filePath;
    image.optimized_size = image.resolveSize();
    image.optimized_url = filePath.replace(
      path.resolve(config.get("public")),
      ""
    );

    return this.save(image);
  }
}

export default new ImageService();
