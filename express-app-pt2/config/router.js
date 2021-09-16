import express from "express";
import commentsController from "../controllers/commentsController.js";
import albumsControllers from "../controllers/albumsControllers.js";

const router = express.Router();

// getting the available albums and creating new ones
router
  .route("/albums")
  .get(albumsControllers.getAllAlbums)
  .post(albumsControllers.createAlbum);

// once an album is created then we can use the id to get new albums, update and delete
router
  .route("/albums/:id")
  .get(albumsControllers.getAlbum)
  .delete(albumsControllers.deleteAlbum)
  .put(albumsControllers.updateAlbum);

// here we create the route for the new comment
router.route("/albums/:id/comments").post(commentsController.createComment);

// updating / deleting the comment once the id has been produced
router
  .route("/albums/:id/comments/:commentId")
  .delete(commentsController.deleteComment)
  .put(commentsController.updateComment);

export default router;

// .get(commentsController.getComment)
