import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, requred: true, maxLength: 300 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const albumSchema = new mongoose.Schema({
  genre: String,
  bandName: String,
  albumTitle: String,
  releaseYear: Number,
  comments: [commentSchema],
  // added the tracks schema to get all tracks for an album
  tracks: [{ type: mongoose.Types.ObjectId, ref: 'Track' }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

albumSchema.plugin(mongooseUniqueValidator);

const Album = mongoose.model('Album', albumSchema);

export default Album;
