import express from 'express';
import { postExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expenseControllers.js';

const router = express.Router();

    // Routes for Create a new expense
    router.post('/', postExpense);

    // Routes for view all expense
    router.get('/', getExpenses);

    // Routes for edit one expense
    router.put('/:id', updateExpense);

    // Routes for delete one expense
    router.delete('/:id', deleteExpense);

export default router;