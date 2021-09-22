import Album from '../model/albums.js';
import Track from '../model/tracks.js';
import { removeAdded } from './helpers.js';

async function getAllAlbums(_req, res, next) {
  // underscore ignores the prop
  try {
    const albums = await Album.find(); // fetching all albums
    return res.status(200).json(albums);
  } catch (err) {
    next(err);
  }
}

async function getAllTracksForAlbum(req, res, next) {
  try {
    const id = req.params.id;
    const album = await Album.findById(id).populate('tracks');
    return res.status(200).json(album.tracks);
  } catch (err) {
    next(err);
  }
}

async function createAlbum(req, res, next) {
  try {
    const newAlbum = await Album.create({
      // for security, req.currentUser needs to
      // be used after the spread
      ...req.body, // spreading in the response
      createdBy: req.currentUser,
    });

    await Album.updateMany(
      { _id: newAlbum.albums },
      { $push: { albums: newAlbum._id } } // pushing new album into array, adding a new album
    );

    return res.status(201).json(newAlbum);
  } catch (err) {
    next(err);
  }
}

async function getAlbum(req, res, next) {
  const id = req.params.id;
  try {
    // We want to find the movie with that id
    // find by id
    const album = await Album.findById(id);

    if (!movie) {
      return res.status(404).send({ message: 'Movie does not exist' });
    }

    return res.status(200).json(album);
  } catch (err) {
    next(err);
  }
}

async function deleteAlbum(req, res, next) {
  const id = req.params.id;
  try {
    // We want to find the movie with that id
    // find by id
    const album = await Album.findByIdAndDelete(id);

    if (!album) {
      return res.status(404).send({ message: 'Album does not exist' });
    }

    // we want to ask mongoose if createdBy and currentUser match
    if (!album.createdBy.equals(req.currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorised action' });
    }

    // specifying what to remove
    const tracksToRemove = album.tracks.map((track) => track.toString());

    await Track.updateMany(
      { _id: tracksToRemove },
      { $pull: { albums: album._id } }
    );

    return res.status(200).json(album);
  } catch (err) {
    next(err);
  }
}

async function updateAlbum(req, res, next) {
  const id = req.params.id;
  const { body } = req;

  try {
    // //const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true })
    const album = await Album.findByIdAndUpdate(id);

    if (!album) {
      return res.send({ message: 'No album found' });
    }

    // we want to ask mongoose if createdBy and currentUser match
    if (!album.createdBy.equals(req.currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorised action' });
    }

    const [removedTracks, addedTracks] = removeAdded(
      // like using state
      album.tracks.map((track) => track.toString()),
      req.body.tracks
    );

    album.set(req.body); // where the body is getting updated
    const savedAlbum = await album.save();

    await Track.updateMany(
      { _id: removedTracks },
      { $pull: { albums: savedAlbum._id } }
    );

    await Track.updateMany(
      { _id: addedTracks },
      { $push: { albums: savedAlbum._id } }
    );

    return res.status(200).json(savedAlbum);
  } catch (err) {
    next(err);
  }
}

export default {
  getAllAlbums,
  createAlbum,
  getAlbum,
  deleteAlbum,
  updateAlbum,
  getAllTracksForAlbum,
};
// export const getAllAlbums = (request, response) => {
//   return response.send(["Beatles", "Punk", "Metal"]);
// };
