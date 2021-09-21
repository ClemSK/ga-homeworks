import Album from '../model/albums.js';
import Track from '../model/tracks.js';
import { removeAdded } from './helpers.js';

async function getAllAlbums(req, res, next) {
  try {
    const albums = await Album.find();
    return res.status(200).json(albums);
  } catch (err) {
    next(err);
  }
}

async function createAlbum(req, res, next) {
  try {
    const newAlbum = await Album.create(req.body);

    await Album.updateMany(
      { _id: newAlbum.albums },
      { $push: { albums: newAlbum._id } }
    );

    return res.status(201).json(newAlbum);
  } catch (err) {
    next(err);
  }
}

async function getAlbum(req, res, next) {
  const id = req.params.id;
  try {
    const album = await Album.findById(id);
    return res.status(200).json(album);
  } catch (err) {
    next(err);
  }
}

async function deleteAlbum(req, res, next) {
  const id = req.params.id;
  try {
    const album = await Album.findByIdAndDelete(id);

    if (!album) {
      return res.status(404).send({ message: 'Album does not exist' });
    }

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
    const album = await Album.findByIdAndUpdate(id);

    if (!album) {
      return res.send({ message: 'No album found' });
    }

    const [removedTracks, addedTracks] = removeAdded(
      album.tracks.map((track) => track.toString()),
      req.body.tracks
    );

    album.set(req.body);
    const savedAlbum = album.save();

    await Track.updateMany(
      { _id: removedTracks },
      { $pull: { albums: savedAlbum._id } }
    );

    await Track.updateMany(
      { _id: addedTracks },
      { $push: { albums: savedAlbum._id } }
    );

    return res.status(200).json(album);
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
