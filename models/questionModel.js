import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true,
    immutable: true
  }
}, { timestamps: true });

export const Question = mongoose.model('Question', questionSchema);
