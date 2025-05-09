import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addQuestion,
  getAllQuestions,
  getQuestion
} from '../controllers/questionController.js';

const router = express.Router();

// anyone logged in can post a question
router.post('/', protect, addQuestion);
router.get('/', protect, getAllQuestions);
router.get('/:id', protect, getQuestion);

export default router;
