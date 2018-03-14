import { image as imageAction } from "./../controllers/image.js";

function image(app) {

  // Get image route
  app.route('/image/:id').get(imageAction);
  app.route('/image/:id/download').get(imageAction);
};

export default image;