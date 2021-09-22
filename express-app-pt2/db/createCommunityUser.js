import User from '../model/user';
import { connectDb, disconnectDb } from './helpers';

async function createCommunityUser() {
  try {
    await connectDb();
    console.log('Database Connected');

    await User.create({
      username: 'community',
      email: 'user@community.wiki',
      password: 'N0!S3CuR1TyN3ed4dH28?',
    });
  } catch (err) {
    console.log('Something went wrong');
    console.log(err);
  }
  disconnectDb();
}

createCommunityUser();
