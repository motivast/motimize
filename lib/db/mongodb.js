import mongoose from "mongoose";

import { mongodburl } from "./../config/";

mongoose.connect(mongodburl);
