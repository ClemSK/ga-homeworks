import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const commentSchema = new mongoose.Schema({
  text: { type: String, requred: true, maxLength: 300 },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const albumSchema = new mongoose.Schema({
  band: {
    bandName: String,
    nameOfMemebers: { guitarist: String, drummer: String, bassist: String },
    numberOfMembers: Number,
    genre: String,
  },
  albumTitle: String,
  isBanger: Boolean,
  releaseYear: Number,
  albumCover: {
    src: String,
    alt: String,
  },
  comments: [],
});

albumSchema.plugin(mongooseUniqueValidator);

const Album = mongoose.model("Album", albumSchema);

export default Album;
