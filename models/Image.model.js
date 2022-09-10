const { Schema, model } = require("mongoose");

const imageSchema = new Schema(
  {
    name: String,
    imageUrl: String,
    Owner: { type: Schema.Types.ObjectId, ref: "User"},
    comments: [],
    tags: []
  },
  {
    timestamps: true,
  }
);

const Image = model("Image", imageSchema);

module.exports = Image;