import Image from "./../models/image";

export default {
  findById(id) {
    return Image.findById(id);
  }
};
