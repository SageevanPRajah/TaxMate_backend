import { Income } from "../models/income.js";

// Controller for Create a new income

export const postIncome = async (req, res) => {
    try {
        if(
            
            !req.body.incomeName ||
            !req.body.incomeType ||
            !req.body.date ||
            !req.body.amount 

        ) {
            return res.status(400).send({
                message: 'All fields are required'
            });
        }
        const newIncome = {
            incomeName: req.body.incomeName,
            incomeType: req.body.incomeType,
            date: req.body.date,
            amount: req.body.amount
        };
        const income = await Income.create(newIncome);
        return res.status(200).send(income);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
};

// Routes for view all income
export const getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({});
        return res.status(200).json({
            count: incomes.length,
            data: incomes,
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
};

// Routes for update income
export const updateIncome = async (req, res) => {
    try {
        if(
            !req.body.incomeName ||
            !req.body.incomeType ||
            !req.body.date ||
            !req.body.amount 
        ) {
            return res.status(400).send({
                message: 'All fields are required'
            });
        }
        const { id } = req.params;
        const income = await Income.findByIdAndUpdate(id,req.body);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        return res.status(200).json(income);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
};

// Routes for delete income
export const deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const income = await Income.findByIdAndDelete(id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        return res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
};

