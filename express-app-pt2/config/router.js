import express from 'express';
import albumsControllers from '../controllers/albumsControllers.js';
import commentsController from '../controllers/commentsController.js';
import tracksController from '../controllers/tracksController.js';
import userController from '../controllers/userController.js';
import secureRoute from '../middleware/secureRoutes.js';

const router = express.Router();

// getting the available albums and creating new ones
router
  .route('/albums')
  .get(albumsControllers.getAllAlbums)
  .post(secureRoute, albumsControllers.createAlbum);

// once an album is created then we can use the id to get new albums, update and delete
router
  .route('/albums/:id')
  .get(albumsControllers.getAlbum)
  .delete(secureRoute, albumsControllers.deleteAlbum)
  .put(secureRoute, albumsControllers.updateAlbum);

// here we create the route for the new comment
router.route('/albums/:id/comments').post(commentsController.createComment);

// updating / deleting the comment once the id has been produced
router
  .route('/albums/:id/comments/:commentId')
  .delete(secureRoute, commentsController.deleteComment)
  .put(secureRoute, commentsController.updateComment);

router
  .route('/tracks')
  .get(tracksController.getAllTracks)
  .post(secureRoute, tracksController.createTrack);

router
  .route('/tracks/:id')
  .get(tracksController.getTrack)
  .put(secureRoute, tracksController.updateTrack)
  .delete(secureRoute, tracksController.deleteTrack); // adding a secureRoute to prevent unregistered users from making changes

router.route('/tracks/:id/albums').get(tracksController.getAllAlbumsForTracks);
router.route('/albums/:id/tracks').get(albumsControllers.getAllTracksForAlbum);

router.route('/register').post(userController.registerUser);

router.route('/login').post(userController.loginUser);

export default router;

// .get(commentsController.getComment) - no get comments as we don't go to websites for the comments
