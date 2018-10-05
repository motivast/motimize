import logger from "winston";

import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminJpegRecompress from "imagemin-jpeg-recompress";
import imageminMozjpeg from "imagemin-mozjpeg";

let instance;

/**
 * Image service singletone class provided for common tasks
 * on image model.
 */
class OptimizeService {
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
   * Optimize image.
   *
   * @param {Buffer}     buffer    - Image buffer.
   * @param {string|int} quality   - Quality with which the image should be optimized.
   *
   * @returns {Buffer} Optimized image buffer.
   */
  optimize(buffer, quality) {
    logger.info("Optimization.");
    logger.info(
      'Optimization: Optimize image with quality: "' + quality + '".'
    );

    logger.info("Optimization: Start buffer optimization.");
    return imagemin.buffer(buffer, {
      plugins: getPlugins(quality)
    });
  }
}

/**
 * Get imagemin plugins to optimize image based on quality.
 *
 * @param {string|int} quality - Quality with which the image should be optimized.
 *
 * @returns {Array} Array of imagemin plugins.
 */
function getPlugins(quality) {
  // If quality is between 0 - 100 use mozjpeg plugin
  if (/^([0-9][0-9]?|100)$/.test(quality)) {
    return [
      imageminMozjpeg({
        quality: quality
      })
    ];
  }

  if (quality === "perfect") {
    return [imageminJpegtran()];
  }

  if (quality === "ultra") {
    return [
      imageminJpegRecompress({
        min: 10,
        max: 95,
        target: 0.999901
      })
    ];
  }

  if (quality === "high") {
    return [
      imageminJpegRecompress({
        min: 10,
        max: 95,
        target: 0.99901
      })
    ];
  }

  if (quality === "medium") {
    return [
      imageminJpegRecompress({
        min: 10,
        max: 95,
        target: 0.99501
      })
    ];
  }

  if (quality === "low") {
    return [
      imageminJpegRecompress({
        min: 10,
        max: 95,
        target: 0.99001
      })
    ];
  }

  // If we get here this means quality do not match any of our conditions which
  // should not happen.
  throw new Error(
    'Provided quality "' + quality + '" does not match the possible choices."'
  );
}

export default new OptimizeService();
