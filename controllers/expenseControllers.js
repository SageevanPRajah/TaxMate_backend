import { Expense } from "../models/expense.js";

// Controller for Create a new expense
export const postExpense = async (req, res) => {
    try {
        if(
            !req.body.userID ||
            !req.body.expenseName ||
            !req.body.date ||
            !req.body.expenseCategory ||
            !req.body.expenseAmount
        ) {
            return res.status(400).send({
                message: 'All fields are required'
            });
        }
        const newExpense = {
            userID: req.body.userID,
            expenseName: req.body.expenseName,
            date: req.body.date,
            expenseCategory: req.body.expenseCategory,
            expenseAmount: req.body.expenseAmount
        };
        const expense = await Expense.create(newExpense);
        return res.status(200).send(expense);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
};

// Routes for view all expense
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({});
        return res.status(200).json({
            count: expenses.length,
            data: expenses,
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
};

// Routes for get one expense
export const getOneExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        return res.status(200).json(expense);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
};

// Routes for update expense
export const updateExpense = async (req, res) => {
    try {
        const updates = req.body;
        if (!Object.keys(updates).length) {
            return res.status(400).send({ message: "All fields are required" });
        }
        const { id } = req.params;
        const result = await Expense.findByIdAndUpdate(id, updates ,{new: true});
        
        if (!result) {
            return res.status(404).json({ message: "Expense not found" });
        }
        return res.status(200).json({ message: "Expense updated successfully" });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
};

// Routes for delete expense
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findByIdAndDelete(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        return res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
};
