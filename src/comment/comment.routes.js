import { Router } from 'express'
import {
  createComment,
  getCommentsByPost,
  getCommentById,
  updateComment,
  deleteComment
} from './comment.controller.js'
import { validateComment, validateEditComment } from '../../helpers/validators.js'
import { handleValidationErrors } from '../../helpers/validate.error.js'

const router = Router()

router.get('/posts/:postId/comments', getCommentsByPost)

router.post(
  '/posts/:postId/comments',
  validateComment,
  handleValidationErrors,
  createComment
)

router.get('/comments/:commentId', getCommentById)

router.put(
  '/comments/:commentId',
  validateEditComment,
  handleValidationErrors,
  updateComment
)

router.delete('/comments/:commentId', deleteComment)

export default router

