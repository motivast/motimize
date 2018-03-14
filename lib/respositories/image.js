import Image from "./../models/image";

export default {
  findById(id) {
    return new Promise(function(resolve, reject) {
      Image.findById(id, function(err, image) {
        if (err) {
          return reject(err);
        }

        resolve(image);
      });
    });
  }
};
