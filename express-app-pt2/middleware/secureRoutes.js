import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import { secret } from '../config/environment.js';

// secure path for logging in and accessing data
async function secureRoute(req, res, next) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer')) {
      return res
        .status(401)
        .send({ message: 'You are not authorised to perform this action' });
    }

    const token = authToken.replace('Bearer ', '');

    jwt.verify(token, secret, async (err, data) => {
      // what's happening here?
      if (err) {
        return res.status(401).send({ message: 'Unauthorised' });
      }

      const user = await User.findById(data.userId);

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      next();
    });
  } catch (err) {
    next(err);
  }
}

export default secureRoute;
