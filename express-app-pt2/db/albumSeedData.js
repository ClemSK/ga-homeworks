import mongoose from "mongoose";

export const albumSeedData = [
  {
    band: {
      bandName: "megalica",
      nameOfMemebers: {
        guitarist: "Bob Martey",
        drummer: "dave growl",
        bassist: "cherry bomb",
        genre: "Heavy-Metal",
      },
    },
    albumTitle: "Heaviest Album Ever m/",
    isBanger: true,
    releaseYear: 1981,
    albumCover: {
      src: "https://upload.wikimedia.org/wikipedia/en/4/44/Mot%C3%B6rhead_-_Overkill_1979.jpg",
      alt: "Overkill-album-cover",
    },
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
