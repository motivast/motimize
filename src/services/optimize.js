import logger from "winston";

import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminJpegoptim from "imagemin-jpegoptim";

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
   * @param {Buffer} buffer - Image buffer.
   *
   * @returns {Buffer} Optimized image buffer.
   */
  optimize(buffer) {
    logger.info("Optimization.");
    logger.info("Optimization: Start buffer optimization.");
    return imagemin.buffer(buffer, {
      plugins: [imageminMozjpeg(), imageminJpegoptim(), imageminPngquant()]
    });
  }
}

export default new OptimizeService();
