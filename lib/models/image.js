import mongoose from "mongoose";
import toJson from "@meanie/mongoose-to-json";

import Image from "./../entities/image";

const ImageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mime_type: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true,
    private: true
  },
  optimized: {
    type: Boolean,
    required: true,
    default: false
  },
  optimized_size: Number,
  optimized_path: {
    type: String,
    private: true
  },
  optimized_url: {
    type: String
  },
  callback_url: {
    type: String,
    private: true
  }
});

ImageSchema.plugin(toJson);
ImageSchema.loadClass(Image);

export default mongoose.model("Image", ImageSchema);
