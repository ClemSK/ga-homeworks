import Album from "../model/albums.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    return res.status(200).json(albums);
  } catch (err) {
    next(err);
  }
};

// export const getAllAlbums = (request, response) => {
//   return response.send(["Beatles", "Punk", "Metal"]);
// };
