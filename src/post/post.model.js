
import { Schema, model } from 'mongoose';

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, `Can't overcome 100 characters`]
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    course: {
      type: String,
      required: [true, 'Course is required'],
      trim: true,
      enum: {
        values: ['TALLER', 'PRACTICAS', 'TECNOLOGIA'],
      }
    },
    repository: {
      type: String,
      trim: true
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    timestamps: true
  }
);



export default model('Post', postSchema);
