import express from 'express';
import { postLiability, getLiabilities, getOneLiability, updateLiability, deleteLiability } from '../controllers/liabilityControllers.js';

const router = express.Router();

// Routes for Create a new liability
router.post('/', postLiability);

// Routes for view all liabilities
router.get('/', getLiabilities);

// Routes for get one liability
router.get('/:id', getOneLiability);

// Routes for edit one liability
router.put('/:id', updateLiability);

// Routes for delete one liability
router.delete('/:id', deleteLiability);

export default router;