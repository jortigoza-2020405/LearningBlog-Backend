//Validar campos en las rutas
import {validateErrorWithoutImg} from './validate.error.js'
import { body, param } from 'express-validator';

export const validatePost = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('course')
    .isIn(['TALLER','PRACTICAS','TECNOLOGIA'])
    .withMessage('Invalid Class'),
    validateErrorWithoutImg
];

export const validateComment = [
  param('postId').isMongoId().withMessage('ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('content').notEmpty().withMessage('Content or description is required'),
  validateErrorWithoutImg
];

export const validateEditComment = [
  body('name').notEmpty().withMessage('Name is required'),
  body('content').notEmpty().withMessage('Content is required'),
  validateErrorWithoutImg
];


