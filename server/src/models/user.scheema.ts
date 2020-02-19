// import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose'


export const UserSchema = new mongoose.Schema({
    fistName: String,
    familyName: String,
    email: String,
    password: String 
  })

