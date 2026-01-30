import mongoose, { Schema } from "mongoose";

const videoSchame = new Schema(
  {},
  {
    timestamps: true,
  },
);

export const Video = mongoose.model("Video", videoSchame);
