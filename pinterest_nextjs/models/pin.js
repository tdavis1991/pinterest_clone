import mongoose, { Schema, model, models } from 'mongoose';

const PinSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: String,
  imageUrl: {
    type: String,
    required: [true, 'Image is required']
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      username: String,
      text: String,
    }
  ],
  board: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Pin = models.Pin || model('Pin', PinSchema);

export default Pin;