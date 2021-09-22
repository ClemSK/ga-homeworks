import Album from '../model/albums.js';

// creating a comment
async function createComment(req, res, next) {
  try {
    const { id } = req.params; // getting the id
    const album = await Album.findById(id); // defining the album

    // if the album is not found an error message is given in the api
    // setting the http error code to 404
    if (!album) {
      // if not an album then display:
      return res.status(404).send({ message: 'Album does not exist' });
    }

    // defining a new comment - request body
    const newComment = {
      ...req.body,
      createdBy: req.currentUser,
    };

    album.comments.push(newComment); // pushing the new comment into the comments array
    const savedAlbum = await album.save(); // saving adds the comment to the db

    res.status(201).json(savedAlbum); // if successful, displaying the new comment in the data
  } catch (err) {
    next(err);
  }
}
// unable to get comments in the api, trying to create a get function for my objects

// async function getComment(req, res, next) {
//   try {
//     const { id, commentId } = req.params;
//     const album = await Album.findById(id);

//     const comment = album.comments.id(commentId);

//     return res.status(200).json(comment);
//   } catch (err) {
//     next(err);
//   }
// }

// to delete a comment, we need to take the album id and the comment id, to get specific
async function deleteComment(req, res, next) {
  try {
    const { id, commentId } = req.params.id; // selecting album and comment id
    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).send({ message: 'Album does not exist' });
    }
    // as earlier sending an error message when the object is not found
    const comment = album.comments.id(commentId);
    if (!comment) {
      return res.status(404).send({ message: 'Comment does not exist' });
    }

    // here we are removing the comment - use .remove as .delete is depricated
    comment.remove();

    // updating the data with the removed comment
    const savedAlbum = await album.save();
    return res.status(200).send(savedAlbum);
  } catch (err) {
    next(err);
  }
}

// similar to delete, we get the album id and comment id to change the comment
async function updateComment(req, res, next) {
  try {
    const { id, commentId } = req.params;
    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).send({ message: 'Album does not exist' });
    }

    const comment = album.comments.id(commentId);
    if (!comment) {
      return res.status(404).send({ message: 'Comment does not exist' });
    }

    comment.set(req.body);

    const savedAlbum = await album.save();
    return res.status(200).send(savedAlbum);
  } catch (err) {
    next(err);
  }
}

// exporting the functions we created so we can use them in other components
export default {
  createComment,
  deleteComment,
  updateComment,
};
//   getComment,
