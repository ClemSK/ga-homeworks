import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import mongooseHidden from 'mongoose-hidden';
import uniqueValidator from 'mongoose-unique-validator';

// Schema for a new user
const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// here we save and encrypt the password
user.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
  next();
});
// the password is validated by comparing with the original
user.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

user.plugin(uniqueValidator);
// not sure what's going on here
user.plugin(mongooseHidden({ defaultHidden: { password: true, email: true } }));

// setting the model to be exported
const User = mongoose.model('User', user);

export default User;
