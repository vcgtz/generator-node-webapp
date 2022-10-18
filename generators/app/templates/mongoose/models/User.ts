import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'The username is required'],
    },
    email: {
      type: String,
      required: [true, 'The email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'The password is required'],
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

export default model('User', userSchema);
