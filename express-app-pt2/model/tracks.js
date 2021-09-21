import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const tracksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  albums: [{ type: mongoose.Types.ObjectId, ref: 'Album' }],
});

tracksSchema.plugin(mongooseUniqueValidator);

const Track = mongoose.model('Track', tracksSchema);

export default Track;
