
import { Router } from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} from './post.controller.js';
import { validatePost } from '../../helpers/validators.js';
import { handleValidationErrors } from '../../helpers/validate.error.js';

const router = Router();

// Get all posts (optionally filtered by course)
router.get('/', getPosts);

// Create a new post
router.post('/', validatePost, handleValidationErrors, createPost);

// Get a post by ID
router.get('/:postId', getPostById);

// Update a post by ID
router.put('/:postId', handleValidationErrors, updatePost);

// Delete a post by ID
router.delete('/:postId', deletePost);

export default router;
