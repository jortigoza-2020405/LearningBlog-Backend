import Comment from './comment.model.js';
import Post from '../post/post.model.js';

// Create a comment and associate it with a post
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { name, content } = req.body;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found', success: false });
    }

    
    const comment = new Comment({ name, content });
    await comment.save();

    
    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({ message: 'Comment created successfully', comment, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating comment', error, success: false });
  }
};

// Get all comments for a specific post
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId)
      .populate({ path: 'comments', options: { sort: { createdAt: -1 } } });

    if (!post) {
      return res.status(404).json({ message: 'Post not found', success: false });
    }

    return res.json({ comments: post.comments, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching comments', error, success: false });
  }
};

// Get a single comment by  ID
export const getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found', success: false });
    }

    return res.json({ comment, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching comment', error, success: false });
  }
};

// Update a comment by ID
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const data = req.body;
    const updated = await Comment.findByIdAndUpdate(commentId, data, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Comment not found', success: false });
    }

    return res.json({ message: 'Comment updated successfully', comment: updated, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating comment', error, success: false });
  }
};

// Delete a comment by ID
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deleted = await Comment.findByIdAndDelete(commentId);

    if (!deleted) {
      return res.status(404).json({ message: 'Comment not found', success: false });
    }

    // Also remove the reference from the post
    await Post.updateMany(
      { comments: commentId },
      { $pull: { comments: commentId } }
    );

    return res.json({ message: 'Comment deleted successfully', comment: deleted, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting comment', error, success: false });
  }
};
