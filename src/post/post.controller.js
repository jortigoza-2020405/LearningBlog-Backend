import Post from './post.model.js';

// Create a post
export const createPost = async (req, res) => {
  try {
    const data = req.body;
    const post = new Post(data);
    await post.save();
    return res.status(201).json({
      message: 'Post created successfully',
      post,
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to create post',
      error,
      success: false
    });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const { course } = req.query;
    const filter = course ? { course: { $regex: new RegExp(`^${course}$`, 'i') } } : {};
    const posts = await Post.find(filter)
      .populate({ path: 'comments', options: { sort: { createdAt: -1 } } })
      .sort({ createdAt: -1 });

    return res.json({
      message: 'Posts fetched successfully',
      posts,
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to fetch posts',
      error,
      success: false
    });
  }
};


// Get a post by ID
export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate('comments');
    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
        success: false
      });
    }
    return res.json({
      message: 'Post fetched successfully',
      post,
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to get post',
      error,
      success: false
    });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const data = req.body;
    const updatedPost = await Post.findByIdAndUpdate(postId, data, { new: true });

    if (!updatedPost) {
      return res.status(404).json({
        message: 'Post not found',
        success: false
      });
    }

    return res.json({
      message: 'Post updated successfully',
      post: updatedPost,
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to update post',
      error,
      success: false
    });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({
        message: 'Post not found',
        success: false
      });
    }

    return res.json({
      message: 'Post deleted successfully',
      post: deletedPost,
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to delete post',
      error,
      success: false
    });
  }
};
