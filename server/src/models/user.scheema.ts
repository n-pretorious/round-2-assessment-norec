import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  familyName: String,
  email: String,
  password: String

});

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});