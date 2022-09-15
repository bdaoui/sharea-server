const { Schema, model } = require("mongoose");

const imageSchema = new Schema(
  {
    name: String,
    imageUrl: String,
    owner: { type: Schema.Types.ObjectId, ref: "User"},
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}],
    tags: []
  },
  {
    timestamps: true,
  }
);

const Image = model("Image", imageSchema);

module.exports = Image;