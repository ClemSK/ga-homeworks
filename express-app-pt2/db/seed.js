import mongoose from "mongoose";
import Album from "../model/albums.js";
import { albumSeedData } from "./albumSeedData.js";
import { connectDb, truncateDb, disconnectDb } from "./helpers.js";

async function seed() {
  try {
    await connectDb();
    console.log("📀 Connected to database");

    await truncateDb();
    console.log("📀 Database dropped");

    const albums = await Album.create(albumSeedData);
    console.log(`📀 ${albums.length} album(s) added to the database`);

    console.log("📀 Goodbye!");
  } catch (err) {
    console.log("📀 Something went wrong with seeding the database", err);
  }

  disconnectDb();
}

seed();
