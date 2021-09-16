import mongoose from "mongoose";

export const albumSeedData = [
  {
    genre: "Heavy-Metal",
    bandName: "megalica",
    albumTitle: "Heaviest Album Ever m/",
    releaseYear: 1981,
    comments: [],
  },
];

// const albumSchema = new mongoose.Schema({
//   band: {
//     bandName: String,
//     nameOfMemebers: { guitarist: String, drummer: String, bassist: String },
//     numberOfMembers: Number,
//     genre: String,
//   },
//   albumTitle: String,
//   isBanger: Boolean,
//   releaseYear: Number,
//   albumCover: {
//     src: String,
//     alt: String,
//   },
//   comments: [],
// });
