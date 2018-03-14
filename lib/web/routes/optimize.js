import validate from './../middlewares/validator.js';
import imageHandler from './../middlewares/handlers/image.js'; 

import { optimize as optimizeValidator } from './../validators/optimize.js';
import { optimize as optimizeAction } from "./../controllers/optimize.js";

function optimize(app) {

  // Optimize image route
  app.route('/optimize').post(validate(optimizeValidator), imageHandler, optimizeAction);
};

export default optimize;