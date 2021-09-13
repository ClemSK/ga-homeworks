import express from "express";
import albumsControllers from "../controllers/albumsControllers.js";

const router = express.Router();

router
  .route("/albums")
  .get(albumsControllers.getAllAlbums)
  .post(albumsControllers.createAlbum);

router
  .route("/albums/:id")
  .get(albumsControllers.getAlbum)
  .delete(albumsControllers.deleteAlbum)
  .put(albumsControllers.updateAlbum);

export default router;
