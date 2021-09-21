import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import { secret } from '../config/environment.js';

// register user
async function registerUser(req, res, next) {
  try {
    const user = await User.create(req.body);
    return res.status(201).send(user);
  } catch (err) {
    next(err);
  }
}

// login user
async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ message: 'Not a user' });
    }

    if (!user.validatePassword(req.body.password)) {
      return res.status(401).send({ message: 'Unauthorised' });
    }

    const token = jwt.sign(
      { userId: user._id }, // the info we want to store in the token
      secret, // what to encrypt the token with
      { expiresIn: '12h' } // how long a session will last / token will be valid for
    );

    return res.status(202).send({ token, message: 'Login successful' });
  } catch (err) {
    next(err);
  }
}

export default {
  registerUser,
  loginUser,
};
