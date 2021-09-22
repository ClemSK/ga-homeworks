import Album from '../model/albums.js';
import User from '../model/user.js';
import { connectDb, disconnectDb } from './helpers.js';

async function cleanupComments() {
  try {
    await connectDb();
    console.log('Database Connected');

    const movies = await Album.find();
    // Get all movies
    const user = await User.findOne({
      email: 'user@community.wiki',
    });

    // Get all comments of each movie
    for (let album of albums) {
      album.comments.forEach((comment) => {
        // Set the createdBy to the "community" user
        comment.set({
          createdBy: user._id,
        });
      });

      if (album.createdBy) {
        const createdByUser = await User.findById(movie.createdBy);
        if (createdByUser) {
          console.log('album', album, 'created by', createdByUser);
          // in this case, there is already a valid user
          continue;
        }
      }
      album.set({ createdBy: user._id });
      await movie.save();
      console.log(newAlbum);
    }
  } catch (err) {
    console.log('Something went wrong');
    console.log(err);
  }
  disconnectDb();
}

cleanupComments();
