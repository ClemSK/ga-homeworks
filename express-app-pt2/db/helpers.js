import mongoose from "mongoose";
import { dburi } from "../config/environment.js";

export function connectDb() {
  // not adding in options here see code-along for example
  return mongoose.connect(dburi);
}

export function truncateDb() {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;

    const promises = Object.keys(collections).map((collection) =>
      mongoose.connection.collection(collection).deleteMany({})
    );
    return Promise.all(promises);
  }
}

export function disconnectDb() {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect();
  }
}
