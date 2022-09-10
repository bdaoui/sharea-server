const { Schema, model } = require("mongoose");

const imageSchema = new Schema(
  {
    name: String,
    image: String,
    comments: [],
    tags: []
  },
  {
    timestamps: true,
  }
);

const Image = model("Image", imageSchema);

module.exports = Image;