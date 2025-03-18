import express from 'express';
import { postIncome, getIncomes, updateIncome, deleteIncome } from '../controllers/incomeControllers.js';

const router = express.Router();

    // Routes for Create a new income
    router.post('/', postIncome);

    // Routes for view all income
    router.get('/', getIncomes);

    // Routes for edit one income
    router.put('/:id', updateIncome);

    // Routes for delete one income
    router.delete('/:id', deleteIncome);

export default router;