import Track from '../model/tracks.js';
import Album from '../model/albums.js';
import { removeAdded } from './helpers.js';

// getAllTracks
async function getAllTracks(_req, res, next) {
  try {
    const tracks = await Track.find();
    return res.status(200).json(tracks);
  } catch (err) {
    next(err);
  }
}

// getAllAlbumsForTracks
async function getAllAlbumsForTracks(req, res, next) {
  try {
    const { id } = req.params;
    const track = await Track.findById(id).populate('albums');
    return res.status(200).json(track.albums);
  } catch (err) {
    next(err);
  }
}

// createTrack
async function createTrack(req, res, next) {
  try {
    const newTrack = await Track.create(req.body);

    await Album.updateMany(
      { _id: newTrack.albums },
      { $push: { tracks: newTrack._id } }
    );

    return res.status(201).json(newTrack);
  } catch (err) {
    next(err);
  }
}

// getTrack
async function getTrack(req, res, next) {
  const id = req.params.id;

  try {
    const track = await Track.findById(id);

    if (!track) {
      return res.status(404).send({ message: 'Track does not exist' });
    }

    return res.status(200).json(track);
  } catch (err) {
    next(err);
  }
}

// deleteTrack
async function deleteTrack(req, res, next) {
  const { id } = req.params;

  try {
    const track = await Track.findByIdAndDelete(id);

    if (!track) {
      return res.status(404).send({ message: 'Track does not exist' });
    }

    const albumsToRemove = track.albums.map((album) => album.toString());

    await Album.updateMany(
      { _id: albumsToRemove },
      { $pull: { tracks: track._id } }
    );

    return res.status(204).json(track);
  } catch (err) {
    next(err);
  }
}

// updateTrack
async function updateTrack(req, res, next) {
  const id = req.params.id;

  try {
    const track = await Track.findById(id);

    if (!track) {
      return res.status(404).send({ message: 'Track does not exist' });
    }

    const [removedAlbums, addedAlbums] = removeAdded(
      track.albums.map((album) => album.toString()),
      req.body.albums
    );

    track.set(req.body);
    const savedTrack = await track.save();

    await Album.updateMany(
      { _id: removedAlbums },
      { $pull: { tracks: track._id } }
    );

    await Album.updateMany(
      { _id: addedAlbums },
      { $push: { tracks: savedTrack._id } }
    );

    return res.status(200).json(track);
  } catch (err) {
    next(err);
  }
}

// export track controllers
export default {
  getAllTracks,
  getAllAlbumsForTracks,
  createTrack,
  getTrack,
  deleteTrack,
  updateTrack,
};
