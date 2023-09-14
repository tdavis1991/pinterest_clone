import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    unique: [true, 'Email already exist!'],
    required: [true, 'Email is required!']
  },
  fullName: String,
  bio: String,
  profilePicture: String,
  pins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pin'
    }
  ],
  boards: [
    {
      name: String,
      pins: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Pin'
        }
      ]
    }
  ]
});

const User = models.User || model('User', UserSchema);

export default User;
