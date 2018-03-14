import mongoose from "mongoose";
import logger from "winston";

import { mongodburl } from "./../config/";

mongoose.connection.on("connected", function() {
  logger.info("MongoDB connected.");
});

mongoose.connection.once("open", function() {
  logger.info("MongoDB connection opened.");
});

mongoose.connection.on("disconnected", function() {
  logger.info("MongoDB disconnected.");
});

mongoose.connection.on("reconnected", function() {
  logger.info("MongoDB reconnected.");
});

mongoose.connection.on("error", function(err) {
  logger.error("MongoDB error.");
  logger.error(err);
});

mongoose.connect(mongodburl);
