import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const commentSchema = new mongoose.Schema({
  text: { type: String, requred: true, maxLength: 300 },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const albumSchema = new mongoose.Schema({
  genre: String,
  bandName: String,
  albumTitle: String,
  releaseYear: Number,
  comments: [commentSchema],
  tracks: [{ type: mongoose.Types.ObjectId, ref: 'Track' }],
});

albumSchema.plugin(mongooseUniqueValidator);

const Album = mongoose.model('Album', albumSchema);

export default Album;
