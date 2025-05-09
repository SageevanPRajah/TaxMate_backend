import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import {
  addAnswer,
  updateAnswer,
  getAnswersForQuestion
} from '../controllers/answerController.js';

const router = express.Router({ mergeParams: true });

// only admin can answer or edit
router.post('/:questionId', protect, adminOnly, addAnswer);
router.put('/:id', protect, adminOnly, updateAnswer);
router.get('/:questionId', protect, adminOnly, getAnswersForQuestion);

export default router;
