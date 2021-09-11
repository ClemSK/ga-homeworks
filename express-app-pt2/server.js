import express from "express";
import router from "./config/router.js";
import { port } from "./config/environment.js";
import { connectDb } from "./db/helpers.js";

// const express = require("express");
const app = express();

app.use(express.json());

app.use("/api", router);

// app.get("/", function (req, res) {
//   res.send("I am testing shit");
// });

// app.listen(3002);

async function startServer() {
  try {
    await connectDb();
    console.log("Mongoose is connected");
    app.listen(port, () => console.log(`Listening to Port: ${port}`));
  } catch (err) {
    console.log("Oh no something went wrong", err);
  }
}

startServer();
