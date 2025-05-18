
import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: false 
    }
  }
);



export default model('Comment', commentSchema);
