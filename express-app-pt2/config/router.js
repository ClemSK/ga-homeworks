import express from "express";
import { getAllAlbums } from "../controllers/albumsControllers.js";

const router = express.Router();

router.route("/albums").get(getAllAlbums);

export default router;
