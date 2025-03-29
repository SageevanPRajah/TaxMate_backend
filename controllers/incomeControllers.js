import { Income } from "../models/income.js";

// Controller for Create a new income

export const postIncome = async (req, res) => {
    try {
      const { incomeID, incomeName, incomeType, date, amount } = req.body;
  
      if (!incomeID || !incomeName || !incomeType || !date || !amount) {
        return res.status(400).send({ message: 'All fields are required' });
      }
  
      // Determine the fiscal year range based on the date
      const incomeDate = new Date(date);
      const year = incomeDate.getMonth() + 1 >= 4 ? incomeDate.getFullYear() : incomeDate.getFullYear() - 1;
  
      const fiscalYearStart = new Date(`${year}-04-01T00:00:00.000Z`);
      const fiscalYearEnd = new Date(`${year + 1}-03-31T23:59:59.999Z`);
  
      // Calculate total amount for incomes in this fiscal year
      const totalIncome = await Income.aggregate([
        {
          $match: {
            date: { $gte: fiscalYearStart, $lte: fiscalYearEnd }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" }
          }
        }
      ]);
  
      const totalAmount = (totalIncome[0]?.total || 0) + Number(amount); // include the current one
  
      // Save the new income with totalAmount
      const newIncome = await Income.create({
        incomeID,
        incomeName,
        incomeType,
        date,
        amount,
        totalAmount
      });
  
      return res.status(200).send(newIncome);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({ message: error.message });
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

// Routes for get one income
export const getOneIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const income = await Income.findById(id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        return res.status(200).json(income);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
};

// Routes for update income
export const updateIncome = async (req, res) => {
    try {
        const updates = req.body;
        if (!Object.keys(updates).length) {
            return res.status(400).send({ message: 'No data provided for update' });
        }
        const { id } = req.params;
        const income = await Income.findByIdAndUpdate(id, updates, { new: true });

        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        return res.status(200).send({ message: "Income updated successfully", data: income });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
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

